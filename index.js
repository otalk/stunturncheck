var webrtc = require('webrtcsupport');
var SJJ = require('sdp-jingle-json');

module.exports = function (config, cb) {
    var pc = new webrtc.PeerConnection({iceServers: [config]});
    pc.onicecandidate = function (event) {
        if (!event.candidate) {
            var hasstun = 0;
            var hasturn = 0;
            var desc = SJJ.toSessionJSON(pc.localDescription.sdp);
            desc.contents[0].transport.candidates.forEach(function (candidate) {
                if (candidate.type == 'srflx' && config.url.indexOf('stun:') === 0) {
                    hasstun++;
                } else if (candidate.type == 'relay' && config.url.indexOf('turn:') === 0) {
                    hasturn++;
                }
            });
            pc.close();
            cb(null, hasstun + hasturn);
        }
    };
    window.setTimeout(
        function () {
            pc.createOffer(
                function (offer) {
                    pc.setLocalDescription(offer);
                },
                function (err) {
                    cb(err);
                },
                {mandatory: {OfferToReceiveAudio: true, OfferToReceiveVideo: false}}
            );
        },
        // firefox seems to take longer for candidate gathering...
        webrtc.prefix == 'moz' ? 5000 : 100
    );
};
