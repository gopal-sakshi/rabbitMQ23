# Send
- connect to RabbitMQ server
- Next we create a channel
- To send
    create a queue (queue01)
    then publish a message to the queue:
- channel.assertQueue
- channel.sendToQueue
- close the connection

# Receive
- we open a RabbitMQ connection and a channel
- declare the queue from which we're going to consume (queue01)
- channel.consume(queue01, cb23)     
    whenever something gets pushed into queue01 ----> cb23 gets triggered

`To list queues`
rabbitmqctl list_queues     (type this docker container terminal)

noAck:false                 
durable:true                the queue will survive a RabbitMQ crashes & restarts
persistent: true            mark our messages as persistent 
-------------------------------------------------------------------------------------------------

producer                        user application that sends messages.
queue                           buffer that stores messages.
consumer                        user application that receives messages.
-------------------------------------------------------------------------------------------------

Messaging Model
- producer never sends any messages directly to a queue... can only send messages to an exchange
    exchange = receives messages from producers & pushes them to queues
- exchange type
    Should it be appended to a particular queue? 
    Should it be appended to many queues? 
    Or should it get discarded
- exchange types
    direct          a message goes to the queues whose binding key 
                    exactly matches the routing key of the message.
    topic           * for one word; # for zero (or) more words
    headers
    fanout          broadcasts all the messages it receives to all the queues it knows
                    mindless broadcasting
-------------------------------------------------------------------------------------------------

channel.assertExchange(exchange, 'fanout', { durable: false });
channel.publish(exchange, '', Buffer.from(msg));

The messages will be lost if no queue is bound to the exchange yet, but that's okay for us; 
if no consumer is listening yet we can safely discard the message.


-------------------------------------------------------------------------------------------------