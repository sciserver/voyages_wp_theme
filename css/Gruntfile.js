'use strict';
module.exports = function(grunt) {
	
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  
  // Show elapsed time
  require('time-grunt')(grunt);

  grunt.initConfig({
	pkg: 
		grunt.file.readJSON('package.json'),
    
	//the task that compiles less
    less: {
      dev: {
        files: {
          'voyages.css': [
		    'less/voyages.less'
          ],
          'skin-blue.css': [
		    'less/skin-blue.less'
          ]
        },
        options: {
          compress: false
		}
      },
      build: {
        files: {
          'voyages.min.css': [
            'less/voyages.less'
          ],
          'skin-blue.min.css': [
            'less/skin-blue.less'
          ]
        },
        options: {
          compress: true
        }
      }
    },
    
	
	// task to postprocess css to add browser specific prefixes, like "-webkit-..." and minify css
    postcss:{  
		options: {
			map: true,
			processors: [
				require('pixrem')(), // add fallbacks for rem units 
				require('autoprefixer')({browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']}),
				require('cssnano')() // minify the result 
			]
		},
		dev: {
			options: {
				  map: {
					prev: ''
				  }
			},
			src: ['voyages.css', 'skin-blue.css']
		},
		build: {
			src: ['voyages.min.css','skin-blue.min.css']
		}
	},


    watch: {
      less: {
        files: [
          'less/voyages.less',
          'less/skin-blue.less',
          'less/vars-blue.less'
        ],
        tasks: [
		  'less:dev',
		  'postcss:dev'
	    ]
      },
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dist', [
    'build'
  ]);
  grunt.registerTask('dev', [
    'less:dev',
    'postcss:dev',
  ]);
  grunt.registerTask('build', [
    'less:build',
    'postcss:build',
  ]);
};
