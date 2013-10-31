var app = app || {};

app.AppsView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    
  },

  render: function() {
    var template = Handlebars.getTemplate('apps');
    this.$el.html(template());
  },

  destroy: function() {
    
  }
})