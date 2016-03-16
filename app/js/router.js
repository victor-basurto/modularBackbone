define([
	'jquery',
	'underscore',
	'backbone',
	'views/home/HomeView',
	'views/projects/ProjectsView',
	'views/contributors/ContributorsView',
	'views/footer/FooterView'
], function( $, _, Backbone, HomeView, ProjectsView, ContributorsView, FooterView ) {
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
			// define url routes
			'projects': 'showProjects',
			'users': 'showContributors',

			// default
			'*actions': 'defaultAction'
		}
	});

	var initialize = function() {
		var app_router = new AppRouter;

		app_router.on( 'route:showProjects', function() {
			// call render on the module we loaded in via the dependency array
			var projectsView = new ProjectsView();
			projectsView.render();
		});

		app_router.on( 'route:showContributors', function() {
			// like above, call render but know that htis view has nested sub views which
			// handle loading and displaying data from the Github API
			var contributorsView = new ContributorsView();
		});

		app_router.on( 'route:defaultAction', function( actions ) {
			// we have no matching route, lets display the home page
			var homeView = new HomeView();
			homeView.render();
		});

		// unlike the above. we dont call render on this view as it will handle
		// the render call internally after it loads data. further more we loadd it 
		// outside of an on-route function to have it loaded no matter which page is
		// loaded initially
		var footerView = new FooterView();

		Backbone.history.start();
	}

	return {
		initialize: initialize
	}
});