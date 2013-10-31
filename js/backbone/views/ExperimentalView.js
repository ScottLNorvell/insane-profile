var app = app || {};

app.ExperimentalView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    
  },

  render: function() {
    var template = Handlebars.getTemplate('experimental');
    this.$el.html(template());
  },

  destroy: function() {
    
  }
})