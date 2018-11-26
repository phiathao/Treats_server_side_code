const router = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
router.get('/', (req, res)=>{
    console.log (req.query.q)
    let qString = `SELECT * FROM treats ORDER BY id ASC;`;
    if (req.query.q != undefined){
        qString = `SELECT * FROM treats WHERE name ILIKE $1;`;
        pool.query(qString, [`%${req.query.q}%`]).then((result) => {
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

// get query

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
