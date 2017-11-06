'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/lookup', function(req, res){
  var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.word ? req.body.result.parameters.word : "Could you say that again?"
  return res.json({
    speech:speech,
    displayText: speech
  })
})

app.listen((process.env.PORT || 8000), function(){
  console.log("Server up and listening");
});
