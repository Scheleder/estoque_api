require('dotenv').config();
const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = process.env.MAIL_ENDPOINT;
const FROM = process.env.MAIL_FROM;
const APP = process.env.MAIL_APP;
const sender = { email: FROM, name: APP };

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

exports.sendCodeVerification = async (user) => {

  const recipients = [
    {
      email: user.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: APP,
      text: "Olá " + user.name + "! Bem vindo ao " + APP + ". Use o código " + user.code + " para confirmar seu endereço de e-mail.",
      category: "Welcome Email",
    })
    .then(function (results) {
      //console.log(results)
      return results.success;
    });

}

exports.sendResetCode = async (user) => {

  const recipients = [
    {
      email: user.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: APP,
      text: "Olá " + user.name + "! Se você solicitou a alteração de senha no " + APP + ". Use o código " + user.code + " para alterá-la. Depois use este mesmo código como senha para acessar e então altere a sua senha dentro do so sistema.",
      category: "Welcome Email",
    })
    .then(function (results) {
      //console.log(results)
      return results.success;
    });

}
