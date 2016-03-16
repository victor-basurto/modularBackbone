define([
	'jquery',
	'underscore',
	'backbone',
	'models/project/ProjectModel',
	'collections/projects/ProjectsCollection',
	'text!templates/projects/projectsListTemplate.html'
], function( $, _, Backbone, ProjectModel, ProjectsCollection, projectsListTemplate ) {
	'use strict';

	var ProjectsListView = Backbone.View.extend({
		el: $( '#projects-list' ),

		render: function() {
			var compiledTemplate,
				data = {};

			data = {
				projects: this.collection.models,
				_: _
			}

			compiledTemplate = _.template( projectsListTemplate, data );
			this.$el.html( compiledTemplate );
		}
	});
	return ProjectsListView;
});