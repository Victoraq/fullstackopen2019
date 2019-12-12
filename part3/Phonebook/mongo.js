const mongoose = require('mongoose')

if ( process.argv.length < 2 ) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vasba:${password}@cluster0-evtop.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String,
    "id": Number,
})

const Person = mongoose.model('Person', personSchema)

// show all the persons in the database
if ( process.argv.length < 4 ) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
})