

require.config({
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
    jqueryMig: 'http://code.jquery.com/jquery-migrate-1.2.1.min',
    jqueryMob: 'lib/jquery.mobile-1.3.2.min',
    jqueryUI: 'lib/jquery-ui.min',
    jqueryTouch: 'lib/jquery.ui.touch-punch',
    backbone: 'lib/backbone-0.9.2',
    backboneLS: 'lib/backbone.localStorage',
    bootstrap:'lib/bootstrap',
    underscore: 'lib/underscore-1.3.3',
    jsonData: 'data'
  },

  shim: {
  
    
    "jqueryUI": {
      deps: ["jquery"],
      exports: "JqueryUI"
    },
    "jqueryMob": {
      deps: ["jquery", "jqueryUI"],
      exports: "JqueryMob"
    },
    "jqueryTouch": {
      deps: ["jquery", "jqueryUI", "jqueryMob"],
      exports: "JqueryTouch"

    },
     "backbone": {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    "underscore": {
        exports: '_'
    }
  }
});

require(['app'], function(AppView){
 return AppView;
});

                