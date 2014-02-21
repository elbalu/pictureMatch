

$(function() {
   
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.template = function (id) {
        return _.template( $('#' + id).html());
    };

    App.Models.Game = Backbone.Model.extend({
        defaults: {
            cha: 'a',
            pic: 'a',
            done: false
        }
    });

    App.Collections.Game = Backbone.Collection.extend({
        model: App.Models.Game,
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

    var gameCollection = new App.Collections.Game([
        {
            cha: 'a',
            opt1: 'v',
            opt2: 's',
            opt3: 'r',
            pic: 'a',
            done: false
        },
        {
            cha: 'b',
            opt1: 'e',
            opt2: 't',
            opt3: 'u',
            pic: 'b',
            done: false
        },
        {
            cha: 'c',
            opt1: 'q',
            opt2: 'w',
            opt3: 'x',
            pic: 'c',
            done: false
        }
    ]);

    App.Views.Game = Backbone.View.extend({
        tagName: 'div',
        el: '#content',
        initialize: function() {
            this.collection.on('change', this.render, this);
        },
        render: function() {
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
        tagName: 'div',
        temp: template('gameTemplate'),
        events: {
            'click #nextBtn'    : 'nextGame'
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html(this.temp(this.model[0].toJSON()));
            return this;
        },
        nextGame: function (e) {
            this.model[0].set({done: true})
        }
    });

    App.Views.Remaining = Backbone.View.extend({
        el : '#remaining',
        render: function() {
            console.log(this);
        }
    });

    var remainingView = App.Views.Remaining({ collection: gameCollection});
    $(document.body).append(remainingView.render());
    var gameView = new App.Views.Game({ collection: gameCollection});
    $(document.body).append(gameView.render());

});




































            localStorage.removeItem('alphaData');

            if (localStorage.getItem('alphaData')) {
                localStorage.getItem('alphaData');
                console.log('new');
                console.log(localStorage.getItem('alphaData'));
            } else {

                console.log('new');
                $.getJSON("js/data.json", function (data) {
                    localStorage.setItem('alphaData', JSON.stringify(data));
                    console.log(JSON.parse(localStorage.getItem('alphaData')));

                });

            }
            $('#widget .sprites').draggable({
                cursor: 'move',
                revert: 'invalid'
            });
            $("#dest #placeDest").droppable({
                accept: '.alphaa_a',
                drop: function (event, ui) {
                    var dropped = ui.draggable;
                    console.log($(dropped).attr('class').split(' ')[1]);
                    var droppedOn = $(this);
                    $(dropped).detach().css({
                        top: 0,
                        left: 0
                    }).appendTo(droppedOn);
                }
            });


            // function getLS() {
            //   var appData = jsonData.data;
            //   localStorage.removeItem('alphaData');

            //   if (localStorage.getItem('alphaData')) {
            //     return localStorage.getItem('alphaData');
            //   } else {
            //     localStorage.setItem('alphaData', jsonData);
            //     return localStorage.getItem('alphaData');
            //    }
            // }



            
            // $('#widget .sprites').draggable({
            //     cursor: 'move',
            //     revert: 'invalid'
            // });
            // $("#dest #placeDest").droppable({
            //     accept: '.alphaa_a',
            //     drop: function (event, ui) {
            //         var dropped = ui.draggable;
            //         console.log($(dropped).attr('class').split(' ')[1]);
            //         var droppedOn = $(this);
            //         $(dropped).detach().css({
            //             top: 0,
            //             left: 0
            //         }).appendTo(droppedOn);
            //     }
            // });


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
            

          
          
            var Person = Backbone.Model.extend({
              defaults: jsonData.data,
              validate: function(attributes) {
                if (attributes.age < 0 ) {
                  return 'age must be positive';
                }

                if (!attributes.name) {
                  return 'Every person must have name';
                }
              },

              work: function() {
                return this.name + 'is working!!!'
              }
            });

            var PersonView = Backbone.View.extend({
              tagName: 'li',
              className: 'person',
              id: 'person-id',
              el: '#content',
              my_temp: _.template("<p><%= a_cha %></p>"),
              initialize: function() {
                this.render();
              },
              render: function() {
                var that = this;
                _.each(that.model.toJSON(), function(data) {
                  that.$el.append(that.my_temp(data));
                });
              }

            });

            var person = new Person;
            var personView = new PersonView({model: person});


});

