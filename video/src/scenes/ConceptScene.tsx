import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type ConceptVisual = {
  title: string;
  bullets: {text: string; sentence: number; icon?: string}[];
};

export const ConceptScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as ConceptVisual;
  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '100px 140px'}}
    >
      <h2 style={{margin: 0, fontSize: 72, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{marginTop: 70, display: 'flex', flexDirection: 'column', gap: 44}}>
        {v.bullets.map((b, i) => (
          <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                backgroundColor: theme.panel,
                border: `2px solid ${theme.panelBorder}`,
                borderRadius: 20,
                padding: '30px 40px',
              }}
            >
              <span style={{fontSize: 52}}>{b.icon ?? '👉'}</span>
              <span style={{fontSize: 42, color: theme.text, lineHeight: 1.4}}>{b.text}</span>
            </div>
          </Appear>
        ))}
      </div>
    </AbsoluteFill>
  );
};
