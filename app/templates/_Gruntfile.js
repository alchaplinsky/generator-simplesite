'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		autoprefixer: {
			source: {
				src: 'css/blocks/*.css'
			}
		},
		borschik: {
			css: {
				src: ['css/styles.css'],
				dest: ['css/styles.min.css']
			}
		},
		watch: {
			css: {
				files: ['css/blocks/*.css'],
				tasks: ['autoprefixer', 'borschik']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-borschik');

	grunt.registerTask('default', ['autoprefixer', 'borschik', 'watch']);
};