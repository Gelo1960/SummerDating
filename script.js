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

    /* --- Screenshots & cards horizontal drag scroll --- */
    document.querySelectorAll('.screenshots-track, .steps-grid, .features-grid').forEach(track => {
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
