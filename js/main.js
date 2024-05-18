//navbar
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('.navbar').addClass('scrolled');
  } else {
    $('.navbar').removeClass('scrolled');
  }
});

//carousel
let mainPosts = document.querySelectorAll(".main-post");
let posts = document.querySelectorAll(".post");

let i = 0;
let postIndex = 0;
let currentPost = posts[postIndex];
let currentMainPost = mainPosts[postIndex];

let progressInterval = setInterval(progress, 100); // 180

function progress() {
  if (i === 100) {
    i = -5;
    // reset progress bar
    currentPost.querySelector(".progress-bar__fill").style.width = 0;
    document.querySelector(
      ".progress-bar--primary .progress-bar__fill"
    ).style.width = 0;
    currentPost.classList.remove("post--active");

    postIndex++;

    currentMainPost.classList.add("main-post--not-active");
    currentMainPost.classList.remove("main-post--active");

    // reset postIndex to loop over the slides again
    if (postIndex === posts.length) {
      postIndex = 0;
    }

    currentPost = posts[postIndex];
    currentMainPost = mainPosts[postIndex];
  } else {
    i++;
    currentPost.querySelector(".progress-bar__fill").style.width = `${i}%`;
    document.querySelector(
      ".progress-bar--primary .progress-bar__fill"
    ).style.width = `${i}%`;
    currentPost.classList.add("post--active");

    currentMainPost.classList.add("main-post--active");
    currentMainPost.classList.remove("main-post--not-active");
  }
}







// Ecommerce Slider

(function () {
  'use strict';

  class Slider {
    constructor(id, mediaQueries) {
      this.slider = document.querySelector(`#${id}`);
      this.sliderList = this.slider.querySelector('.slider-list');
      this.sliderItems = this.slider.querySelectorAll('.slider-item');
      this.sliderNext = this.slider.querySelector('.slider-arrow-next');
      this.sliderPrev = this.slider.querySelector('.slider-arrow-prev');

      this.mediaQueryList = [window.matchMedia(`screen and (max-width:${mediaQueries[0] - 1}px)`)];
      mediaQueries.forEach((mediaQuery) => {
        this.mediaQueryList.push(window.matchMedia(`screen and (min-width:${mediaQuery}px)`));
      });

      this.numberOfVisibleItems = null;
      this.currentItemIndex = null;
      this.sliderItemsLength = this.sliderItems.length;
      this.mediaQueryLength = this.mediaQueryList.length;

      this.mediaQueryList.forEach((mediaQuery) => {
        mediaQuery.addEventListener('change', () => {
          this.run();
        });
      });

      this.sliderNext.addEventListener('click', () => {
        if (this.currentItemIndex < this.sliderItemsLength - this.numberOfVisibleItems) {
          this.currentItemIndex++;
          this.shiftSlides();
        }
      });

      this.sliderPrev.addEventListener('click', () => {
        if (this.currentItemIndex > 0) {
          this.currentItemIndex--;
          this.shiftSlides();
        }
      });

      this.sliderItems.forEach((item) => {
        const elements = item.querySelectorAll('a');
        elements.forEach((element) => {
          element.tabIndex = '-1';
        });
      });

      this.sliderPrev.addEventListener('focusin', () => {
        this.slider.scrollIntoView();
      });

      this.sliderNext.addEventListener('focusin', () => {
        this.slider.scrollIntoView();
      });
    }

    run() {
      let index = this.mediaQueryLength - 1;
      while (index >= 0) {
        if (this.mediaQueryList[index].matches) {
          this.numberOfVisibleItems = index + 1;
          this.currentItemIndex = 0;
          this.sliderList.style.transform = 'translateX(0%)';
          this.sliderList.style.width = `calc(${(100 / this.numberOfVisibleItems) * this.sliderItemsLength}% + ${(this.sliderItemsLength / this.numberOfVisibleItems) * 16}px)`;
          this.sliderItems.forEach((item) => {
            item.style.width = `${100 / this.numberOfVisibleItems}%`;
          });
          break;
        }
        index--;
      }
    }

    shiftSlides() {
      this.sliderList.style.transform = `translateX(-${(100 / this.sliderItemsLength) * this.currentItemIndex}%)`;
    }
  }

  new Slider('new-products-1', [576, 992]).run();
  new Slider('new-products-2', [576, 992]).run();
  new Slider('new-products-3', [576, 992]).run();
  new Slider('new-products-4', [576, 992]).run();
  new Slider('new-products-5', [576, 992]).run();
})();
