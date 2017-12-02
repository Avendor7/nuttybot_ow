var tmi = require('tmi.js');
var env = require('dotenv').config();
var fs = require('fs');

var options = {
    options: {
        debug:true
    },
    connection: {
        cluster:"aws",
        reconnect: true
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    channels: ["misscanadia_ow"]
};

var client = new tmi.client(options);

client.connect();


client.on('connected', function(address,port){
    client.action("misscanadia_ow", "connected");
});

client.on('chat', function (channel, user, message, self) {
    if (self) return;

    var obj;
    fs.readFile('commands.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);

        for (var items in obj){
            if (message.startsWith(obj[items].command)) {
                client.say("misscanadia_ow", obj[items].response.replace("{{displayName}}", user['display-name']));
            }
        }
    });


});

function handleCounters(number) {


}

