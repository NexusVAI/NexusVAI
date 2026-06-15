  document.addEventListener("DOMContentLoaded", function() {
    //---- Animations ----
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const containerMargin = window.matchMedia('(max-width: 479px)').matches ? '2rem' : '4rem';
    //const sectionStart = window.matchMedia('(max-width: 479px)').matches ? 'top 40%' : 'top 70%';

    if (!prefersReducedMotion) {

      const section = document.querySelector('[data-scroll="section"]');
      const bg = section.querySelector('[data-scroll="bg"]');
      const container = section.querySelector('[data-scroll="container"]');
      const titleWrap = section.querySelector('[data-scroll="title-wrap"]');
      const title = section.querySelector('[data-scroll="title"]');
      const subtitle = section.querySelector('[data-scroll="subtitle"]');
      const button = section.querySelector('[data-scroll="button"]');
      const embed = section.querySelector('[data-scroll="embed"]');

      // bg + container
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 30%',
          end: 'bottom 70%',
          markers: false,
          scrub: 0.8
        }
      })
        .to(bg, {
        maxWidth: '100%',
        marginTop: 0,
        marginBottom: 0,
        borderRadius: '0px',
        duration: 1.25,
        ease: 'power2.out'
      }, 0)
        .to(container, {
        marginTop: containerMargin,
        marginBottom: containerMargin,
        duration: 1.25,
        ease: 'power2.out'
      }, 0.05);

      // title, subtitle, button
      gsap.timeline({
        scrollTrigger: {
          trigger: titleWrap,
          start: 'top 80%',
          end: 'bottom top',
          toggleActions: 'play none none reverse'
        }
      })
        .to(title, {
        opacity: 1,
        y: '0%',
        duration: 0.6,
        ease: 'power2.out'
      }, 0.5)
        .to(embed, {
        opacity: 1,
        duration: 2,
        ease: 'power2.out'
      }, 0.5)
        .to(subtitle, {
        opacity: 1,
        y: '0%',
        duration: 0.9,
        ease: 'power2.out'
      }, 0.6)
        .to(button, {
        opacity: 1,
        y: '0%',
        duration: 1.3,
        ease: 'power2.out'
      }, 0.75);
    }
  });