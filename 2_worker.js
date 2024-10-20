var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:1258@localhost:5672', function (error, connection) {
    connection.createChannel(function (error, channel) {
        var queue = 'task_queue';
        channel.assertQueue(queue, { durable: true });
        channel.prefetch(1);            // do not give more than one message to a worker at a time.
        channel.consume(queue, function (msg) {
            var secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});