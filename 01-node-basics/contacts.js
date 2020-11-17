const fs = require('fs');
const path = require('path');


const contactsPath = 'C:\\Users\\Dusya\\Desktop\\Node.js_Goit\\01-node-basics\\db\\contacts.json';

fs.readFile(contactsPath, "utf8", (err, data) => {
    if(err){
        console.error(err.message);
        return
    }
    const textFromJson = JSON.parse(data)
     console.table(textFromJson);
})


  function listContacts() {
  }
  
  function getContactById(contactId) {

  }
  
  function removeContact(contactId) {

  }

  function addContact(name, email, phone) {
  }