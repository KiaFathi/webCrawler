'use strict';
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/scrape', function(req, res){
  //scrape here!
  var url = 'http://www.imdb.com/title/tt1229340/';
  request(url, function(error, response, body){
    if(!error){
      var $ = cheerio.load(body);

      var title, release, rating;
      var json = {title: '', release: ''};

      $('.header').filter(function(){
        var data = $(this);
        title = data.children().first().text();

        release = data.children().last().children().text();

        json.title = title;
        json.release = release;
      });
    }

    fs.writeFile(
      'output.json',
      JSON.stringify(json, null, 4), 
      function(err){
        console.log('File successfully written!');
      }
    )

    res.send('Check console.');

  });
});

app.listen(8000);
module.exports = app;