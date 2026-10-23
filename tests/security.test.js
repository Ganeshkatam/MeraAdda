import test from 'node:test';
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { validateProjectPayload } from '../server/validators/project.validator.js';
import { validateContactPayload } from '../server/validators/contact.validator.js';
import { validateGuestbookPayload } from '../server/validators/guestbook.validator.js';
import { verifyAdminAuth } from '../server/auth/admin-auth.js';
import { ForbiddenError, ValidationError } from '../server/errors/api-error.js';

test('Security & Validation: Project Payload Validator', async (t) => {
  await t.test('rejects non-object payloads', () => {
    assert.throws(() => validateProjectPayload(null), ValidationError);
    assert.throws(() => validateProjectPayload('invalid'), ValidationError);
    assert.throws(() => validateProjectPayload([]), ValidationError);
  });

  await t.test('handles featured boolean correctly without Boolean("false") bug', () => {
    const payloadFalseString = {
      name: 'Valid Project',
      url: 'https://example.com',
      description: 'A valid description for testing purposes.',
      featured: 'false'
    };
    const resFalse = validateProjectPayload(payloadFalseString);
    assert.equal(resFalse.featured, false);

    const payloadTrue = {
      name: 'Valid Project',
      url: 'https://example.com',
      description: 'A valid description for testing purposes.',
      featured: 'true'
    };
    const resTrue = validateProjectPayload(payloadTrue);
    assert.equal(resTrue.featured, true);
  });

  await t.test('strictly validates web URLs with http/https schemes', () => {
    const payloadInvalidScheme = {
      name: 'Valid Project',
      url: 'javascript:alert(1)',
      description: 'A valid description for testing purposes.'
    };
    assert.throws(() => validateProjectPayload(payloadInvalidScheme), ValidationError);
  });

  await t.test('distinguishes partial update (PATCH/PUT) from full replacement', () => {
    const partialUpdate = {
      description: 'Updated description for this project.'
    };
    const validated = validateProjectPayload(partialUpdate, true);
    assert.equal(validated.description, 'Updated description for this project.');
    assert.equal(validated.name, undefined);
    assert.equal(validated.url, undefined);
  });

  await t.test('enforces tag array boundaries', () => {
    const tooManyTags = {
      name: 'Valid Project',
      url: 'https://example.com',
      description: 'A valid description for testing purposes.',
      tags: Array.from({ length: 20 }, (_, i) => `tag_${i}`)
    };
    assert.throws(() => validateProjectPayload(tooManyTags), ValidationError);
  });
});

test('Security & Validation: Contact & Guestbook Validators', async (t) => {
  await t.test('validates contact inquiry email and message boundaries', () => {
    assert.throws(() => validateContactPayload({ name: 'A', email: 'invalid', message: 'Hi' }), ValidationError);
    const valid = validateContactPayload({
      name: 'Legit Visitor',
      email: 'visitor@example.com',
      message: 'Hello, this is a legitimate message exceeding five characters.'
    });
    assert.equal(valid.email, 'visitor@example.com');
  });

  await t.test('enforces guestbook message length bounds', () => {
    assert.throws(() => validateGuestbookPayload({ author: 'Alex', message: 'a' }), ValidationError);
    const valid = validateGuestbookPayload({ author: 'Alex', message: 'Great portfolio!' });
    assert.equal(valid.author, 'Alex');
  });
});

test('Security: Admin Authorization Guard', async (t) => {
  process.env.ADMIN_SECRET = 'super-secret-admin-token-1234';

  await t.test('denies unauthenticated requests without admin headers', () => {
    assert.throws(() => verifyAdminAuth({}), ForbiddenError);
  });

  await t.test('denies requests with incorrect credentials', () => {
    assert.throws(() => verifyAdminAuth({ 'x-admin-key': 'wrong-password' }), ForbiddenError);
  });

  await t.test('authorizes requests with correct x-admin-key header', () => {
    assert.equal(verifyAdminAuth({ 'x-admin-key': 'super-secret-admin-token-1234' }), true);
  });

  await t.test('authorizes requests with correct Bearer authorization token', () => {
    assert.equal(verifyAdminAuth({ 'authorization': 'Bearer super-secret-admin-token-1234' }), true);
  });
});

