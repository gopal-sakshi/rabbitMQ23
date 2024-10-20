/* 
    this is express server... it runs on some port
    it puts some info23 in rabbitMq queue
*/

const express = require('express');
const app = express();
const port = 7002;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.post('/put_in_queue23', async (req, res) => {
    console.log("req.body ===> ", req.body);
    const result = await putInQueue(req.body);
    res.status(200).send({ info23: 'settu', time23: `${new Date().toISOString()}`, result23: result });
});

app.get('/', (req, res) => {
    res.status(200).send('server that puts stuff in rabbitMq');
});
/***************************************************************************** */

var mq = {};
const amqp = require("amqplib");
const { Buffer } = require("buffer");

async function getMqClient() {
    if (typeof mq.client === "undefined") {
        console.log("mq client created");
        mq.client = await amqp.connect(`amqp://rabbitmq:1258@localhost:5672`);
    } else {
        console.log("re-using mq client");
    }
    return mq.client;
}

async function putInQueue(payload23) {
    let mqclient = await getMqClient(); 
    let result = {};
    try {
        const ch1 = await mqclient.createChannel();
        await ch1.assertQueue("queue_001", { durable: false });
        result = await ch1.sendToQueue("queue_001", Buffer.from(JSON.stringify(payload23)));
    } catch (error) {
        console.log("Error in mq-producer::", error);
        throw error;
    }
    return result;
}
/***************************************************************************** */