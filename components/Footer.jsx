import React from 'react';
import Link from 'next/link';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer({ profile }) {
  const name = profile?.name || 'Katam Ganesh Reddy';
  const domain = profile?.domain || 'tomesphere.in';
  const email = profile?.email || 'katamganesh61@gmail.com';
  const linkedin = profile?.socials?.linkedin || 'linkedin.com/in/ganeshkatam';
  const github = profile?.socials?.github || 'github.com/Ganeshkatam';

  const monogram = name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href="/" className="brand-monogram" style={{ width: '28px', height: '28px', fontSize: '13px' }}>
          {monogram}
        </Link>
        <span>{name} — {domain}</span>
      </div>

      <div className="footer-links-row">
        <Link href="/work" className="footer-nav-link">Work</Link>
        <Link href="/about" className="footer-nav-link">About</Link>
        <Link href="/terminal" className="footer-nav-link">Terminal</Link>
        <Link href="/guestbook" className="footer-nav-link">Guestbook</Link>
        <Link href="/contact" className="footer-nav-link">Contact</Link>
      </div>

      <div className="footer-social-links">
        {linkedin && (
          <a href={`https://${linkedin}`} target="_blank" rel="noreferrer">
            <Linkedin size={15} /> LinkedIn
          </a>
        )}
        {github && (
          <a href={`https://${github}`} target="_blank" rel="noreferrer">
            <Github size={15} /> GitHub
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <Mail size={15} /> Email
          </a>
        )}
      </div>
    </footer>
  );
}
