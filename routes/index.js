const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("Hello");
});

router.use('/mongo', require('./contacts'))

module.exports = router;