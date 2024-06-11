#!/usr/bin/env node
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:1258@localhost:5672', function (error0, connection) {
    if (error0) { console.log("error @ connection ===> ", error0); }
    connection.createChannel(function (error1, channel) {
        if (error1) { console.log("error @ channel ===> ", error1); }
        var exchange = 'logs23';
        channel.assertExchange(exchange, 'fanout', { durable: false });
        setInterval(() => {
            var msg = 'realmadrid23__' + ' ' + `${new Date().toISOString()}`;
            console.log("Sent Msg23 ===> ", msg);
            channel.publish(exchange, '', Buffer.from(msg));
        }, 3000);
    });
});