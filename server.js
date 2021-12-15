// import express (after npm install express)
const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');
const htmlParser = require('node-html-parser');

var templateJson = require('./app/templateData.json');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/compile', function (req, res) {
  fs.readFile('./app/template.handlebars', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
    const template = handlebars.compile(data);
    fs.readFile('./app/index.html', 'utf-8', (err1, htmlFile) => {
      if (err1) {
        console.error(err)
        return
      }
      const content = htmlParser.parse(htmlFile);
      content.querySelector('#welcome-message').set_content(template(templateJson));
      fs.writeFile('./build/index.html', content.toString(), (writeError) => {
        copyAssets();
        // throws an error, you could also catch it here
        if (writeError) throw writeError;

        // success case, the file was saved

        res.send('Compiled and built successfully')
      });
    })
    
  })
});

/*
  Copying Assets to build
*/
function copyAssets(){
  fs.copyFile('app/index.css', 'build/index.css', (err) => {
    if (err) throw err3;
  });
  fs.copyFile('app/script.js', 'build/script.js', (err) => {
    if (err) throw err;
  });
}


// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
