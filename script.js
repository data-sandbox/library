// Data Structures

let myLibrary = [];

const addButton = document.querySelector('#add-button');
const closeButton = document.querySelector('#close-button');
const submitButton = document.querySelector('#submit-button');
const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector("#modal-overlay");

const titleError = document.querySelector('.validate-title');
const authorError = document.querySelector('.validate-author');
const pagesError = document.querySelector('.validate-pages');

const cardGrid = document.getElementById('card-grid');

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// Create Default Library

defaultLibrary = [
  new Book('Born to Run', 'Christopher McDougall', 304, true),
  new Book("Can't Hurt Me", 'David Goggins', 364, false),
  new Book('Breath', 'James Nestor', 304, true),
]

for (let book in defaultLibrary) {
  myLibrary.push(defaultLibrary[book]);
  createCard(defaultLibrary[book]);
}

// UI

function getBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('checkbox').checked;
  return new Book(title, author, pages, isRead);
}

function createCard(book) {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readContainer = document.createElement('div');
  const readMsg = document.createElement('p');
  const isRead = document.createElement('input');
  isRead.setAttribute('type', 'checkbox');
  isRead.checked = book.isRead;
  const removeButton = document.createElement('button');

  bookCard.classList.add('card');
  readContainer.classList.add('read-container');

  title.textContent = `${book.title}`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  readMsg.textContent = 'Have you read it?'
  removeButton.textContent = 'Remove';

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);

  readContainer.appendChild(readMsg);
  readContainer.appendChild(isRead);
  bookCard.appendChild(readContainer);
  bookCard.appendChild(removeButton);

  cardGrid.appendChild(bookCard);

  removeButton.addEventListener('click', removeCard);
}

function removeBook(title) {
  console.log(title);
  myLibrary = myLibrary.filter((book) => book.title !== title);
}

function removeCard(e) {
  const title = this.parentNode.firstChild.textContent;
  removeBook(title);

  const gridNode = this.parentNode.parentNode;
  gridNode.removeChild(this.parentNode);
}

function resetForm() {
  document.getElementById("book-form").reset();
}

function validateForm(book) {
  if (book.title === '') {
    titleError.classList.remove('closed');
    return false
  } else {
    titleError.classList.add('closed');
  }

  if (book.author === '') {
    authorError.classList.remove('closed');
    return false
  } else {
    authorError.classList.add('closed');
  }

  if (book.pages === '') {
    pagesError.classList.remove('closed');
    return false
  } else {
    pagesError.classList.add('closed');
  }

  return true
}

function addBook(e) {
  e.preventDefault();
  const newBook = getBook();
  const isValidated = validateForm(newBook);
  if (isValidated) {
    myLibrary.push(newBook);
    console.table(myLibrary);
    createCard(newBook);
    closeModal();
  }
}

function openModal() {
  resetForm();
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
}

function closeModal() {
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
}

const handleKeyboardInput = (e) => {
  if (e.key === 'Escape') closeModal();
}

submitButton.addEventListener('click', addBook);
addButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

window.addEventListener('keydown', handleKeyboardInput);
