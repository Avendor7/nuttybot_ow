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

    fs.readFile('./people.json', 'utf8', function (err,data) {
        data = JSON.parse(data); // you missed that...
        for(var i = 0; i < data.length; i++) {
            var newPerson = new Person();
            newPerson.firstname = data[i].firstname;
            newPerson.lastname = data[i].lastname;
            newPerson.age = data[i].age;
            newPerson.save(function (err) {});
        }
    });


    if (message.startsWith("!")) {
        client.action("avendor7", user['display-name'] + " is boosted");
    }

});