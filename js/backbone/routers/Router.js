var app = app || {};

// This is our router/controller for our app
app.Router = Backbone.Router.extend({
  // This is a simple object of routes.  The key is the route, and the value is the action
  routes: {
    '': 'index', // root path (/)
    'posts/:slug': 'getPost',
    'posts/:id/comments/new': 'newComment' // our newComment route matches our restful rails route
  },

  // Index action: renders the AppView with the collection of test posts
  index: function() {
    // Create our main index view and give it our seed/test collection
    var posts = new app.Posts();

    // posts.fetch().done(function() {
    //   app.app_view = new app.AppView({collection: posts});
    //   // Render the view
    //   app.app_view.render();
    // });

    posts.fetch();
    app.app_view = new app.AppView({collection: posts});
    // Render the view
    app.app_view.render();
  },

  // GetPost action: renders an individual post view
  getPost: function(slug) {
    // In an effort to clean memory and destroy/unbind elements, if a view exists, destroy it before creating a new one
    if(app.post_view) {
      app.post_view.destroy();
    }
    // Get our post by slug (the "id")
    var post = new app.Post({slug: slug});

    // post.fetch().done(function() {
    //   // Create the view and set the model.
    //   var post_view = new app.PostView({model: post});
    //   // Render the view!
    //   post_view.render();
    // });

    post.fetch();
    // Create the view and set the model.
    app.post_view = new app.PostView({model: post});
    // Render the view!
    app.post_view.render();
  },

  newComment: function(post_id) {
    // In an effort to clean memory and destroy/unbind elements, if a view exists, destroy it before creating a new one
    if(app.comment_new_view) {
      app.comment_new_view.destroy();
    }
    // Create the new model and set the post_id
    var comment = new app.Comment({post_id: post_id});
    // Create the view and set the model and post_id
    app.comment_new_view = new app.CommentNewView({model: comment, post_id: post_id});
    // Render the view
    app.comment_new_view.render();
  }

});
