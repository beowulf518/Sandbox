'use strict';

export default class Nav {
  constructor() {
    toggle.addEventListener('click', () => {
      document.querySelector('.header').classList.toggle('header_show');
      document.querySelector('.nav-list').classList.toggle('nav-list_show');
      document.querySelector('.nav-button_open').classList.toggle('nav-button_hide');
      document.querySelector('.nav-button_close').classList.toggle('nav-button_hide');
    });
  }
}
