Posts = new Mongo.Collection('posts');
Posts.allow({
    insert: function(userId, doc) {
        // only allow posting if user is logged in
        return !! userId;
    }
});

Meteor.methods({
    postInsert: function (postAttributes) {
        // Validate attributes
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        // check for duplicates
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            // Return duplicate post
            return {
                postExists: true,
                _id: postWithSameLink._id
            };
        }

        // Add user ID, author, and submitted date
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        return{
            _id: postId;
        };
    }
});
