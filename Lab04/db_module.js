const EventEmitter = require('events');

class DB extends EventEmitter {
    db_data = [
        {id: 1, name: 'Демидов Д.Д', bday: '1994-01-07'},
        {id: 2, name: 'Петров П.С', bday: '1999-09-02'},
        {id: 3, name: 'Веселов В.К', bday: '2004-05-01'},
    ]

    async insert(person) {
        return new Promise((resolve, reject) => {
            let index = this.db_data.findIndex(ind => ind.id == person.id);
            if(index === -1) {
                this.db_data.push(person);
                resolve(person);
            }else {
                reject(createError("Found person with id " + person.id));
            }
        });
    };

    async update(person) {
        return new Promise((resolve, reject) =>{
            let index = this.db_data.findIndex(ind => ind.id == person.id);
            if(index !== -1) {
                this.db_data[index] = person;
                resolve(person);
            }else {
                reject(createError("There's no person with id " + person.id));
            }
        });
    };
    async delete(id) {
        return new Promise((resolve, reject) => {
            let index = this.db_data.findIndex(ind => ind.id == id);
            if(index !== -1) {
                this.db_data.splice(index, 1);
                resolve(id);
            }else {
                reject(createError("There's no person with id " + id));
            }
        });
    };

    async select() {
        return new Promise((resolve, reject) => {
            resolve(this.db_data);
        });
    }
}

const createError = (message) => {
    return {
        error: message
    }
}

module.exports.DB = DB;