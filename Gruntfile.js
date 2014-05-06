'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var paths = {
        app: 'app',
        dist: 'dist',
    };

    grunt.initConfig({
        paths: paths,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },

            browserify: {
                files: ['<%= paths.app %>/scripts/**/*.jsx'],
                tasks: ['browserify']
            },

            cssmin: {
                files: ['<%= paths.app %>/styles/**/*.css'],
                tasks: ['cssmin']
            },

            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= paths.dist %>/*.html',
                    '{.tmp,<%= paths.dist %>}/styles/**/*.css',
                    '{.tmp,<%= paths.dist %>}/scripts/**/*.js',
                    '<%= paths.dist %>/images/**/*.{png,jpg,jpeg,gif,webp}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, paths.dist)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, paths.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            all: ['.tmp', '<%= paths.dist %>/*', '<%= paths.app %>/bower_components'],
        },
        bower: {
            install: {
                // Nothing to specify here. Look in bower.json for settings.
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
            ],
        },
        jasmine: {
            all: {
                options: {
                    specs: '.tmp/test.js',
                }
            },
        },
        useminPrepare: {
//            html: '<%= paths.app %>/index.html',
            options: {
                dest: '<%= paths.dist %>'
            }
        },
        usemin: {
//            html: ['<%= paths.dist %>/**/*.html'],
            css: ['<%= paths.dist %>/styles/**/*.css'],
            options: {
                dirs: ['<%= paths.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %>/images/',
                    src: ['**/*.{png,jpg,jpeg}'],
                    dest: '<%= paths.dist %>/images/'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= paths.dist %>/styles/main.css': [
                        '<%= paths.app %>/styles/main.css'
                    ]
                }
            }
        },
        htmlmin: {
            // dist: {
            //     options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                // },
                // files: [{
                //     expand: true,
                //     cwd: '<%= paths.app %>',
                //     src: '*.html',
                //     dest: '<%= paths.dist %>'
                // }]
            // }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>',
                    dest: '<%= paths.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        'bower_components/**',
                        'index.html'
                    ]
                }]
            }
        },
        browserify: {
            options: {
                transform:  [ require('grunt-react').browserify ],
            },
            dist: {
                src: '<%= paths.app %>/scripts/app.jsx',
                dest:'<%= paths.dist %>/scripts/app.js'
            },
            test: {
                src: 'test/spec/test.jsx',
                dest: '.tmp/test.js',
            },
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        }
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'build',
            'connect:livereload',
            'copy',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean',
        'browserify:test',
        'jasmine'
    ]);

    grunt.registerTask('build', [
        'clean',
        'bower',
        'useminPrepare',
        'imagemin',
        //'htmlmin',
        //'concat',
        'cssmin',
        // 'uglify',
        'browserify:dist',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'gh-pages'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build',
    ]);
};
