const fs = require('fs');
const path = require('path');


const contactsPath = path.join(__dirname, "db\\contacts.json");

function listContacts() {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) {
            console.error(err.message);
            return
        }
        const textFromJson = JSON.parse(data)
        console.table(textFromJson);
    })
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) {
            console.error(err.message);
            return
        }
        const textFromJson = JSON.parse(data)
        const idContactFromJSON = textFromJson.find(item => item.id = contactId)
        console.table(idContactFromJSON);

    })
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) {
            console.error(err.message);
            return
        }
        const textFromJson = JSON.parse(data);
        const filterContacts = textFromJson.filter(item => item.id !== contactId);
        console.table(filterContacts);
    });
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) {
            console.error(err.message);
            return
        }
        const textFromJson = JSON.parse(data);

        const user = {
            id: 11,
            name,
            email,
            phone
        }
        textFromJson.push(user)
        console.table(textFromJson);
    });
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
