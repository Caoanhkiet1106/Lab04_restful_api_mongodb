
const sachRouter = require('./sachRouter');
const siteRouter = require('./siteRouter')
const routes = (app) => {
    app.use('/books', sachRouter)
    // app.use('/', siteRouter)
    app.use('/', siteRouter)

}

module.exports = routes