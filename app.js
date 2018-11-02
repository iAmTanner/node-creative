const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'))

var current_player;
var players = [];
app.get('/', (req, res) => {
    res.sendFile('index.html', { root:  'public' });
});

app.get('/addPlayer/:name/:char', (req, res) => {
    var player = {
        name: req.params.name,
        char: req.params.char
    }
    var dupe = false;
    for (var i = 0; i < players.length; ++i) {
        if (players[i].name == player.name)
            dupe = true;
    }
    if (!dupe)  {
        current_player = player;
        players.push(player);
        console.log('adding player', req.params);
        res.status(200).send(req.params);
    }
    else {
        console.log('duplicate name or char');
        res.send(player);
    }
});

app.get('/getRandomPlayer', (req, res) => {
    if (players.length < 2)
        res.send(null);
    var rando = Math.floor(Math.random() * players.length);
    if (players[rando] === current_player) {
        if (rando === players.length)
            rando = rando - 1;
        else
            rando = rando + 1;
    }
    console.log('getting player', players[rando]);
    res.send(players[rando]);
});

app.listen(8080, () => {
   console.log("Listening on port 8080..."); 
});