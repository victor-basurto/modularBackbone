define([ 
	'underscore', 
	'backbone', 
	'models/contributor/ContributorModel' 
], function( _, Backbone, ContributorModel ) {
	'use strict';

	var ContributorView = Backbone.View.extend({
		tagName: 'li',
		render: function() {
			var contributor = {
				avatar_url: this.model.get( 'avatar_url' ),
				login: this.model.get( 'login' ),
				url: this.model.get( 'url' ),
				contributions: this.model.get( 'contributions' )
			}
			return this;
		}
	});
	return ContributorView;
});