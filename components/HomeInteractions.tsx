'use client';

import { useEffect, useRef, useCallback } from 'react';

const POSITIONS: Record<string, string> = {
  '-2': 'far-left',
  '-1': 'left',
  '0': 'center',
  '1': 'right',
  '2': 'far-right',
};

export default function HomeInteractions() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentRef = useRef(0);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.reveal');
    let revealObserver: IntersectionObserver | null = null;

    if (revealElements.length) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('on');
            }
          });
        },
        { threshold: 0.1 }
      );

      revealElements.forEach((el) => revealObserver!.observe(el));
    }

    /* --- Parallax on Phone Image --- */
    const phoneImage = document.querySelector<HTMLElement>('.phone-image');
    let ticking = false;

    const handleScroll = () => {
      if (!ticking && phoneImage) {
        window.requestAnimationFrame(() => {
          const s = window.pageYOffset;
          phoneImage.style.transform = `translateX(-50%) translateY(${s * 0.15}px) scale(1.12)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    if (phoneImage) {
      window.addEventListener('scroll', handleScroll);
    }

    /* --- iPhone Coverflow Carousel --- */
    const showcase = document.querySelector<HTMLElement>('.phones-showcase');
    const dotsContainer = document.querySelector<HTMLElement>('.carousel-dots');
    let coverflowObserver: IntersectionObserver | null = null;
    let dots: NodeListOf<HTMLButtonElement> | null = null;
    let items: NodeListOf<HTMLElement> | null = null;
    let total = 0;

    const updatePositions = () => {
      if (!items || !dots) return;
      items.forEach((item, i) => {
        let offset = i - currentRef.current;
        if (offset > Math.floor(total / 2)) offset -= total;
        if (offset < -Math.floor(total / 2)) offset += total;
        const pos = POSITIONS[String(offset)] || 'hidden';
        item.setAttribute('data-pos', pos);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentRef.current);
      });
    };

    const goTo = (index: number) => {
      currentRef.current = ((index % total) + total) % total;
      updatePositions();
    };

    const next = () => goTo(currentRef.current + 1);
    const prev = () => goTo(currentRef.current - 1);

    const startAutoplay = () => {
      stopAutoplay();
      intervalRef.current = setInterval(next, 3500);
    };

    if (showcase && dotsContainer) {
      items = showcase.querySelectorAll<HTMLElement>('.phone-item');
      total = items.length;
      currentRef.current = 0;

      // Create dots
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dotsContainer.appendChild(dot);
      });

      dots = dotsContainer.querySelectorAll<HTMLButtonElement>('.carousel-dot');

      // Initialize positions
      updatePositions();

      // Dot clicks
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          stopAutoplay();
          goTo(i);
          startAutoplay();
        });
      });

      // Click on side phones
      items.forEach((item, i) => {
        item.addEventListener('click', () => {
          if (i !== currentRef.current) {
            stopAutoplay();
            goTo(i);
            startAutoplay();
          }
        });
      });

      // Start autoplay when visible
      coverflowObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAutoplay();
            } else {
              stopAutoplay();
            }
          });
        },
        { threshold: 0.2 }
      );
      coverflowObserver.observe(showcase);

      // Pause on hover
      showcase.addEventListener('mouseenter', stopAutoplay);
      showcase.addEventListener('mouseleave', startAutoplay);

      // Swipe support
      let touchStartX = 0;
      showcase.addEventListener(
        'touchstart',
        (e: TouchEvent) => {
          stopAutoplay();
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      showcase.addEventListener('touchend', (e: TouchEvent) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) next();
          else prev();
        }
        startAutoplay();
      });

      // Keyboard navigation
      showcase.setAttribute('tabindex', '0');
      showcase.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
          next();
          stopAutoplay();
          startAutoplay();
        }
        if (e.key === 'ArrowLeft') {
          prev();
          stopAutoplay();
          startAutoplay();
        }
      });
    }

    /* --- Mobile Tab Bar: active state tracking --- */
    const tabBar = document.querySelector<HTMLElement>('.mobile-tab-bar');
    let sectionObserver: IntersectionObserver | null = null;

    if (tabBar) {
      const tabs =
        tabBar.querySelectorAll<HTMLAnchorElement>('.tab-item[data-section]');
      const sections: { id: string; el: HTMLElement; tab: HTMLAnchorElement }[] =
        [];

      tabs.forEach((tab) => {
        const id = tab.getAttribute('data-section');
        if (id) {
          const section = document.getElementById(id);
          if (section) sections.push({ id, el: section, tab });
        }
      });

      if (sections.length) {
        sectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                tabs.forEach((t) => t.classList.remove('active'));
                const activeTab = tabBar.querySelector<HTMLElement>(
                  `[data-section="${entry.target.id}"]`
                );
                if (activeTab) activeTab.classList.add('active');
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: '-10% 0px -10% 0px',
          }
        );

        sections.forEach((s) => sectionObserver!.observe(s.el));
      }

      // Smooth scroll on tab click
      tabs.forEach((tab) => {
        tab.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const id = tab.getAttribute('data-section');
          if (id) {
            const target = document.getElementById(id);
            if (target) {
              const headerOffset = 60;
              const y =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }
        });
      });
    }

    /* --- Cleanup --- */
    return () => {
      if (revealObserver) revealObserver.disconnect();
      if (coverflowObserver) coverflowObserver.disconnect();
      if (sectionObserver) sectionObserver.disconnect();
      stopAutoplay();
      if (phoneImage) {
        window.removeEventListener('scroll', handleScroll);
      }
      // Remove dynamically created dots
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
      }
    };
  }, [stopAutoplay]);

  // This component renders nothing; it only provides client-side behavior
  return null;
}
