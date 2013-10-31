var app = app || {};

app.BlogView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    
  },

  render: function() {
    var template = Handlebars.getTemplate('blog');
    this.$el.html(template());
  },

  destroy: function() {
    
  }
})