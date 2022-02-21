const router = require("express").Router();
const productsController = require('../controllers/productsController');

router.get('/getProducts', productsController.getProducts);
router.post('/postProduct', productsController.postProduct);
router.patch('/update/:addressItem', productsController.updateProduct);

//buy
router.post('/postBuyProduct/:addressItem', productsController.postBuyProduct);
router.get('/:addressBuyer', productsController.getAllBuyerProduct);

module.exports = router;