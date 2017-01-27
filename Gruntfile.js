module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

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
        clean: [
            'dist/'
        ],
        concat: {
            options: {
                stripBanners: false,
                separator: ';'
            },
            dist: {
                src: [
                    'src/js/pushy.js'
                ],
                dest: 'dist/js/pushy.js',
            },
        },
        copy: {
          sass: {
            expand: true,
            cwd: 'src/',
            src: 'scss/**',
            dest: 'dist/',
          },
        },
        uglify: {
            build: {
                src: 'dist/js/pushy.js',
                dest: 'dist/js/pushy.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    sourceMap: false,
                    style: 'expanded' //output style: nested, compact, compressed, expanded
                },
                files: {
                    'dist/css/pushy.css': 'src/scss/pushy.scss', // 'destination': 'source'
                }
            }
        },
        postcss: {
            prefix: {
                options: {
                    map: false,
                    processors: [
                        require('autoprefixer')({
                            browsers: 'last 5 versions',
                            add: true
                        })
                    ]
                },
                src: 'dist/css/pushy.css',
                dest: 'dist/css/pushy.css'
            },
            nano: {
                options: {
                    map: {
                        inline: false,
                        dest: 'dist/css/'
                    },
                    processors: [
                        require('cssnano')() // minify the result
                    ]
                },
                src: 'dist/css/pushy.css',
                dest: 'dist/css/pushy.min.css'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('js-task', ['concat', 'uglify']);
    grunt.registerTask('sass-task', ['copy', 'sass', 'postcss:prefix']);
    grunt.registerTask('build', ['clean', 'js-task', 'sass', 'postcss']);

};
