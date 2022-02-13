"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Book class: Represent a book app
var Book = function Book(author, title, isbn) {
  _classCallCheck(this, Book);

  this.author = author;
  this.title = title;
  this.isbn = isbn;
}; // UI class: Handle UI tasks


var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, [{
    key: "displayBooks",
    value: function displayBooks() {
      var books = Store.getBooks();
      books.forEach(function (book) {
        return UI.AddBookToList(book);
      });
    }
  }, {
    key: "AddBookToList",
    value: function AddBookToList(book) {
      var list = document.querySelector('#book-list');
      var row = document.createElement('tr');
      row.innerHTML = "\n        <td>".concat(book.title, "</td>\n        <td>").concat(book.author, "</td>\n        <td>").concat(book.isbn, "</td>\n        <td><a href=\"#\" class=\"btn btn-danger btn-sm delete\">X</a></td>\n      ");
      list.appendChild(row);
    }
  }, {
    key: "DeleteBookfromList",
    value: function DeleteBookfromList(el) {
      if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  }, {
    key: "ClearFields",
    value: function ClearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
    }
  }, {
    key: "ShowAlert",
    value: function ShowAlert(message, className) {
      var div = document.createElement('div');
      div.className = "alert alert-".concat(className);
      div.appendChild(document.createTextNode(message));
      var container = document.querySelector('.container');
      var form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      setTimeout(function () {
        return document.querySelector('.alert').remove();
      }, 2000);
    }
  }]);

  return UI;
}(); // Handle UI tasks


var Store =
/*#__PURE__*/
function () {
  function Store() {
    _classCallCheck(this, Store);
  }

  _createClass(Store, null, [{
    key: "getBooks",
    value: function getBooks() {
      var books;

      if (localStorage.getItem('books') == null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }
  }, {
    key: "addBooks",
    value: function addBooks() {
      var books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, {
    key: "removeBook",
    value: function removeBook(isbn) {
      var books = Store.getBooks();
      books.forEach(function (book, index) {
        if (book.isbn == isbn) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', books);
    }
  }]);

  return Store;
}();

document.addEventListener('DOMContentLoaded', UI.displayBooks); // Add a book

document.querySelector('#book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var title = document.querySelector('#title').value;
  var author = document.querySelector('#author').value;
  var isbn = document.querySelector('#isbn').value;

  if (title == '' || author == '' || isbn == '') {
    UI.ShowAlert('Please fill in fields', 'danger');
  } else {
    var _book = new Book(title, author, isbn);

    UI.AddBookToList(_book);
    Store.addBook(_book);
    UI.ShowAlert('Book is succesful added', 'success');
    UI.ClearFields();
  }
});
document.querySelector('#book-list').addEventListener('click', function (e) {
  UI.DeleteBookfromList(e.target);
  UI.ShowAlert('Book removed', 'success');
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});