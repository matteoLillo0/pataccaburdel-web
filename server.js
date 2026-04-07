// import
const express = require('express');
const path = require('path');

const app = express(); // creates an express application
const PORT = 3000; 

app.use(express.static(path.join(__dirname, 'public'))); // serves only files in /public, manage alr path traversal errors

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server in ascolto sulla porta: ${PORT}`)
});