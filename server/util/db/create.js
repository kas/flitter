/* eslint no-console: 0 */

// node module
const exec = require('child_process').exec;
const path = require('path');

// dir to store the data in
const dbPath = path.join(__dirname, '..', '..', 'db');

// docker run command
const cmd = `docker run -d -p 5432:5432 -v ${dbPath}:/var/lib/postgresql/data --name flitterdb postgres`;

// execute command
const start = exec(cmd);

// remember if docker is installing image
let dbImage = false;

// runs when command writes to stdout
start.stdout.on('data', (data) => {
  if (data) {
    console.log('Sucessfully created flitterdb\n');
  }
});

// runs when command writes to stderr
start.stderr.on('data', (data) => {
  if (data === "Unable to find image 'postgres:latest' locally\n" || dbImage) {
    console.log(data);
    dbImage = true;
  } else {
    console.log('Error while creating flitterdb:', data);
  }
});
