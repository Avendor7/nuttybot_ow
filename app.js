var tmi = require('tmi.js');
var env = require('dotenv').config();

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
    channels: ["avendor7"]
};

var client = new tmi.client(options);

client.connect();


client.on('connected', function(address,port){
    client.action("avendor7", "connected");
});

client.on('chat', function (channel, user, message, self) {
    if (self) return;
    var commands = JSON.parse('commands.json');

    for (var items in commands){
        console.log('Command: ' + items.command + " Response: " + items.response);
    }

    if (message.startsWith("!")) {
        client.action("avendor7", user['display-name'] + " is boosted");
    }

});