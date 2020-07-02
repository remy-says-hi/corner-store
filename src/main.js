import { getRandomWords } from './services/randomWord-service';
import { getBooks } from './services/newYorkTimes-service';
import $ from 'jquery'
import { Character } from './classes/character';
import { Book } from './classes/book';
import { CornerStore } from './classes/cornerStore';
import './styles.css';

const myCornerStore = new CornerStore(); // mock database

async function mullAgain(myCharacter) {
  await getCharacterTraits(myCharacter)
  displayTraits(myCharacter);
}

async function getCharacterTraits(myCharacter) {
  const wordArray = await getRandomWords();
  if(!wordArray) {
    $(".errors").html('<h1>There has been an error processing your request</h1>')
  } else {
    myCharacter.setCharacterTraits(wordArray);
  }
}

async function getBookArray() {
  const apiResponse = await getBooks();
  if(!apiResponse) {
    $(".errors").html('<h1>There has been an error processing your request</h1>')
  } else {
    displayBooks(apiResponse.results.books);
  }
}

function displayBooks(booksArray){
  booksArray.forEach(function(book) {
    let bookObj = new Book(book.title, book.author, book.description, book.book_image);
    myCornerStore.books.push(bookObj);
    $("#bookOutput").append(`
    <h4>${book.title}</h4>
    <h5>${book.author}</h5>
    <p>${book.description}</p>
    <img src=${book.book_image} alt=${book.title}>
    <hr>`    
  )});
}

function displayTraits(myCharacter) {
  $('#allAboutMe').text("");
  $('#allAboutMe').append(`<li>My temperament: ${myCharacter.temperament}</li>`);
  $('#allAboutMe').append(`<li>My personality: ${myCharacter.personality}</li>`);
  $('#allAboutMe').append(`<li>My greatest strength: ${myCharacter.greatestStrength}</li>`);
  $('#allAboutMe').append(`<li>My greatest weakness: ${myCharacter.greatestWeakness}</li>`);
}

$(document).ready(function() {
  let myCharacter;
  $('#startGame').click(function() {
    $('#form').hide();
    const name = $('#name').val();
    myCharacter = new Character(name);
    getCharacterTraits(myCharacter);
    $('.console').text(`Hi ${name}, tell us a bit about you...`);
    $('#charTraits').show();
  });

  $('#charTraits').click(function() {
    $('#charTraits').hide();
    displayTraits(myCharacter);
    $('#allAboutMe').show();
    $('#mullAgain').show();
    $('#ok').show();
  });

  $('#mullAgain').click(function() {
    mullAgain(myCharacter);
  });

  $('#ok').click(function() {
    $('#mullAgain').hide();
    $('#ok').hide();
    $('.console').text(`hello ${myCharacter.name}, we need to get some items to sell, what would you like to order first?`);
    $('#inventoryOptions').show();
  });
  $('#books').click(function() {
    $('#inventoryOptions').hide();
    $('.console').text('BOOKS!');
    getBookArray();
  });
});

