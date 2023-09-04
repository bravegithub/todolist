const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'www.db4free.net',
    user:'tododb',
    password:'tododb123',
    database:'tododb',
})

export default async function handler(req,res) {
    const {idUser,username,password} = req.body
    const results = await new Promise((resolve,reject) =>{
        //const query =  `INSERT INTO thread(idUser,idThread,description,date) VALUES(idUser,idThread,description,date)`
        pool.query('INSERT INTO user(idUser,username,password) VALUES(?,?,?)',[idUser,username,password] ,(errors,results) =>{
        if(errors) reject(errors)
        else resolve(results)
    })
    }) 
    res.status(200).json({results})
}