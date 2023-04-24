const timeStamp = '1';
const apiKey = 'd28ef029a68ad984b5e2be6fa65b6512';
const md5 = '051c2c5faf0162b6e3b25682a3af5a58';

fetch(`http://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&ts=${1}&hash=${md5}`)
.then((response) => {
    return response.json();
}).then((jsonParsed) => {
    console.log(jsonParsed)
});