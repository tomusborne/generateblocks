module.exports = function( grunt ) {
	'use strict';

	const pkgInfo = grunt.file.readJSON( 'package.json' );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!node_modules/**',
					'!build/**',
					'!css/sourcemap/**',
					'!.git/**',
					'!.github/**',
					'!bin/**',
					'!.gitlab-ci.yml',
					'!cghooks.lock',
					'!tests/**',
					'!*.sh',
					'!*.map',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!phpunit.xml',
					'!README.md',
					'!sass/**',
					'!vendor/**',
					'!composer.json',
					'!composer.lock',
					'!package-lock.json',
					'!phpcs.xml.dist',
					'!.eslintignore',
					'!.eslintrc.json',
				],
				dest: 'generateblocks/',
			},
		},

		compress: {
			main: {
				options: {
					archive: 'generateblocks-' + pkgInfo.version + '.zip',
					mode: 'zip',
					level: 5,
				},
				files: [
					{
						src: [
							'./generateblocks/**',
						],
					},
				],
			},
		},

		clean: {
			main: [ 'generateblocks' ],
			zip: [ '*.zip' ],
		},
	} );

	// Load grunt tasks
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	// Grunt release - Create installable package of the local files
	grunt.registerTask( 'package', [ 'clean:zip', 'copy:main', 'compress:main', 'clean:main' ] );

	grunt.util.linefeed = '\n';
};
