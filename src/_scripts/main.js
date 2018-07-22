// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import Nav from '../_modules/nav/nav';
import Person from '../_modules/person/person';
import '../_modules/modal/modal';
import Swiper from 'swiper';
require('../_modules/header/header');
import ScrollReveal from 'scrollreveal';



$(() => {

  var videoplay = document.getElementById("hero-video-core");
     
    var interval= setInterval(function () { 
        
        doALoadOfStuff();
         videoplay.play();
        //videoplay.play();

      }, 10);

      

  var swiper1 = new Swiper('.swiper-container1', {
    spaceBetween: 36,
    slidesPerView: 'auto',
    observer: true,
    observeParents: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.button1-next',
      prevEl: '.button1-prev'
    },
    pagination: {
      el: '.pag1',
    }
  });

  var swiper2 = new Swiper('.swiper-container2', {
    spaceBetween: 36,
    slidesPerView: 'auto',
    observer: true,
    observeParents: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.button2-next',
      prevEl: '.button2-prev'
    },
    pagination: {
      el: '.pag2',
    }
  });

  var swiper3 = new Swiper('.swiper-container3', {
    spaceBetween: 36,
    slidesPerView: 'auto',
    observer: true,
    observeParents: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.button3-next',
      prevEl: '.button3-prev'
    },
    pagination: {
      el: '.pag3',
    }
  });

  $('.ga-event').on('click', function(){
    var elem = $(this);
    ga('send', 'event', elem.data('gacategory') , elem.data('gaactions'), elem.data('galabel'));
  });
  


  // Faqs page accordion
  let $item = $('.faqs-accordion-item');

  $item.on('click', function() {
    $(this).toggleClass('active');
    $(this).find('.toggle').toggleClass('active');
  });


  // Not finished
  //*var ScrollReveal = require('scrollreveal');

  new Nav();
  new Person();

  const options = {
      duration : 400,
      scale    : 1,
      opacity  : 0.5,
      distance : '80px',
      easing   : 'ease-out'
  }
  // Display video
  $('.experience-zone-hover').on('click', function(){
    var modal = document.getElementById('experienceModal');
    modal.style.display = "flex";
  });

  $('.closebtn').on('click', function(){
    var modal = document.getElementById('experienceModal');
    modal.style.display = "none";
  });

  $(window).on('click', function(){
    var modal = document.getElementById('experienceModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
  });
  
  

  // Add the .animate class to any element you want to animate on scroll
  window.sr = ScrollReveal();
  sr.reveal('.animate', options);


 ///////Count down///////
  var target_date = new Date('July 29, 2018 00:00:00').getTime();
  var current_date = new Date().getTime();
  console.log(target_date);
   // set the countdown date
  var days, hours, minutes, seconds; // variables for time units

  var countdown = document.getElementById("hero-tiles"); // get tag element

  getCountdown();

  var interval2 = setInterval(function () { getCountdown(); }, 1000);

  function getCountdown(){

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    days = pad( parseInt(seconds_left / 86400) );
    seconds_left = seconds_left % 86400;
       
    hours = pad( parseInt(seconds_left / 3600) );
    seconds_left = seconds_left % 3600;
        
    minutes = pad( parseInt(seconds_left / 60) );
    seconds = pad( parseInt( seconds_left % 60 ) );

    // format countdown string + set tag value
    countdown.innerHTML = "<span class='hero-span'>" + days + "</span><span class = 'hero-span'>" + hours + "</span><span class = 'hero-span'>" + minutes + "</span><span class = 'hero-span'>" + seconds + "</span>"; 
  }

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }
  ///////Count down Finished///////


  //countupdiv = document.getElementById("count_up_div");
  var element_position = $('#count_up_div').offset().top;

  var screen_height = $(window).height();
  var activation_offset = 0.5;//determines how far up the the page the element needs to be before triggering the function
  var activation_point = element_position - (screen_height * activation_offset);
  var max_scroll_height = $('body').height() - screen_height - 5;//-5 for a little bit of buffer

  //Does something when user scrolls to it OR
  //Does it when user has reached the bottom of the page and hasn't triggered the function yet
  var isScrolled = 0;
  $(window).on('scroll', function() {
      var y_scroll_pos = window.pageYOffset;

      var element_in_view = y_scroll_pos > activation_point;
      var has_reached_bottom_of_page = max_scroll_height <= y_scroll_pos && !element_in_view;

      if(element_in_view || has_reached_bottom_of_page) {
        if(isScrolled==0)
          scrollCount();
      }
  });
  function scrollCount(){
    isScrolled = 1;
    var countYears = document.getElementById("count_years");
    var countWorlds = document.getElementById("count_worlds");
    var countPlayers = document.getElementById("count_players");
    var countDownloads = document.getElementById("count_downloads");
    var totalYears = 0;
    var totalWorlds = 0;
    var totalPlayers = 0;
    var totalDownloads = 0;
    
    var yeartimer = setInterval(setYearTime, 100);
    var worldtimer = setInterval(setWorldTime,10);
    var playertimer = setInterval(setPlayerTime,10);
    var downloadtimer = setInterval(setDownloadTime,1);

    function setYearTime() {
      totalYears+=1;
      //6 Years of Success
      //40,000,000 downloads 
      //1,200,000 monthly players 
      //100,000 new worlds each day!
      countYears.innerHTML = pad(formatStr(totalYears));
      if(totalYears>=6){
        clearTimeout(yeartimer);
        countYears.innerHTML = pad("6");
      }
    }
    function setWorldTime() {
      totalWorlds+=999;
      countWorlds.innerHTML = pad(formatStr(totalWorlds));
      if(totalWorlds >= 100000){
        clearTimeout(worldtimer);
        countWorlds.innerHTML = pad("100,000");
      }
    }
    function setPlayerTime() {
      totalPlayers+=9999;
      countPlayers.innerHTML = pad(formatStr(totalPlayers));
      if(totalPlayers >= 1200000){
        clearTimeout(playertimer);
        countPlayers.innerHTML = pad("1,200,000");
      }
    }
    function setDownloadTime() {
      totalDownloads+=99999;
      countDownloads.innerHTML = pad(formatStr(totalDownloads));
      if(totalDownloads >= 40000000){
        clearTimeout(downloadtimer);
        countDownloads.innerHTML = pad("40,000,000");
      }
    }
  }


  function formatStr(val){
      var str = "";
      var count = 1;
      do { 
        if(count == 1){
          str +=val%1000;
        }else{
          str = val%1000+","+str;
        }
        val=  Math.floor(val/1000);
        count = count+1;
      }
      while(val>1);

      return str;
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return  valString;
    } else {
      return valString;
    }
  }

  window.onresize = doALoadOfStuff;

  function doALoadOfStuff() {
      //do a load r stuff
     
    var $wrapper = $(".hero-video");
    var $video = $(".hero-video-core");
    var video = $video[0];

    // Get a native video size
    var videoHeight = video.videoHeight;
    var videoWidth = video.videoWidth;

    // Get a wrapper size
    var wrapperHeight = $wrapper.height();
    var wrapperWidth = $wrapper.width();

    if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
      $video.css({

        // +2 pixels to prevent an empty space after transformation
        width: wrapperWidth + 2,
        height: 'auto'
      });
    } else {
      $video.css({
        width: 'auto',

        // +2 pixels to prevent an empty space after transformation
        height: wrapperHeight + 2
      });
    }
  }




   

    
  



});
