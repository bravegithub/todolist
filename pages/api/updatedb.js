const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'tododb',
})

export default async function handler(req,res) {
    const {idThread,description,date} = req.body
    const results = await new Promise((resolve,reject) =>{
        pool.query('UPDATE  thread SET description = ?,date = ? WHERE thread.idThread = ?',[description,date,idThread] ,(errors,results) =>{
        if(errors) reject(errors)
        else resolve(results)
    })
    }) 
    res.status(200).json({results})
}