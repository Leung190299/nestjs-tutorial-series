import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart, useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type DiagramVisual = {
  title: string;
  boxes: {id: string; label: string; emoji: string}[];
  flows: {from: number; to: number; label: string; sentence: number}[];
};

const BOX_W = 380;
const BOX_H = 240;
const TOP = 430;
const MARGIN = 150;

export const DiagramScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as DiagramVisual;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const idx = useSentenceIndex(sentences);
  const n = v.boxes.length;
  const gap = (1920 - 2 * MARGIN - n * BOX_W) / Math.max(n - 1, 1);
  const xOf = (i: number) => MARGIN + i * (BOX_W + gap);
  const midY = TOP + BOX_H / 2;
  const active = v.flows.filter((f) => f.sentence <= idx);
  const currentFlow = active[active.length - 1];

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans}}>
      <h2
        style={{
          position: 'absolute',
          top: 110,
          width: '100%',
          textAlign: 'center',
          fontSize: 60,
          fontWeight: 900,
          color: theme.text,
          margin: 0,
        }}
      >
        {v.title}
      </h2>
      {v.boxes.map((b, i) => (
        <div key={b.id} style={{position: 'absolute', left: xOf(i), top: TOP}}>
          <Appear at={0} dy={24}>
            <div
              style={{
                width: BOX_W,
                height: BOX_H,
                backgroundColor: theme.panel,
                border: `3px solid ${theme.panelBorder}`,
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{fontSize: 70}}>{b.emoji}</span>
              <span style={{fontSize: 38, fontWeight: 700, color: theme.text}}>{b.label}</span>
            </div>
          </Appear>
        </div>
      ))}
      <svg
        width={1920}
        height={1080}
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
      >
        {v.flows.map((f, i) => {
          const start = sentenceStart(sentences, f.sentence);
          const p = spring({frame: frame - start, fps, config: {damping: 200}});
          if (p <= 0.01) return null;
          const forward = f.to > f.from;
          const isCurrent = currentFlow === f;
          // vị trí chấm chạy trên đường (0..1, lặp mỗi 1.4s)
          const t = ((frame - start) / (fps * 1.4)) % 1;
          if (forward) {
            const x1 = xOf(f.from) + BOX_W;
            const x2 = xOf(f.to);
            const xTip = x1 + (x2 - x1) * p;
            return (
              <g key={i} opacity={p}>
                <line x1={x1} y1={midY} x2={xTip} y2={midY} stroke={theme.blue} strokeWidth={6} />
                <polygon
                  points={`${xTip},${midY - 14} ${xTip},${midY + 14} ${xTip + 22},${midY}`}
                  fill={theme.blue}
                />
                <text
                  x={(x1 + x2) / 2}
                  y={midY - 30}
                  textAnchor="middle"
                  fill={theme.blue}
                  fontSize={30}
                  fontWeight={700}
                  fontFamily={theme.fontMono}
                >
                  {f.label}
                </text>
                {isCurrent ? (
                  <circle cx={x1 + (x2 - x1) * t} cy={midY} r={11} fill={theme.yellow} />
                ) : null}
              </g>
            );
          }
          // đường trả về: vòng phía dưới các box
          const x1 = xOf(f.from) + BOX_W / 2;
          const x2 = xOf(f.to) + BOX_W / 2;
          const yBottom = TOP + BOX_H;
          const yLow = yBottom + 170;
          const path = `M ${x1} ${yBottom} L ${x1} ${yLow} L ${x2} ${yLow} L ${x2} ${yBottom + 26}`;
          return (
            <g key={i} opacity={p}>
              <path
                d={path}
                fill="none"
                stroke={theme.green}
                strokeWidth={6}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
              />
              <polygon
                points={`${x2 - 14},${yBottom + 30} ${x2 + 14},${yBottom + 30} ${x2},${yBottom + 6}`}
                fill={theme.green}
                opacity={p > 0.95 ? 1 : 0}
              />
              <text
                x={(x1 + x2) / 2}
                y={yLow + 44}
                textAnchor="middle"
                fill={theme.green}
                fontSize={30}
                fontWeight={700}
                fontFamily={theme.fontMono}
              >
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
