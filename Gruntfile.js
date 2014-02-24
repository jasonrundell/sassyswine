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
  grunt.loadNpmTasks('connect-livereload');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hashres');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      src: 'src',
      app: 'app',
      assets: '<%= project.app %>',
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
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: [
        'src/js/*.js',
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });




  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};