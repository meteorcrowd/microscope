Template.postItem.helpers({
    domain: function () {
        'use strict';
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
});