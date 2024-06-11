var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:1258@localhost:5672', function(error0, connection) {

    if (error0) { throw error0; }

    connection.createChannel(function(error1, channel) {
        if (error1) { 
            console.log("connection error23 ==> ", error1); 
            throw error1; 
        }
        var queue = 'task_queue23';
        channel.assertQueue(queue, { durable: true });
        setInterval(() => {
            var msg = "real_madrid23_task_queue" + "  " + `__${new Date().toISOString()}`;
            channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
            console.log(" msg is sent to task_queue23 ====>", msg);
        }, 2000);
        // connection.close();          // connection closed ===> task not sent to worker.js    ??
    });
});



// https://www.cloudamqp.com/blog/part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html