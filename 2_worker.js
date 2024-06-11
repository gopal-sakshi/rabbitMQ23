var amqp = require('amqplib/callback_api');


function cb23 (msg) {
    console.log("Received msg23 ===> ", msg.content.toString());
}

amqp.connect('amqp://rabbitmq:1258@localhost:5672', function (error, connection) {
    connection.createChannel(function (error, channel) {
        var queue = 'task_queue23';
        channel.assertQueue(queue, { durable: true });
        channel.prefetch(10);               // this worker can take 10 tasks at a time
        channel.consume(queue, cb23, { noAck: false });
    });
});