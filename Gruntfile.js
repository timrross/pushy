module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass-task'],
            },
            js: {
                files: ['src/js/pushy.js'],
                tasks: ['js-task'],
            },
        },
        concat: {
            options: {
                stripBanners: false,
                separator: ';'
            },
            dist: {
                src: [
                    'src/js/pushy.js'
                ],
                dest: 'dist/js/pushy.min.js',
            },
        },
        uglify: {
            build: {
                src: 'dist/js/pushy.min.js',
                dest: 'dist/js/pushy.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compact' //output style: nested, compact, compressed, expanded
                },
                files: {
                    'dist/css/pushy.css': 'src/scss/pushy.scss', // 'destination': 'source'
                }
            }
        }
    });

    // Load grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('js-task', ['concat', 'uglify']);
    grunt.registerTask('sass-task', ['sass']);
    grunt.registerTask('build', ['js-task', 'sass-task']);

};
