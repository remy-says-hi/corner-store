// The Character class will hold information about the game character. There temperament, personality, greatest strength and greatest weakness are determined by calling a random word api
export class Character {
  constructor(name){
    this.name = name;
    this.temperament;
    this.personality;
    this.greatestStrength;
    this.greatestWeakness;
  }

  setCharacterTraits(wordArray) {
    this.temperament = wordArray[0];
    this.personality = wordArray[1];
    this.greatestStrength = wordArray[2];
    this.greatestWeakness = wordArray[3];
  }
}