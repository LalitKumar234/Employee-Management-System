const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')

router.get('/:search', async (req, res) => {
    console.log(req.params.search)
    try {
        const employee = await Employees.find({"firstname": req.params.search})
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