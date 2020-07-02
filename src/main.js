import { getRandomWords } from './services/randomWord-service';
import { getBooks } from './services/newYorkTimes-service';
import $ from 'jquery'
import { Character } from './classes/character';
import { Book } from './classes/book';
import { CornerStore } from './classes/cornerStore';
import './styles.css';

// our mock database for the corner store
const myCornerStore = new CornerStore(); 

// gets new character traits from the random word api if the initial ones are not satisfactory
async function mullAgain(myCharacter) {
  await getCharacterTraits(myCharacter)  
  displayTraits(myCharacter);
}

// this async function handles calling the random word api via  getRandomWords()
async function getCharacterTraits(myCharacter) {
  const wordArray = await getRandomWords(); // blocking // api call
  console.log(wordArray);
  if(!wordArray) {
    $(".errors").html('<h1>There has been an error processing your request</h1>')
  } else {
    myCharacter.setCharacterTraits(wordArray);
    $('.console').text(`Hi ${name}, tell us a bit about you...`);
    $('#charTraits').show();
  }
}

// this async function handles calling the NY Times api via  getBooks(). 
async function getBookArray() {
  const apiResponse = await getBooks(); // api call
  console.log(apiResponse);
  if(!apiResponse) {
    $(".errors").html('<h1>There has been an error processing your request</h1>')
  } else {
    displayBooks(apiResponse.results.books);
  }
}

// This function is called on lin 37 and handles parsing the data from the NY Times api call. It expects the books array as an argument passed into it, and loops through it, creating a new book object, pushing the object into the myCornerStore inventory and then displaying each book on the DOM
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

// This function handle displaying the character traits of the Character object to the DOM. It expects a character as an argument
function displayTraits(myCharacter) {
  $('#allAboutMe').text("");
  $('#allAboutMe').append(`<li>My temperament: ${myCharacter.temperament}</li>`);
  $('#allAboutMe').append(`<li>My personality: ${myCharacter.personality}</li>`);
  $('#allAboutMe').append(`<li>My greatest strength: ${myCharacter.greatestStrength}</li>`);
  $('#allAboutMe').append(`<li>My greatest weakness: ${myCharacter.greatestWeakness}</li>`);
}

// The doc ready!
$(document).ready(function() {
  let myCharacter;
  // initializes the game and creates a character with traits. This calls the random word api for the first time
  $('#startGame').click(function() {
    $('#form').hide();
    const name = $('#name').val();
    myCharacter = new Character(name);
    getCharacterTraits(myCharacter);
  });

  //shows the character traits on the DOM and removes the form
  $('#charTraits').click(function() {
    $('#charTraits').hide();
    displayTraits(myCharacter);
    $('#allAboutMe').show();
    $('#mullAgain').show();
    $('#ok').show();
  });

  // handles getting new character traits if the initial ones are not satisfactory
  $('#mullAgain').click(function() {
    mullAgain(myCharacter);
  });

  // handles moving onto the next part of the game, after character traits are picked. Shows buttons for which inventory to order first
  $('#ok').click(function() {
    $('#mullAgain').hide();
    $('#ok').hide();
    $('.console').text(`hello ${myCharacter.name}, we need to get some items to sell, what would you like to order first?`);
    $('#inventoryOptions').show();
  });

  // calls the NT Times api to "order in" books to the corner store. 
  $('#books').click(function() {
    $('#inventoryOptions').hide();
    $('.console').text('BOOKS!');
    getBookArray();
  });
});

