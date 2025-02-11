const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint para recibir los mensajes de WhatsApp
app.post('/webhook', async (req, res) => {
  const message = req.body;

  // Procesar el mensaje y responder
  await processIncomingMessage(message);

  // Responder con un estado 200 OK
  res.status(200).send('Mensaje recibido');
});

// Función para enviar un mensaje de vuelta
const sendMessage = async (to, message) => {
  const url = 'https://graph.facebook.com/v21.0/558436444022949/messages';
  const accessToken = 'EAAIlkzoeZAzkBOwneKMbrvNWRZBKkABLlP3SISJ8zS8QaBoetQe1YUQZBAl9ZACk0zmj2dZCcyWCQ4vrhaG8wKRA6dTdUyxX2ihSgZBQP2OmmGMcghWbOMDfj0KU8Urlot5y2VMzf0LrvbSBtsjBXIDintcXGJhkgrjRLvmQEN0NKAvYnP4AgsVLXHFLTbZCZC8kv5JczEJ8zRGsZCOfGFvs6h3HfDuCYuRD4vcUZD'; // Token de acceso obtenido

  const data = {
    messaging_product: 'whatsapp',
    to: to,
    text: { body: message }
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Mensaje enviado:', response.data);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
};

// Función para procesar los mensajes entrantes y responder
const processIncomingMessage = async (message) => {
  const incomingText = message.Body.toLowerCase();
  let replyText = '';

  // Aquí es donde implementas la lógica del chatbot
  if (incomingText.includes('hola')) {
    replyText = '¡Hola! ¿En qué puedo ayudarte?';
  } else {
    replyText = 'Lo siento, no entiendo tu mensaje. ¿Puedes reformular?';
  }

  // Enviar la respuesta al usuario
  await sendMessage(message.From, replyText);
};

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
