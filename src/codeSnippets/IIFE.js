// Example of making an api call with IIFE instead of writing an async function and calling it. You can replace 63 of main.js with this block of code. 
(async () => {
  const wordArray = await getRandomWords();
  if(!wordArray) {
    $(".errors").html('<h1>There has been an error processing your request</h1>')
  } else {
    myCharacter.setCharacterTraits(wordArray);
  }
})();