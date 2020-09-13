const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const passport = require('passport');

const router = require('./routes/index');
const { devConfig } = require('./env');
const { configureJWTStrategy } = require('./middlewares/passport');

// const swaggerDocument = require('./config/swagger.json');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(devConfig.databaseUrl)
.then(() => console.log('db connected'));

const PORT = process.env.PORT || devConfig.port || 3000;



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize({ userProperty: 'currentUser' }));
configureJWTStrategy();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
//     explorer: true
// }))



//-----------------------------------------
app.use('/api', router);

app.use((req, res, next) => {
    const error = new Error('Invalid route');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, () => console.log(`server running at port ${PORT}`));