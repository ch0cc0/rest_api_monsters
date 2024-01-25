const { Router } = require('express');
const db = require('../../util/db_funcs');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const dmId = req.user.id
        const dungeons = await db.getDungeons(dmId);

        if (!dungeons) {
            res.status(500).send('No dungeons');
        } else {
            res.status(200).send(dungeons);
        }


    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/:dungeonId', async (req, res) => {
    try {
        const dungeonId = req.params.dungeonId;
        const order = await db.getDungeonById(dungeonId);
        
        if (!order) {
            res.status(500).send('No dungeon with that ID found');
        } else {
            res.status(200).send(order);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;