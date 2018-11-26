const router = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
router.get('/', (req, res)=>{
    console.log('in Get')
    let qString = `SELECT * FROM treats ORDER BY id ASC;`;
    pool.query(qString).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
// POST /treats
router.post('/', (req, res)=>{
    console.log('in Get')
});
// PUT /treats/<id>
router.put('/', (req, res)=>{
    console.log('in Get')
});
// DELETE /treats/<id>
router.delete('/', (req, res)=>{
    console.log('in Get')
});
module.exports = router;
