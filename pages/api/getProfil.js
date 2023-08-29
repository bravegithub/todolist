const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tododb',
});

export default async function handler(req, res) {
  try {
    const { username } = req.body;
    const query = 'SELECT picture FROM user WHERE user.username = ?';

    const results = await new Promise((resolve, reject) => {
      pool.query(query, [username], (error, queryResults) => {
        if (error) reject(error);
        else resolve(queryResults);
      });
    });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}