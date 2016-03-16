define([ 'underscore', 'backbone', 'models/contributor/ContributorModel' ], function( _, Backbone, ContributorModel ) {
	'use strict';

	var ContributorsCollection = Backbone.Collection.extend({
		model: ContributorModel,

		initialize: function( models, options ) {},

		url: function() {
			return 'https://api.github.com/repos/victor-basurto';
		},

		parse: function( data ) {
			var uniqueArray = this.removeDuplicates( data.data );
			return uniqueArray;
		},

		removeDuplicates: function( selfArray ) {
			var length = selfArray.length,
				ArrayWithUniqueValues = [],
				objectCounter = {};

			for ( var i = 0; i < length; i++ ) {
				var currentMemberOfArrayKey = JSON.stringify( selfArray[ i ] ),
					currentMemberOfArrayValue = selfArray[ i ];

				if( objectCounter[ currentMemberOfArrayKey ] === undefined ) {
					ArrayWithUniqueValues.push( currentMemberOfArrayValue );
					objectCounter[ currentMemberOfArrayKey ] = 1;
				} else {
					objectCounter[ currentMemberOfArrayKey ]++;
				}
			}
			return ArrayWithUniqueValues;
		}
	});
	return ContributorsCollection;
});