import React from 'react';
import {AbsoluteFill} from 'remotion';
import {theme} from './components/theme';

export type ThumbnailProps = {
  badge: string;      // "TẬP 1"
  line1: string;      // dòng chữ trắng lớn
  line2: string;      // dòng chữ đỏ lớn
  subtitle: string;   // pill phụ đề
  variant: 'ep1' | 'ep2' | 'ep3' | 'ep4' | 'ep5' | 'ep6' | 'ep7' | 'ep8';
};

const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      backgroundColor: theme.panel,
      border: `3px solid ${theme.panelBorder}`,
      borderRadius: 20,
      boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
      ...style,
    }}
  >
    {children}
  </div>
);

const MiniBox: React.FC<{emoji: string; label: string}> = ({emoji, label}) => (
  <Card
    style={{
      width: 190,
      padding: '18px 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    }}
  >
    <span style={{fontSize: 64}}>{emoji}</span>
    <span style={{fontSize: 26, fontWeight: 700, color: theme.text}}>{label}</span>
  </Card>
);

const Arrow: React.FC = () => (
  <div style={{fontSize: 52, color: theme.blue, fontWeight: 900}}>→</div>
);

// Hình minh họa bên phải cho từng tập
const Visual: React.FC<{variant: ThumbnailProps['variant']}> = ({variant}) => {
  if (variant === 'ep1') {
    return (
      <div style={{position: 'relative'}}>
        <Card style={{width: 470, padding: '26px 30px', fontFamily: theme.fontMono}}>
          <div style={{color: theme.textDim, fontSize: 24, marginBottom: 14}}>
            users.controller.ts
          </div>
          <div style={{fontSize: 34, lineHeight: 1.6}}>
            <div style={{color: theme.yellow}}>@Controller('users')</div>
            <div style={{color: theme.blue}}>@Get()</div>
            <div style={{color: theme.text}}>
              findAll() {'{'} ... {'}'}
            </div>
          </div>
        </Card>
        <div
          style={{
            position: 'absolute',
            top: -46,
            right: -40,
            width: 130,
            height: 130,
            borderRadius: 65,
            backgroundColor: theme.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 84,
            fontWeight: 900,
            color: '#fff',
            boxShadow: '0 14px 30px rgba(234,40,69,0.5)',
          }}
        >
          ?
        </div>
      </div>
    );
  }
  if (variant === 'ep2') {
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <MiniBox emoji="🚪" label="Gateway" />
        <Arrow />
        <MiniBox emoji="👥" label="Service" />
      </div>
    );
  }
  if (variant === 'ep3') {
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 20, width: 470}}>
        <Card
          style={{
            alignSelf: 'flex-start',
            padding: '20px 32px',
            fontSize: 40,
            color: theme.text,
            borderRadius: '24px 24px 24px 6px',
          }}
        >
          Xin chào 👋
        </Card>
        <div style={{alignSelf: 'center', fontSize: 76}}>⚡</div>
        <div
          style={{
            alignSelf: 'flex-end',
            padding: '20px 32px',
            fontSize: 40,
            color: '#fff',
            backgroundColor: theme.accent,
            borderRadius: '24px 24px 6px 24px',
            boxShadow: '0 18px 40px rgba(234,40,69,0.4)',
          }}
        >
          Hi! Nhận ngay ⚡
        </div>
      </div>
    );
  }
  if (variant === 'ep5') {
    return (
      <div style={{position: 'relative'}}>
        <Card style={{width: 460, padding: '26px 30px', fontFamily: theme.fontMono}}>
          <div style={{color: theme.textDim, fontSize: 24, marginBottom: 14}}>
            create-user.dto.ts
          </div>
          <div style={{fontSize: 34, lineHeight: 1.6}}>
            <div style={{color: theme.yellow}}>@IsNotEmpty()</div>
            <div style={{color: theme.blue}}>@MinLength(3)</div>
            <div style={{color: theme.green}}>@IsEmail()</div>
          </div>
        </Card>
        <div
          style={{
            position: 'absolute',
            top: -46,
            right: -40,
            backgroundColor: theme.accent,
            color: '#fff',
            fontSize: 44,
            fontWeight: 900,
            padding: '16px 26px',
            borderRadius: 999,
            boxShadow: '0 14px 30px rgba(234,40,69,0.5)',
          }}
        >
          400 ⛔
        </div>
      </div>
    );
  }
  if (variant === 'ep6') {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
        <div style={{fontSize: 110}}>💂</div>
        <Card
          style={{
            padding: '16px 30px',
            fontSize: 36,
            fontWeight: 700,
            color: theme.accent,
            fontFamily: theme.fontMono,
          }}
        >
          ❌ 403 Forbidden
        </Card>
        <div
          style={{
            padding: '16px 30px',
            fontSize: 36,
            fontWeight: 700,
            color: '#fff',
            backgroundColor: '#166534',
            borderRadius: 20,
            fontFamily: theme.fontMono,
            boxShadow: '0 14px 30px rgba(22,101,52,0.5)',
          }}
        >
          ✅ 200 + 🔑
        </div>
      </div>
    );
  }
  if (variant === 'ep7') {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
        <div style={{fontSize: 96}}>🎥</div>
        <Card style={{padding: '24px 34px', fontFamily: theme.fontMono, fontSize: 34, lineHeight: 1.6}}>
          <div style={{color: theme.text}}>{'{'}</div>
          <div style={{color: theme.green, paddingLeft: 30}}>success: true,</div>
          <div style={{color: theme.blue, paddingLeft: 30}}>data: [...]</div>
          <div style={{color: theme.text}}>{'}'}</div>
        </Card>
      </div>
    );
  }
  if (variant === 'ep8') {
    return (
      <div style={{position: 'relative'}}>
        <Card style={{width: 470, padding: '26px 30px', fontFamily: theme.fontMono}}>
          <div style={{fontSize: 32, lineHeight: 1.65}}>
            <div style={{color: theme.accent}}>"success": false,</div>
            <div style={{color: theme.yellow}}>"statusCode": 404,</div>
            <div style={{color: theme.text}}>"message": "Không tìm</div>
            <div style={{color: theme.text}}>  thấy đơn hàng 99"</div>
          </div>
        </Card>
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -36,
            fontSize: 100,
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
          }}
        >
          🚑
        </div>
      </div>
    );
  }
  // ep4: chat + microservice ghép lại
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
      <div
        style={{
          padding: '18px 30px',
          fontSize: 36,
          color: '#fff',
          backgroundColor: theme.accent,
          borderRadius: '22px 22px 6px 22px',
          boxShadow: '0 14px 30px rgba(234,40,69,0.4)',
        }}
      >
        chào cả nhà 💬
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <MiniBox emoji="💬" label="Gateway" />
        <Arrow />
        <MiniBox emoji="🗄️" label="Chat SV" />
      </div>
    </div>
  );
};

