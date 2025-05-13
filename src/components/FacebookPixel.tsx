"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function FacebookPixel() {
  useEffect(() => {
    // Инициализация fbq
    if (typeof window !== 'undefined') {
      (function(f: Window, b: Document, _e: string, v: string, n: any, t: HTMLScriptElement | null, s: Element | null) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement('script') as HTMLScriptElement;
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName('script')[0];
        s?.parentNode?.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);
      
      // Инициализация пикселя с ID
      window.fbq('init', '937313667269340');
      window.fbq('track', 'PageView');
    }
  }, []);

  return null;
} 