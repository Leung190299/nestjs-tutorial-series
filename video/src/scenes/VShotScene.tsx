import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {theme} from '../components/theme';
import type {SceneProps} from '../data/types';

export type VShotVisual = {src: string; caption?: string};

export const VShotScene: React.FC<SceneProps> = ({visual}) => {
  const v = visual as VShotVisual;
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans}}>
      <Img src={staticFile(v.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      {v.caption ? (
        <div style={{position: 'absolute', bottom: 90, left: 40, right: 40, backgroundColor: 'rgba(15,23,42,0.92)', borderRadius: 20, padding: '24px 30px', fontSize: 40, fontWeight: 700, color: theme.text, textAlign: 'center'}}>
          {v.caption}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
