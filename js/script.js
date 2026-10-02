/*
 * Íris — landing page
 *
 * Chrome e Edge animam as seções com CSS puro (animation-timeline: view()).
 * Este script dá o mesmo efeito de entrada no Safari e no Firefox, que ainda
 * não suportam esse recurso. Se o JavaScript falhar, o conteúdo continua visível.
 */
(function () {
    const supportsScrollTimeline = window.CSS && CSS.supports('animation-timeline: view()');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (supportsScrollTimeline || prefersReducedMotion || !('IntersectionObserver' in window)) {
        return;
    }

    document.documentElement.classList.add('js-reveal');

    // Itens de listas (.stagger) entram em sequência, um após o outro.
    document.querySelectorAll('.stagger').forEach(function (list) {
        Array.from(list.children).forEach(function (item, index) {
            item.style.transitionDelay = index * 90 + 'ms';
        });
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .stagger > *').forEach(function (el) {
        observer.observe(el);
    });
})();
