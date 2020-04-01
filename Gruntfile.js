/* global module: true */
module.exports = function (grunt) {
  grunt.initConfig({
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        expand: true,
        src: ['*.html', './*/*.html', '??-*/??-*/*.html'],
        dest: 'dist/'
      }
    },
    cssmin: {
      files: {   
        expand: true,
        src: ['*.css', 'css/*.css', './*/*.css', '??-*/??-*/*.css', '??-*/css/*.css'],
        dest: 'dist/'
      }
    },
    uglify: {
      main: {
        files: [{
          expand: true,
          src: ['js/*.js', './*/*.js', '??-*/0?-*/*.js', '??-*/js/*.js'],
          dest: 'dist/'
        }]
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 3
      },
      files: {
        expand: true,
        cwd: './img',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'dist/img/'
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['uglify','cssmin', 'htmlmin','imagemin']);
};