var moves = 0;
//var pokemon = JSON.parse();
//var moves = JSON.parse();

var button = document.getElementById("b1");
button.addEventListener("click", loadPokemon);

var button2 = document.getElementById("b2");
button2.addEventListener("click", loadMove);

var loadPokemon = function(e) {
    var image = document.getElementById("pdisplay");
    image.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png";
}

var loadMove = function(e) {
    if (moves < 4) {
        moves++;
    }
}
