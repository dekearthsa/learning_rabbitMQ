const amqplib = require('amqplib/callback_api');
const queue = 'tasks';

amqplib.connect('amqp://host.docker.internal', (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    setInterval(() => {
      ch1.sendToQueue(queue, Buffer.from('something to do'));
    }, 1000);
  });
});