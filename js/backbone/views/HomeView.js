var app = app || {};

app.HomeView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    this.$el.html('<h1>Loading your sweet content</h1>');
  },

  render: function() {
    this.$el.html('');
    drawGame();
  }
});