const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//friends Data
var friends = [
    {
        name:"Sarah",
        photo:"https://image.shutterstock.com/image-photo/closeup-portrait-confident-smiling-happy-260nw-435747943.jpg",
        scores:["5","4","3","2","1"]
    },
    {
        name:"Joe",
        photo:"https://image.shutterstock.com/image-photo/headshot-successful-smiling-cheerful-african-260nw-567772042.jpg",
        scores:["1","5","2","4","3"]
    },
    {
        name:"Amber",
        photo:"https://cdn.pixabay.com/photo/2015/03/17/01/28/girl-677058__480.jpg",
        scores:["3","2","1","5","4"]
    },
    {
        name:"Grant",
        photo:"https://image.shutterstock.com/image-photo/bearded-middleaged-man-wearing-glasses-260nw-1016721721.jpg",
        scores:["5","3","4","2","1"]
    },
    {
        name:"Sophie",
        photo:"https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907__480.jpg",
        scores:["3","2","4","5","1"]
    },
    {
        name:"Duke",
        photo:"https://image.shutterstock.com/image-photo/smart-casual-asian-man-using-260nw-610777475.jpg",
        scores:["5","1","4","3","1"]
    },
];

//html routes
app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function (req, res){
    res.sendFile(path.join(__dirname, "survey.html"));
});

//friends data route
app.get('/api/friends', (req, res) => {
    res.json(friends);
})

app.post("/api/friends", (req, res) => {
    var friendMatch = {
        name: "",
        photo: "",
        friendDiff: Infinity
    };
    var userData = req.body;
    var userScores = userData.scores;
    var totalDiff;

    for (var i = 0; i < friends.length; i++) {
        var currentFriend = friends[i];
        totalDiff = 0;

        console.log(currentFriend.name);

        for (var j = 0; j < currentFriend.scores.length; j++) {
            var currentFriendScore = currentFriend.scores[j];
            var currentUserScore = userScores[j];

            totalDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
        }
        if (totalDiff <= friendMatch.friendDiff) {
            friendMatch.name = currentFriend.name;
            friendMatch.photo = currentFriend.photo;
            friendMatch.friendDiff = totalDiff;
        }
    }
    friends.push(userData);
    res.json(friendMatch)

})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});