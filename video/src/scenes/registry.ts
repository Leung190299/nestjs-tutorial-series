import type React from 'react';
import type {SceneProps} from '../data/types';
import {CodeScene} from './CodeScene';
import {ConceptScene} from './ConceptScene';
import {OutroScene} from './OutroScene';
import {TitleScene} from './TitleScene';
import {TerminalScene} from './TerminalScene';

export const sceneRegistry: Record<string, React.FC<SceneProps>> = {
  title: TitleScene,
  concept: ConceptScene,
  outro: OutroScene,
  code: CodeScene,
  terminal: TerminalScene,
};
