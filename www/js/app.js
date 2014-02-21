'use strict';



require(['config',
          'jquery',
          'underscore',
          'backbone', 
          'jsonData',
          'jqueryUI', 
          'jqueryTouch', 
          'jqueryMob', 
          'backboneLS'], 
          function (config, $, _, Backbone, jsonData) {
  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.template = function (id) {
    return _.template( $('#' + id).html());
  };

  //           localStorage.removeItem('alphaData');

  // if (localStorage.getItem('alphaData')) {
  //               localStorage.getItem('alphaData');
  //               console.log('old');
  //               console.log(localStorage.getItem('alphaData'));
  //           } else {

  //               console.log('new');
  //               localStorage.setItem('alphaData', JSON.stringify(jsonData));
  //               var ls = localStorage.getItem('alphaData')
  //               jsonData = JSON.parse(ls);
                
  //                   console.log((jsonData));


  //           }


  App.Models.Game = Backbone.Model.extend({
    defaults: {
      cha: 'a',
      pic: 'a',
      done: false
    }
  });

  App.Collections.Game = Backbone.Collection.extend({
    model: App.Models.Game,
    localStorage: new Backbone.LocalStorage("alphaData"),
    getFirst: function() {
      var firstData = this.where({done: false});
      if(firstData.length > 0) {
        firstData = $(firstData).first();
        return firstData;
      } else {
        return false
      }
    }
  });

  var gameCollection = new App.Collections.Game(jsonData.data);

  App.Views.Game = Backbone.View.extend({
    tagName: 'div',
    el: '#content',
    initialize: function() {

      this.collection.on('change', this.render, this);
    },
    render: function() {
      console.log( 'render');

      if( this.collection.getFirst()) {
        var game = this.collection.getFirst(),
          sourceView = new App.Views.Source({model: game });
        this.$el.empty();
        this.$el.append(sourceView.render().el);
      } else {
        this.$el.append('<h4> Game Completed </h4>');
      }
      
    }
  });

  App.Views.Source = Backbone.View.extend({
    el: '#sourceWidget',
    temp: template('gameTemplate'),
    events: {
      'click #nextBtn'  : 'nextGame'
    },
    initialize: function() {

       _.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
        var _this = this; 
        this.render = _.wrap(this.render, function(render) { 
            _this.beforeRender(); 
            render(); 
            _this.afterRender(); 
            return _this; 
        }); 

     
    },
     beforeRender: function() { 
    }, 
    render: function() {
      this.$el.html(this.temp(this.model[0].toJSON()));
      return this; 
    },
    afterRender: function() { 
      $('#widget', this.el).css({'height':(($(window).height()))+'px'});
      var json = this.model[0].toJSON(),
          that = this;
       $('#widget .sprites', this.el).draggable({
                cursor: 'move',
                revert: 'invalid'
            });
            $("#dest #placeDest", this.el).droppable({
                accept: "."+json.a_cha,
                drop: function (event, ui) {
                    var dropped = ui.draggable;
                    //console.log($(dropped).attr('class').split(' ')[1]);
                    var droppedOn = $(this);
                    $(dropped).detach().css({
                        top: 0,
                        left: 0
                    }).appendTo(droppedOn);
                    that.nextGame();
                    //console.log(that);
                }
            });
    },
    nextGame: function (e) {
      this.model[0].save({done: true});
      console.log( this.model[0]);
    }
  });

  App.Views.Remaining = Backbone.View.extend({
    el : '#remaining',
    render: function() {
    }
  });

  var remainingView = new App.Views.Remaining({ collection: gameCollection});
  $(document.body).append(remainingView.render());
  var gameView = new App.Views.Game({ collection: gameCollection});
  $(document.body).append(gameView.render());


});