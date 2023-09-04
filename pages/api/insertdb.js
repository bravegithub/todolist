const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'www.db4free.net',
    user:'tododb',
    password:'tododb123',
    database:'tododb',
})

export default async function handler(req,res) {
    const {username,idThread,description,date,dateCreated} = req.body
    const results = await new Promise((resolve,reject) =>{
        //const query =  `INSERT INTO thread(idUser,idThread,description,date) VALUES(idUser,idThread,description,date)`
        pool.query('INSERT INTO thread(idUser,idThread,description,date,dateCreated) VALUES((SELECT idUser FROM user WHERE user.username = ?),?,?,?,?)',[username,idThread,description,date,dateCreated] ,(errors,results) =>{
        if(errors) reject(errors)
        else resolve(results)
    })
    }) 
    res.status(200).json({results})
}