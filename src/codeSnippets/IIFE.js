(async () => {
  const wordArray = await getRandomWords();
  if(!wordArray) {
    $(".errors").html('<h1>There has been an error processing your request</h1>')
  } else {
    myCharacter.setCharacterTraits(wordArray);
  }
})();