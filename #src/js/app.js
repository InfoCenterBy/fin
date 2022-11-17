let buttonMenu = document.querySelector(".button-menu");
if (buttonMenu) {
  buttonMenu.addEventListener("click", function (e) {
    if (bodyLockStatus) {
      bodyLockToggle();
      document.documentElement.classList.toggle("menu-open");
    }
  });
};

const buttonSubMenu = document.querySelectorAll('.button-sub-menu');
const buttonBackMenu = document.querySelectorAll('.submenu-header__back');

document.addEventListener("click", documentActions);
function documentActions(e) {
  const targetElement = e.target;
  if (targetElement.closest('[data-parent]') || targetElement.querySelector('i')) {
    const subMenuId = targetElement.dataset.parent || targetElement.parentElement.dataset.parent;
    const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
    if (subMenu) {
      document.documentElement.classList.toggle('sub-menu-open');
      subMenu.classList.toggle('_sub-menu-open');
    }
    e.preventDefault();
  }
  if (targetElement.closest('.submenu-header__back') || targetElement.closest('.button-menu') || targetElement.closest('.header__overflow')) {
    document.documentElement.classList.remove('sub-menu-open');
    document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
    document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
    e.preventDefault();
  }
  if (targetElement.closest('.header__overflow')) {
    if (bodyLockStatus) {
      bodyLockToggle();
      document.documentElement.classList.toggle("menu-open");
    }
  }
}

let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
}
let bodyUnlock = (delay = 500) => {
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    setTimeout(() => {
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove("lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}
let bodyLock = (delay = 500) => {
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    document.documentElement.classList.add("lock");

    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}


const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Профессиональные консультации", "Ведение бухгалтерии", "Расчет заработной платы"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});