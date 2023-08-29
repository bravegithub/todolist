const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'tododb',
})

export default async function handler(req,res) {
    const {idThread} = req.body
    const results = await new Promise((resolve,reject) =>{
        //const query =  `INSERT INTO thread(idUser,idThread,description,date) VALUES(idUser,idThread,description,date)`
        pool.query('DELETE FROM thread WHERE thread.idThread = ?',[idThread] ,(errors,results) =>{
        if(errors) reject(errors)
        else resolve(results)
    })
    }) 
    res.status(200).json({results})
}