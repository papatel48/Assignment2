
var fs = require("fs");

var catagories = [];
var posts = [];
var postcount = 0;

module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
        try {
            fs.readFile("./data/categories.json", function(err, data) {
                if (err) {
                    throw err;
                }
                catagories = JSON.parse(data);
            });         
            fs.readFile("./data/posts.json", function(err, data) {
                if (err) {
                    throw err;
                }
                posts = JSON.parse(data);
            });
            resolve("Data has been read successfully");

        } catch (err) {
            reject("unable to read file");
        }
        

    });
}

module.exports.getAllPosts = () => {
    var arryAllPosts = [];
    return new Promise((resolve, reject) => {
        for (var i = 0; i < posts.length; i++) {
            arryAllPosts.push(posts[i]);
        }
        if (arryAllPosts.length == 0) {
            reject("No Result Returned!!!");
        }
        resolve(arryAllPosts);
    })
}




module.exports.getPublishedPosts = (postData) => {
    postData.published = (postData.published) ? true : false;
    postData.id = ++postcount;
    return new Promise((resolve, reject) => {
        posts.push(postData);
        if (posts.length == 0) {
            reject("No Result Returned!");
        }
        console.log(posts);
        resolve(posts);
    });
}

module.exports.getCategories = () => {
    var arryGetCategories = [];
    return new Promise((resolve, reject) => {
        if (posts.length == 0) {
            reject("No Result Returned!!!");
        } else {
            for (var v = 0; v < catagories.length; v++) {
                arryGetCategories.push(catagories[v]);
            }
            if (arryGetCategories.length == 0) {
                reject("No Result Return!!!");
            }
        }
        resolve(arryGetCategories);
    });
}