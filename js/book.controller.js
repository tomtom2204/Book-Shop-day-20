'use strict'

var gFilterBy = ''
var gLayout = ''

function onInit() {
    gLayout = loadFromStorage(LAYOUT_KEY)
    render()
}


function render() {
    const toggleButton = document.querySelector('.toggleLayout')
    toggleButton.textContent = gLayout ? gLayout : 'Switch to Grid'
    const books = getBooks(gFilterBy)
    const elBookCards = document.querySelector('.card-area')
    const elBookTable = document.querySelector('.book-tbl')
    elBookCards.innerHTML = ""
    elBookTable.innerHTML = ""
    
    var strHtmls = ``

    if (toggleButton.textContent === 'Switch to Table') {
        document.querySelector('.card-area').style.gridTemplateColumns = `repeat(${books.length}, 1fr)`
        
        strHtmls += !books.length ? `<p>No matching books were found</p>` : books.map(book =>
            `<div class="card" style="grid-column: ${book.id+1}; grid-row: 1;">
                        <img src="${book.imgUrl}" alt="">
                        <div class="overlay">
                            <h3>${book.title}</h3>
                            <p>$${book.price}</p>
                           <!-- <a href="#">BUY NOW</a> -->
                           <div class="button-group">
                                <a href="#" class="read" onclick="onShowBookDetails(${book.id})">Read</a>
                                <a href="#" class="update" onclick="onRenderUpdateModal(${book.id})">Update</a>
                                <a href="#" class="delete" onclick="onRemoveBook(${book.id})">Delete</a>
                            </div>
                        </div>
                    </div>`
        ).join('')
        elBookCards.innerHTML = strHtmls
    } else {
        strHtmls += ` <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>`

        strHtmls += !books.length ? `<tr> <td colspan="3"  class="no-matching">No matching books were found</td></tr>` : books.map(book => `
        <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button class="read" onclick="onShowBookDetails(${book.id})">Read</button>
                    <button class="update" onclick="onRenderUpdateModal(${book.id})">Update</button>
                    <button class="delete" onclick="onRemoveBook(${book.id})">Delete</button>
                </td>
        </tr>`).join('')
        elBookTable.innerHTML = strHtmls
    }

    renderStats()
}

function renderStats() {
    const elExpensive = document.querySelector('.expensive')
    const expensiveBooks = getExpensiveBooks()
    elExpensive.innerText = expensiveBooks

    const elAverage = document.querySelector('.average')
    const averageBooks = getAverageBooks()
    elAverage.innerText = averageBooks

    const elCheap = document.querySelector('.cheap')
    const cheapBooks = getCheapBooks()
    elCheap.innerText = cheapBooks
}


function onRemoveBook(bookId) {
    onActionSuccessful(bookId, 'deleted')
    removeBook(bookId)
    render()

}

function onRenderUpdateModal(bookId) {
    var innerHTML = `<div>
                    <input type="text" class="price-input" placeholder="Enter new price">
                    </div>
                    <button onclick="onUpdateBook(${bookId})">Update</button>`
    showModal(innerHTML)
}

function onUpdateBook(bookId) {
    var elPriceInput = document.querySelector(".price-input")
    updatePrice(bookId, elPriceInput.value)
    closeModal()
    render()
    onActionSuccessful(bookId, 'updated')
}


function onRenderAddBook() {
    var innerHTML = `<div>
                    <input type="text" class="title-input" placeholder="Enter new book title">
                   </div>
                   <div>
                    <input type="text" class="price-input" placeholder="Enter new price">
                   </div>
                   <button onclick="onAddBook()">Add</button>`
    showModal(innerHTML)
}

function onAddBook() {
    var elTitleInput = document.querySelector(".title-input")
    var elPriceInput = document.querySelector(".price-input")
    if (!elTitleInput.value.trim() || !elPriceInput.value.trim()) return
    var bookId = addBook(elTitleInput.value, elPriceInput.value)
    closeModal()
    render()
    onActionSuccessful(bookId, 'added')
}

function onShowBookDetails(bookId) {
    const book = getBookById(bookId)
    var innerHTML = `<img src="${book.imgUrl}" class="book-cover"/>
                <h3 class="title">${book.title}</h3>
                <div class='price-tag'>Price: <span class="price">$${book.price}</span></div>
                <div class='rating'>
                <button onclick="onRateBook(${book.id},this)">+</button> 
                <span class="book-rating">${book.rating}</span>
                <button onclick="onRateBook(${book.id},this)">-</button>
                </div>`
    showModal(innerHTML)
}

function onRateBook(bookId,button){
    var raiting = updateRating(bookId, button.innerText === '+')
    renderRating(raiting)
}

function renderRating(raiting){
    var elRaiting = document.querySelector(".book-rating")
    elRaiting.innerText = raiting
}

function showModal(innerHTML) {
    const elModal = document.querySelector('.book-modal')
    const elDetails = elModal.querySelector('.book-modal-container')
    elDetails.innerHTML = innerHTML
    elModal.showModal()
}

function closeModal() {
    const elModal = document.querySelector('.book-modal')
    elModal.close()
}

function onFilterBy(filterInput) {
    gFilterBy = filterInput.value
    render()
}

function onClearFilter() {
    const elFilter = document.querySelector('.filter-input')
    elFilter.value = ''
    onFilterBy(elFilter.value)
}

function onActionSuccessful(bookId, action) {
    const book = getBookById(bookId)
    var innerHTML = `<h3 class="msg">The book: ${book.title} was ${action} successfully!</h3>`
    showModal(innerHTML)
    setTimeout(closeModal, 2000)
}

function changeLayout(button){
    button.textContent = button.textContent === 'Switch to Grid' ? 'Switch to Table' : 'Switch to Grid'
    saveLayout(button.textContent)
    gLayout = button.textContent
    render() 
}