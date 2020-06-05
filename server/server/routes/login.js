const login = {
    name: '/login',
    generateCrud: false,
    extra: function(app, ok, errorHandler, notFound){
        app.post('/login', (req, res) => {
            ok({hola: "Aqui va el login"}, res)
        })
    }
}

module.exports = login