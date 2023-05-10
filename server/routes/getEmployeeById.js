const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const employee = await Employees.findById(req.params.id)
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.json(employee);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error updating employee: ${err.message}`);
    }

})
module.exports = router;