define([
	'jquery',
	'underscore',
	'backbone',
	'models/owner/OwnerModel',
	'text!templates/footer/footerTemplate.html'
], function( $, _, Backbone, OwnerModel, footerTemplate ) {
	'use strict';

	var FooterView = Backbone.View.extend({
		el: $( '#footer' ),

		initialize: function() {
			var self = this,
				onDataHandler,
				options = { query: 'victorbasurto' };

			onDataHandler = function( collection ) {
				self.render();
			}

			this.model = new OwnerModel( options );
			this.model.fetch({ success: onDataHandler, dataType: 'jsonp' });
		},

		render: function() {
			var compiledTemplate;

			var data = {
				owner: this.model.toJSON(),
				_: _
			}

			compiledTemplate = _.template( footerTemplate, data );
			this.$el.html( compiledTemplate );
		}
	});
	return FooterView;
});