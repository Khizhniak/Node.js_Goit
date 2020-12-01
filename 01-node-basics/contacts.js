const fs = require('fs');
const path = require('path');


const contactsPath = path.join(__dirname, "db\\contacts.json");

async function listContacts() {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) throw err;
        const textFromJson = JSON.parse(data)
        console.table(textFromJson);
    })}

async function getContactById(contactId) {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) throw err;
        const textFromJson = JSON.parse(data)
        const idContactFromJSON = textFromJson.find(item => item.id = contactId)
        console.table(idContactFromJSON);
    })}

async function removeContact(contactId) {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) throw err;
        const textFromJson = JSON.parse(data);
        const filterContacts = textFromJson.filter(item => item.id !== contactId);
        console.table(filterContacts);
    })}

async function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) throw err;
        const textFromJson = JSON.parse(data);
        const user = {
            id: 11,
            name,
            email,
            phone
        }
        textFromJson.push(user)
        console.table(textFromJson);
    })}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
