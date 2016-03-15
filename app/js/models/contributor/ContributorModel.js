define([ 'underscore', 'backbone' ], function( _, Backbone ) {
	'use strict';

	var ContributorModel = Backbone.Model.extend({
		defaults: {
			medalHex: '#A67D3D',
			picWith: '100px',
			githubPath: 'concat github and login'
		}
	});
	return ContributorModel;
});