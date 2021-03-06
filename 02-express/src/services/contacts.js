const {ContactsRepository} = require("../repository")
class ContactsServices {
    constructor(){
        this.repositories = {
            contacts: new ContactsRepository()
        }
    }
    getAll() {
        const data = this.repositories.contacts.getAll()
        return data
    }
    getById(id){
        const data = this.repositories.contacts.getById(id)
        return data
    }
    create(body){
        const data = this.repositories.contacts.create(body)
        return {}
    }
    update(id, body){
        const data = this.repositories.contacts.update(id, body)
        return data
    }
    remove(id){
        const data = this.repositories.contacts.remove(id)
        return data
    }
}

module.exports = ContactsServices