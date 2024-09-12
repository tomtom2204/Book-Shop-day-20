'use strict'

var gBooks = getBooks()
function getBooks() {
    return [
        {
            id: 'bg4J78',
            title: 'The adventures of Lori Ipsi',
            price: 120,
            imgUrl: 'lori-ipsi.jpg'
        },
        {
            id: 'bg4J79',
            title: 'World Atlas',
            price: 300,
            imgUrl: 'lori-ipsi.jpg'
        },
        {
            id: 'bg4J81',
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'lori-ipsi.jpg'
        }
    ]
}

function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}

function updatePrice(bookId, price){
    const book = gBooks.find(book => book.id === bookId)
    book.price = price
}

function addBook(title, price){
    gBooks.push(
    {
        id: makeid(),
        title,
        price,
        imgUrl: 'lori-ipsi.jpg'
    })
}