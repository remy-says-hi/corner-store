// The Book class holds information for each book object that I get from calling the NY Times Book api. Each book object will go into my CornerStore's 'books' array.
export class Book {
  constructor(title, author, description, image){
    this.title = title;
    this.author = author;
    this.description = description;
    this.image = image;
  }
}