import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type VAnswerVisual = {
  title: string;
  bullets: {icon?: string; text: string; sentence: number}[];
  trap?: string;
};

export const VAnswerScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as VAnswerVisual;
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: 60, justifyContent: 'center'}}>
      <h2 style={{fontSize: 64, fontWeight: 900, color: theme.text, margin: 0}}>
        <span style={{color: theme.accent}}>■ </span>{v.title}
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 34, marginTop: 60}}>
        {v.bullets.map((b, i) => (
          <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
            <div style={{display: 'flex', gap: 24, alignItems: 'flex-start', backgroundColor: theme.panel, border: `2px solid ${theme.panelBorder}`, borderRadius: 22, padding: '30px 34px'}}>
              <span style={{fontSize: 48}}>{b.icon ?? '✅'}</span>
              <span style={{fontSize: 42, color: theme.text, lineHeight: 1.4}}>{b.text}</span>
            </div>
          </Appear>
        ))}
      </div>
      {v.trap ? (
        <div style={{marginTop: 60, backgroundColor: 'rgba(234,40,69,0.12)', border: `3px solid ${theme.accent}`, borderRadius: 22, padding: '30px 34px', fontSize: 40, color: theme.text, lineHeight: 1.4}}>
          ⚠️ <b>Bẫy:</b> {v.trap}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
