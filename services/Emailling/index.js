const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  // secure: true,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// send when a doctor has been admitted to traumatologist registry
exports.sendMail = async (mail, subject, message) => {
  console.log("start sending mail ... ", mail);

  await transporter
    .sendMail({
      from: process.env.MAILTRAP_SENDER, // sender address
      to: mail, // list of receivers
      subject: subject, // Subject line
      html: message, // html body
    })
    .then((result) => {
      console.log("result of email sent to ", mail);
    })
    .catch((err) => {
      console.log("error while sending an email to", mail, err);
      throw err;
    });
};

const messageRejetMail = (infoUser) => `
  <b>Hello Dr. ${infoUser.prenom}  ${infoUser.nom.toUpperCase()} </b><br/>
  <div>        
    <span> Votre demande a été refusée </span>
    <p> Désolé, votre demande n'a pas été acceptée.</p><br/>
    ${
      infoUser.motif
        ? `<ul>   
          <li> motif : ${infoUser.motif} </li><br/>
        </ul>`
        : ``
    }    
    <span> Veuillez nous contacter par mail si vous désirez faire un recours à cette décision. </span><br/>
  </div>
  <em> Cordialement, <br/> RCT Cameroun </em><br/>
  <div> For every questions, contact us by clicking  <a href="https://rct.ao-cameroun.org">here</a></div>
`;

const messageValidateMail = (infoUser) => `
  <b>Hello Dr. ${infoUser.prenom}  ${infoUser.nom.toUpperCase()} </b><br/>
  <div>        
    <span> Votre demande a bien été validée </span>
    <p> Ci dessus vos informations de connexion par défaut pour accéder au registre</p><br/>
    <ul>   
      <li> username : ${infoUser.username} </li><br/>
      <li> password : ${infoUser.username} </li><br/>
    </ul>
    <span> Veuillez modifier votre nom d'utilisateur et votre mot de passe après avoir accéder au registre </span><br/>
    <span> Commencer maintenant ! </span><br/>
  </div>
  <em> Cordialement, <br/> RCT Cameroun </em><br/>
  <div> For every questions, contact us by clicking  <a href="https://rct.ao-cameroun.org">here</a></div>
`;

const messageWelcomeMail = (infoUser) => `
  <b>Hello Dr. ${infoUser.prenom}  ${infoUser.nom.toUpperCase()} </b><br/>
  <div>        
    <span> Bienvenue dans le plus grand réseau de traumatologie d'Afrique Centrale </span>
    <p> Nous avons bien recu votre demande d'adhésion au registre de traumatologie.
    Nous examinerons votre demande et une réponse vous sera envoyé dans un délai de 7 à 10 jours</p><br/>
    <span> Merci de votre confiance </span><br/>
    </div>
  <em> Cordialement, <br/> RCT Cameroun </em><br/>
  <div> For every questions, contact us by clicking  <a href="https://rct.ao-cameroun.org">here</a></div>
`;

exports.mailInfo = (infoUser) => {
  return {
    welcome: {
      subject: "Hello",
      message: messageWelcomeMail(infoUser),
    },
    accept: {
      subject: "Demande acceptée",
      message: messageValidateMail(infoUser),
    },
    rejet: {
      subject: "Demande refusée",
      message: messageRejetMail(infoUser),
    },
  };
};
