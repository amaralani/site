var express = require('express');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'site',
  password: 'postgres',
  port: 5432,
})

var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.post('/process', function (req, response, next) {
  pool.query({
    text: 'insert into contact_message(name, email, subject, text) values($1, $2, $3, $4)',
    values: [req.body.name, req.body.email, req.body.subject, req.body.message]
  }, (err, res) => {
    if (err) {
      console.log(err.stack)
      response.render('contact', { message: 'Could not save message. Please try again later.' });
    } else {
      response.render('contact', { message: 'Message received successfully.' });
    }
  });
  
});

module.exports = router;
