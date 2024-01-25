const { Router } = require('express');
const db = require('../../util/db_funcs');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const id = req.user.id;
        const result = await db.createDungeon(id);

        if (!result) {
            res.status(500).send('Failed to make Dungeon');
        } else {
            res.status(201).send('Dungeon Created');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;