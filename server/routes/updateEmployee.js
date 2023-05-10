const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.put('/:id', async (req, res) => {
    try {
        const employee = await Employees.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.send('Employee updated successfully');
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error updating employee: ${err.message}`);
    }

})
module.exports = router;