import {Highlight, themes} from 'prism-react-renderer';
import React from 'react';
import {theme} from './theme';

type Props = {
  code: string;
  language: string;
  filename?: string;
  visibleUpTo: number;          // dòng 1-index cuối cùng đang hiển thị
  highlight?: [number, number]; // vùng dòng đang nhấn mạnh
};

export const CodeBlock: React.FC<Props> = ({code, language, filename, visibleUpTo, highlight}) => (
  <div
    style={{
      backgroundColor: theme.panel,
      borderRadius: 16,
      border: `2px solid ${theme.panelBorder}`,
      overflow: 'hidden',
      fontFamily: theme.fontMono,
    }}
  >
    {filename ? (
      <div
        style={{
          padding: '14px 28px',
          borderBottom: `2px solid ${theme.panelBorder}`,
          color: theme.textDim,
          fontSize: 26,
        }}
      >
        {filename}
      </div>
    ) : null}
    <Highlight code={code.trimEnd()} language={language} theme={themes.nightOwl}>
      {({tokens, getLineProps, getTokenProps}) => (
        <pre
          style={{
            margin: 0,
            padding: '24px 28px',
            fontSize: 30,
            lineHeight: 1.65,
            backgroundColor: 'transparent',
          }}
        >
          {tokens.map((line, i) => {
            const lineNo = i + 1;
            const inHighlight =
              highlight != null && lineNo >= highlight[0] && lineNo <= highlight[1];
            const visible = lineNo <= visibleUpTo;
            return (
              <div
                key={i}
                {...getLineProps({line})}
                style={{
                  opacity: !visible ? 0 : inHighlight || highlight == null ? 1 : 0.4,
                  backgroundColor: inHighlight ? 'rgba(234, 40, 69, 0.15)' : 'transparent',
                  borderLeft: inHighlight
                    ? `6px solid ${theme.accent}`
                    : '6px solid transparent',
                  paddingLeft: 18,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 48,
                    color: theme.textDim,
                    opacity: 0.5,
                  }}
                >
                  {lineNo}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token})} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  </div>
);
