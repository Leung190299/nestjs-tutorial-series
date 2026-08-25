import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadJetBrainsMono} from '@remotion/google-fonts/JetBrainsMono';

const inter = loadInter('normal', {
  weights: ['400', '700', '900'],
  subsets: ['latin', 'vietnamese'],
});
const mono = loadJetBrainsMono('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export const theme = {
  bg: '#0f172a',
  panel: '#1e293b',
  panelBorder: '#334155',
  text: '#f1f5f9',
  textDim: '#94a3b8',
  accent: '#ea2845',
  green: '#4ade80',
  yellow: '#facc15',
  blue: '#38bdf8',
  fontSans: inter.fontFamily,
  fontMono: mono.fontFamily,
};
