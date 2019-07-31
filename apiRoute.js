var friends = require("../data/friends");

module.exports = function (app) {
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
}