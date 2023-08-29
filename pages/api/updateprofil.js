import fs from "fs";
import mysql from "mysql2";
import multer from "multer";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tododb",
});

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  upload.single("image")(req, res, async (error) => {
    if (error) {
      console.error("Error uploading file:", error);
      res.status(500).end("Internal Server Error");
      return;
    }

    const { file, body: { username } } = req;

    if (!file || !username) {
      res.status(400).end("Please provide an image file and a username.");
      return;
    }

    try {
      const imageBuffer = fs.readFileSync(file.path);

      const query = `
        UPDATE user
        SET picture = ?
        WHERE username = ?
      `;

      await new Promise((resolve, reject) => {
        pool.query(query, [imageBuffer, username], (error, _results) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      res.status(200).end("Profile picture updated successfully.");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      res.status(500).end("Internal Server Error");
    }
  });
}