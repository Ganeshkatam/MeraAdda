import { SERVER_CONFIG } from './server.config.js';

export const DOMAIN_CONFIG = {
  mainDomain: 'tomesphere.in',
  libraryDomain: 'bookgarden.tomesphere.in',
  apiUrl: '/api/v1'
};

export { SERVER_CONFIG };

export const ALLOWED_CATEGORIES = [
  'WEB APPS',
  'PRODUCTIVITY',
  'DEVELOPER TOOLS',
  'FINANCE',
  'COMMUNITY',
  'EDUCATION',
  'OTHER'
];

export const ALLOWED_STATUSES = ['Live', 'In progress', 'Draft', 'Archived'];

export const DEFAULT_PROFILE = {
  name: 'Katam Ganesh Reddy',
  title: 'Full-Stack Developer · Systems Builder',
  location: 'India',
  domain: DOMAIN_CONFIG.mainDomain,
  email: 'katamganesh61@gmail.com',
  intro: 'Welcome to TomeSphere — the digital product studio and engineering platform founded by Katam Ganesh Reddy. Explore full-stack systems, developer tooling, and distributed architecture.',
  socials: {
    github: 'github.com/Ganeshkatam',
    linkedin: 'linkedin.com/in/ganeshkatam'
  }
};
