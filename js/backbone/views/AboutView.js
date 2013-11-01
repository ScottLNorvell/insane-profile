var app = app || {};

app.AboutView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    
  },

  render: function() {
    var template = Handlebars.getTemplate('about');
    this.$el.html(template());

    // var $elem = this.$el;
    // var tv = new app.TransView();
    // tv.render('images/me-sepia.jpg', function() {
    //   var template = Handlebars.getTemplate('about');
    //   $elem.html(template());
    // })
  },

  destroy: function() {
    
  }
})