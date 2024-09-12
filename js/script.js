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

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".skills h2",
    start: "top 80%",
    end: "top 20%",
    scrub: false,
    markers: true,
  },
});

tl.from(
  ".skills h2",
  {
    opacity: 0,
  },
  "+=1"
)
  .from(
    ".skills h2",
    {
      x: -110,
      fontSize: "6rem",
    },
    "+=0.2"
  )
  .from(
    ".skills img",
    {
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.inOut",
    },
    "+=0.3"
  ); // 첫 번째 애니메이션 이후 0.5초 대기 후 두 번째 실행

//화면에 보이면 나타나게
gsap.from(".op1", {
  scrollTrigger: {
    trigger: ".op1",
    start: "top 60%",
    end: "top 20%",
    scrub: false,
    markers: true,
  },
  opacity: 0,
  stagger: 0.1,
  duration: 1, // 애니메이션 지속 시간 추가
  ease: "power1.inOut", // 애니메이션 속도 조절
});

/* projects 섹션 */
const container = document.querySelector(".p-container");
const sections = gsap.utils.toArray(".p-container .section");
/* const texts = gsap.utils.toArray(".anim");
const mask = document.querySelector(".mask"); */

let scrollTween = gsap.to(sections, {
  yPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".projects",
    pin: true,
    scrub: 1,
    end: "+=" + sections.length * 100 + "vh",
    markers: true,
  },
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

/* ///////////// */

const sections2 = gsap.utils.toArray(".projects section");

let scrollTween2 = gsap.to(sections2, {
  xPercent: -100 * (sections2.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".projects",
    pin: true,
    scrub: 1.5,
    start: "top top",
    end: 5000,
    snap: {
      snapTo: 1 / (sections2.length - 1),
      duration: 0.1,
      delay: 0,
      ease: "power3.inOut",
    },
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
      containerAnimation: scrollTween2,
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
      containerAnimation: scrollTween2,
      trigger: el.querySelector("img"),
      start: "top bottom",
      end: "+=50%",
      scrub: 0.5,
    },
  });

  gsap.to(el.querySelector(".description"), {
    x: 0,
    y: 0,
    scrollTrigger: {
      containerAnimation: scrollTween2,
      trigger: el.querySelector(".description"),
      start: "top bottom",
      end: "+=150",
      scrub: 0.5,
    },
  });
});
