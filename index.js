const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('client is ready');
});

client.on('message', message => {
    console.log(message.body);

    if(message.body.toLocaleLowerCase() == 'hola'){
        message.reply('Hola!, soy un bot :D');
    } else {
        message.reply('No entiendo tu pregunta, vuelve a formular la preguntas.')
    }

});

client.initialize();

