const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const bookRouter = require('./src/routes/bookRoutes');

const nav = [{ link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
  { link: '/auth/logout', title: 'Logut' }];

const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')(nav);


const app = express();
const port = process.env.PORT || 3000;

// app.use(morgan('combined'));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
      title: 'Library'
    }
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
