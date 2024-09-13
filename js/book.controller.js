'use strict'

var gFilterBy = ''

function onInit(){
    render()
}

function render(){
    const elBookTable = document.querySelector('.book-tbl')
    // const books = gBooks
    const books = getBooks(gFilterBy)
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
                    <button class="read" onclick="onShowBookDetails(${book.id})">Read</button>
                    <button class="update" onclick="onRenderUpdateModal(${book.id})">Update</button>
                    <button class="delete" onclick="onRemoveBook(${book.id})">Delete</button>
                </td>
        </tr>
`).join('')

elBookTable.innerHTML = strHtmls


}

function onRemoveBook(bookId){
    onActionSuccessful(bookId, 'deleted')
    removeBook(bookId)
    render()
    
}

function onRenderUpdateModal(bookId){
    var innerHTML =`<div>
                    <input type="text" class="price-input" placeholder="Enter new price">
                    </div>
                    <button onclick="onUpdateBook(${bookId})">Update</button>`
    showModal(innerHTML)
}

function onUpdateBook(bookId){
   var elPriceInput = document.querySelector(".price-input")
    updatePrice(bookId,elPriceInput.value)
    closeModal()
    render()
    onActionSuccessful(bookId, 'updated')
}


function onRenderAddBook(){
    var innerHTML =`<div>
                    <input type="text" class="title-input" placeholder="Enter new book title">
                   </div>
                   <div>
                    <input type="text" class="price-input" placeholder="Enter new price">
                   </div>
                   <button onclick="onAddBook()">Add</button>`
    showModal(innerHTML)
}

function onAddBook(){
    var elTitleInput = document.querySelector(".title-input")
    var elPriceInput = document.querySelector(".price-input")
    var bookId = addBook(elTitleInput.value, elPriceInput.value)
    closeModal()
    render()
    onActionSuccessful(bookId, 'added')
}

function onShowBookDetails(bookId) {
    const book = getBookById(bookId)
    var innerHTML = `<img src="${book.imgUrl}" class="book-cover"/>
                <h3 class="title">${book.title}</h3>
                <div class='price-tag'>Price: <span class="price">$${book.price}</span></div>`
    showModal(innerHTML)
}

function showModal(innerHTML){
    const elModal = document.querySelector('.book-modal')
    const elDetails = elModal.querySelector('.book-modal-container')
    elDetails.innerHTML = innerHTML
    elModal.showModal()
}

function closeModal(){
    const elModal = document.querySelector('.book-modal')
    elModal.close()
}

function onFilterBy(filterInput) {
    gFilterBy = filterInput.value
    render()
}

function onClearFilter(){
    const elFilter = document.querySelector('.filter-input')
    elFilter.value =''
    onFilterBy(elFilter.value)    
}

function onActionSuccessful(bookId, action) {
    const book = getBookById(bookId)
    var innerHTML = `<h3 class="msg">The book: ${book.title} was ${action} successfully!</h3>`
    showModal(innerHTML)
    setTimeout(closeModal,2000)
}