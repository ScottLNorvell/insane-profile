var app = app || {};
// var tfd, pd, pu; 


app.TransView = Backbone.View.extend({
  el: $('#trans-container'),

  initialize: function() {
    var template = Handlebars.getTemplate('trans');
    this.$el.html(template());
  },

  render: function(image_src, callback) {
    var tfd = drawings.transitionFlip;
    var img = new Image();
    
    tfd.initialize();
    
    var pd = tfd.panelDown();
    var pu;
    pd.onFinish = function() {
      console.log('pd-finish1')
      pu = tfd.panelUp();
      pu.onFinish = function() {
        console.log('pu-finish1')
        pd.reset();
        console.log('pd-reset1')
        pd.onFinish = function() {
          // fade out and destroy transition
          // trigger custom evens?
          // clean this up!
          $('#trans-container').fadeOut(500, function() {
            $(this).html('');

          });
          $('#bg-container').fadeOut(500, function() {
            $(this).html('');
          })
          callback();
        }
        pd.play();
        // setTimeout(function() {pd.play()}, 300)
      }
      $('#trans-image').html(img);
      pu.play();
    }
    
    img.onload = function() {
      pd.play(); 
    }
    img.src = image_src

  },

  destroy: function() {
    
  }
})