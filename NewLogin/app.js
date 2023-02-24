
const config = require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = require('./routes/route.js');
const helmet = require('helmet');

class Server {
    constructor() {
        this.initExpressMiddleware();
        this.initRoutes();
        this.start();
    }

    initExpressMiddleware() {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        // app.use(authCheck.handler);
        app.use(helmet());
    }

    initRoutes() {
        app.use('/v1/', router);
    }

    start() {
        try {
            app.listen(config.PORT||4000, function (error) {
                if (error) {
                    console.log('Server Not Started yet ' + error)
                } else {
                    console.log({ message: 'server', port: config.PORT, operation: 'server start' });
                }

            })
        } catch (error) {
            console.log('Server Not Started yet ' + error)
        }
    }
}

new Server();




