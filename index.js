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
let nombreUser = '';
//Recibe el mensaje y devuelve una respuesta
client.on('message', async message => {
    console.log(message.body);

    if(message.body.toLocaleLowerCase() === 'hola'){
        //con reply se hace mencion al mensaje, reply es un metodo interno de sendMessage
        //msg.reply('Hola, Soy un robot');
        client.sendMessage(message.from ,'Hola!, Bienvenido!! :D');
        setTimeout(() => {
            client.sendMessage(message.from, '¿Cual es tu nombre?');
        }, 50);
        // client.sendMessage(message.from, `Tu numero es: ${numero}`)
    } else if(message.body.toLocaleLowerCase() !== 'hola' && !message.hasMedia && !nombreUser) {
        nombreUser = message.body;
        client.sendMessage(message.from, `Hola ${nombreUser}, Introduce el numero de la opcion que desees consultar: `);
        menu();
        
    } else if(message.body.toLocaleLowerCase() === 'productos' || message.body === '1' && message.body !== nombreUser) {
        client.sendMessage(message.from, 'Filipina ➡️ $800.00 \n Pantalon quirurjico ➡️ $350.00 \n Gorro quirurjico ➡️ $120.00');
        setTimeout(() => {
            menu();
        }, 100);
    } else if(message.body.toLocaleLowerCase() === 'horarios' || message.body === '2'){
        client.sendMessage(message.from, 'Lunes a Viernes: 🕘 9:00 a 18:00 hrs. \n Sábado: 🕘 9:00 a 🕑 14:00 hrs.');
        setTimeout(() => {
            menu();
        }, 100);
    } else if(message.body.toLocaleLowerCase() === 'quejas' || message.body === '3'){
        client.sendMessage(message.from, 'Por favor escribe tu queja para poder ser registrada y darle seguimiento o escribe menu para mostrar el *menu* nuevamente.');
    } else if(message.body.toLocaleLowerCase() === 'menu'){
        setTimeout(() => {
            menu();
        }, 100);
    } else if(message.body.toLocaleLowerCase() === 'salir' || message.body === '4'){
        const stickerPath = './assets/img/cheems.webp';
        const media = MessageMedia.fromFilePath(stickerPath);
        client.sendMessage(message.from, 'Gracias por comunicarte, que tengas un bomnito día. :D');
        client.sendMessage(message.from, media, { sendMediaAsSticker: true });
        nombreUser = '';
    } else {
        message.reply('La opción ingresada no esta disponible. \n Ingresa una de las opciones del siguiente menu.');
        setTimeout(() => {
            menu();
        }, 100);
    }

    function menu(){
        client.sendMessage(message.from, "Seleccione una opción: \n 1.- 🛍️Productos. \n 2.- ⏰Horarios \n 3.- 🤓Quejas \n 4.- 👋Salir");
    }
});


//Metodo para manejar mensajes que incluyen archivos
// client.on('message', async (message) => {
//     if(message.hasMedia){
//         const media = await message.downloadMedia();
//     }
// });

//Metodo para enviar mensajes con multimedia
// client.on('message', async (message) => {
//     if(message.body === '!send-media'){
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

// Emojis
// 💰
// 💵
// 🛒
// 📍
// ⏰
// 🕕
// 🕘
// 🕑
// 🛍️
// 😎
// 🤓
// 👋🏼

