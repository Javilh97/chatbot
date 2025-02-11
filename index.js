const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();


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

