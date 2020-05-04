require('dotenv').config();

const { DB_NAME, DB_PASS, DB_HOST, DB_USER } = process.env;
module.exports = {
  database: {
    URI: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  }
};
