const { Router } = require('express');
const db = require('../../util/db_funcs');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const id = req.user.id;
        const result = await db.createCart(id);

        if (!result) {
            res.status(500).send('Failed Creating Cart');
        } else {
            res.status(201).send('Cart created successfully');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    
});

router.post('/:cartId', async (req, res) => {
    try {
        const id = req.user.id;
        const minion_id = req.body.minion_id;
        const quantity = req.body.quantity;
        const result = await db.addMinionToCart(id, minion_id, quantity);

        if (!result) {
            res.status(500).send('Failed adding minion to cart');
        } else {
            res.status(201).send('Added minion to cart');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;

        const cart = await db.getCart(cartId);

        if (!cart) {
            res.status(500).send('Failed to get cart');
        } else {
            res.status(201).send(cart);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;