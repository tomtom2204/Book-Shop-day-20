'use strict'

const BOOKS_KEY = 'books'
const LAYOUT_KEY = 'layout'
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

function updateRating(bookId, action){ 
    const book = gBooks.find(book => book.id === bookId)
    var newRating = action ? book.rating + 1 : book.rating - 1 
    if( newRating >= 0 && newRating <=5) book.rating = newRating
    _saveBooks()
    return book.rating
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function addBook(title, price){
    var bookId = gNextId++
    gBooks.push(
    {
        id: bookId,
        title,
        price,
        imgUrl: `/img/book-cover${getRandomInt(0, 9)}.jpg`,
        rating: 0
    })
    _saveBooks()
    return bookId
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


function saveLayout(userPreference) {
    saveToStorage(LAYOUT_KEY, userPreference)
}

// Private functions
function _createBooks() {
    gBooks = loadFromStorage(BOOKS_KEY)

    if(gBooks && gBooks.length !== 0){ 
        gNextId = gBooks[gBooks.length-1].id+1
        return
    }

    gBooks = []
    addBook('The adventures of Lori Ipsi', 120)
    addBook('World Atlas', 300)
    addBook('Zorba the Greek', 87)
    _saveBooks()
}

function _saveBooks() {
    saveToStorage(BOOKS_KEY, gBooks)
}





