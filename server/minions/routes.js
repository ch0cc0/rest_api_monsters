const { Router } = require('express');
const { getAllMinions, getMinionById, getMinionsByType, getMinionsByCost, getMinionsByName} = require('../util/db_funcs');

const router = Router();

router.get('/', async (req, res) => {
    const { type, name } = req.query;
    const cost = parseFloat(req.query.cost);
    let minions;

    try {
        // Check for different combinations of query parameters
        if (type) {
            minions = await getMinionsByType(type);
        } else if (name) {
            minions = await getMinionsByName(name);
        } else if (cost) {
            minions = await getMinionsByCost(cost);
        } else {
            minions = await getAllMinions();
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
    const id = req.params.id;
    const minion = await getMinionById(id);

    if (!minion) {
        console.log('No Minion In Database With That ID');
        res.status(500).send('No Minion In Database With That ID');
    } else {
        res.status(200).send(minion);
    }
});

module.exports = router;