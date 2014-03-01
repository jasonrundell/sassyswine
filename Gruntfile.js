/*!
 * FireShell Gruntfile
 * http://getfireshell.com
 * @author Todd Motto
 */

'use strict';

/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // Load grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     * Starts a local webserver and injects
     * livereload snippet
     */
    connect: {
      options: {
        port: 9000,
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, 'app')];
          }
        }
      }
    },

    /**
     * Jade
     * https://github.com/gruntjs/grunt-contrib-jade
     * Node template engine
     */
    jade: {
      compile: {
        files: {
          '<%= project.app %>/index.html': ['<%= project.src %>/jade/index.jade']
        },
        options: {
          pretty: true
        }
      }
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: {
        all: ['Gruntfile.js', 'src/js/*.js']
      },
      options: {
        "node": true,
        "browser": true,
        "es5": true,
        "esnext": true,
        "bitwise": true,
        "camelcase": true,
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "indent": 2,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "quotmark": "single",
        "regexp": true,
        "undef": true,
        "unused": true,
        "strict": true,
        "trailing": false,
        "smarttabs": true,
        "reporter": require('jshint-stylish'),
        "globals" : {
          "jQuery": true,
          "Modernizr": true
        }
      }
    },

    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      src: 'src',
      app: 'app',
      css: [
        '<%= project.src %>/scss/style.scss'
      ],
      js: [
        '<%= project.src %>/js/*.js'
      ]
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all SCSS files and appends project banner
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.app %>/css/style.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= project.app %>/css/style.min.css': '<%= project.css %>'
        }
      }
    },

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.description %>\n' +
              ' * <%= pkg.homepage %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * @repository <%= pkg.repository.url %>\n' +
              ' * @license <%= pkg.license %>\n' +
              ' */\n'
    },

    /**
     * Uglify
     * https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      my_target: {
        options: {
          banner: '<%= tag.banner %>'
        },
        files: {
          'app/js/scripts.min.js': ['src/js/*.js']
        }
      }
    },


    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      jshint: {
        files: '<%= project.src %>/js/*.js',
        tasks: ['jshint']
      },
      uglify: {
        files: '<%= project.src %>/js/*.js',
        tasks: ['uglify']
      },
      jade: {
        files: '<%= project.src %>/jade/**/*.jade',
        tasks: ['jade']
      },
      sass: {
        files: '<%= project.src %>/scss/**/*.scss',
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT,
          ignore: [] // add something to ignore in here, if you desire
        },
        files: [ // all of the filez!
          '<%= project.app %>/**/*.html',
          '<%= project.app %>/**/*.css',
          '<%= project.app %>/**/*.js',
          '<%= project.app %>/**/*.png',
          '<%= project.app %>/**/*.jpg',
          '<%= project.app %>/**/*.gif',
          '<%= project.app %>/**/*.svg'
        ]
      }
    }


  });

  // Default task(s).
  /**
   * Default task
   * Run `grunt` on the command line to run locally
   */
  grunt.registerTask('default', [
    'sass:dev',
    'jade',
    'uglify',
    'jshint',
    'connect:livereload',
    'open',
    'watch'
  ]);

  /**
   * Stage push task
   * Run `grunt build` on the command line
   */
  grunt.registerTask('build', [
    'sass:stage'
  ]);

  /**
   * Production push task
   * Run `grunt push` on the command line
   */
  grunt.registerTask('push', [
    'sass:dist',
    'jshint',
    'uglify'
  ]);

};