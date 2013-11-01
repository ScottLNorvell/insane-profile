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

    if (app.bg_view) {
      app.bg_view.destroy();
    }
    app.bg_view = new app.BGView({ bg: 'circle' })
    app.bg_view.render()
  },

  destroy: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
  }

});