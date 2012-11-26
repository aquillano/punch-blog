var _ = require("underscore");
var helper_utils = require("punch").Utils.Helper;
var blog_content_handler = require("punch-blog-content-handler");

var all_posts = [];
var last_modified = null;

var fetch_all_posts = function(callback) {
	blog_content_handler.getAllPosts(function(err, posts_obj, posts_last_modified) {
		if (!err) {
			all_posts = _.values(posts_obj);
			last_modified = posts_last_modified;
		}

		return callback();
	});
}

var tag_helpers = {

	years: function() {
		return _.keys(blog_content_handler.postDates).reverse();
	},

	top_tags: function() {
		var tag_counts = blog_content_handler.tagCounts;
		return _.sortBy(_.keys(tag_counts), function(tag) {
			return tag_counts[tag];
		}).reverse();
	}

};


module.exports = {

	directAccess: function() {
		return { "block_helpers": {}, "tag_helpers": {}, "options": {} };
	},

	get: function(basepath, file_extension, options, callback) {
		var self = this;

		fetch_all_posts(function() {
			return callback(null, { "tag": tag_helpers }, {}, last_modified);
		});
	}

}
