
var drawings = {
  // the nice color choices! Customizeable... So far, the blues
  color_choices: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],

  drawHome: function() {
    var HEIGHT = window.innerHeight;
    var WIDTH = window.innerWidth;
    // menu text globals
    var contents = {
      ul: 'About',
      ur: 'Projects',
      ll: 'Blog',
      lr: 'Experimental'
    };

    var font = "Avant Garde, Avantgarde, Century Gothic, CenturyGothic, AppleGothic, sans-serif";
    var padding = 15;
    var fontsize = 60;
    var fontcolor = drawings.color_choices[8];
    var font_style = "bold";

    stage = new Kinetic.Stage({
      container: 'stage-container',
      width: WIDTH,
      height: HEIGHT
    });

    // Create Layers and Groups
    var layer = new Kinetic.Layer();

    var meGroup = new Kinetic.Group({
      draggable: true
    });

    var textGroup = new Kinetic.Group();

    // Isolated group to put animated text into
    var isoGroup = new Kinetic.Group();

    // =======================
    // utility functions =====
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

    // =====================
    // Create Menu Texts ===
    var texts = {
      
      ul: new Kinetic.Text({
        x: padding,
        y: padding,
        text: contents.ul,
        fontSize: fontsize,
        fontFamily: font,
        fontStyle: font_style,
        fill: fontcolor
      }),

      ll: new Kinetic.Text({
        x: padding,
        y: HEIGHT - padding - fontsize,
        text: contents.ll,
        fontSize: fontsize,
        fontFamily: font,
        fontStyle: font_style,
        fill: fontcolor
      }),

      ur: new Kinetic.Text({
        x: WIDTH - padding,
        y: padding,
        text: contents.ur,
        fontSize: fontsize,
        fontFamily: font,
        fontStyle: font_style,
        fill: fontcolor
      }),

      lr: new Kinetic.Text({
        x: WIDTH - padding,
        y: HEIGHT - padding - fontsize,
        text: contents.lr,
        fontSize: fontsize,
        fontFamily: font,
        fontStyle: font_style,
        fill: fontcolor
      })
    }

    // Re-position text based on width after generated
    texts.ur.setX(WIDTH - texts.ur.getWidth() - padding);
    texts.lr.setX(WIDTH - texts.lr.getWidth() - padding);

    // add click events to texts!
    $.each(texts, function(i,v) {
      v.on('click', function() {
        growAway(i);
      });
      v.on('mouseover', function() {
        console.log('hovered!')
        $('body').css('cursor', 'pointer');
      });
      v.on('mouseout', function() {
        $('body').css('cursor', 'default');
      })
    })

    // avatar (this will load the text)
    var me = new Kinetic.Rect({
      x: WIDTH/2 - 50,
      y: HEIGHT/2 - 50,
      width: 100,
      height: 100,
      fill: drawings.color_choices[8],
      stroke: 'black',
      strokeWidth: 4
    });

    me.on('mouseover', function() {
      $('body').css('cursor', 'move');
    });

    me.on('mouseout', function() {
      $('body').css('cursor', 'default');
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

    
    // add groups to layers, layers to stages!
    meGroup.add(me);

    $.each(lassos, function(k, lasso) {
      meGroup.add(lasso);
    });

    // add the shape to the layer
    layer.add(meGroup);

    $.each(texts, function(k, text) {
      textGroup.add(text)
    });

    layer.add(textGroup);

    layer.add(isoGroup);

    // add the layer to the stage
    stage.add(layer);

    // ========================
    // Tweens for Lassos ======
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

    
    // ===================
    // Setting Events ====
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

    // need to refactor for more control!
    meGroup.on('dragend', function() {
      if (collided) {
        var c = collided;
        var tpos = texts[c].getAbsolutePosition();
        var lasso = lassos[c];
        // detach the lasso to around the thing!
        lasso.setAbsolutePosition({
          x: tpos.x - padding/2,
          y: tpos.y - padding/2
        });
        // Edit these colors!
        lasso.setFill(drawings.color_choices[3]);
        // texts[c].setFill('red');
        layer.draw();
        setTimeout(function() {
          growAway(collided);
        }, 400)
        
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

    function growAway(corner) {
      // setTimeout(function() {
      var t = texts[corner];
      t.moveTo(isoGroup);
      
      var growTween = new Kinetic.Tween({
        node: t,
        duration: 1,
        fontSize: 500,
        opacity: .5,
        x: 0,
        y: 0,
        easing: Kinetic.Easings.EaseIn,
        onFinish: function() {
          app.router.navigate(t.getText().toLowerCase(), true)
        }
      });
      var fadeMe = new Kinetic.Tween({
        node: meGroup,
        duration: .5,
        opacity: 0
      });
      var fadeText = new Kinetic.Tween({
        node: textGroup,
        duration: .5,
        opacity: 0
      });

      fadeText.play();
      fadeMe.play();
      growTween.play();
    }

  }, // end of drawHome();

  // function for rendering the circle background
  makeCircleBG: function() {
    var HEIGHT = window.innerHeight;
    var WIDTH = window.innerWidth;
    var layers = ['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6']
    $.each(layers, function(i) {
      var colors = drawings.color_choices;
      var stage = new Kinetic.Stage({
        container: layers[i],
        width: WIDTH,
        height: HEIGHT
      });
      var layer = new Kinetic.Layer();

      $.each(colors.concat(colors), function(j, color) {
        var shade = Math.floor(Math.random() * 255)
        var circle = new Kinetic.Circle({
          radius: 10 + i * 2, //(i + 1) * 6,
          x: 20 + (Math.random() * (WIDTH - 40)),
          y: 20 + (Math.random() * (HEIGHT - 40)),
          // fillRGB: {r: 0, g: shade/5, b: shade},
          fill: color,
          stroke: 'black',
          strokeWidth: 1
        });
        layer.add(circle);
      });

      stage.add(layer);

    })
  }, // end of makeCircleBG

  // function for rendering the rectangle background
  makeRectBG: function() {
    var HEIGHT = window.innerHeight;
    var WIDTH = window.innerWidth;
    var layers = ['layer6', 'layer5', 'layer4', 'layer3', 'layer2', 'layer1']
    var new_height = HEIGHT;
    var new_width = WIDTH;
    var new_corner = 0;
    var step = 40;
    $.each(layers, function(i) {
      var stage = new Kinetic.Stage({
        container: layers[i],
        width: WIDTH,
        height: HEIGHT
      });
      var layer = new Kinetic.Layer();
      new_corner += step;
      new_width -= step*2;
      new_height -= step*2
      var rect = new Kinetic.Rect({
        x: new_corner,
        y: new_corner,
        width: new_width,
        height: new_height,
        stroke: drawings.color_choices[ 8 - i ],//'#36454F',
        strokeWidth: 10 
      })
      
      layer.add(rect);
      stage.add(layer);

    })
  } // end of makeRectBG
}