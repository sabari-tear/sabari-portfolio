"use client";

import { useEffect } from "react";

export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--spotlight-x", "50vw");
    root.style.setProperty("--spotlight-y", "35vh");

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        root.style.setProperty("--spotlight-x", `${event.clientX}px`);
        root.style.setProperty("--spotlight-y", `${event.clientY}px`);
        frame = 0;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const enterElements = Array.from(document.querySelectorAll<HTMLElement>("[data-enter]"));
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add("in-view");
            observer.unobserve(element);
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    for (const [index, element] of enterElements.entries()) {
      element.style.setProperty("--motion-delay", `${Math.min(index * 60, 600)}ms`);
      observer.observe(element);
    }

    for (const [index, element] of revealElements.entries()) {
      element.style.setProperty("--motion-delay", `${Math.min(index * 45, 480)}ms`);
      observer.observe(element);
    }

    const sections = [
      { sectionId: "about", navId: "about-nav" },
      { sectionId: "experience", navId: "experience-nav" },
      { sectionId: "projects", navId: "projects-nav" },
    ];

    const updateActiveNav = () => {
      let activeSectionId = sections[0]?.sectionId;
      const viewportAnchor = 220;

      for (const item of sections) {
        const section = document.getElementById(item.sectionId);
        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportAnchor) {
          activeSectionId = item.sectionId;
        }
      }

      for (const item of sections) {
        const nav = document.getElementById(item.navId);
        if (nav) {
          nav.classList.toggle("active", item.sectionId === activeSectionId);
        }
      }
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    window.addEventListener("hashchange", updateActiveNav);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
      window.removeEventListener("hashchange", updateActiveNav);
    };
  }, []);

  return null;
}
