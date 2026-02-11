export type SurfaceType = 'kitchen' | 'dining' | 'vanity';

export interface StoneColor {
  id: string;
  name: string;
  texture: string;
  baseColor: string;
  accentColor: string;
  category: 'granite' | 'marble' | 'quartz';
}

export interface EdgeProfile {
  id: string;
  name: string;
  svgPath: string;
}

export interface FinishType {
  id: string;
  name: string;
  cssFilter: string;
  overlay: string;
}

export const surfaces: { id: SurfaceType; name: string; description: string }[] = [
  { id: 'kitchen', name: 'Kitchen Countertop', description: 'Visualize your dream kitchen countertop' },
  { id: 'dining', name: 'Dining Table', description: 'Design your perfect dining table surface' },
  { id: 'vanity', name: 'Vanity Top', description: 'Create your ideal bathroom vanity' },
];

export const stoneColors: StoneColor[] = [
  {
    id: 'black-galaxy',
    name: 'Black Galaxy',
    category: 'granite',
    baseColor: '#0a0a0a',
    accentColor: '#d4af37',
    texture: `
      radial-gradient(1px 1px at 10% 15%, #d4af37 0.5px, transparent 1px),
      radial-gradient(1px 1px at 25% 35%, #c0c0c0 0.5px, transparent 1px),
      radial-gradient(1.5px 1.5px at 40% 20%, #d4af37 0.5px, transparent 1.5px),
      radial-gradient(1px 1px at 55% 45%, #e8e8e8 0.5px, transparent 1px),
      radial-gradient(1px 1px at 70% 10%, #d4af37 0.5px, transparent 1px),
      radial-gradient(1.5px 1.5px at 85% 55%, #c0c0c0 0.5px, transparent 1.5px),
      radial-gradient(1px 1px at 15% 65%, #d4af37 0.5px, transparent 1px),
      radial-gradient(1px 1px at 30% 80%, #e8e8e8 0.5px, transparent 1px),
      radial-gradient(1.5px 1.5px at 50% 70%, #d4af37 0.5px, transparent 1.5px),
      radial-gradient(1px 1px at 65% 85%, #c0c0c0 0.5px, transparent 1px),
      radial-gradient(1px 1px at 80% 30%, #d4af37 0.5px, transparent 1px),
      radial-gradient(1px 1px at 95% 75%, #e8e8e8 0.5px, transparent 1px),
      linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)
    `,
  },
  {
    id: 'tan-brown',
    name: 'Tan Brown',
    category: 'granite',
    baseColor: '#5c3a1e',
    accentColor: '#8b6914',
    texture: `
      radial-gradient(3px 3px at 10% 20%, #8b6914 1px, transparent 2px),
      radial-gradient(4px 4px at 30% 40%, #6b4226 1.5px, transparent 3px),
      radial-gradient(2px 2px at 50% 15%, #d4a76a 1px, transparent 2px),
      radial-gradient(3px 3px at 70% 50%, #4a2a10 1px, transparent 2px),
      radial-gradient(2px 2px at 90% 30%, #c8956c 1px, transparent 2px),
      radial-gradient(4px 4px at 20% 70%, #7a5a3a 1.5px, transparent 3px),
      radial-gradient(3px 3px at 45% 85%, #8b6914 1px, transparent 2px),
      radial-gradient(2px 2px at 65% 65%, #d4a76a 1px, transparent 2px),
      radial-gradient(3px 3px at 85% 80%, #5c3a1e 1px, transparent 2px),
      linear-gradient(160deg, #5c3a1e 0%, #6b4226 30%, #5c3a1e 60%, #4a2a10 100%)
    `,
  },
  {
    id: 'steel-grey',
    name: 'Steel Grey',
    category: 'granite',
    baseColor: '#4a4a4a',
    accentColor: '#8a8a8a',
    texture: `
      radial-gradient(2px 2px at 12% 18%, #7a7a7a 0.5px, transparent 1.5px),
      radial-gradient(3px 3px at 35% 25%, #5a5a5a 1px, transparent 2px),
      radial-gradient(2px 2px at 55% 42%, #8a8a8a 0.5px, transparent 1.5px),
      radial-gradient(2px 2px at 78% 15%, #6a6a6a 0.5px, transparent 1.5px),
      radial-gradient(3px 3px at 22% 55%, #9a9a9a 1px, transparent 2px),
      radial-gradient(2px 2px at 45% 72%, #5a5a5a 0.5px, transparent 1.5px),
      radial-gradient(2px 2px at 68% 88%, #7a7a7a 0.5px, transparent 1.5px),
      radial-gradient(3px 3px at 88% 65%, #6a6a6a 1px, transparent 2px),
      linear-gradient(145deg, #4a4a4a 0%, #555555 40%, #4a4a4a 70%, #3a3a3a 100%)
    `,
  },
  {
    id: 'absolute-black',
    name: 'Absolute Black',
    category: 'granite',
    baseColor: '#111111',
    accentColor: '#333333',
    texture: `
      radial-gradient(1px 1px at 20% 30%, #2a2a2a 0.5px, transparent 1px),
      radial-gradient(1px 1px at 60% 50%, #222222 0.5px, transparent 1px),
      radial-gradient(1px 1px at 80% 70%, #2a2a2a 0.5px, transparent 1px),
      linear-gradient(130deg, #111111 0%, #1a1a1a 50%, #111111 100%)
    `,
  },
  {
    id: 'white-carrara',
    name: 'White Carrara',
    category: 'marble',
    baseColor: '#f0ece4',
    accentColor: '#b8b0a0',
    texture: `
      linear-gradient(42deg, transparent 30%, rgba(180,170,155,0.15) 31%, rgba(180,170,155,0.15) 31.5%, transparent 32%),
      linear-gradient(48deg, transparent 55%, rgba(190,180,165,0.12) 55.5%, rgba(190,180,165,0.12) 56%, transparent 56.5%),
      linear-gradient(38deg, transparent 70%, rgba(170,160,145,0.1) 70.5%, rgba(170,160,145,0.1) 71%, transparent 71.5%),
      linear-gradient(44deg, transparent 15%, rgba(185,175,160,0.08) 15.5%, rgba(185,175,160,0.08) 16%, transparent 16.5%),
      linear-gradient(135deg, #f0ece4 0%, #ebe7df 30%, #f2eee6 60%, #ede9e1 100%)
    `,
  },
  {
    id: 'calacatta-gold',
    name: 'Calacatta Gold',
    category: 'marble',
    baseColor: '#faf6ee',
    accentColor: '#c4a265',
    texture: `
      linear-gradient(35deg, transparent 25%, rgba(196,162,101,0.18) 25.5%, rgba(196,162,101,0.18) 26%, transparent 26.5%),
      linear-gradient(42deg, transparent 50%, rgba(180,150,90,0.15) 50.5%, rgba(180,150,90,0.15) 51%, transparent 51.5%),
      linear-gradient(30deg, transparent 72%, rgba(200,170,110,0.12) 72.5%, rgba(200,170,110,0.12) 73%, transparent 73.5%),
      linear-gradient(38deg, transparent 10%, rgba(190,160,100,0.08) 10.5%, rgba(190,160,100,0.08) 11%, transparent 11.5%),
      linear-gradient(140deg, #faf6ee 0%, #f5f1e8 35%, #faf6ee 65%, #f7f3ea 100%)
    `,
  },
  {
    id: 'emperador-dark',
    name: 'Emperador Dark',
    category: 'marble',
    baseColor: '#3e2a1a',
    accentColor: '#8b6f4e',
    texture: `
      linear-gradient(40deg, transparent 20%, rgba(139,111,78,0.2) 20.5%, rgba(139,111,78,0.2) 21%, transparent 21.5%),
      linear-gradient(55deg, transparent 45%, rgba(120,95,65,0.15) 45.5%, rgba(120,95,65,0.15) 46%, transparent 46.5%),
      linear-gradient(35deg, transparent 65%, rgba(150,120,85,0.12) 65.5%, rgba(150,120,85,0.12) 66%, transparent 66.5%),
      linear-gradient(50deg, transparent 80%, rgba(130,105,75,0.1) 80.5%, rgba(130,105,75,0.1) 81%, transparent 81.5%),
      linear-gradient(150deg, #3e2a1a 0%, #4a3220 35%, #3e2a1a 65%, #352318 100%)
    `,
  },
  {
    id: 'arctic-white',
    name: 'Arctic White',
    category: 'quartz',
    baseColor: '#f5f5f5',
    accentColor: '#e8e8e8',
    texture: `
      radial-gradient(1px 1px at 25% 35%, rgba(200,200,200,0.3) 0.5px, transparent 1px),
      radial-gradient(1px 1px at 65% 55%, rgba(210,210,210,0.2) 0.5px, transparent 1px),
      radial-gradient(1px 1px at 45% 75%, rgba(195,195,195,0.25) 0.5px, transparent 1px),
      linear-gradient(135deg, #f5f5f5 0%, #f0f0f0 50%, #f5f5f5 100%)
    `,
  },
  {
    id: 'charcoal-grey',
    name: 'Charcoal Grey',
    category: 'quartz',
    baseColor: '#3d3d3d',
    accentColor: '#5a5a5a',
    texture: `
      radial-gradient(1px 1px at 20% 30%, rgba(90,90,90,0.4) 0.5px, transparent 1px),
      radial-gradient(1px 1px at 50% 60%, rgba(80,80,80,0.3) 0.5px, transparent 1px),
      radial-gradient(1px 1px at 75% 20%, rgba(100,100,100,0.35) 0.5px, transparent 1px),
      linear-gradient(140deg, #3d3d3d 0%, #454545 50%, #3d3d3d 100%)
    `,
  },
  {
    id: 'ivory-cream',
    name: 'Ivory Cream',
    category: 'quartz',
    baseColor: '#f0e6d0',
    accentColor: '#d4c4a8',
    texture: `
      radial-gradient(1px 1px at 15% 25%, rgba(212,196,168,0.3) 0.5px, transparent 1px),
      radial-gradient(1px 1px at 55% 45%, rgba(220,204,176,0.25) 0.5px, transparent 1px),
      radial-gradient(1px 1px at 80% 70%, rgba(200,184,156,0.2) 0.5px, transparent 1px),
      linear-gradient(135deg, #f0e6d0 0%, #ece2cc 50%, #f0e6d0 100%)
    `,
  },
  {
    id: 'indian-red',
    name: 'Indian Red',
    category: 'granite',
    baseColor: '#7a2e2e',
    accentColor: '#b85050',
    texture: `
      radial-gradient(3px 3px at 15% 20%, #b85050 1px, transparent 2px),
      radial-gradient(2px 2px at 40% 35%, #8a3838 1px, transparent 2px),
      radial-gradient(3px 3px at 60% 55%, #c06060 1px, transparent 2px),
      radial-gradient(2px 2px at 80% 25%, #6a2222 1px, transparent 2px),
      radial-gradient(2px 2px at 30% 75%, #9a4040 1px, transparent 2px),
      radial-gradient(3px 3px at 70% 80%, #b85050 1px, transparent 2px),
      linear-gradient(155deg, #7a2e2e 0%, #8a3535 40%, #7a2e2e 70%, #6a2626 100%)
    `,
  },
  {
    id: 'verde-guatemala',
    name: 'Verde Guatemala',
    category: 'marble',
    baseColor: '#1a3a2a',
    accentColor: '#4a7a5a',
    texture: `
      linear-gradient(38deg, transparent 28%, rgba(74,122,90,0.2) 28.5%, rgba(74,122,90,0.2) 29%, transparent 29.5%),
      linear-gradient(45deg, transparent 52%, rgba(60,100,75,0.15) 52.5%, rgba(60,100,75,0.15) 53%, transparent 53.5%),
      linear-gradient(32deg, transparent 75%, rgba(80,130,95,0.12) 75.5%, rgba(80,130,95,0.12) 76%, transparent 76.5%),
      linear-gradient(145deg, #1a3a2a 0%, #224432 35%, #1a3a2a 65%, #163026 100%)
    `,
  },
];

