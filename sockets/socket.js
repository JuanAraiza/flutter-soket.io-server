const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Héroes del Silencio' ) );
bands.addBand( new Band( 'Metallica' ) );





console.log('init server');

// Mensajes de sockets

io.on('connection', client => {
    console.log('Cliente Conectado');


    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { 
        console.log('Cliente Descoenctado')
     });

    client.on('mensaje', ( payload ) => {
        console.log('mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo Mensaje del Admin'});
    });

client.on('vote-band', (payload) => {
    //console.log(payload);
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());

});

client.on('add-band', (payload) => {
    //console.log(payload);
    const newBand = new Band(payload.name)
    bands.addBand( new Band() );
    io.emit('active-bands', bands.getBands());

});


client.on('delete-band', (payload) => {
    //console.log(payload);

    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands());

});

//escuchar add-band

    client.on('emitir-mensaje', (payload) =>{
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload); //emite a todos
        client.broadcast.emit('nuevo-mensaje', payload ); // emite a todos menos el que lo emitio
    });

  });
