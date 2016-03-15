define([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function( $, _, Backbone, Router ) {
	'use strict';

	var initialize = function() {
		// initialize router
		Router.initialize();
	}

	return {
		initialize: initialize
	}
	
});