test('Security: Express Admin Middleware', async (t) => {
  process.env.ADMIN_SECRET = 'ci-admin-secret-test';

  const { requireAdminMiddleware } = await import('../server/auth/admin-auth.js');

  await t.test('middleware passes error to next() on unauthenticated request', (t, done) => {
    const req = { headers: {} };
    const res = {};
    requireAdminMiddleware(req, res, (err) => {
      assert.ok(err instanceof ForbiddenError);
      done();
    });
  });

  await t.test('middleware passes error to next() on invalid credential', (t, done) => {
    const req = { headers: { 'x-admin-key': 'bad-token' } };
    const res = {};
    requireAdminMiddleware(req, res, (err) => {
      assert.ok(err instanceof ForbiddenError);
      done();
    });
  });

  await t.test('middleware succeeds with next() without error on valid credential', (t, done) => {
    const req = { headers: { 'x-admin-key': 'ci-admin-secret-test' } };
    const res = {};
    requireAdminMiddleware(req, res, (err) => {
      assert.equal(err, undefined);
      done();
    });
  });
});

test('Security: Live Supabase RLS & Role Privileges', async (t) => {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://ibuaiktnkhvqoqxrqnrz.supabase.co';
  const anonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidWFpa3Rua2h2cW9xeHJxbnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjI1MTYsImV4cCI6MjEwODMzODUxNn0.KTfcNZ_uh693CDWo6QUoh7RY6EbKnOW-rPSbDHVlKjk';

  const anonClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false } });

  await t.test('anonymous client cannot insert into projects', async () => {
    const { error } = await anonClient.from('projects').insert({
      id: 'unauthorized_hack_test',
      name: 'Malicious Project',
      category: 'WEB APPS',
      description: 'Unauthorized write attempt.',
      url: 'https://malicious.com'
    });
    assert.ok(error, 'Expected error on unauthorized insert to projects');
  });

  await t.test('anonymous client cannot update profile', async () => {
    const { error } = await anonClient.from('profile').update({ name: 'Hacked Name' }).eq('id', 'primary');
    assert.ok(error, 'Expected error on unauthorized update to profile');
  });

  await t.test('anonymous client cannot read contact inquiries', async () => {
    const { data, error } = await anonClient.from('contacts').select('*');
    assert.ok(error, 'Expected permission error when reading contacts as anonymous');
    assert.equal(data, null);
  });

  await t.test('anonymous client can only read Live projects', async () => {
    const { data, error } = await anonClient.from('projects').select('id, name, status');
    assert.equal(error, null);
    assert.ok(Array.isArray(data));
    for (const project of data) {
      assert.equal(project.status, 'Live');
    }
  });

  await t.test('anonymous client cannot insert pre-approved guestbook entries', async () => {
    const { error } = await anonClient.from('guestbook').insert({
      id: 'gb_hack_test',
      author: 'Attacker',
      message: 'Trying to bypass moderation boundary',
      timestamp: 'Today',
      status: 'approved'
    });
    assert.ok(error, 'Expected policy check error when anonymous user attempts to set approved status');
  });

  await t.test('anonymous client cannot insert null status into guestbook', async () => {
    const { error } = await anonClient.from('guestbook').insert({
      id: 'gb_null_test',
      author: 'Tester',
      message: 'Testing null status invariant',
      timestamp: 'Today',
      status: null
    });
    assert.ok(error, 'Expected error when inserting null status into guestbook');
  });

  await t.test('anonymous client cannot update or delete guestbook entries', async () => {
    const updateRes = await anonClient.from('guestbook').update({ message: 'Defaced' }).eq('id', 'gb_test');
    assert.ok(updateRes.error, 'Expected error when anonymous user attempts to update guestbook');

    const deleteRes = await anonClient.from('guestbook').delete().eq('id', 'gb_test');
    assert.ok(deleteRes.error, 'Expected error when anonymous user attempts to delete guestbook');
  });
});
