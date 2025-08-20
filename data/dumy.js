const fs = require("fs");
const path = require("path");

let fetchData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "./dummyData.jsonc"), "utf8", (err, data) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(data));
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
};

module.exports = { fetchData };
