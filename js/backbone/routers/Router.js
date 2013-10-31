var app = app || {};

// This is our router/controller for our app
app.Router = Backbone.Router.extend({
  // This is a simple object of routes.  The key is the route, and the value is the action
  routes: {
    '': 'index', // root path (/)
    'about': 'about',
    'apps': 'apps',
    'blog': 'blog',
    'experimental': 'experimental'
  },

  // Index action: renders the AppView with the collection of test posts
  index: function() {

    if(app.home_view) {
      app.home_view.destroy();
    }
    // Create our main index view and give it our seed/test collection
    app.home_view = new app.HomeView();
    // Render the view
    app.home_view.render();
  },
  
  about: function() {
    console.log('about!')
    // 
  },

  apps: function() {
    console.log('apps!')
  },

  blog: function() {
    console.log('blog!')
  },

  experimental: function() {
    console.log('experimental!')
  }

});
