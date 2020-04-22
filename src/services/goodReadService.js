const axios = require('axios');
const debug = require('debug')('app:goodReadService');
const xml2js = require('xml2js');

const parser = xml2js.Parser({ explicitArray: false });

function goodReadService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.goodreads.com/book/isbn/656?key=uipgFeaivHoSFemBLGvfGA')
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(err);
          debug(err);
        });
    });
  }

  return {
    getBookById
  };
}

module.exports = goodReadService();
