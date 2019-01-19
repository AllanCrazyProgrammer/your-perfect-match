var express = require('express');
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var person = [
    {
        "name": "Ahmed",
        "photo": "https://eumostwanted.eu/sites/default/files/styles/wanted_medium/public/wanted_pictures/mohamad_ahmed_hassan_1.jpg?itok=G_1j3NM2",
        "scores": [
            "5",
            "5",
            "5",
            "5",
            "5",
            "5",
            "2",
            "3",
            "2",
            "5"
        ]
    },

    {
        "name": "Nadia",
        "photo": "https://avatars3.githubusercontent.com/u/1840802?s=460&v=4",
        "scores": [
            "1",
            "2",
            "5",
            "2",
            "3",
            "2",
            "5",
            "4",
            "5",
            "5"
        ]
    }
];


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
})
app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
})

app.get("/api/friends", function (req, res) {
    return res.json(person);
});

//Recibe datos del survey y los agrega al ojeto de person.
app.post("/api/friends", function (req, res) {

    let newPerson = req.body;
    let scores = newPerson.scores.map(Number);
    var bestMatch = 50;

    for (let i = 0; i < person.length; i++) {
        var actualPerson = person[i].name;
        var actualPersonScore = person[i].scores.map(Number);
        //da la diferencia entre el score de usario x con la de usuario nuevo
        var difference = scores.map(function (item, index) {
            return Math.abs(item - actualPersonScore[index]);
        })

        const add = (a, b) =>
            a + b
        // use reduce to sum our array
        const totalDifference = difference.reduce(add)
        // get the current best match
        if (totalDifference < bestMatch) {
            bestMatch = totalDifference;
        }
    }
    console.log(bestMatch);
    console.log(actualPerson);

    person.push(newPerson);
    res.json(newPerson);
});

app.listen(PORT);
