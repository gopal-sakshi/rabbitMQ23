/*
    1) there is no node process nothing
    2) but this file runs forever coz it listens on rabbitMq
*/

const amqplib = require('amqplib');

(async () => {
    const queue = 'queue_001';
    const conn = await amqplib.connect('amqp://rabbitmq:1258@localhost:5672');
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue, { durable: false });
    ch1.consume(queue, (msg) => {
        if (msg !== null) { console.log('Received:', msg.content.toString()); ch1.ack(msg); } 
        else { console.log('Consumer cancelled by server'); }
    });
})();