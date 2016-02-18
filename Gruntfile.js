/*!
 * Sassy Swine Gruntfile
 * http://sassyswine.com
 * @author Jason Rundell
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
var conf;

module.exports = function (grunt) {

  // Load grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    /**
     * CONFIG
     * Set project info
     */
    conf: {
      paths: {
        src: {
          base: 'src',
          js:   'src/js',
          sass: 'src/scss',
          jade: 'src/jade'
        },
        app: {
          base: 'app',
          css:  'app/css',
          js:   'app/js',
          html: 'app'
        }
      },
      ports: {
        web: 9000
      },
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
      }
    },

    /**
     * CONFIG
     * Package details (used for 'tag')
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * LAUNCH
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
            return [lrSnippet, mountFolder(connect,'app')];
          }
        }
      }
    },

    /**
     * LAUNCH
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= conf.ports.web %>'
      }
    },

    /**
     * LAUNCH + WATCH
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      options: {
        node: true,
        browser: true,
        esnext: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 4,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: "single",
        regexp: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: false,
        smarttabs: true,
        reporter: require('jshint-stylish'),
        "globals": {
          angular: true
        }
      },
      files: {
        src: ['<%= conf.paths.src.js %>/js/2-app.js']
      }
    },

    /**
     * LAUNCH + WATCH
     * Jade
     * https://github.com/gruntjs/grunt-contrib-jade
     * Node template engine
     */
    jade: {
      debug: {
        files: {
          '<%= conf.paths.app.html %>/index.html': '<%= conf.paths.src.jade %>/index.jade'
        },
        options: {
          pretty: true
        }
      },
      dist: {
        files: {
          '<%= conf.paths.app.html %>/index.html': '<%= conf.paths.src.jade %>/index.jade'
        },
        options: {
          pretty: false
        }
      }
    },

    /**
     * LAUNCH + WATCH
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all SCSS files and appends project banner
     */
    sass: {
      dev: {
        options: {
          banner: '<%= conf.tag.banner %>'
        },
        files: {
          '<%= conf.paths.app.css %>/style.css': '<%= conf.paths.src.sass %>/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= conf.paths.app.css %>/style.css': '<%= conf.paths.src.sass %>/style.scss'
        }
      }
    },

    /**
     * LAUNCH + WATCH
     * Uglify
     * https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      my_target: {
        options: {
          banner: '<%= conf.tag.banner %>'
        },
        files: {
          '<%= conf.paths.app.js %>/scripts.js': ['<%= conf.paths.src.js %>/*.js']
        }
      }
    },


    /**
     * WATCH
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      configFiles: {
        files: [
          'Gruntfile.js'
        ],
        tasks: [
          'uglify',
          'jade:debug',
          'sass:dev'
        ],
        options: {
          event: [
            'changed'
          ],
          reload: true
        }
      },
      scripts: {
        files: [
          '<%= conf.paths.src.js %>/*.js'
        ],
        tasks: [
          'jshint',
          'uglify'
        ],
        options: {
          event: [
            'changed',
            'added',
            'deleted'
          ],
          reload: true
        }
      },
      jade: {
        files: [
          '<%= conf.paths.src.jade %>/**/*.jade'
        ],
        tasks: [
          'jade:debug'
        ],
        options: {
          event: [
            'changed',
            'added',
            'deleted'
          ],
          reload: true
        }
      },
      sass: {
        files: [
          '<%= conf.paths.src.sass %>/**/*.scss'
        ],
        tasks: [
          'sass:dev'
        ],
        options: {
          event: [
            'changed',
            'added',
            'deleted'
          ],
          reload: true
        }
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT,
          ignore: [] // add something to ignore in here, if you desire
        },
        files: [
          '<%= conf.paths.app.base %>/**/*'
        ]
      }
    }

  });

  grunt.registerTask('clean:dev', function () {
    var config = {
      files: ['<%= conf.paths.app.base %>/**/*']
    };
    grunt.config('clean', config);
    grunt.task.run('clean');
  });

  /**
   * TASK
   * Default task
   * Run `grunt` on the command line to run locally
   * Builds local development quality assets and opens browser
   */
  grunt.registerTask('default', [
    'clean:dev',
    'jshint',
    'uglify',
    'jade:debug',
    'sass:dev',
    'connect:livereload',
    'open',
    'watch'
  ]);

  /**
   * TASK
   * Stage push task
   * Run `grunt dist` on the command line
   * Builds production quality assets
   */
  grunt.registerTask('dist', [
    'clean:dev',
    'uglify',
    'sass:dist',
    'jade:dist'
  ]);

};
