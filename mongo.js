require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL
console.log(url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

switch (process.argv.length) {
    case 2:
        console.log('Phonebook:')
        Person.find({}).then(result => {
            result.forEach(note => {
                console.log(note.name, note.number)
            })
            mongoose.connection.close()
        })
        break
    case 4:
        const person = process.argv[2]
        const number = process.argv[3]
        const note = new Person({
            name: person,
            number: number
        })
        note.save().then(response => {
            console.log(`person ${person} with number ${number} saved to databse`)
            mongoose.connection.close()
        })
        break
    default:
        console.log('Usage: mongo.js [name number]')
        mongoose.connection.close()
}

//process.exit(0)





