define([
	'jquery',
	'underscore',
	'backbone',
	'collections/contributors/ContributorsCollection',
	'text!templates/contributors/contributorsListTemplate.html'
], function( $, _, Backbone, ContributorsCollection, contributorsListTemplate ) {
	'use strict';

	var ContributorsListView = Backbone.View.extend({
		goldContributors: [],
		silverContributors: [],
		bronzeContributors: [],

		el: $( '#contributors-list' ),
		tagName: 'ul',

		initialize: function() {
			var self = this;
		
			self.bind( 'reset', self.clearView );
		},

		resetMedalists: function() {
			var self = this;
		
			self.goldContributors = [];
			self.silverContributors = [];
			self.bronzeContributors = [];
		},

		render: function() {
			var self = this,
				goldPodium = {},
				silverPodium = {},
				bronzePodium = {},
				podium, // there are three podiums for each group
				bronzeCompiledTemplate,
				silverCompiledTemplate,
				goldCompiledTemplate;


			self.resetMedalists();

			self.awardMedals( this.collection.models );

			$( '#contributors-list' ).hide();

			goldPodium = {
				baseHeight: '80px',
				baseWith: '120px',
				achievement: 'Over 50 Contributions'
			}

			silverPodium = {
				baseWith: '60px',
				baseWith: '160px',
				achievement: '5 - 50 Contributions'
			}

			bronzePodium = {
				baseWith: '40px',
				baseWith: '680px',
				achievement: '1 - 5 Contributions'
			}

			data = {
				contributors: self.goldContributors,
				_: _,
				podium: goldPodium
			}

			/**
			 * Render bronze list
			 */
			data.contributors = self.bronzeContributors;
			data.podium = bronzePodium;
			bronzeCompiledTemplate = _.template( contributorsListTemplate, data );
			$( '#bronze-podium' ).html( bronzeCompiledTemplate );

			/**
			 * Render silver list
			 */
			data.contributors = self.silverContributors;
			data.podium = silverPodium;
			silverCompiledTemplate = _.template( contributorsListTemplate, data );
			$( '#silver-podium' ).html( silverCompiledTemplate );

			/**
			 * Render gold list
			 */
			data.contributors = self.goldContributors;
			data.podium = bronzePodium;
			goldCompiledTemplate = _.template( contributorsListTemplate, data );
			$( '#gold-podium' ).html( goldCompiledTemplate );

			self.animate();

			return this;
		},

		awardMedals: function( aModels ) {
			var	githubPath,
				contributors,
				count = 0,
				self = this,
				goldMedalHex = '#CFB52B',
				silverMedalHex = '#E6E8FA',
				bronzeMedalHex = '#A67D3D';

			_.each( aModels, function (contributor)  {
				var contributions = Number( contributor.get( 'contributions' ) ),
					medalHex,
					picWith;

				if ( contributions >= 50 ) {
					medalHex = goldMedalHex;
					picWith = '120px';
					contributors = self.goldContributors;
				} else if ( contributions < 50 && contributions >= 5 ) {
					medalHex = silverMedalHex;
					picWith = '100px';
					contributors = self.silverContributors;
				} else {
					medalHex = bronzeMedalHex;
					picWith = '80px';
					contributors = self.bronzeContributors;
				}

				githubPath = 'https://github.com/' + contributor.get( 'login' );

				contributor.set( 'medalHex', medalHex );
				contributor.set( 'picWith', picWith );
				contributor.set( 'githubPath', githubPath );
				contributor.set( 'name', 'contributor' + count );
				contributor.push( contributor );

				count++;
			});
		},

		animate: function() {
			var self = this,
				bronzeDelayCount = 1000,
				bronzeDelayInc = 200,
				silverDelayCount = bronzeDelayCount,
				silverDelayInc = 400,
				goldDelayCount = silverDelayCount,
				goldDelayInc = 600;

			/**
			 * TODO: create function that returns contributor name
			 */

			$( '#gold-podium' ).hide();
			$( '#silver-podium' ).hide();
			$( '#broze-podium' ).hide();

			// hide the container list while adding contributors
			$( '#contributors-list' ).show();

			/**
			 * Animate in Bronze
			 */
			$( '#bronze-podium' ).find( '.base' ).hide();
			$( '#bronze-podium' ).find( '.base' ).slideDown( 'slow' ).delay( 0 );

			_.each( self.bronzeContributors, function (contributor) {
				var hideId = '#' + contributor.get( 'name' );

				$( hideId ).hide();
			});

			_.each( self.bronzeContributors, function (contributor) {
				var animatedId = '#' + contributor.get( 'name' );

				$( animatedId ).delay( bronzeDelayCount ).slideDown( 'slow' );
				bronzeDelayCount += bronzeDelayInc;
			});

			/**
			 * Animate in Silver
			 */
			$( '#silver-podium' ).find( '.base' ).hide();
			$( '#silver-podium' ).find( '.base' ).slideDown( 'slow' ).delay( bronzeDelayCount );

			_.each( self.silverContributors, function (contributor) {
				var hideId = '#' + contributor.get( 'name' );

				$( hideId ).hide();
			});

			_.each( self.silverContributors, function (contributor) {
				var animateId = '#' + contributor.get( 'name' );

				$( animateId ).delay( silverDelayCount ).slideDown( 'slow' );
				silverDelayCount += silverDelayInc;
			});

			/**
			 * Animate in Gold
			 */
			$( '#gold-podium' ).find( '.base' ).hide();
			$( '#gold-podium' ).find( '.base' ).slideDown( 'slow' ).delay( silverDelayCount );

			_.each( self.goldContributors, function (contributor) {
				var hideId = '#' + contributor.get( 'name' );

				$( hideId ).hide();
			});

			_.each( self.goldContributors, function (contributor) {
				var animateId = '#' + contributor.get( 'name' );

				$( animateId ).delay( goldDelayCount ).slideDown( 'slow' );
				goldDelayCount += goldDelayInc;
			});

			$( '#gold-podium' ).show();
			$( '#silver-podium' ).show();
			$( '#broze-podium' ).show();
		}
	});
	return ContributorsListView;
});