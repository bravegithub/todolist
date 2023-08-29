const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'tododb',
})

export default async function handler(req,res) {
    const {username} = req.body
    const results = await new Promise((resolve,reject) =>{
        const query = 'SELECT username FROM user WHERE user.username = ?'
        pool.query(query, [username ] ,(errors,results) =>{
        if(errors) reject(errors)
        else resolve(results)
    })
    }) 
    res.status(200).json({results})
}