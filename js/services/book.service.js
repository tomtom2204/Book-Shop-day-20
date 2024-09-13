'use strict'

const BOOKS_KEY = 'books'

var gBooks = []
var gNextId = 0
_createBooks()



function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    _saveBooks()
}

function updatePrice(bookId, price){
    const book = gBooks.find(book => book.id === bookId)
    book.price = price
    _saveBooks()
}



function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

// Private functions

function _createBooks() {
    gBooks = loadFromStorage(BOOKS_KEY)

    console.log(gBooks)
    if(gBooks && gBooks.length !== 0){ 
        console.log(gBooks)
        gNextId = gBooks[gBooks.length-1].id+1
        return
    }

    gBooks = []
    addBook('The adventures of Lori Ipsi', 120)
    addBook('World Atlas', 300)
    addBook('Zorba the Greek', 87)
    _saveBooks()
}


function addBook(title, price){
    var bookId = gNextId++
    gBooks.push(
    {
        id: bookId,
        title,
        price,
        imgUrl: `/img/book-cover${getRandomInt(0, 9)}.jpg`
    })
    _saveBooks()
    return bookId
}

function _saveBooks() {
    saveToStorage(BOOKS_KEY, gBooks)
}

function getBooks(filterBy) {           // List
    if(!filterBy) return gBooks

    return gBooks.filter(book => book.title.toLowerCase().startsWith(filterBy.toLowerCase()))
}

function getExpensiveBooks() {
    const expensiveBooks = gBooks.filter(book => book.price >= 200)
    return expensiveBooks.length
}

function getAverageBooks() {
    const averageBooks = gBooks.filter(book => book.price < 200 && book.price > 80)
    return averageBooks.length
}

function getCheapBooks() {
    const cheapBooks = gBooks.filter(book => book.price <= 80)
    return cheapBooks.length
}