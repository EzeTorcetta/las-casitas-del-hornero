const { Request, User } = require("../db");

//*  CONTROLLER QUE  TRAE TODAS LAS REQUESTS (SOLO EL GIGACHAD MEGA ADMIN PUEDE 💯)
const getRequest = async (id_user) => {
    const findUser = await User.findByPk(id_user)

    if (!findUser) throw new Error("Usuario no registrado")
    if (findUser.rol != 3) throw new Error("No tienes permisos para acceder a esta funcion")

    const allRequests = await Request.findAll()

    return allRequests
}

const postRequest = async (message, id_user) => {
    const findUser = await User.findByPk(id_user)
    if (!findUser) throw new Error("Usuario no registrado")

    const findUser2 = await Request.findOne({
        where: {
            UserId: id_user,
        },
    });

    if (findUser2) {
        throw new Error("No puedes realizar mas de una peticion");
    }


    newRequest = await Request.create({
        message,
        username: findUser.username,
        email: findUser.email,

    });

    await findUser.addRequest(newRequest)


    return
}

const deleteRequest = async (id_user) => {
    const findUser = await User.findByPk(id_user)

    if (!findUser) throw new Error("Usuario no registrado")
    if (findUser.rol != 3) throw new Error("No tienes permisos para acceder a esta funcion")

    await Request.destroy({
        where: { status: true },
    });

    return
}

const putRequest = async (id) => {
    const request = await Request.findByPk(id)

    if (request) {
        if (request.status == true) { request.status = false } else {

            request.status = true
        }

        await request.save();
    } else {
        throw new Error("La peticion no existe");
    }

    return
}

module.exports = { getRequest, postRequest, deleteRequest, putRequest }