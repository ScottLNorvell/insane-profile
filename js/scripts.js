// var me, layer, stage;
// $(function() {
  var HEIGHT = window.innerHeight;
  var WIDTH = window.innerWidth;

  var stage = new Kinetic.Stage({
    container: 'container',
    width: WIDTH,
    height: HEIGHT
  });

  var layer = new Kinetic.Layer();

  getCenter = function(shape) {
    return {
      x: shape.getX() + shape.getWidth()/2,
      y: shape.getY() + shape.getHeight()/2
    }

  }

  getCorners = function(shape) {
    var pos = shape.getAbsolutePosition();
    var H = shape.getHeight();
    var W = shape.getWidth();

    return {
      ul: pos,
      ur: {
        x: pos.x + W,
        y: pos.y
      },
      ll: {
        x: pos.x,
        y: pos.y + H
      },
      lr: {
        x: pos.x + W,
        y: pos.y + H
      }
    }
  }

  // menu text globals
  var contents = {
    ul: 'About',
    ur: 'Apps',
    ll: 'Blog',
    lr: 'Experimental!'
  };

  var font = 'Helvetica';
  var padding = 15;
  var fontsize = 50;
  var fontcolor = 'blue';

  var texts = {
    // menu texts
    ul: new Kinetic.Text({
      x: padding,
      y: padding,
      text: contents.ul,
      fontSize: fontsize,
      fontFamily: font,
      fill: fontcolor
    }),

    ll: new Kinetic.Text({
      x: padding,
      y: HEIGHT - padding - fontsize,
      text: contents.ll,
      fontSize: fontsize,
      fontFamily: font,
      fill: fontcolor
    }),

    ur: new Kinetic.Text({
      x: WIDTH - padding,
      y: padding,
      text: contents.ur,
      fontSize: fontsize,
      fontFamily: font,
      fill: fontcolor
    }),

    lr: new Kinetic.Text({
      x: WIDTH - padding,
      y: HEIGHT - padding - fontsize,
      text: contents.lr,
      fontSize: fontsize,
      fontFamily: font,
      fill: fontcolor
    })
  }
  texts.ur.setX(WIDTH - texts.ur.getWidth() - padding);
  texts.lr.setX(WIDTH - texts.lr.getWidth() - padding);

  var meGroup = new Kinetic.Group({
    draggable: true
  });

  var textGroup = new Kinetic.Group();

  var me = new Kinetic.Rect({
    x: WIDTH/2 - 50,
    y: HEIGHT/2 - 50,
    width: 100,
    height: 100,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4//,
    // draggable: true
  });

  var lassos = {
    ul: new Kinetic.Rect({
      x: WIDTH/2 - 50,
      y: HEIGHT/2 - 50,
      width: 0,
      height: 0,
      // fill: 'red',
      stroke: 'black',
      strokeWidth: 5,
      cornerRadius: 5
    }),

    ur: new Kinetic.Rect({
      x: WIDTH/2 + 50,
      y: HEIGHT/2 - 50,
      width: 0,
      height: 0,
      // fill: 'blue',
      stroke: 'black',
      strokeWidth: 5,
      cornerRadius: 5
    }),

    ll: new Kinetic.Rect({
      x: WIDTH/2 - 50,
      y: HEIGHT/2 + 50,
      width: 0,
      height: 0,
      // fill: 'yellow',
      stroke: 'black',
      strokeWidth: 5,
      cornerRadius: 5
    }),

    lr: new Kinetic.Rect({
      x: WIDTH/2 + 50,
      y: HEIGHT/2 + 50,
      width: 0,
      height: 0,
      // fill: 'orange',
      stroke: 'black',
      strokeWidth: 5,
      cornerRadius: 5
    })
  }

  
  
  meGroup.add(me);

  $.each(lassos, function(k, v) {
    meGroup.add(v);
  });

  // add the shape to the layer
  layer.add(meGroup);

  $.each(texts, function(k, v) {
    textGroup.add(v)
  });

  layer.add(textGroup)

  // add the layer to the stage
  stage.add(layer);

  var tweens = {
    
    ul: new Kinetic.Tween({
      node: lassos.ul,
      x: WIDTH/2 - 50 - texts.ul.getWidth() - padding,
      y: HEIGHT/2 - 50 - texts.ul.getHeight() - padding,
      width: texts.ul.getWidth() + padding,
      height: texts.ul.getHeight() + padding,

      duration: .1,
      easing: Kinetic.Easings.StrongEaseOut
    }), 

    ur: new Kinetic.Tween({
      node: lassos.ur,
      x: WIDTH/2 + 50,
      y: HEIGHT/2 - 50 - texts.ur.getHeight() - padding,
      width: texts.ur.getWidth() + padding,
      height: texts.ur.getHeight() + padding, 
      duration: .1,
      easing: Kinetic.Easings.StrongEaseOut
    }), 

    ll: new Kinetic.Tween({
      node: lassos.ll,
      x: WIDTH/2 - 50 - texts.ll.getWidth() - padding,
      width: texts.ll.getWidth() + padding,
      height: texts.ll.getHeight() + padding, 
      duration: .1,
      easing: Kinetic.Easings.StrongEaseOut
    }),   

    lr: new Kinetic.Tween({
      node: lassos.lr,
      width: texts.lr.getWidth() + padding,
      height: texts.lr.getHeight() + padding, 
      duration: .1,
      easing: Kinetic.Easings.StrongEaseOut
    }), 
  }

  
  var collided;
  
  meGroup.on('dragmove', function() {
    var clear_score = 0;
    var corners = getCorners(me);
    // var collided = false;
    $.each(corners, function(k,v) {
      if (theyAreColliding(v, texts[k])) {
        // console.log('collision ' + k);
        tweens[k].play();
        collided = k;
      } else {
        clear_score++
      }
    })
    if (clear_score >= 4) {
      collided = false;
      $.each(tweens, function(k, v) {
        v.reverse();
      });
    }
  });

  meGroup.on('dragend', function() {
    if (collided) {
      var c = collided;
      var tpos = texts[c].getAbsolutePosition();
      var lasso = lassos[c];
      lasso.moveTo(textGroup);
      // layer.draw();
      // var grabTween = new Kinetic.Tween({
      //   node: lasso,
      //   duration: .2,
      //   x: tpos.x - padding/2,
      //   y: tpos.y - padding/2 
      // });
      // grabTween.play();
      lasso.setAbsolutePosition({
        x: tpos.x - padding/2,
        y: tpos.y - padding/2
      });
      layer.draw()
      // var growTween = new Kinetic.Tween({
      //   node: texts[c],
      //   duration: 1,
      //   fontSize: 500,
      //   x: 0,
      //   y: 0
      // });
      // setTimeout(function() {
      //   growTween.play();
      // }, 500)
      
    } else {
      // console.log('drat')
    }
  });

  function theyAreColliding(corner, target) {
    var c = corner;
    var t = target.getAbsolutePosition();
    var W = target.getWidth();
    var H = target.getHeight();
    var padding = 30;
    if (c.x > t.x - padding && c.x < t.x + W + padding && c.y > t.y - padding && c.y < t.y + H + padding) {        
      return true
    }
  }

  // function drawRectangle(corner) {
  //   var t = texts[corner];
  //   var pos = t.getAbsolutePosition();
  //   var W = t.getWidth();
  //   var H = t.getHeight();
    
  //   meGroup.add(meDR);
  //   layer.draw();
  // }

// });