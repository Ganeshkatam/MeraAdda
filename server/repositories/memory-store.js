import { DEFAULT_PROFILE } from '../config/constants';

export const realProjects = [
  {
    id: 'proj_bookgarden',
    name: 'BookGarden',
    category: 'WEB APPS',
    description: 'TomeSphere digital reading platform and knowledge archive. Engineered with clean architecture, domain-driven design, distraction-free reading, progress tracking, and personal bookshelves.',
    url: 'bookgarden.tomesphere.in',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85',
    accent: 'lavender',
    featured: true,
    status: 'Live',
    year: '2026',
    tags: ['TypeScript', 'Next.js', 'Clean Architecture', 'Knowledge Archive']
  },
  {
    id: 'proj_streetcraft',
    name: 'StreetCraft',
    category: 'DEVELOPER TOOLS',
    description: 'Physical business growth engine turning commercial opportunities into everything customers need to see across Google, Instagram, WhatsApp, and counter print.',
    url: 'streetcraft.tomesphere.in',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=85',
    accent: 'peach',
    featured: true,
    status: 'Live',
    year: '2026',
    tags: ['TypeScript', 'React', 'Growth Engine', 'Multi-Channel']
  },
  {
    id: 'proj_cowatch',
    name: 'CoWatch',
    category: 'WEB APPS',
    description: 'Real-time synchronized watch party platform for movies, videos, and live streams with virtual browsers, WebSockets, interactive chat, and room orchestration.',
    url: 'cowatch.tomesphere.in',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=85',
    accent: 'blue',
    featured: true,
    status: 'Live',
    year: '2026',
    tags: ['TypeScript', 'WebRTC', 'WebSockets', 'Supabase', 'Streaming']
  },
  {
    id: 'proj_fitmirror',
    name: 'FitMirror Ecosystem',
    category: 'WEB APPS',
    description: 'Fashion eCommerce platform featuring an immersive 3D virtual try-on experience paired with the FitSeller merchant analytics and order fulfillment portal.',
    url: 'fitmirror.tomesphere.in',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1100&q=85',
    accent: 'mint',
    featured: false,
    status: 'Live',
    year: '2025',
    tags: ['TypeScript', '3D Virtual Try-On', 'FitSeller', 'Merchant Portal']
  },
  {
    id: 'proj_mystays',
    name: 'MyStays',
    category: 'WEB APPS',
    description: 'Long-term accommodation discovery and residential housing platform connecting seekers with PGs, private apartments, and verified shared rooms.',
    url: 'mystays.tomesphere.in',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=85',
    accent: 'yellow',
    featured: false,
    status: 'Live',
    year: '2025',
    tags: ['TypeScript', 'Housing Platform', 'Accommodation', 'Search']
  },
  {
    id: 'proj_gk_cli',
    name: 'gk-dev-cli',
    category: 'DEVELOPER TOOLS',
    description: 'Manifest-driven developer CLI for project discovery, task orchestration, workspace management, and plugin-powered workflow automation.',
    url: 'github.com/Ganeshkatam/gk-dev-cli',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1100&q=85',
    accent: 'rose',
    featured: false,
    status: 'Live',
    year: '2025',
    tags: ['JavaScript', 'Node.js', 'CLI Tooling', 'Automation']
  },
  {
    id: 'proj_calclens',
    name: 'CalcLens',
    category: 'OTHER',
    description: 'Mobile visual calculation and OCR camera assistant designed for instantaneous mathematical recognition and equation resolution.',
    url: 'github.com/Ganeshkatam/CalcLens',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1100&q=85',
    accent: 'lavender',
    featured: false,
    status: 'In progress',
    year: '2025',
    tags: ['Kotlin', 'Android', 'Computer Vision', 'Mobile App']
  }
];

export const realGuestbook = [
  {
    id: 'gb_welcome',
    author: 'Katam Ganesh Reddy',
    message: 'Welcome to TomeSphere (tomesphere.in)! Feel free to sign the guestbook, inspect my projects, or browse BookGarden at bookgarden.tomesphere.in.',
    timestamp: 'Oct 23, 2026'
  }
];

// Singleton store instance for fallback / cache
globalThis._tomesphereStore = globalThis._tomesphereStore || {
  projects: [...realProjects],
  guestbook: [...realGuestbook],
  profile: { ...DEFAULT_PROFILE },
  contactMessages: []
};

export const store = globalThis._tomesphereStore;
