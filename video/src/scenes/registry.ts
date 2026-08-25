import type React from 'react';
import type {SceneProps} from '../data/types';
import {ConceptScene} from './ConceptScene';
import {OutroScene} from './OutroScene';
import {TitleScene} from './TitleScene';

export const sceneRegistry: Record<string, React.FC<SceneProps>> = {
  title: TitleScene,
  concept: ConceptScene,
  outro: OutroScene,
};
