define([ 'underscore', 'backbone', 'models/project/ProjectModel' ], function( _, Backbone, ProjectModel ) {
	'use strict';

	var ProjectsCollection = Backbone.Collection.extend({
		model: ProjectModel,

		initialize: function() {}
	});
	return ProjectsCollection;
});