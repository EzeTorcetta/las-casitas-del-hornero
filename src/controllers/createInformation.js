const createInformation = () => {
    user = [];

    user.push({
        username: "Juan Martin",
        password: "contrasenia",
        email: "juanmartin@gmail.com",
        admin: true,
        /*Hotel:[{
            name:"MustafaHotel",
            email:"mustafahotel@gmail.com",
            phoneNumber:"01134531",
            province:"BUENOS AIRES",
            location: [1200, -1200],
        },{
            name:"MustafaHotel",
            email:"mustafahotel@gmail.com",
            phoneNumber:"01134531",
            province:"BUENOS AIRES",
            location: [1200, -1200],
        },]*/
    });

    user.push({
        username: "Jose",
        password: "contrasenia",
        email: "jose@gmail.com",
        admin: false,
    });

    user.push({
        username: "Eze",
        password: "contrasenia",
        email: "eze@gmail.com",
        admin: false,
    });

    user.push({
        username: "Manuel",
        password: "contrasenia",
        email: "manuel@gmail.com",
        admin: true,
    });

}

module.exports = createInformation;