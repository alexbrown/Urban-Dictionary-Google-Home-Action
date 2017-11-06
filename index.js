'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

function parseResultsAndGetDefinition(res){
  let response = JSON.parse(res);
  let def;
  if(response.result_type != "no_results"){
    def = response.list[0].definition 
  } else {
    def = "We couldn't find any definitions for that word."
  }
  return def;    
}

function buildGoogleResponse(def){
  return {
    speech: def,
    displayText: def 
  }
}

app.post('/lookup', function(req, res){
  var word = req.body.result && req.body.result.parameters && req.body.result.parameters.word ? req.body.result.parameters.word : "Could you say that again?"  
  request('http://api.urbandictionary.com/v0/define?term=' + word, function(error, response, body){
    let def = parseResultsAndGetDefinition(response.body);
    let googleResponse = buildGoogleResponse(def);
    return res.json(googleResponse);
  });
})

app.listen((process.env.PORT || 8000), function(){
  console.log("Server up and listening");
});
