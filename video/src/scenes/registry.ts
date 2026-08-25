import type React from 'react';
import type {SceneProps} from '../data/types';
import {TitleScene} from './TitleScene';

// Các task sau thêm scene mới vào đây (concept, diagram, code, terminal, outro).
export const sceneRegistry: Record<string, React.FC<SceneProps>> = {
  title: TitleScene,
};
