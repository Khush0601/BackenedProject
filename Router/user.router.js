const { createUser, onLogin } = require("../Controller/user.controller")

exports.userRoutes=(app)=>{
    app.post('/movieBooking/api/v1/createuser',createUser)
    app.post('/movieBooking/api/v1/onLogin',onLogin)
}