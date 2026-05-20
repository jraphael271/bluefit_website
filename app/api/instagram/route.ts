import { NextResponse } from 'next/server';

export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

const BEHOLD_FEED_URL = 'https://feeds.behold.so/2ZYALCy8cYJyVaRpJMUo';

export async function GET() {
  try {
    const res = await fetch(BEHOLD_FEED_URL, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ posts: [] });
    }

    const data = await res.json();

    const posts: InstagramPost[] = (data.posts ?? [])
      .map((p: Record<string, unknown>) => ({
        id: p.id as string,
        caption: p.caption as string | undefined,
        media_type: (p.mediaType as string) === 'VIDEO' ? 'VIDEO' : 'IMAGE',
        media_url: (
          (p.sizes as Record<string, { mediaUrl: string }> | undefined)
            ?.medium?.mediaUrl ?? p.mediaUrl
        ) as string,
        thumbnail_url: (
          (p.sizes as Record<string, { mediaUrl: string }> | undefined)
            ?.medium?.mediaUrl ?? p.thumbnailUrl
        ) as string | undefined,
        permalink: p.permalink as string,
        timestamp: p.timestamp as string,
      }))
      .filter((p: InstagramPost) => p.media_url);

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}
