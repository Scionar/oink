'use strict';
const fs = require('fs');
var execSync = require('child_process').execSync;
var options = {
    encoding: 'utf8'
  };

const packagePath = 'apps/auth/package.json';
const workspace = 'auth';

let rawdata = fs.readFileSync(packagePath);
const contentJson = JSON.parse(rawdata);

Object.keys(contentJson.dependencies).forEach(element => {
    const command = `npm i ${element}@${contentJson.dependencies[element]} --workspace=${workspace}`
    console.log(command)
    console.log(execSync(command, options));
});

Object.keys(contentJson.devDependencies).forEach(element => {
    const command = `npm i ${element}@${contentJson.devDependencies[element]} -D --workspace=${workspace}`
    console.log(command)
    console.log(execSync(command, options));
});



