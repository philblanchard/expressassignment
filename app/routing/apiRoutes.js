var friendData = require('../data/friends')
var prevAbs = 0;
var tempAbs = 0;
var bestMatch = [];
calcAbs = (a , b) => {
    return Math.abs(a - b)
}
module.exports = function(app){
    app.get("/api/friends", function(req, res) {
        res.json(friendData)
    })


    app.post("/api/friends", function(req, res) {
        for (i in friendData){
            tempAbs = 0;
            for (z = 0; z < friendData[i].scores.length; z++) {
                tempAbs+= calcAbs(friendData[i].scores[z], req.body.scores[z] )
            }
            prevAbs = tempAbs
            console.log(tempAbs)
            if (tempAbs <= prevAbs){
                bestMatch = friendData[i]
            }
        }


        friendData.push(req.body)
        res.json(bestMatch)
    })
}