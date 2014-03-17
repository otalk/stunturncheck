var bundle = require('browserify')(),
    fs = require('fs');


bundle.add('./index');
bundle.bundle({standalone: 'stunturncheck'}).pipe(fs.createWriteStream('stunturncheck.bundle.js'));
