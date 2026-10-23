import { NextResponse } from 'next/server';
import { supabase } from '@/server/config/supabase';

export async function GET() {
  let dbStatus = 'connected';
  let dbError = null;

  try {
    const { error } = await supabase.from('projects').select('id', { count: 'exact', head: true });
    if (error) {
      dbStatus = 'degraded';
      dbError = error.message;
    }
  } catch (err) {
    dbStatus = 'disconnected';
    dbError = err.message;
  }

  return NextResponse.json({
    status: dbStatus === 'connected' ? 'ok' : 'error',
    timestamp: new Date().toISOString(),
    service: 'tomesphere-api',
    database: {
      provider: 'Supabase PostgreSQL',
      status: dbStatus,
      ...(dbError ? { error: dbError } : {})
    }
  }, {
    status: dbStatus === 'connected' ? 200 : 503
  });
}
