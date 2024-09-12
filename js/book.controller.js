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
                    <button class="read" onclick="onReadClick('${book.id}')">Read</button>
                    <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
                    <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
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