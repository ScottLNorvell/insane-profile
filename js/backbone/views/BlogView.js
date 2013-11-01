var app = app || {};

app.BlogView = Backbone.View.extend({
  el: $('#stage-container'),

  initialize: function() {
    
  },

  render: function() {
    var template = Handlebars.getTemplate('blog');
    this.$el.hide();
    this.$el.html(template());
    this.$el.fadeIn();
    if (app.bg_view) {
      app.bg_view.destroy()
    }
    app.bg_view = new app.BGView({bg: 'rect'});
    app.bg_view.render()
  },

  destroy: function() {
    
  }
})