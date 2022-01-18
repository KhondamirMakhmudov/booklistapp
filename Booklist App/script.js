// Book class: Represent a book app

class Book {
    constructor(author, title, isbn) {
        this.author = author;
        this.title = title;
        this.isbn = isbn;
    }

}

// UI class: Handle UI tasks

class UI {

    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => UI.AddBookToList(book));
    }

    static AddBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

        list.appendChild(row);
    }

    static DeleteBookfromList(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static ClearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static ShowAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
}

// Handle UI tasks

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }
    static addBooks() {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn == isbn) {
                books.splice(index, 1);
            }
        });


        localStorage.setItem('books', books);
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();


    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title == '' || author == '' || isbn == '') {
        UI.ShowAlert('Please fill in fields', 'danger')
    } else {
        const book = new Book(title, author, isbn);

        UI.AddBookToList(book);

        Store.addBook(book);

        UI.ShowAlert('Book is succesful added', 'success');

        UI.ClearFields();
    }
});


document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.DeleteBookfromList(e.target);

    UI.ShowAlert('Book removed', 'success');

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})