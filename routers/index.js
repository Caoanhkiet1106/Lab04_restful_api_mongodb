
const sachRouter = require('./sachRouter');
const routes = (app) => {
    app.use('/', sachRouter)
}

module.exports = routes