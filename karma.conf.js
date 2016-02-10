module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/resources/bower/angular/angular.js',
      'app/resources/bower/angular-mocks/angular-mocks.js',
      'app/resources/bower/angular-ui-router/release/angular-ui-router.min.js',
      'app/app.js',
      'app/components/js/controllers/*.js',
      'tests/*_test.js'
    ],

    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'tests/junit-reporter-log.xml',
      suite: 'unit'
    }

  });
};
