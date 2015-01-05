Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };
        console.log(post.url);
        console.log(post.title);

        post._id = Posts.insert(post);
        Router.go('postPage', post);
    }
});
