import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart, useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type BrowserVisual = {
  title: string;
  // Ảnh chụp browser thật 1280×800; 1 shot = cửa sổ lớn, 2 shots = so găng cạnh nhau
  shots: {src: string; sentence: number; label?: string; url?: string}[];
  bullets?: {icon?: string; text: string; sentence: number}[];
};

const Window: React.FC<{src: string; label?: string; url?: string; width: number; p: number}> = ({src, label, url, width, p}) => (
  <div style={{width, opacity: 0.35 + p * 0.65, transform: `scale(${0.97 + p * 0.03})`}}>
    {label ? (
      <div style={{fontSize: 30, fontWeight: 700, color: theme.text, marginBottom: 12, textAlign: 'center'}}>
        {label}
      </div>
    ) : null}
    <div style={{borderRadius: 18, overflow: 'hidden', border: `3px solid #334155`, boxShadow: '0 24px 60px rgba(0,0,0,0.5)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', backgroundColor: '#1e293b'}}>
        <span style={{width: 14, height: 14, borderRadius: 7, backgroundColor: '#ff5f57'}} />
        <span style={{width: 14, height: 14, borderRadius: 7, backgroundColor: '#febc2e'}} />
        <span style={{width: 14, height: 14, borderRadius: 7, backgroundColor: '#28c840'}} />
        <div style={{flex: 1, marginLeft: 12, backgroundColor: '#0f172a', borderRadius: 8, padding: '6px 14px', color: '#94a3b8', fontSize: 20, fontFamily: theme.fontMono}}>
          {url ?? 'localhost:5199 — ViệtSuper'}
        </div>
      </div>
      <Img src={staticFile(src)} style={{width: '100%', display: 'block'}} />
    </div>
  </div>
);

export const BrowserScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as BrowserVisual;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const idx = useSentenceIndex(sentences);
  const active = v.shots.filter((s) => s.sentence <= idx);
  const sideBySide = v.shots.length === 2;
  const current = sideBySide ? v.shots : [active[active.length - 1] ?? v.shots[0]];
  const switchedAt = sentenceStart(sentences, (sideBySide ? v.shots[0] : current[0]).sentence);
  const p = spring({frame: frame - switchedAt, fps, config: {damping: 200}});

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '70px 90px'}}>
      <h2 style={{margin: 0, fontSize: 60, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{display: 'flex', gap: 40, marginTop: 40, alignItems: 'flex-start'}}>
        {(v.bullets?.length ?? 0) > 0 && !sideBySide ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: 28, width: 560}}>
            {(v.bullets ?? []).map((b, i) => (
              <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
                <div style={{display: 'flex', alignItems: 'center', gap: 20, backgroundColor: theme.panel, border: `2px solid ${theme.panelBorder}`, borderRadius: 18, padding: '20px 26px'}}>
                  <span style={{fontSize: 38}}>{b.icon ?? '👉'}</span>
                  <span style={{fontSize: 30, color: theme.text, lineHeight: 1.4}}>{b.text}</span>
                </div>
              </Appear>
            ))}
          </div>
        ) : null}
        <div style={{display: 'flex', gap: 36, flex: 1, justifyContent: 'center'}}>
          {current.map((s, i) => (
            <Appear key={i} at={sentenceStart(sentences, s.sentence)}>
              <Window src={s.src} label={s.label} url={s.url} width={sideBySide ? 830 : 1120} p={p} />
            </Appear>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
