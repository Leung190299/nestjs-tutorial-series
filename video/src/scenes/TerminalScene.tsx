import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Terminal} from '../components/Terminal';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type TerminalVisual = {
  title: string;
  commands: {cmd: string; output: string; sentence: number}[];
};

const CHARS_PER_FRAME = 0.9;

export const TerminalScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as TerminalVisual;
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '80px 180px'}}
    >
      <h2 style={{margin: '0 0 50px', fontSize: 64, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <Terminal>
        {v.commands.map((c, i) => {
          const start = sentenceStart(sentences, c.sentence);
          if (frame < start) return null;
          const typed = Math.floor((frame - start) * CHARS_PER_FRAME);
          const done = typed >= c.cmd.length;
          return (
            <div key={i} style={{marginBottom: 26}}>
              <div style={{color: theme.text}}>
                <span style={{color: theme.green, fontWeight: 700}}>➜ ~ </span>
                {c.cmd.slice(0, typed)}
                {!done ? <span>▌</span> : null}
              </div>
              {done ? (
                <div style={{color: theme.textDim, whiteSpace: 'pre-wrap', marginTop: 8}}>
                  {c.output}
                </div>
              ) : null}
            </div>
          );
        })}
      </Terminal>
    </AbsoluteFill>
  );
};
