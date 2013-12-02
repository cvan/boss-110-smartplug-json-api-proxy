#!/usr/bin/env node

var fs = require('fs');
var http = require('http');
var urlparse = require('url');

var csv2json = require('./csv2json');
var program = require('commander');
var request = require('request');

// Command line signature.
program.version('0.0.1')
       .usage('[options]')
       .option('-p, --port [port]', 'Port to listen on')
       .parse(process.argv);

// Remember the cookies so when we fetch after logging in, the
// session cookies are already set.
var request = request.defaults({jar: true});

var settings = {};
fs.readFile(__dirname + '/settings.json', 'utf8', function(error, data) {
    if (error) {
        return console.log('Error parsing "settings.json" file:', error);
    }
    settings = JSON.parse(data);
});
settings.server_url = settings.server_url || '/';

function login(req, res) {
    // Log in.
    request.post({
        url: 'http://my.boss-controls.com/login',
        form: {
            emailaddress: settings.email,
            pass: settings.password
        }
    }, function(error, response, body) {
        if (error) {
            var msg = 'Could not log in:', error;
            console.error(msg);
            res.end(msg);
        }
        // Fetch again but this time we'll get data since we're logged in.
        fetch(req, res);
    });
}

function fetch(req, res) {
    console.log('Fetching');
    request({
        url: 'http://my.boss-controls.com/rawdata/exportRawDataFromAPI/?devid=' + settings.devid + '&fromDate=12-01-2013&toDate=12-01-2013',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }, function(error, response, body) {
        if (error) {
            var msg = 'Could not get URL:', error;
            console.error(msg);
            res.end(msg);
            return;
        }
        if (response.statusCode == 200) {
            if (body.indexOf('<html') > -1) {
                console.log('Logging in');
                login(req, res);
            } else {
                console.log('Already logged in');
                output(req, res, body);
            }
        }
    });
}

function output(req, res, body) {
    var query = urlparse.parse(req.url, true).query;
    var format = query.format == 'csv' ? 'csv' : 'json';
    var contentType = format == 'json' ? 'application/json' : 'text/plain';
    res.writeHead(200, {'Content-Type': contentType});
    if (format == 'json') {
        body = csv2json.csv2json(body);
    }
    res.end(body);
}

var port = program.port || 8080;
http.createServer(function(req, res) {
    // Serve only at /. Everything else should 404.
    var url_ = urlparse.parse(req.url);
    if (url_.pathname !== settings.server_url) {
        res.writeHead(404);
        res.end();
        return;
    }
    fetch(req, res);
}).listen(port, '0.0.0.0');
console.log('Server running at http://0.0.0.0:' + port + '/');
