var amqp = require('amqplib/callback_api');

/*******************************************************
    HOW TO RUN
        node 4_receivelogs.js INFO23 DEBUG23            // this file will receive all logs
        node 4_receivelogs.js DEBUG23                   // only receives "debug23" logs
********************************************************/
var args = process.argv.slice(2);
if (args.length == 0) { console.log("input sarigga ledu"); process.exit(1); }

amqp.connect('amqp://rabbitmq:1258@localhost:5672', function (error0, connection) {
    connection.createChannel(function (error1, channel) {
        var exchange = 'direct_logs23';
        channel.assertExchange(exchange, 'direct', { durable: false });
        channel.assertQueue('', { exclusive: true }, function (error2, q) {
            console.log('Waiting for logs23 ===> ');
            args.forEach(function (severity) {
                channel.bindQueue(q.queue, exchange, severity);
            });
            channel.consume(q.queue, function (msg) {
                console.log(" receivedms ===> ", msg.fields.routingKey, msg.content.toString());
            }, {
                noAck: true
            });
        });
    });
});