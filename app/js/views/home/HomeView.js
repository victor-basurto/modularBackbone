define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarView',
	'text!templates/home/homeTemplate.html'
], function( $, _, Backbone, SidebarView, homeTemplate ) {
	'use strict';

	var HomeView = Backbone.View.extend({
		el: $( '#page' ),

		render: function() {
			var sidebarView;

			$( '.menu li' ).removeClass( 'active' );
			$( '.menu li a[href="#"]' ).parent().addClass( 'active' );
			this.$el.html( homeTemplate );

			sidebarView = new SidebarView();
			sidebarView.render();
		}
	});
	return HomeView;
});