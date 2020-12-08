const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const {
  json
} = require("express");
const { relative } = require("path");
const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

const contactsPath = path.join(__dirname, "db\\contacts.json");

// app.get("/", async (req, res) => {
//   res.send("Hi")
// });

// app.get("/api/contacts", async (req, res) => {
//   fs.readFile(contactsPath, "utf8", (err, data) => {
//     if (err) throw err;
//     const textFromJson = JSON.parse(data);
//     return res.status(200).json({
//       status: "success",
//       code: 200,
//       data: textFromJson,
//     });
//   });
// });

// app.get(`/api/contacts/:id`, async (req, res) => {
//   fs.readFile(contactsPath, "utf8", (err, data) => {
//     if (err) throw err;

//     const textFromJson = JSON.parse(data);
//     const idContactFromJSON = textFromJson.find(
//       (item) => item.id == req.params.id
//     );
//     if (idContactFromJSON) {
//       return res.status(200).json({
//         status: "success",
//         code: 200,
//         data: idContactFromJSON,
//       });
//     } else {
//       return res.status(404).json({
//         code: 404,
//         message: "Not found",
//       });
//     }
//   });
// });

// app.post('/api/contacts', async (req, res) => {
//   if( "name", "email", "phone" in req.body ){
//     fs.readFile(contactsPath, "utf8", (err, data) => {
//       if (err) throw err;
//       const textFromJson = JSON.parse(data);
//       req.body.id = 11;
//       textFromJson.push(req.body)
//       return res.status(200).send(textFromJson);
//   })
//   } else {
//     return res.status(404).json({
//       status: "nope",
//       code: 404,
//       data: req.body
//     });
//   }
// });


// app.delete('/api/contacts/:id', async (req, res) => {
//   fs.readFile(contactsPath, "utf8", (err, data) => {
//     const textFromJson = JSON.parse(data);
//     if (textFromJson.find(item => item.id == req.params.id)) {
//       if (err) throw err;
//       const filterContacts = textFromJson.filter(item => item.id !== req.params.id);
//       return res.status(200).json({
//         message: "contact deleted"
//       })
//     } else {
//       return res.status(404).json({
//         message: "Not found"
//       })
//     }

//   })
// })



app.patch('/api/contacts/:id', async (req, res) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const textFromJson = JSON.parse(data)
    const idContactFromJSON = textFromJson.find(item => item.id == req.params.id)
    if ("email" in req.body || "phone" in req.body || "name" in req.body) {

      if("email" in req.body){
        idContactFromJSON.email = req.body.email
      }
      if("phone" in req.body){
        idContactFromJSON.phone = req.body.phone
      }
      if("name" in req.body){
        idContactFromJSON.name = req.body.name
      }
      return res.status(200).send(idContactFromJSON)
    } else {
      return res.status(400).json({message: "missing fields"})
    }
  })})

  //Если можно, пришлите вариант как можно было это сделать в 2 строки.

app.listen(3000);