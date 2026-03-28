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

    /* --- Horizontal drag scroll for cards --- */
    document.querySelectorAll('.steps-grid, .features-grid').forEach(track => {
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = '';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = '';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    });

    /* --- iPhone Carousel: auto-sliding screenshots --- */
    const carousel = document.querySelector('.phone-carousel');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (carousel && dotsContainer) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let current = 0;
        let interval;

        /* Create dots */
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        let isAnimating = false;

        function slideTo(index, direction) {
            if (isAnimating || index === current) return;
            isAnimating = true;

            const prev = current;
            const exitClass = direction === 'left' ? 'exit-left' : 'exit-right';
            const enterClass = direction === 'left' ? 'enter-right' : 'enter-left';

            /* Position new slide off-screen */
            slides[index].classList.remove('active', 'exit-left', 'exit-right');
            slides[index].classList.add(enterClass);

            /* Force reflow so the browser registers the start position */
            void slides[index].offsetWidth;

            /* Remove enter class and add active — triggers the slide-in */
            slides[index].classList.remove(enterClass);
            slides[index].classList.add('active');

            /* Slide out current */
            slides[prev].classList.remove('active');
            slides[prev].classList.add(exitClass);

            /* Update dots */
            dots[prev].classList.remove('active');
            dots[index].classList.add('active');

            current = index;

            /* Clean up after transition */
            setTimeout(() => {
                slides[prev].classList.remove(exitClass);
                isAnimating = false;
            }, 580);
        }

        function next() {
            slideTo((current + 1) % slides.length, 'left');
        }

        function prev() {
            slideTo((current - 1 + slides.length) % slides.length, 'right');
        }

        function startAutoplay() {
            interval = setInterval(next, 3000);
        }

        function stopAutoplay() {
            clearInterval(interval);
        }

        /* Dot clicks */
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                slideTo(i, i > current ? 'left' : 'right');
                startAutoplay();
            });
        });

        /* Start autoplay when visible */
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            });
        }, { threshold: 0.3 });

        carouselObserver.observe(carousel);

        /* Pause on hover/touch */
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        /* Swipe support on center phone */
        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => {
            stopAutoplay();
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    next();
                } else {
                    prev();
                }
            }
            startAutoplay();
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
