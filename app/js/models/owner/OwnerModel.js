define([ 'underscore', 'backbone' ], function( _, Backbone ) {
	'use strict';

	var OwnerModel = Backbone.Model.extend({
		defaults: {
			query: 'unknown'
		},
		initialize: function( options ) {
			this.query = options.query;
		},
		url: function() {
			return 'https://api.github.com/users/' + this.query;
		},
		parse: function( res ) {
			return res.data;
		}
	});
	return OwnerModel;
});