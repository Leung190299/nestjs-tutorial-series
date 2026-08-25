import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import type {SceneProps} from '../data/types';

export type TitleVisual = {title: string; subtitle: string; badge?: string};

export const TitleScene: React.FC<SceneProps> = ({visual}) => {
  const v = visual as TitleVisual;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 200}});
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: theme.fontSans,
        gap: 36,
      }}
    >
      {v.badge ? (
        <div
          style={{
            opacity: p,
            color: theme.accent,
            border: `3px solid ${theme.accent}`,
            borderRadius: 999,
            padding: '10px 32px',
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {v.badge}
        </div>
      ) : null}
      <h1
        style={{
          margin: 0,
          fontSize: 110,
          fontWeight: 900,
          color: theme.text,
          textAlign: 'center',
          maxWidth: 1500,
          lineHeight: 1.15,
          opacity: p,
          transform: `scale(${0.9 + p * 0.1})`,
        }}
      >
        {v.title}
      </h1>
      <Appear at={Math.round(fps * 0.5)}>
        <p style={{margin: 0, fontSize: 44, color: theme.textDim}}>{v.subtitle}</p>
      </Appear>
    </AbsoluteFill>
  );
};
