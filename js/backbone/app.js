
// This is included at the beginning of the backbone files to ensure we have an app object as each file is loaded and minimize potential errors
var app = app || {};

$(function() {


  // We need a way to format the date in our blog templates.
  Handlebars.registerHelper('dateFormat', function(context, block) {
    var date = new Date(context);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  });


  // create the app's router from the Router construct
  app.router = new app.Router();

  // start our backbone history
  Backbone.history.start({pushState: Modernizr.history});

  // Shows how you can capture the event when a URL change occurs
  Backbone.history.on('route', function() {
    // This is how to retrieve the request URI / fragment
    var fragment = Backbone.history.getFragment();
    console.log(fragment);
  })
});
