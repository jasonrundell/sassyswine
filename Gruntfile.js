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

module.exports = function(grunt) {

    // Load grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        /**
         * CONFIG
         * Set project info
         */
        project: {
            src:     'src',
            srcJS:   'src/js',
            srcSCSS: 'src/scss',
            srcJADE: 'src/jade',
            app:     'app',
            appCSS:  'app/css',
            appJS:   'app/js',
            appHTML: 'app'
        },

        /**
         * CONFIG
         * Package details (used for 'tag')
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * CONFIG
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
                        return [lrSnippet, mountFolder(connect, 'app')];
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
                path: 'http://localhost:<%= connect.options.port %>'
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
                "globals" : {
                    // jQuery: true,
                    // foundation: true,
                    // zepto: true,
                    angular: true
                }
            },
            files: {
                src: ['src/js/2-app.js']
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
                    '<%= project.appHTML %>/index.html': ['<%= project.srcJADE %>/index.jade']
                },
                options: {
                    pretty: true
                }
            },
            release: {
                files: {
                    '<%= project.appHTML %>/index.html': ['<%= project.srcJADE %>/index.jade']
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
                    banner: '<%= tag.banner %>'
                },
                files: {
                    '<%= project.appCSS %>/style.css': '<%= project.srcSCSS %>/style.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= project.appCSS %>/style.css': '<%= project.srcSCSS %>/style.scss'
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
                    banner: '<%= tag.banner %>'
                },
                files: {
                    '<%= project.appJS %>/scripts.js': ['<%= project.srcJS %>/*.js']
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
                options: {
                    event: [
                        'changed'
                    ],
                    reload: true
                },
                tasks: [
                    'open'
                ]
            },
            scripts: {
                files: [
                    '<%= project.srcJS %>/*.js',
                    '<%= project.srcSCSS %>/**/*.scss',
                    '<%= project.srcJADE %>/**/*.jade',
                    'package.json'
                ],
                tasks: [
                    'jshint',
                    'uglify',
                    'jade:debug',
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

    /**
     * TASK
     * Default task
     * Run `grunt` on the command line to run locally
     * Builds local development quality assets and opens browser
     */
    grunt.registerTask('default', [
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
     * Run `grunt build` on the command line
     * Builds production quality assets
     */
    grunt.registerTask('build', [
        'uglify',
        'sass:dist',
        'jade:release'
    ]);

    /**
     * TASK
     * Production push task
     * Run `grunt push` on the command line
     * TO DO: Eventually, this command will be what you use to push assets to a CDN, server, or X.
     */
    grunt.registerTask('push', [
        'uglify',
        'sass:dist',
        'jade:release'
    ]);

};