export const edgeProfiles: EdgeProfile[] = [
  { id: 'straight', name: 'Straight', svgPath: 'M0,0 L100,0 L100,8 L0,8 Z' },
  { id: 'bullnose', name: 'Full Bullnose', svgPath: 'M0,4 Q0,0 4,0 L96,0 Q100,0 100,4 L100,8 L0,8 Z' },
  { id: 'half-bullnose', name: 'Half Bullnose', svgPath: 'M0,0 L96,0 Q100,0 100,4 L100,8 L0,8 Z' },
  { id: 'bevel', name: 'Bevel', svgPath: 'M0,0 L95,0 L100,5 L100,8 L0,8 Z' },
  { id: 'ogee', name: 'Ogee', svgPath: 'M0,0 L94,0 Q100,0 98,3 Q96,6 100,8 L0,8 Z' },
  { id: 'dupont', name: 'Dupont', svgPath: 'M0,0 L96,0 L96,3 Q96,6 100,6 L100,8 L0,8 Z' },
];

export const finishes: FinishType[] = [
  {
    id: 'polished',
    name: 'Polished',
    cssFilter: 'contrast(1.1) saturate(1.15)',
    overlay: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.08) 100%)',
  },
  {
    id: 'honed',
    name: 'Honed',
    cssFilter: 'contrast(0.95) saturate(0.9) brightness(1.05)',
    overlay: 'none',
  },
  {
    id: 'leathered',
    name: 'Leathered',
    cssFilter: 'contrast(1.05) saturate(0.85)',
    overlay: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='transparent'/%3E%3Ccircle cx='2' cy='2' r='0.5' fill='rgba(0,0,0,0.06)'/%3E%3C/svg%3E")`,
  },
  {
    id: 'flamed',
    name: 'Flamed',
    cssFilter: 'contrast(1.08) saturate(0.8) brightness(0.95)',
    overlay: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Crect width='6' height='6' fill='transparent'/%3E%3Cpath d='M0 3 Q1.5 1 3 3 Q4.5 5 6 3' stroke='rgba(0,0,0,0.04)' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
  },
];
