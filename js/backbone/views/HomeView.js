var app = app || {};

app.HomeView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    this.$el.html('<h1>Loading your sweet content</h1>');
  },

  render: function() {
    this.$el.html('');
    // Here we'll load my face and onload, we'll draw Home!
    drawings.drawHome();

    drawings.makeCircleBG();
    // drawings.makeRectBg();
    $('#scene').parallax();
  },

  destroy: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
  }
  
});