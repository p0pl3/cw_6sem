const Router = require('express');

const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const roleRouter = require('./roleRouter');
const storeRouter = require('./storeRouter');
const articleRouter = require('./articleRouter');


const router = new Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/role', roleRouter);
router.use('/store', storeRouter);
router.use('/store_article', articleRouter);


module.exports = router;
