require('dotenv').config(); 

module.exports = {
  URI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f7roy.mongodb.net/Work-Website`
};