'use client';
import { useEffect, useState } from 'react';

type ZoomImageProps = {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
};

export function ZoomImage({ src, alt, label, caption }: ZoomImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <figure className="zoom-image-frame flex flex-col items-center not-prose">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="zoom-image-button w-full cursor-zoom-in relative group"
        aria-label={`Zoom into ${alt}`}
      >
        <img src={src} alt={alt} className="w-full h-auto" />
        <span className="absolute bottom-2 right-2 font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors bg-black/60 px-1.5 py-0.5 pointer-events-none">
          expand
        </span>
      </button>
      <figcaption className="zoom-image-caption">{caption ?? alt}</figcaption>

      {open && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black/95 cursor-zoom-out p-4 sm:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            className="fixed right-4 top-4 z-[60] border border-neutral-700 bg-black px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-neutral-200 transition-colors hover:border-green-500 hover:text-green-300"
            onClick={() => setOpen(false)}
          >
            close
          </button>
          <img
            src={src}
            alt={alt}
            className="mx-auto my-12 block w-[1800px] max-w-none rounded-sm border border-neutral-800 bg-black p-4 sm:w-[2200px] sm:p-6"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </figure>
  );
}

export default ZoomImage;
