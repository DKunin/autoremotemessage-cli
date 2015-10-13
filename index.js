#!/usr/bin/env node

'use strict';

var armessage            = require('autoremotemessage');
var argv                 = require('yargs').argv;
var defaultMessage       = {message: 'smth=:=true'};
var R                    = require('ramda');
var nconf                = require('nconf');
var path                 = require('path');
var autoremoteConfigFile = path.join(__dirname, 'autoremotekey.json');
 
nconf.argv()
     .env()
     .file({ file: autoremoteConfigFile });

var apiKey = nconf.get('apikey');
var config = nconf.get('config');

if(config) {
  var data = config.split('=');
  nconf.set(data[0], data[1]);
  nconf.save(function (err) {
    if(err) {
      throw new Error(err);
    }
  });
  console.log('settings updated');
  return;
}

if(argv.m) {
  argv.message = argv.m;
}
if(argv.t) {
  argv.title = argv.t;
}

argv.key = apiKey;


armessage(R.merge(defaultMessage, argv));
