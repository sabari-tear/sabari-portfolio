"use client";

import { useEffect } from "react";

export function HeroAboutAlign() {
  useEffect(() => {
    const nameCard = document.getElementById("namecard-block");
    const about = document.getElementById("about-content");

    if (!nameCard || !about) {
      return;
    }

    const applyAlignment = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      about.style.marginTop = "0px";

      if (!isDesktop) {
        return;
      }

      const nameRect = nameCard.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();
      const nameCenter = nameRect.top + nameRect.height / 2;
      const aboutCenter = aboutRect.top + aboutRect.height / 2;
      const delta = nameCenter - aboutCenter;

      about.style.marginTop = `${Math.round(delta)}px`;
    };

    applyAlignment();
    const delayedRealign = window.setTimeout(applyAlignment, 250);

    const resizeObserver = new ResizeObserver(applyAlignment);
    resizeObserver.observe(nameCard);
    resizeObserver.observe(about);

    window.addEventListener("resize", applyAlignment);
    window.addEventListener("load", applyAlignment);

    return () => {
      window.clearTimeout(delayedRealign);
      window.removeEventListener("resize", applyAlignment);
      window.removeEventListener("load", applyAlignment);
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}
