const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'www.db4free.net',
    user:'tododb',
    password:'tododb123',
    database:'tododb',
})

export default async function handler(req,res) {
    const results = await new Promise((resolve,reject) =>{
        const { idThread } = req.body
        const query = 'SELECT idThread,description,date FROM thread where idThread = ?'
        pool.query(query ,[idThread],(errors,results) =>{
        if(errors) reject(errors)
        else resolve(results)
    })
    }) 
    res.status(200).json({results})
}