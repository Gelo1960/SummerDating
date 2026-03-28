/* ================================================
   SUMMER DATING — Scripts
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('on');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }

    /* --- Parallax on Phone only (homepage) --- */
    const phoneImage = document.querySelector('.phone-image');

    if (phoneImage) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const s = window.pageYOffset;
                    phoneImage.style.transform = `translateX(-50%) translateY(${s * 0.15}px) scale(1.12)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* --- iPhone Coverflow Carousel --- */
    const showcase = document.querySelector('.phones-showcase');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (showcase && dotsContainer) {
        const items = showcase.querySelectorAll('.phone-item');
        const total = items.length;
        let current = 0;
        let interval;

        /* Position map: offset from center → CSS data-pos */
        const positions = {
            '-2': 'far-left',
            '-1': 'left',
            '0': 'center',
            '1': 'right',
            '2': 'far-right'
        };

        /* Create dots */
        items.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function updatePositions() {
            items.forEach((item, i) => {
                let offset = i - current;

                /* Wrap around for circular effect */
                if (offset > Math.floor(total / 2)) offset -= total;
                if (offset < -Math.floor(total / 2)) offset += total;

                const pos = positions[String(offset)] || 'hidden';
                item.setAttribute('data-pos', pos);
            });

            /* Update dots */
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
        }

        function goTo(index) {
            current = ((index % total) + total) % total;
            updatePositions();
        }

        function next() {
            goTo(current + 1);
        }

        function prev() {
            goTo(current - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            interval = setInterval(next, 3500);
        }

        function stopAutoplay() {
            clearInterval(interval);
        }

        /* Initialize positions */
        updatePositions();

        /* Dot clicks */
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                goTo(i);
                startAutoplay();
            });
        });

        /* Click on side phones to navigate */
        items.forEach((item, i) => {
            item.addEventListener('click', () => {
                if (i !== current) {
                    stopAutoplay();
                    goTo(i);
                    startAutoplay();
                }
            });
        });

        /* Start autoplay when visible */
        const coverflowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            });
        }, { threshold: 0.2 });

        coverflowObserver.observe(showcase);

        /* Pause on hover */
        showcase.addEventListener('mouseenter', stopAutoplay);
        showcase.addEventListener('mouseleave', startAutoplay);

        /* Swipe support */
        let touchStartX = 0;
        showcase.addEventListener('touchstart', (e) => {
            stopAutoplay();
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        showcase.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) next();
                else prev();
            }
            startAutoplay();
        });

        /* Keyboard navigation */
        showcase.setAttribute('tabindex', '0');
        showcase.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { next(); stopAutoplay(); startAutoplay(); }
            if (e.key === 'ArrowLeft') { prev(); stopAutoplay(); startAutoplay(); }
        });
    }

    /* --- Mobile Tab Bar: active state tracking --- */
    const tabBar = document.querySelector('.mobile-tab-bar');
    if (tabBar) {
        const tabs = tabBar.querySelectorAll('.tab-item[data-section]');
        const sections = [];

        tabs.forEach(tab => {
            const id = tab.getAttribute('data-section');
            const section = document.getElementById(id);
            if (section) sections.push({ id, el: section, tab });
        });

        if (sections.length) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        tabs.forEach(t => t.classList.remove('active'));
                        const activeTab = tabBar.querySelector(`[data-section="${entry.target.id}"]`);
                        if (activeTab) activeTab.classList.add('active');
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-10% 0px -10% 0px'
            });

            sections.forEach(s => sectionObserver.observe(s.el));
        }

        /* Smooth scroll on tab click */
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const id = tab.getAttribute('data-section');
                const target = document.getElementById(id);
                if (target) {
                    const headerOffset = 60;
                    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            });
        });
    }

});
