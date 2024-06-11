#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:1258@localhost:5672', function (error0, connection) {
    if (error0) { throw error0; }
    connection.createChannel(function (error1, channel) {
        if (error1) { throw error1; }
        var exchange = 'logs23';
        channel.assertExchange(exchange, 'fanout', { durable: false });

        /*
            we just publish messages on "exchange"
            - we use some temporary queue - empty string as 1st param of assertQueue
            - naming a queue ===> when you want to share the queue between producers & consumers.
            - but we want to see all logs... plus, we want only current logs (not all previous logs)
            - queue is exclusive; means when connection closes ---> queue is deleted

            RUN two (or) 3 instances of this file
            - 3 temporary queues will be created
            - all the queues will get messages from "logs23" exchange
        */
        channel.assertQueue('', { exclusive: true }, function (error2, q) {
            if (error2) { throw error2; }
            console.log(" Waiting for messages23 ===> ", q.queue);
            channel.bindQueue(q.queue, exchange, '');
            channel.consume(q.queue, function (msg) {
                console.log("rcvd message23 ====> ", msg.content.toString()); 
            }, { noAck: true });
        });
    });
});