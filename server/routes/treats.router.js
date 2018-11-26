const router = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
router.get('/', (req, res)=>{
    let qString = `SELECT * FROM treats ORDER BY id ASC;`;
    if (req.query.q != undefined){ // search button also use same get method
        qString = `SELECT * FROM treats WHERE name ILIKE $1;`; // reassign if there is a search/query.q request
        pool.query(qString, [`%${req.query.q}%`]).then((result) => { // %search% anything before or after /chocolate donut/ big donut ball
            res.send(result.rows);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    } else {
        pool.query(qString).then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }
});

// POST /treats
router.post('/', (req, res)=>{
    let qString = `INSERT INTO treats ( name, description, pic) VALUES ( $1, $2, $3);`;
    pool.query(qString, [req.body.name, req.body.description, req.body.pic]).then((result) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// PUT /treats/<id>
router.put('/:id', (req, res)=>{ 
    // console.log(req.body, req.params.id); // {name /description / pic} / id
    let qString = `UPDATE treats SET name = $1, description = $2, pic = $3 WHERE id = $4;`;
    pool.query(qString, [req.body.name, req.body.description, req.body.pic, req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
// DELETE /treats/<id>
router.delete('/:id', (req, res)=>{
    let qString = `DELETE FROM treats WHERE id = $1;`;
    pool.query(qString, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
module.exports = router;
