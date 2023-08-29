const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'tododb',
})

export default async function handler(req,res) {
    const {username , password} = req.body
    const results = await new Promise((resolve,reject) =>{
        const query = 'SELECT username,password FROM user WHERE user.username = ? and user.password = ? '
        pool.query(query, [username , password] ,(errors,results) =>{
        if(errors) reject(errors)
        else resolve(results)
    })
    }) 
    res.status(200).json({results})
}