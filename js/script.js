if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

const word = new SplitType(".word");

gsap.from(".word .char", 1.5, {
  delay: 1,
  y: 700,
  stagger: {
    amount: 0.5,
  },
  ease: "power4.inOut",
});

gsap.to(".bar", 1.5, {
  delay: 0.5,
  height: 0,
  stagger: {
    amount: 0.5,
  },
  ease: "power4.inOut",
});

gsap.to(".overlay", 1.5, {
  delay: 0.5,
  height: 0,
  stagger: {
    amount: 0.5,
  },
  ease: "power4.inOut",
});

gsap.from(".skills img", {
  scrollTrigger: {
    trigger: ".skills",
    pin: true,
    start: "top",
    end: "bottom",
    scrub: true,
    markers: true,
  },
  opacity: 0.1,
  stagger: 0.1,
});

const aboutText = new SplitType(".about p");

gsap.from(aboutText.chars, {
  scrollTrigger: {
    trigger: ".about",
    pin: true,
    pinSpacing: false,
    start: "top",
    end: "bottom",
    scrub: true,
    markers: true,
  },
  opacity: 0.1,
  duration: 0,
  stagger: 0.1,
});

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const pSections = gsap.utils.toArray(".projects section");

let pScrollTween = gsap.to(pSections, {
  xPercent: -100 * (pSections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".projects",
    pin: true,
    scrub: 1.5,
    start: "top top",
    end: 7000,
  },
});

gsap.to(".logo", {
  fontSize: "2.5rem",
  top: "4rem",
  scrollTrigger: {
    trigger: ".logo",
    start: "top top",
    end: 1500,
    scrub: 0.5,
  },
});

document.querySelectorAll(".project").forEach((el) => {
  gsap.to(el.querySelector(".title"), {
    y: 0,
    ease: "none",
    scrollTrigger: {
      containerAnimation: pScrollTween,
      trigger: el.querySelector(".title"),
      start: "top bottom",
      end: "+=10%",
      scrub: 0.5,
    },
  });

  gsap.to(el.querySelector("img"), {
    y: 0,
    ease: "none",
    scrollTrigger: {
      containerAnimation: pScrollTween,
      trigger: el.querySelector("img"),
      start: "top bottom",
      end: "+=50%",
      scrub: 0.5,
    },
  });
});
