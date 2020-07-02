export async function getRandomWords() {
  try {
    let response = await fetch('https://random-word-api.herokuapp.com/word?number=4');
    let jsonifiedResponse;
    if (response.ok && response.status == 200) {
      jsonifiedResponse = await response.json();
    } else {
      jsonifiedResponse = false;
    }
    return jsonifiedResponse;
  } catch(error) {
    return error;
  }
}

// export function getRandomWords() {
//   return fetch('https://random-word-api.herokuapp.com/word?number=4')
//   .then((response) => { // resolve
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response.json();
//   })
//   .catch((error) => { // reject
//     console.log(error)
//     return false;
//   })
// }