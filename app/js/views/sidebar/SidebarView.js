define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar/sidebarTemplate.html'
], function( $, _, Backbone, sidebarTemplate ) {
	'use strict';

	var SidebarView = Backbone.View.extend({
		el: $( '.sidebar' ),

		render: function() {
			var self = this,
				backbone_ad = {},
				require_ad = {},
				data = {},
				compiledTemplate;

			backbone_ad = {
				site_url: 'http://www.backbone.org',
				image_url: './imgs/backbone_logo.png',
				title: 'Backbone.js',
				description: 'Backbone.js gives you structure to web applicatons by providing models with key-value binding and custome events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.'
			}

			require_ad = {
				site_url: 'http://www.require.org',
				image_url: './imgs/require_logo.png',
				title: 'Require.js',
				description: 'RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node.'
			}

			data = {
				ads: [ backbone_ad, require_ad ]
			}

			compiledTemplate = _.template( sidebarTemplate, data );

			$( '.sidebar' ).append( compiledTemplate );
		}
	});
	return SidebarView;
});