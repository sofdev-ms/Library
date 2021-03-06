const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');


function bookController(BookService) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo server');

        const db = client.db(dbName);

        const col = await db.collection('Books');
        const books = await col.find().toArray();
        res.render(
          'books',
          {
            nav: [{ link: '/books', title: 'Books' },
              { link: '/authors', title: 'Authors' },
              { link: '/auth/logout', title: 'Logout' }],
            title: 'Library',
            books
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    const { id } = req.params;
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo server');

        const db = client.db(dbName);

        const col = await db.collection('Books');
        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book.bookId);
        book.details = await BookService.getBookById(book.bookId);
        res.render(
          'book',
          {
            nav: [{ link: '/books', title: 'Books' },
              { link: '/authors', title: 'Authors' },
              { link: '/auth/logout', title: 'Logut' }],
            title: 'Library',
            book
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }
  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    //   res.redirect('/');
    // }
  }
  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
