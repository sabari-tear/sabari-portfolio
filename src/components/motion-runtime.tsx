"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function MotionRuntime() {
  const pathname = usePathname();
  const didRunInitialReset = useRef(false);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("show-namecard-quote");

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScrollToTop = () => {
      if (window.location.hash) {
        const nextUrl = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(null, "", nextUrl);
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    let delayedReset: number | null = null;
    if (!didRunInitialReset.current) {
      resetScrollToTop();
      window.requestAnimationFrame(resetScrollToTop);
      delayedReset = window.setTimeout(resetScrollToTop, 0);
      didRunInitialReset.current = true;
    }

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
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    for (const [index, element] of enterElements.entries()) {
      element.style.setProperty("--motion-delay", `${Math.min(index * 45, 460)}ms`);
      observer.observe(element);
    }

    for (const [index, element] of revealElements.entries()) {
      element.style.setProperty("--motion-delay", `${Math.min(index * 35, 380)}ms`);
      observer.observe(element);
    }

    const sections = [
      { sectionId: "about", navId: "about-nav" },
      { sectionId: "experience", navId: "experience-nav" },
      { sectionId: "projects", navId: "projects-nav" },
    ];

    let scrollDividerTimeout: number | null = null;
    let navSuppressTimeout: number | null = null;

    const sectionNavs = sections
      .map((item) => document.getElementById(item.navId))
      .filter((item): item is HTMLElement => Boolean(item));

    const onSectionNavClick = () => {
      body.classList.add("suppress-scroll-dividers");
      body.classList.remove("show-scroll-dividers");

      if (navSuppressTimeout !== null) {
        window.clearTimeout(navSuppressTimeout);
      }

      navSuppressTimeout = window.setTimeout(() => {
        body.classList.remove("suppress-scroll-dividers");
        navSuppressTimeout = null;
      }, 750);
    };

    for (const nav of sectionNavs) {
      nav.addEventListener("click", onSectionNavClick);
    }

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

      const exploreMoreSection = document.getElementById("explore-more");
      if (exploreMoreSection) {
        const rect = exploreMoreSection.getBoundingClientRect();
        const isExploreVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isExploreVisible) {
          activeSectionId = "explore-more";
        }
      }

      for (const item of sections) {
        const nav = document.getElementById(item.navId);
        if (nav) {
          nav.classList.toggle("active", item.sectionId === activeSectionId);
        }
      }

      const topHeader = document.getElementById("top");
      const showNamecardQuote = topHeader
        ? topHeader.getBoundingClientRect().bottom <= 0
        : activeSectionId !== "about";
      body.classList.toggle("show-namecard-quote", showNamecardQuote);
      body.classList.toggle("quote-indicated", activeSectionId === "explore-more");
    };

    let scrollFrame = 0;

    const handleScroll = () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        updateActiveNav();
        scrollFrame = 0;
      });

      if (body.classList.contains("suppress-scroll-dividers")) {
        return;
      }

      body.classList.add("show-scroll-dividers");

      if (scrollDividerTimeout !== null) {
        window.clearTimeout(scrollDividerTimeout);
      }

      scrollDividerTimeout = window.setTimeout(() => {
        body.classList.remove("show-scroll-dividers");
        scrollDividerTimeout = null;
      }, 140);
    };

    updateActiveNav();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    window.addEventListener("hashchange", updateActiveNav);

    return () => {
      body.classList.remove("show-scroll-dividers", "suppress-scroll-dividers", "show-namecard-quote", "quote-indicated");
      if (delayedReset !== null) {
        window.clearTimeout(delayedReset);
      }
      if (scrollDividerTimeout !== null) {
        window.clearTimeout(scrollDividerTimeout);
      }
      if (navSuppressTimeout !== null) {
        window.clearTimeout(navSuppressTimeout);
      }
      for (const nav of sectionNavs) {
        nav.removeEventListener("click", onSectionNavClick);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveNav);
      window.removeEventListener("hashchange", updateActiveNav);
    };
  }, [pathname]);

  return null;
}
