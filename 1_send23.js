#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// amqp://rabbitmq:1258@localhost:49007                 // WIth password
// amqp://localhost:49007                               // Without password
amqp.connect('amqp://rabbitmq:1258@localhost:49007', function(error0, connection) {
    if (error0) { throw error0; }
    connection.createChannel(function(error1, channel) {
        if (error1) { throw error1; }
        var queue = 'queue01';
        var msg = 'Hello doctor heart miss aaye';
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});

