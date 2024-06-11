var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:1258@localhost:5672', function (error0, connection) {
    if (error0) { throw error0; }
    connection.createChannel(function (error1, channel) {
        if (error1) { throw error1; }
        var exchange = 'direct_logs23';
        channel.assertExchange(exchange, 'direct', { durable: false });
        setInterval(() => {
            var msg = 'rma__' + `${new Date().toISOString()}`;
            channel.publish(exchange, 'INFO23', Buffer.from(msg));
            console.log("Sending info logs every 5 seconds ===> ", msg);
        }, 5000);
        setInterval(() => {
            var msg = 'barca__' + `${new Date().toISOString()}`;
            channel.publish(exchange, 'DEBUG23', Buffer.from(msg));
            console.log("Sending debug logs every 10 seconds ===> ", msg);
        }, 10000);
    });

    // setTimeout(function () {
    //     connection.close();
    //     process.exit(0)
    // }, 500);
});