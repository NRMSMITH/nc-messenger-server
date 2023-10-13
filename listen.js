const { httpServer } = require('./app') 

httpServer.listen(3000, () => {
    console.log('server running on 3000')
})