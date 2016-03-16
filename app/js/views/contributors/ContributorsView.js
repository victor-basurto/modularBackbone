define([
	'jquery',
	'underscore',
	'backbone',
	'collections/contributors/ContributorsCollection',
	'views/contributors/ContributorsListView',
	'text!templates/contributors/contributorsTemplate.html'
], function( $, _, Backbone, ContributorsCollection, ContributorsListView, contributorsTemplate ) {
	'use strict';

	var ContributorsView = Backbone.View.extend({
		el: $( '#page' ),

		initialize: function() {
			var self = this,
				onDataHandler;

			onDataHandler = function( collection ) {
				self.render();
			}

			self.collection = new ContributorsCollection([]);
			self.collection.fetch({ success: onDataHandler, dataType: 'jsonp' });
		},

		render: function() {
			var compiledTemplate,
				total_contributions,
				total_contributors,
				contributorsListView,
				data = {};

			$( '.menu li' ).removeClass( 'active' );
			$( '.menu li a[href="' + window.location.hash + '"]' ).parent().addclass( 'active' );

			total_contributions = this.getTotalContributions( this.collection.models );
			total_contributors = this.collection.models.length;

			data = {
				total_contributions: total_contributions,
				total_contributors: total_contributors
			}

			compiledTemplate = _.template( contributorsTemplate, data );
			this.$el.html( compiledTemplate );

			// subview
			contributorsListView = new ContributorsListView({ collection: this.collection });
			contributorsListView.render();
		},

		getTotalContributions: function( aModels ) {
			var total = 0;

			_.each( aModels, function (contributorModel) {
				var contributorContributions = Number( contributorModel.get( 'contributions' ) );
				total += contributorContributions;
			});
			return total;
		},

		clearListView: function() {
			console.log( 'clearing sub view' );
			contributorsListView.clearListView();
		}
	});
	return ContributorsView;
});