import html2canvas from 'html2canvas';
import type { RefObject } from 'react';
import type { LoveLanguage } from '../../quiz';

const APP_URL = 'lovequiz.app';

export { APP_URL };

// ------------------------------------------------------------------
// Core capture — renders the card DOM node to a PNG Blob
// ------------------------------------------------------------------

export async function exportCardAsImage(
  cardRef: RefObject<HTMLDivElement | null>,
): Promise<Blob> {
  const el = cardRef.current;
  if (!el) throw new Error('ShareCard ref not attached');

  // Ensure Google Fonts are fully loaded before capture
  await document.fonts.ready;

  const canvas = await html2canvas(el, {
    scale: 1,
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    logging: false,
    width: el.offsetWidth,
    height: el.offsetHeight,
  });

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob returned null'))),
      'image/png',
      1.0,
    );
  });
}

// ------------------------------------------------------------------
// Download — saves PNG to disk
// ------------------------------------------------------------------

export async function downloadCard(
  cardRef: RefObject<HTMLDivElement | null>,
  language: LoveLanguage,
): Promise<void> {
  const blob = await exportCardAsImage(cardRef);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `linguagem-do-amor-${language.toLowerCase()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ------------------------------------------------------------------
// Share — Web Share API on mobile, download fallback on desktop
// Returns 'shared' | 'downloaded' so the caller can show the right toast
// ------------------------------------------------------------------

export async function shareCardImage(
  cardRef: RefObject<HTMLDivElement | null>,
  shareText: string,
  language: LoveLanguage,
): Promise<'shared' | 'downloaded'> {
  const blob = await exportCardAsImage(cardRef);
  const file = new File([blob], `linguagem-do-amor-${language.toLowerCase()}.png`, {
    type: 'image/png',
  });

  if (
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] })
  ) {
    await navigator.share({ files: [file], text: shareText, title: shareText });
    return 'shared';
  }

  // Fallback: trigger download
  await downloadCard(cardRef, language);
  return 'downloaded';
}

// ------------------------------------------------------------------
// Copy link — copies the app URL to clipboard
// ------------------------------------------------------------------

export async function copyAppLink(): Promise<void> {
  const url = `https://${APP_URL}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = url;
    el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(el);
    }
  }
}
