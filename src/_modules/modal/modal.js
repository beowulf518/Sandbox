'use strict';
import $ from 'jquery';

$(() => {
  let $modal = $('.modal');
  let $modalTrigger = $('.hero-right_cta');
  let $modalTriggerNav = $('.nav-list_cta');
  let $modalClose = $('.modal .close');
  let modalWrapper = document.querySelector(".modal-wrapper");
  let body = document.querySelector("body");

  $modalClose.on('click', function() {
    modalWrapper.classList.remove("modal-show");
    body.classList.remove("no-scroll");
  });
  
  $modalTriggerNav.on('click', function(e) {
    e.preventDefault();
    modalWrapper.classList.add("modal-show");
    body.classList.add("no-scroll");
  });
  
  $modalTrigger.on('click', function(e) {
    e.preventDefault();
    modalWrapper.classList.add("modal-show");
    body.classList.add("no-scroll");
  });

  // Close modal when clicking outside
  modalWrapper.addEventListener("click", (e) => {
    if (e.target == modalWrapper){
      modalWrapper.classList.remove("modal-show");
      body.classList.remove("no-scroll");
    }
  });
});