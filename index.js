var webrtc = require('webrtcsupport');
var SJJ = require('sdp-jingle-json');

module.exports = function (config, cb) {
    var pc = new webrtc.PeerConnection({iceServers: [config]});
    var hasstun = 0;
    var hasturn = 0;
    pc.onicecandidate = function (event) {
        if (!event.candidate) {
            var desc = SJJ.toSessionJSON(pc.localDescription.sdp);
            desc.contents[0].transport.candidates.forEach(function (candidate) {
                if (candidate.type == 'srflx' && config.url.indexOf('stun:') === 0) {
                    hasstun++;
                } else if (candidate.type == 'relay' && (config.url.indexOf('turn:') === 0 || config.url.indexOf('turns:') === 0)) {
                    hasturn++;
                }
            });
            pc.close();
            console.log(hasstun, hasturn);
        }
    };
    window.setTimeout(
        function () {
            pc.createDataChannel("somechannel");
            pc.createOffer(
                function (offer) {
                    pc.setLocalDescription(offer);
                },
                function (err) {
                    cb(err);
                },
                {offerToReceiveAudio: false, offerToReceiveVideo: false}
            );
        },
        100
    );
};
