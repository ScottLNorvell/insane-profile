var app = app || {}

app.BGView = Backbone.View.extend({
  el: $('#bg-container'),

  initialize: function() {
    var template = Handlebars.getTemplate('parallax');
    this.$el.html(template());
  },

  render: function() {
    if (this.options.bg == 'circle') {
      drawings.makeCircleBG();
    } else {
      drawings.makeRectBG();
    }

    $('#scene').parallax();
    this.$el.fadeIn('slow');
  },

  destroy: function() {
    $('#scene').parallax('disable');
    this.$el.unbind().hide().html('');
  },

  hide: function() {
    this.$el.fadeOut('normal');
  }
})