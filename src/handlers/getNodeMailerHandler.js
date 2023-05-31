const transporter = require("../config/nodemailer");

//?----------------------------------------Email Cambio De Contra :

const getNodeMailerHandler = async (req, res) => {
  try {
    const { email } = req.query;

    await transporter.sendMail({
      from: '"CasitasDelHornero " <lacasitadelhornero2023@gmail.com>', // el que va enviar el correo
      to: email, // para quien va a ir el corrreo electronico.
      //   subject: "Hello ✔", // Subject line
      text: "Hello world?", // texto plano
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style></style>
        </head>
        <body>
          <div
            style="
              width: 100%;
              background-color: #fd611a;
              text-align: center;
              border-radius: 10px;
            "
          >
            <div style="padding: 20px 10px 20px 10px">
              <img
                style="width: 100px; height: 100px; border-radius: 50%"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
              <div
                style="
                  width: 100%;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <div style="width: 100%; background-color: white; margin: 20px; ">
                  <h1>Cambio de tu Contraseña</h1>
                  <p>Hola Usuario</p>
                  <p>Hemos recibido una solicitud para restablecer la contraseña asociada a esta dirección de correo electrónico.</p>
                  <p> Si vos lo solicitaste, restablecé tu nueva contraseña desde aquí:</p>
                  <a
      style="
        width: 200px;
        background-color: black;
        color: white;
        padding: 10px;
        text-decoration: none;
        margin:20px;
        margin-bottom: 20px
      "
      href="http://localhost:5173/RestablecerContrase%C3%B1a"
      >REESTABLECER CONTRASEÑA</a
    >
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      
      
      `,
    }); // css por dentro del html
    res.status(200).send("Email Enviado Con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//?----------------------------------------Email de Registro :

const getRegistroNodeMailerHandler = async (req, res) => {
  try {
    const { gmail } = req.params;

    await transporter.sendMail({
      from: '"CasitasDelHornero " <lacasitadelhornero2023@gmail.com>', // el que va enviar el correo
      to: gmail, // para quien va a ir el corrreo electronico.
      //   subject: "Hello ✔", // Subject line
      text: "Hello world?", // texto plano
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style></style>
        </head>
        <body>
          <div
            style="
              width: 100%;
              background-color: #fd611a;
              text-align: center;
              border-radius: 10px;
            "
          >
            <div style="padding: 20px 10px 20px 10px">
              <img
                style="width: 100px; height: 100px; border-radius: 50%"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
              <div
                style="
                  width: 100%;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <div style="width: 100%; background-color: white; margin: 20px">
                  <h1>Registro Exitoso!!</h1>
                  <p>Bienvenido a CasitaDelHornero.com</p>
                  <p>Espero que disfrutes de un buen servicio.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    }); // css por dentro del html
    res.status(200).send("Email Enviado Con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//?--------------------------------------Email de Reserva:

const getNodeMailerReservaHandler = async (req, res) => {
  try {
    const { gmail } = req.params;

    await transporter.sendMail({
      from: '"CasitasDelHornero " <lacasitadelhornero2023@gmail.com>', // el que va enviar el correo
      to: gmail, // para quien va a ir el corrreo electronico.
      //   subject: "Hello ✔", // Subject line
      text: "Hello world?", // texto plano
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style></style>
        </head>
        <body>
          <div
            style="
              width: 100%;
              background-color: #fd611a;
              text-align: center;
              border-radius: 10px;
            "
          >
            <div style="padding: 20px 10px 20px 10px">
              <img
                style="width: 100px; height: 100px; border-radius: 50%"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
              <div
                style="
                  width: 100%;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <div style="width: 100%; background-color: white; margin: 20px">
                <h1>Gracias Por elegir a la CasitaDelHornero!</h1>
                <h3>Tu reserva fue todo un exito!</h3>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    }); // css por dentro del html
    res.status(200).send("Email Enviado Con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//?----------------------------------------------Email de Baneo:

const getNodeMailerBaneoHandler = async (req, res) => {
  try {
    const { gmail } = req.params;

    await transporter.sendMail({
      from: '"CasitasDelHornero " <lacasitadelhornero2023@gmail.com>', // el que va enviar el correo
      to: gmail, // para quien va a ir el corrreo electronico.
      //   subject: "Hello ✔", // Subject line
      text: "Hello world?", // texto plano
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style></style>
        </head>
        <body>
          <div
            style="
              width: 100%;
              background-color: #fd611a;
              text-align: center;
              border-radius: 10px;
            "
          >
            <div style="padding: 20px 10px 20px 10px">
              <img
                style="width: 100px; height: 100px; border-radius: 50%"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
              <div
                style="
                  width: 100%;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <div style="width: 100%; background-color: white; margin: 20px">
                <h1>Tu cuenta ha sido bloqueada temporalmente</h1>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    }); // css por dentro del html
    res.status(200).send("Email Enviado Con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//?-------------------------------------------Notificacion De Creacion del Hotel:

const getNodeMailerCreacionDeHotelHandler = async (req, res) => {
  try {
    const { gmail } = req.params;
    const { name } = req.query;

    console.log(gmail, name);

    await transporter.sendMail({
      from: '"CasitasDelHornero " <lacasitadelhornero2023@gmail.com>', // el que va enviar el correo
      to: gmail, // para quien va a ir el corrreo electronico.
      //   subject: "Hello ✔", // Subject line
      text: "Hello world?", // texto plano
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style></style>
        </head>
        <body>
          <div
            style="
              width: 100%;
              background-color: #fd611a;
              text-align: center;
              border-radius: 10px;
            "
          >
            <div style="padding: 20px 10px 20px 10px">
              <img
                style="width: 100px; height: 100px; border-radius: 50%"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
              <div
                style="
                  width: 100%;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <div style="width: 100%; background-color: white; margin: 20px">
                <h1>Hola.${name}</h1>
                <h3>Felicitaciones por haber publicado un Hotel en nuestra web!</h3>
                <p>Este correo es para confirmar que haz publicado un Hotel.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    }); // css por dentro del html
    res.status(200).send("Email Enviado Con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNodeMailerDesbaneoHandler = async (req, res) => {
  try {
    const { gmail } = req.params;

    await transporter.sendMail({
      from: '"CasitasDelHornero " <lacasitadelhornero2023@gmail.com>', // el que va enviar el correo
      to: gmail, // para quien va a ir el corrreo electronico.
      //   subject: "Hello ✔", // Subject line
      text: "Hello world?", // texto plano
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style></style>
        </head>
        <body>
          <div
            style="
              width: 100%;
              background-color: #fd611a;
              text-align: center;
              border-radius: 10px;
            "
          >
            <div style="padding: 20px 10px 20px 10px">
              <img
                style="width: 100px; height: 100px; border-radius: 50%"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
              <div
                style="
                  width: 100%;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <div style="width: 100%; background-color: white; margin: 20px">
                <h1>Tu cuenta ha sido desbloqueada</h1>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    }); // css por dentro del html
    res.status(200).send("Email Enviado Con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getNodeMailerHandler,
  getRegistroNodeMailerHandler,
  getNodeMailerReservaHandler,
  getNodeMailerBaneoHandler,
  getNodeMailerCreacionDeHotelHandler,
  getNodeMailerDesbaneoHandler
};
