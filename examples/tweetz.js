//
//  RTD2 - Twitter bot that tweets about the most popular github.com news
//  Also makes new friends and prunes its followings.
//
var Bot = require('./bot')
  , config1 = require('../config1');

var bot = new Bot(
  {
    consumer_key: 'ld1m7eLslGm7frrb4pl1G2YrY'
    , consumer_secret: 'BcDjnLMnwT0jbFB9rOfZJkVTDA8w4Dl89826UO17CpNtlshmkF'
    , access_token: '2860724323-GV28eNyaMbHyIj9esy2DKztP1EFrkygFqauUboc'
    , access_token_secret: 'QpNJ8KeTW7irLam7w636wEBEJIxSnbk6ROgQj5kE7uhLQ'
  }
);

console.log('RTD2: Running.');

//get date string for today's date (e.g. '2011-01-01')
function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

bot.tweet('hello!!', function (err, reply) {
        if(err) return handleError(err);

        console.log('\nTweet: ' + (reply ? reply.text : reply));
      })


function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}
