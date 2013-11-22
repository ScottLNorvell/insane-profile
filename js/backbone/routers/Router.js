var app = app || {};

// This is our router/controller for our app
app.Router = Backbone.Router.extend({
  // This is a simple object of routes.  The key is the route, and the value is the action
  routes: {
    '': 'index', // root path (/)
    'about': 'about',
    'apps': 'apps',
    'blog': 'blog',
    'experimental': 'experimental',
    'trans': 'transition'
  },

  // Index action: renders the AppView with the collection of test posts
  index: function() {

    if(app.home_view) {
      app.home_view.destroy();
    }
    $('#bg-container').show();
    // Create our main index view and give it our seed/test collection
    app.home_view = new app.HomeView();
    // Render the view
    app.home_view.render();
  },
  
  about: function() {
    if (app.about_view) {
      app.about_view.destroy()
    }

    app.about_view = new app.AboutView();
    app.about_view.render();
  },

  apps: function() {
    if (app.apps_view) {
      app.apps_view.destroy()
    }

    app.apps_view = new app.AppsView();
    app.apps_view.render();
  },

  blog: function() {
    if (app.blog_view) {
      app.blog_view.destroy()
    }

    app.blog_view = new app.BlogView();
    app.blog_view.render();
  },

  experimental: function() {
    if (app.experimental_view) {
      app.experimental_view.destroy()
    }

    app.experimental_view = new app.ExperimentalView();
    app.experimental_view.render();
  },

  // transition: function() {
  //   var tv = new app.TransView();
  //   tv.render('http://placekitten.com/1280/640')
  // }

});
