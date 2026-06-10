'use client';
import { useEffect, useState } from 'react';

type ZoomImageProps = {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

export function ZoomImage({ src, alt, label, caption }: ZoomImageProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <figure className="zoom-image-frame flex flex-col items-center not-prose overflow-hidden w-full">
      {isDesktop ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="zoom-image-button w-full cursor-zoom-in relative group"
          aria-label={`Zoom into ${alt}`}
        >
          <img src={src} alt={alt} className="w-full max-w-full h-auto" />
          <span className="absolute bottom-2 right-2 font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors bg-black/60 px-1.5 py-0.5 pointer-events-none">
            expand
          </span>
        </button>
      ) : (
        <div className="w-full">
          <img src={src} alt={alt} className="w-full max-w-full h-auto" />
        </div>
      )}
      <figcaption className="zoom-image-caption">{caption ?? alt}</figcaption>

      {isDesktop && open && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black/95 cursor-zoom-out p-4 sm:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <img
            src={src}
            alt={alt}
            className="mx-auto my-12 block max-w-full sm:w-[2200px] sm:max-w-none rounded-sm border border-neutral-800 bg-black p-4 sm:p-6"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </figure>
  );
}

export default ZoomImage;
