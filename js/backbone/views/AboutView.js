var app = app || {};

app.AboutView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    
  },

  render: function() {
    var template = Handlebars.getTemplate('about');
    this.$el.html(template());
    var tv = new app.TransView();
    tv.render('http://placekitten.com/1280/640')
  },

  destroy: function() {
    
  }
})