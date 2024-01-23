const { Router } = require('express');
const db = require('../../util/db_funcs');

const router = Router();

// Get will only show username, email and motivation

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dungeonMaster = await db.getDungeonMasterById(id);

        if (!dungeonMaster) {
            console.log('No Dungeon Master In Database With That ID');
            res.status(404).send('No Dungeon Master In Database With That ID');
        } else {
            res.status(200).send(dungeonMaster);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// put will only be for motivation

router.put('/:id/motivation', async (req, res) => {
    try {
        const id = req.params.id;
        const motivation = req.body.motivation;

        if (!motivation) {
            console.log('No Motivation Provided');
            res.status(400).send('No Motivation Provided');
        }

        const result = await db.updateDungeonMasterMotivationById(motivation, id);

        if (!result) {
            res.status(404).send('Dungeon Master not found');
        } else {
            res.status(200).send('Updated Motivation');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.deleteDungeonMasterbyId(id);

        if (!result) {
            res.status(404).send('Dungeon Master not found');
        } else {
            res.status(200).send('Deleted Dungeon Master');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;