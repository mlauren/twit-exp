//
//  RTD2 - Twitter bot that tweets about the most popular github.com news
//  Also makes new friends and prunes its followings.
//
var Bot = require('./bot')
  , config1 = require('../config1');

var bot = new Bot({
    consumer_key:         '7odGkK5zibHTmBQ4CYl8WuVpL'
  , consumer_secret:      'GKkYJv9pH5niEAM1zIX3Xb3nLuFpk5ih9aImagwPkWh7vX2G1m'
  , access_token:         '2860724323-5BGST2ktGmFlysvHDPDhHIyWXAYonAYZuM4W212'
  , access_token_secret:  'HiumcbEO8ITgTw4yytszF4vZImWvENJSjbhOHuCgoxsLl'
});

console.log('RTD2: Running.');

//get date string for today's date (e.g. '2011-01-01')
function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

setInterval(function() {
  bot.twit.get('followers/ids', function(err, reply) {
    if(err) return handleError(err)
    console.log('\n# followers:' + reply.ids.length.toString());
  });
  var rand = Math.random();

  if(rand <= 0.10) {      //  tweet popular github tweet
    var params = {
        q: 'github.com/'
      , since: datestring()
      , result_type: 'mixed'
    };
    bot.twit.get('search', params, function (err, reply) {
      if(err) return handleError(err);

      var max = 0, popular;

      var tweets = reply.results
        , i = tweets.length;

      while(i--) {
        var tweet = tweets[i]
          , popularity = tweet.metadata.recent_retweets;

        if(popularity > max) {
          max = popularity;
          popular = tweet.text;
        }
      }

      bot.tweet(popular, function (err, reply) {
        if(err) return handleError(err);

        console.log('\nTweet: ' + (reply ? reply.text : reply));
      })
    });
  } else if(rand <= 0.55) { //  make a friend
    bot.mingle(function(err, reply) {
      if(err) return handleError(err);

      var name = reply.screen_name;
      console.log('\nMingle: followed @' + name);
    });
  } else {                  //  prune a friend
    bot.prune(function(err, reply) {
      if(err) return handleError(err);

      var name = reply.screen_name
      console.log('\nPrune: unfollowed @'+ name);
    });
  }
}, 90000);

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}
