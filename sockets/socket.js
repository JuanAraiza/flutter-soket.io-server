const { io } = require('../index');

// Mensajes de sockets

io.on('connection', client => {
    console.log('Cliente Conectado');
    client.on('disconnect', () => { 
        console.log('Cliente Descoenctado')
     });

    client.on('mensaje', ( payload ) => {
        console.log('mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo Mensaje del Admin'});
    });

  });
