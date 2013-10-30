var app = app || {};

// This is our router/controller for our app
app.Router = Backbone.Router.extend({
  // This is a simple object of routes.  The key is the route, and the value is the action
  routes: {
    '': 'index', // root path (/)
  },

  // Index action: renders the AppView with the collection of test posts
  index: function() {
    // Create our main index view and give it our seed/test collection
    
    app.app_view = new app.AppView();
    // Render the view
    app.app_view.render();
  }

});
