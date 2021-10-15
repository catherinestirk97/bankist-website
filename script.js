'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++){
//   btnsOpenModal[i].addEventListener('click', openModal);
// }

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML = "We use cookies for improved functionality and analytics <button class='btn btn--close-cookie'> Got it! </button>";
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
})

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//SCROLL TO SECTION ONE FEATURE

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  //current position + current scroll
  const s1coordinates = section1.getBoundingClientRect();
  // window.scrollTo(s1coordinates.left + window.pageXOffset, s1coordinates.top + window.pageYOffset);

  window.scrollTo({
    left: s1coordinates.left + window.pageXOffset,
    top:s1coordinates.top + window.pageYOffset, 
    behavior: 'smooth'
  });
});

//easy way to do this is also:
//section1.scrollIntoView({behaviour:'smooth});

//tabbed component 
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t=>t.addEventListener('click', ()=> console.log('TAB')));

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  //guard clause - if nothing is clicked, return function 
  if(!clicked) return;

  //select tab, push all other tabs down
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //remove active from tabcontent 
  tabsContent.forEach(content => content.classList.remove('operations__content--active'))

  //activate content area 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//menu fade animation 
const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }

}

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function(e){
  handleHover(e, 1);
});