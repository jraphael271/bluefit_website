'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { InstagramPost } from '@/app/api/instagram/route';

const FALLBACK_POSTS: InstagramPost[] = [
  '/photos/B002.jpg',
  '/photos/B005.jpg',
  '/photos/B007.jpg',
  '/photos/B009.jpg',
  '/photos/B012.jpg',
  '/photos/B013.jpg',
  '/photos/B016.jpg',
  '/photos/B018.jpg',
].map((src, i) => ({
  id: `fallback-${i}`,
  media_type: 'IMAGE',
  media_url: src,
  permalink: 'https://www.instagram.com/bluefitlent',
  timestamp: new Date().toISOString(),
}));

const InstagramIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
  </svg>
);

export default function InstagramCarousel() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts?.length > 0 ? data.posts : FALLBACK_POSTS);
      })
      .catch(() => setPosts(FALLBACK_POSTS));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || posts.length === 0) return;

    const tick = () => {
      if (!pausedRef.current && track) {
        track.scrollLeft += 0.8;
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [posts]);

  const displayPosts = [...posts, ...posts];

  return (
    <div>
      {/* Header */}
      <div className='flex items-end justify-between mb-8'>
        <div>
          <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-2'>
            Op social media
          </p>
          <h3 className='text-[#0d1f3c] text-2xl md:text-3xl font-bold tracking-tight'>
            Volg ons op Instagram
          </h3>
        </div>
        <Link
          href='https://www.instagram.com/bluefitlent'
          target='_blank'
          rel='noopener noreferrer'
          className='hidden sm:inline-flex items-center gap-2 text-[#1f7bbf] text-sm font-semibold hover:gap-3 transition-all duration-200'
        >
          @bluefitlent <ArrowRight size={14} />
        </Link>
      </div>

      {/* Carousel */}
      <div className='relative overflow-hidden'>
        {/* Fade edges */}
        <div className='absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#F7F9FC] to-transparent pointer-events-none' />
        <div className='absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#F7F9FC] to-transparent pointer-events-none' />

        <div
          ref={trackRef}
          className='flex gap-4 overflow-x-scroll'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {displayPosts.map((post, i) => {
            const imgSrc = post.media_url.startsWith('/')
              ? post.media_url
              : post.thumbnail_url ?? post.media_url;

            return (
              <Link
                key={`${post.id}-${i}`}
                href={post.permalink}
                target='_blank'
                rel='noopener noreferrer'
                className='relative flex-none w-[260px] h-[260px] rounded-2xl overflow-hidden group'
              >
                <Image
                  src={imgSrc}
                  alt={post.caption?.slice(0, 60) ?? 'BlueFit Instagram'}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                  sizes='260px'
                />
                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

                {/* Instagram icon */}
                <div className='absolute top-3 right-3 text-white/80 group-hover:text-white transition-colors duration-200'>
                  <InstagramIcon />
                </div>

                {/* Caption */}
                {post.caption && (
                  <p className='absolute bottom-3 left-3 right-3 text-white text-xs leading-relaxed line-clamp-2'>
                    {post.caption}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile follow link */}
      <div className='sm:hidden mt-5 text-center'>
        <Link
          href='https://www.instagram.com/bluefitlent'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 text-[#1f7bbf] text-sm font-semibold'
        >
          @bluefitlent <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
