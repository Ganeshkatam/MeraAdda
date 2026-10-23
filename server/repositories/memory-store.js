import { DEFAULT_PROFILE } from '../config/constants';

const seedProjects = [
  {
    id: '1',
    name: 'BookGarden',
    category: 'WEB APPS',
    description: 'An elegant digital book sanctuary and reading library companion. Features distraction-free reading, progress tracking, and personal bookshelves living on the TomeSphere network.',
    url: 'bookgarden.tomesphere.in',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85',
    accent: 'lavender',
    featured: true,
    status: 'Live',
    year: '2026',
    tags: ['Next.js', 'React', 'Supabase', 'TypeScript', 'EPUB/PDF']
  },
  {
    id: '2',
    name: 'Focusmate Hub',
    category: 'PRODUCTIVITY',
    description: 'A quieter, mindful workspace designed to build intentional flow states with structured pomodoro cadence and ambient soundscapes.',
    url: 'focusmate.app',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=85',
    accent: 'peach',
    featured: true,
    status: 'Live',
    year: '2025',
    tags: ['React', 'TypeScript', 'Web Audio API']
  },
  {
    id: '3',
    name: 'HyperSync Engine',
    category: 'DEVELOPER TOOLS',
    description: 'High-performance real-time data synchronization pipeline and developer toolkit for low-latency state hydration across distributed clients.',
    url: 'hypersync.dev',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=85',
    accent: 'blue',
    featured: true,
    status: 'Live',
    year: '2025',
    tags: ['Node.js', 'WebSockets', 'PostgreSQL', 'Redis']
  },
  {
    id: '4',
    name: 'Zenith Finance',
    category: 'FINANCE',
    description: 'A transparent, human-centered wealth visualization dashboard with multi-currency tracking, real-time charts, and financial milestone forecasting.',
    url: 'zenith.money',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=85',
    accent: 'mint',
    featured: false,
    status: 'Live',
    year: '2024',
    tags: ['React', 'Vite', 'ChartJS', 'Finance API']
  },
  {
    id: '5',
    name: 'Aether Component System',
    category: 'DEVELOPER TOOLS',
    description: 'An accessible, production-ready component library built with modern CSS custom properties, accessible ARIA primitives, and fluid micro-interactions.',
    url: 'aether.ui',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1100&q=85',
    accent: 'yellow',
    featured: false,
    status: 'In progress',
    year: '2025',
    tags: ['Design System', 'Accessibility', 'CSS3']
  },
  {
    id: '6',
    name: 'Sunday Table',
    category: 'COMMUNITY',
    description: 'A neighborhood culinary collective connecting home chefs and food enthusiasts to organize intimate communal dining pop-ups.',
    url: 'sundaytable.co',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85',
    accent: 'rose',
    featured: false,
    status: 'In progress',
    year: '2025',
    tags: ['React', 'Maps API', 'Community']
  }
];

const seedGuestbook = [
  {
    id: 'gb_1',
    author: 'Elena R.',
    message: 'BookGarden at bookgarden.tomesphere.in is wonderful. The distraction-free aesthetic is top tier.',
    timestamp: 'Oct 22, 2026'
  },
  {
    id: 'gb_2',
    author: 'Dev Community Member',
    message: 'Clean decoupled architecture and dynamic full-stack structure. Excited to follow this journey!',
    timestamp: 'Oct 23, 2026'
  }
];

// Singleton store instance for the Node runtime
globalThis._tomesphereStore = globalThis._tomesphereStore || {
  projects: [...seedProjects],
  guestbook: [...seedGuestbook],
  profile: { ...DEFAULT_PROFILE },
  contactMessages: []
};

export const store = globalThis._tomesphereStore;
