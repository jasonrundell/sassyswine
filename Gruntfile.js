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
     * https://www.npmjs.org/package/grunt-contrib-jade
     * Node template engine
     */
    jade: {
      compile: {
        options: {
          data: {
            client: false,
            pretty: true,
            debug: false
          }
        },
        files: {
          '<%= project.app %>': ['<%= project.src %>/**/*.jade']
        }
      }
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      jshint: {
        all: ['Gruntfile.js', '<%= project.src %>/**/*.js']
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
        "globals" : {
          "jQuery": true,
          "Modernizr": true
        }
      }
    },

    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      dev: {
        files: {
          '<%= project.app %>/js/scripts.min.js': '<%= project.js %>'
        }
      },
      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
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
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * @repository <%= pkg.repository %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %>\n' +
              ' */\n'
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
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    uglify: {
      options: {
        banner: '<%= tag.banner %>'
      },
      dist: {
        files: {
          '<%= project.app %>/js/scripts.min.js': '<%= project.js %>'
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
      concat: {
        files: '<%= project.src %>/js/**/*.js',
        tasks: ['concat:dev', 'jshint']
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
    'jshint',
    'concat:dev',
    'connect:livereload',
    'open',
    'watch'
  ]);

  /**
   * Stage push task
   * Run `grunt build` on the command line
   */
  grunt.registerTask('build', [
    'sass:stage',
    'jshint',
    'uglify'
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