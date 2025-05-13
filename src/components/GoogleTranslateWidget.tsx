"use client";
import { useEffect } from "react";

export default function GoogleTranslateWidget() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;
    window.googleTranslateElementInit = function () {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        { pageLanguage: "ru" },
        "google_translate_element"
      );
      // Автоматический выбор языка устройства
      setTimeout(() => {
        const userLang = navigator.language.split('-')[0];
        const supported = ["ru", "uk", "en"];
        if (!supported.includes(userLang)) {
          const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
          if (select) {
            select.value = userLang;
            select.dispatchEvent(new Event("change"));
          }
        }
      }, 1000);
    };
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{ zIndex: 9999, position: "relative" }}
    />
  );
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
} 