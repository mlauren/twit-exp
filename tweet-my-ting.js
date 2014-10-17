var Twit = require('twit')

var T = new Twit({
    consumer_key:         '7odGkK5zibHTmBQ4CYl8WuVpL'
  , consumer_secret:      'GKkYJv9pH5niEAM1zIX3Xb3nLuFpk5ih9aImagwPkWh7vX2G1m'
  , access_token:         '2860724323-5BGST2ktGmFlysvHDPDhHIyWXAYonAYZuM4W212'
  , access_token_secret:  'HiumcbEO8ITgTw4yytszF4vZImWvENJSjbhOHuCgoxsLl'
})

/*
T.post('statuses/update', { status: 'hello my friends' }, function(err, data, response) {
  console.log(data)
  console.log(err)
})
*/

T.get('users/show', { screen_name: "MarshallJRJ" }, function(err, data, response) {
	console.log(data)
  	console.log(err)
})