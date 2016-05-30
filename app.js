/*!
 * Pecha Kucha v1.0
 * http://weedygarden.com/
 *
 * Copyright 2011, Erik Runyon
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

(function() {
  var $counter = $('#counter'),
      countInit = 20,
      totalSlides = 20,
      slide = 1,
      count = countInit,
      t,
      running = false
  ;

  var Slides = {

    init: function() {
      Slides.addNavigation();
      Slides.pause();
      Slides.changeSlide();
    },

    nextSlide: function() {
      if(slide === totalSlides) {
        $counter.html('Finished');
        clearTimeout(t);
        running = false;
      } else {
        $('#slide'+slide).fadeOut();
        ++slide;
        $('#slide'+slide).fadeIn();

        $('#footer ul a').removeClass();
        $('#p'+slide).addClass('active');
      }
    },

    doCountdown: function() {
      if(running) {
        t = setTimeout(function(){
          $counter.html(count);
          --count;
          if(count === 0) {
            count = countInit;
            Slides.nextSlide();
          }
          Slides.doCountdown();
        }, 1000);
      }
    },

    pause: function() {
      $('#pause').click(function(e){
        e.preventDefault();
        Slides.togglePlay();
        var $this = $(this);
        ($this.html() == 'Pause') ? $this.html('Play') : $this.html('Pause');
      });
    },

    togglePlay: function() {
      if(running === true) {
        clearTimeout(t);
        running = false;
      } else {
        running = true;
        Slides.doCountdown();
      }
    },

    addNavigation: function() {
      var links = '';
      for(i = 1; i <= totalSlides; i++) {
        var active = (i === 1) ? 'active' : '';
        links += "<li><a href=\"#slide"+ i +"\" id=\"p"+ i +"\" class=\""+ active +"\">"+ i +"</a></li>";
      }
      $('#slidenav').html(links);
    },

    changeSlide: function() {
      $('#slidenav a').live('click', function(e){
        e.preventDefault();
        var $this = $(this);

        // stop the timer
        clearTimeout(t);
        running = false;
        $('#pause').html('Play');

        // Hide all but the selected slide
        $('.slide:visible').fadeOut();
        $('#footer ul a').removeClass();
        slide = $this.html();
        $($this.attr('href')).fadeIn();
        $this.addClass('active');
      });
    }

  };
  Slides.init();

})();
