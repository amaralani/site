var express = require('express');
var router = express.Router();
const https = require('https')

router.get('/', function (req, res, next) {
  const options = {
    hostname: 'dev.to',
    path: '/api/articles/me/published',
    method: 'GET',
    headers: { "api-key": "jUZKis2Mhozb2sxJNE2vHSk4" }
  }
  let articlesString = '';
  const request = https.request(options, response => {
    response.on('data', data => {
      articlesString += data;
    })

    response.on('error', error => {
      console.error(error)
    })
  
    response.on('end', error => {
      let articles = JSON.parse(articlesString);
      res.render('blog', { title: 'Express' , articles : articles.filter(article => article.type_of ==='article') });
    })
  })

  request.end()
  
});

module.exports = router;
