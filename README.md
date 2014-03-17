# STUN and TURN check
Tests connectivity with a STUN or TURN server using WebRTC.

## How to use it

```js
var stunturncheck = require('stunturncheck');

stunturncheck({url: 'stun:stun.l.google.com:19302'}, function(err, res) { 
    if (err) {
        // some kind of error occurred
        return;
    }
    if (res > 0) {
        // a stun server could be reached and the local description
        // contains srflx (for stun) or relay (for turn) candidates.
    } else {
        // stun server could not be reached, port may be blocked.
    }
});
```
The first argument to stunturncheck follows the same convention as the 

To test a TURN/TCP server you would pass something along the lines of
```js
{url: 'turn:some.host:3478?transport=tcp', username: 'user', credential: 'secret'}
```
as first argument.

## License

MIT

## Credits
If you like this, follow: [@HCornFlower](http://twitter.com/hcornflower) on twitter.
