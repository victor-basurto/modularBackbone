define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarView',
	'models/project/ProjectModel',
	'collections/projects/ProjectsCollection',
	'views/projects/ProjectsListView',
	'text!templates/projects/projectsTemplate.html'
], function( $, _, Backbone, SidebarView, ProjectModel, ProjectsCollection, ProjectsListView, projectsTemplate ) {
	'use strict';

	var ProjectsView = Backbone.View.extend({
		el: $( '#page' ),

		render: function() {
			var	aProjects = [],
				project0,
				project1,
				project2,
				project3,
				project4,
				projectsCollection,
				projectsListView,
				sidebarView;

			$( '.menu li' ).removeClass( 'active' );
			$( '.menu li a[href="' + window.location.hash + '"]' ).parent().addClass( 'active' );

			this.$el.html( projectsTemplate );

			project0 = new ProjectModel({ title: 'Online Resume', url: 'http://github.com/victor-basurto/victorBasurto-website' });
			project1 = new ProjectModel({ title: 'Table Population With RequireJS', url: 'http://github.com/victor-basurto/tablePopulationRequireJS' });
			project2 = new ProjectModel({ title: 'RequireJS, BackboneJS Starter', url: 'http://github.com/victor-basurto/requirejs-backbonejs-starter' });
			project3 = new ProjectModel({ title: 'Congo App', url: 'http://github.com/victor-basurto/congo-app' });
			project4 = new ProjectModel({ title: 'Login System', url: 'http://github.com/victor-basurto/loginSys' });

			aProjects = [
				project0,
				project1,
				project2,
				project3,
				project4
			];

			projectsCollection = new ProjectsCollection( aProjects );
			projectsListView = new ProjectsListView({ collection: projectsCollection });

			projectsListView.render();

			// add the sidebar
			sidebarView = new SidebarView();
			sidebarView.render();
		}
	});
	return ProjectsView;
});