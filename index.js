const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    //guarda la sesion localmente para no escanear el codigo qr cada que se inicie el cliente
    authStrategy: new LocalAuth(),
    // puppeteer: { headless: false },
    // puppeteer: {
    //     args: ['--no-sandbox', '--disable-setuid-sandbox']
    // }
});

//Generar una estrategia de autenticacion remota
// const store = new MongoStore({ mongoose: mongoose});
// const client1 = new Client({
//     authStrategy: new RemoteAuth({
//         store: store,
//         backupSyncIntervalMs: 300000
//     })
// });

//Genera un codigo qr para poder conectar a whatsapp web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Imprimi en consola si el cliente esta listo
client.on('ready', () => {
    console.log('client is ready');
});

//Recibe el mensaje y devuelve una respuesta
client.on('message', message => {
    console.log(message.body);

    if(message.body.toLocaleLowerCase() === 'hola'){
        //con reply se hace mencion al mensaje, reply es un metodo interno de sendmsg
        //msg.reply('Hola, Soy un robot');
        //crear un boton y enviarlo
        // let button = new Buttons('Button body', [{ body: 'Aceptar' }, { body: 'rechazar' }], 'title', 'footer');
        // client.sendMessage(message.from, button);
        // const numero = message.from;
        client.sendMessage(message.from ,'Hola!, soy un bot :D');
        client.sendMessage(message.from, '¿Cual es tu nombre?');
        // client.sendMessage(message.from, `Tu numero es: ${numero}`)
    } 

    else if(message.body.toLocaleLowerCase() !== 'hola' && !message.hasMedia) {
        const nombreUser = message.body;
        client.sendMessage(message.from, `Hola ${nombreUser}, ¿Como puedo ayudarte?`);
    }

    else if(message.body.toLocaleLowerCase() === 'productos') {
        client.sendMessage(message.from, 'Coca cola ➡️ $20.00')
    } else {
        message.reply('No entiendo tu pregunta, vuelve a formular la pregunta.')
    }

});

//Metodo para manejar mensajes que incluyen archivos
// client.on('msg', async (msg) => {
//     if(msg.hasMedia){
//         const media = await msg.downloadMedia();
//     }
// });

//Metodo para enviar mensajes con multimedia
// client.on('message', async (msg) => {
//     if(msg.body === '!send-media'){
//         const media = new messaageMedia('image/png', base64Image);
//                                                 //se puede agregar un nombre al archivo agregando la propiedad caption
//         await client. sendMessage(msg.from, media, {caption: 'titulo'} );
//     }
// })

//Mencionar usuarios
// client.on('message', async (msg) => {
//     const chat = await msg.getChat();
//     const user = await msg.getContact();
//     await chat.sendMessage(`Hola ${user.name}`, {
//         mentions: [user]
//     });

//     let userPhone = 9513584017;
//     await chat.sendMessage(`Hola @${userPhone}`, {
//         mentions: [userPhone + 'c.us']
//     })
// });

//Inicializa el cliente    
client.initialize();

