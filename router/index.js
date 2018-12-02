const express = require('express');
const router = express.Router();

const books = require('./books');

router.get('/', (req,res)=>{
    res.send('Hello, world!');
});

router.use('/api/books', books);

module.exports = router;