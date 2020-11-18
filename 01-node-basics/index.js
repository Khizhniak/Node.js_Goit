const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require("./contacts.js");
const argv = require("yargs").argv;

// listContacts()
// getContactById(4)
// removeContact(7)
// addContact('Khizhnyak Yulia', 'randomemail@gmail.com' , '(128) 354-9274')

function invokeAction({
    action,
    id,
    name,
    email,
    phone
}) {
    switch (action) {
        case "list":
            listContacts();
            break;

        case "get":
            getContactById(id);
            break;

        case "add":
            addContact(name, email, phone);
            break;

        case "remove":
            removeContact(id);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);