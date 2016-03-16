require.config({
	paths: {
		'jquery': './libs/jquery/dist/jquery.min',
		'underscore': './libs/underscore/underscore-min',
		'backbone': './libs/backbone/backbone-min',
		'bootstrap': './libs/bootstrap/dist/js/bootstrap.min',
		'templates': '../templates'
	},
	shim: {
		'bootstrap': {
			deps: [ 'jquery' ]
		},
		'backbone': {
			deps: [
				'jquery',
				'underscore'
			],
			exports: 'Backbone'
		}
	}
});

require([ 'app' ], function( App ) {
	App.initialize();
});