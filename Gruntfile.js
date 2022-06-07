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
	grunt.registerTask( 'action-package', [ 'copy:main' ] );

	grunt.registerTask( 'download-google-fonts', function() {
		const done = this.async();
		const request = require( 'request' );
		const fs = require( 'fs' );

		request( 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyCMsgO9oLyggmUXxBP85zQiEHJ5m3OAl0U', function( error, response, body ) {
			if ( response && response.statusCode === 200 ) {
				const fonts = {};

				JSON.parse( body ).items.forEach( function( font ) {
					fonts[ font.family ] = {
						weight: font.variants,
						fallback: font.category,
					};
				} );

				fs.writeFile( 'src/components/typography/google-fonts.json', JSON.stringify( fonts, undefined, 4 ), function( err ) {
					if ( ! err ) {
						// eslint-disable-next-line no-console
						console.log( 'Google Fonts Updated!' );
						done();
					}
				} );
			}
		} );
	} );

	grunt.util.linefeed = '\n';
};
