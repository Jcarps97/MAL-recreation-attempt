const express = require('express');
const path = require('path');
const db = require('./config/connection');
const controllers = require('./controllers');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
const root = path.join(__dirname, '../client', 'build')
// app.use('/db', express.static(path.join(__dirname, '/db')));

app.use(express.static(root));
app.use(controllers);

app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
})


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});