// Chữ dài thì co lại để không tràn cột trái (rộng 660px, Inter 900 ≈ 0.62em/ký tự)
const fitFont = (text: string): number => Math.min(108, Math.floor(1064 / text.length));

export const Thumbnail: React.FC<ThumbnailProps> = ({badge, line1, line2, subtitle, variant}) => (
  <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, overflow: 'hidden'}}>
    {/* dải chéo đỏ góc phải dưới tạo điểm nhấn */}
    <div
      style={{
        position: 'absolute',
        right: -220,
        bottom: -320,
        width: 640,
        height: 640,
        transform: 'rotate(35deg)',
        background: `linear-gradient(135deg, ${theme.accent}, #7f1225)`,
        opacity: 0.28,
        borderRadius: 80,
      }}
    />
    {/* badge tập */}
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 48,
        backgroundColor: theme.accent,
        color: '#fff',
        fontSize: 34,
        fontWeight: 900,
        padding: '10px 28px',
        borderRadius: 999,
        letterSpacing: 1,
      }}
    >
      {badge}
    </div>
    {/* tag series */}
    <div
      style={{
        position: 'absolute',
        bottom: 34,
        left: 48,
        color: theme.textDim,
        fontSize: 28,
        fontWeight: 700,
      }}
    >
      NestJS cho người mới bắt đầu 🇻🇳
    </div>
    {/* khối chữ chính bên trái */}
    <div
      style={{
        position: 'absolute',
        left: 48,
        top: 150,
        width: 660,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{fontSize: fitFont(line1), fontWeight: 900, color: theme.text, lineHeight: 1.04}}>
        {line1}
      </div>
      <div
        style={{
          fontSize: fitFont(line2),
          fontWeight: 900,
          color: theme.accent,
          lineHeight: 1.04,
          textShadow: '0 6px 24px rgba(234,40,69,0.45)',
        }}
      >
        {line2}
      </div>
      <div
        style={{
          marginTop: 18,
          alignSelf: 'flex-start',
          backgroundColor: theme.panel,
          border: `3px solid ${theme.panelBorder}`,
          color: theme.yellow,
          fontSize: 38,
          fontWeight: 700,
          padding: '12px 26px',
          borderRadius: 14,
        }}
      >
        {subtitle}
      </div>
    </div>
    {/* hình minh họa bên phải */}
    <div
      style={{
        position: 'absolute',
        right: 56,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Visual variant={variant} />
    </div>
  </AbsoluteFill>
);
