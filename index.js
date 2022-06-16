const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const {checkSession} = require('./middlewares/checkAuth');
// const checkAdmin = require('./middlewares/checkAdmin')



const indexRouter = require('./routes/index.router');
const cardRouter = require('./routes/card.router')
const registerRouter = require('./routes/register.router')
const loginRouter = require('./routes/login.router')
const logoutRouter = require('./routes/logout.router')
const userRouter = require('./routes/user.router')
const formRouter = require('./routes/form.router')
const albumRouter = require('./routes/album.router');
// const { locals } = require('./middlewares/locals');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(`${__dirname}/views/partials`);
const sessionConfig = {
  name: 'auth',
  secret: 'catdog',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // COOKIE'S LIFETIME — 1 DAY
  },
  resave: false,
  saveUninitialized: false,
};

app.use(cors());
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(checkSession);

// app.use(locals);

app.use('/', indexRouter);
app.use('/user', userRouter);
// app.use(checkAdmin);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/card', cardRouter);

app.use('/userForm', formRouter);
app.use('/album', albumRouter);
app.listen(3000, () => { console.log('Hello express'); });
