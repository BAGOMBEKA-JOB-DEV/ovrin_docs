import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

// Prerendered at build, like sitemap.ts and robots.ts — output: 'export' has
// no server to generate it on request.
export const dynamic = 'force-static';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#86868b', letterSpacing: -0.3 }}>
          Ovrin
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -1.6,
            color: '#f5f5f7',
            maxWidth: 940,
          }}
        >
          Turn documents into trusted structured data.
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#86868b', letterSpacing: -0.3 }}>
          A Go library for typed, validated document extraction
        </div>
      </div>
    ),
    size,
  );
}
