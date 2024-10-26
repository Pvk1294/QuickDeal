const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){ cb(null, 'uploads')},
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});
const upload = multer({ storage: storage });

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;
const secretKey = process.env.JWT_SECRET || 'MYKEY';

const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const Users = mongoose.model('Users', { username: String, password: String });
const Products = mongoose.model('Products', {
  pname: String,
  pdesc: String,
  price: Number,
  category: String,
  pimage: String
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/add-product', upload.single('pimage'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage = req.file.path;

    const product = new Products({ pname, pdesc, price, category, pimage});
    product.save()
    .then(() => res.send({ message: 'Saved successfully!' }))
    .catch(err => res.status(500).send({ message: 'Failed to save', error: err }));
});

app.get('/get-products', (req, res)=>{
  Products.find()
  .then((result) => {
    console.log(result, "user data");
    res.send({message: 'success', Products: result});
  })
  .catch((err) => {
    res.send({message: 'server err'})
  })
})


app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const users = new Users({ username, password });
  users.save()
    .then(() => res.send({ message: 'Saved successfully!' }))
    .catch(err => res.status(500).send({ message: 'Failed to save', error: err }));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      if (user.password !== password) {
        return res.status(401).send({ message: 'Wrong password' });
      }

      const token = jwt.sign({ data: user }, secretKey, { expiresIn: '1h' });
      res.send({ message: 'Login successful', token });
    })
    .catch(err => res.status(500).send({ message: 'Server error', error: err }));
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
