https://kousiknath.medium.com/dabbling-around-rabbit-mq-persistence-durability-message-routing-f4efc696098c



`Durability`        is a property of exchange, queue & topic. 
`Persistence`       is a property of message


RabbitMQ    ===>        message broker

Persistence
- in case the broker suddenly stops (ie rabbitMQ server crashes)
- our messages should be able to be recovered on the next restart.
- In order to persist messages, RabbitMQ has to sync all messages to the disk
- RabbitMQ persists messages in a special file & that file is garbage collected frequently.


Durability
- Both the exchange & the queue must be durable
- Otherwise on next broker restart (rabbitMQ server restart), 
- you will loose the queue as the exchange will not be able to redeclare the queue 
- and fetch the last state of the queue on its own.

But durable exchange & queue does not mean the corresponding messages in the queue are also durable. 
In order to make the messages durable, you have to declare them as persistent

