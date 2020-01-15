var moves = 0;

var button = document.getElementById("b1");
button.addEventListener("click", loadPokemon);

var button2 = document.getElementById("b2");
button.addEventListener("click", loadPokemon);

var loadPokemon = function(e) {

}

var loadMove = function(e) {
    if (moves < 4) {
        moves++;
    }
}
