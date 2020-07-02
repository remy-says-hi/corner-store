// fetch() with async + await; A recommended route for making api calls
export async function getBooks() {
  try {
    let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.API_KEY_NY}`)
    let jsonifiedResponse;
    if (response.ok && response.status == 200) {
      jsonifiedResponse = await response.json();
    } else {
      jsonifiedResponse = false;
    }
    return jsonifiedResponse;
  } catch(error) {
    return false;
  }
}

//AJAX/XMLHTTPREQ with promise
// we wrap XHR in a promise to avoid call back hell
// export function getBooks() {
//   const promise =  new Promise(function(resolve, reject) {
//     let request = new XMLHttpRequest();
//     const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.API_KEY_NY}`;
//     request.onload = function() {
//       if (this.status === 200) {
//         resolve(request.response);
//       } else {
//         reject(request.response);
//       }
//     }
//     request.open("GET", url, true);
//     request.send();
//   });

//   return promise.then(function(response) {
//     return JSON.parse(response); // resolve
//   }, function(error) {
//     console.log(error)
//     return false; // reject
//   });
// }


