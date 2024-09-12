'use strict'

function onInit(){
    render()
}

function render(){
    const elBookTable = document.querySelector('.book-tbl')
    const books = gBooks
    var strHtmls = ` <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>`
    strHtmls += books.map(book => `
        <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button class="read" onclick="onShowBookDetails(event,${book.id})">Read</button>
                    <button class="update" onclick="onUpdateBook(${book.id})">Update</button>
                    <button class="delete" onclick="onRemoveBook(${book.id})">Delete</button>
                </td>
        </tr>
`).join('')

elBookTable.innerHTML = strHtmls


}

function onRemoveBook(bookId){
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId){
    var price = prompt("Please enter the new price:")
    updatePrice(bookId,price)
    render()
}

function onAddBook(){
    var title = prompt("Please enter the new book title:")
    var price = +prompt("Please enter the new book price:")
    addBook(title, price)
    render()
}

function onShowBookDetails(ev, bookId) {
    ev.stopPropagation()

    const elModal = document.querySelector('.details-modal')
    const elDetails = elModal.querySelector('.book-details-container')
    // const elDetails = document.querySelector('book-details-container')

    const book = getBookById(bookId)
    console.log(bookId)
    const bookJson = JSON.stringify(book, null, 2)
    console.log(bookJson)
    elDetails.innerHTML = `<img src="${book.imgUrl}" class="book-cover"/>
                <h3 class="title">${book.title}</h3>
                <div class='price-tag'>Price: <span class="price">$${book.price}</span></div>`
    elModal.showModal()
}