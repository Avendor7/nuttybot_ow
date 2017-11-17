var tmi = require('tmi.js');

var options = {
    options: {
        debug:true
    },
    connection: {
        cluster:"aws",
        reconnect: true
    },
    identity: {
        username: "nuttybot_ow",
        password: ""
    },
    channels: ["avendor7"]
};

var client = new tmi.client(options);

client.connect();


client.on('connected', function(address,port){
    client.action("avendor7", "connected");
});

client.on('chat', function (channel, user, message, self) {
    client.action("avendor7", user['display-name'] + " is boosted");
})