const { Router } = require('express');
const db = require('../../util/db_funcs');

const router = Router();

router.get('/', async (req, res) => {  
    try {
        const { type, name } = req.query;
        const cost = parseFloat(req.query.cost);
        let minions;
        // Check for different combinations of query parameters
        if (type) {
            minions = await db.getMinionsByType(type);
        } else if (name) {
            minions = await db.getMinionsByName(name);
        } else if (cost) {
            minions = await db.getMinionsByCost(cost);
        } else {
            minions = await db.getAllMinions();
        }

        if (!minions || minions.length === 0) {
            return res.status(404).send('No matching minions found');
        }

        res.status(200).send(minions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const minion = await db.getMinionById(id);

        if (!minion) {
            console.log('No Minion In Database With That ID');
            res.status(404).send('No Minion In Database With That ID');
        } else {
            res.status(200).send(minion);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;