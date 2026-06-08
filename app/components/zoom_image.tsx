'use client';
import { useEffect, useState } from 'react';

export function ZoomImage({ src, alt }: { src: string; alt: string }) {
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
    <figure className="flex flex-col items-center not-prose">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full cursor-zoom-in"
        aria-label={`Zoom into ${alt}`}
      >
        <img src={src} alt={alt} className="w-full h-auto rounded-md" />
      </button>
      <figcaption className="text-neutral-400 mt-2 text-sm">{alt}</figcaption>

      {open && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black/90 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="m-auto block w-[1800px] max-w-none p-8"
          />
        </div>
      )}
    </figure>
  );
}

export default ZoomImage;
