var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var compteur = 0;
var allMsgs = [
  { "msg": "Hello World", "pseudo": "Zergaoul", "date": new Date().toLocaleDateString() },
  { "msg": "Bonjour tout le monde !", "pseudo": "Nangyth", "date": new Date().toLocaleDateString() },
  { "msg": "youhou", "pseudo": "Jubuan", "date": new Date().toLocaleDateString() }
];

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get('/cpt/query', function(req, res) {
  res.json({ "compteur": compteur });
});

app.get('/cpt/inc', function(req, res) {
  let param = req.query;

  if (param.v === undefined) {
    compteur += 1;
    return res.json({ "code": 0 });
  }

  if (String(param.v).match(/^[0-9]+$/)) {
    compteur += Number(param.v);
    res.json({ "code": 0 });
  }
  else {
    res.json({ "code": -1 });
  }
});

app.get('/msg/get/*', function(req, res) {
  let index = parseInt(req.url.substring(9));

  if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
    res.json({ "code": 1, "msg": allMsgs[index] });
  } else {
    res.json({ "code": 0 });
  }
});

app.get('/msg/nber', function(req, res) {
  res.json(allMsgs.length)
});

app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs)
});

app.get('/msg/post', function(req, res) {
  let msg = req.query.msg;
  let pseudo = req.query.pseudo;
  let date = new Date().toLocaleDateString();

  let newMsg = { "msg": msg, "pseudo": pseudo, "date": date };
  allMsgs.push(newMsg);

  res.json(allMsgs);
});


app.get('/msg/post/*', function(req, res) {
  let msg = req.url.substring(10);
  res.json(allMsgs.push(unescape(msg)) - 1);
});

app.get('/test/*', function(req, res) {
  res.json({ "msg": req.url.substring(6) })
});

app.get("/", function(req, res) {
  res.send("Hello")
})



app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

