var moves = 0;
var allPokemon = JSON.parse(document.getElementById('allPokemonJson').name);
console.log(allPokemon);
var team = {};

var pokemonButton = document.getElementById("pokeButton");
pokemonButton.addEventListener("click", loadPokemon);
console.log(pokemonButton);

var pokemonDropdown = document.getElementById("pokemonDropdown");
console.log(pokemonDropdown.value);

var moveButton = document.getElementById("moveButton");
moveButton.addEventListener("click", loadMove);

// var finishPokemon = document.getElementById("finishPokemon");
// finishPokemon.addEventListener("click", finishPokemon);

var loadPokemon = function(e) {
    var image = document.getElementById("pdisplay");
    image.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png";
}

var loadPokemon = function(e){
//  console.log(e);
  var pokemon = {};
  pokemon['name'] = pokemonDropdown.value;
  console.log(pokemon['name'])
  var pic = document.getElementById("pdisplay");
  console.log(pic);
  for (var i = 1; i < 152; i++){
    //console.log(allPokemon[i]['name']);
    if (pokemon['name'] == allPokemon[i]['name']){
      pokemon['id'] = i;
      console.log(i);
    }
  }
  pic.src = allPokemon[pokemon['id']]['pic'];
  moveList = document.getElementById("moveDropdown");
  realMoveList = allPokemon[pokemon['id']]['moves'];
  moveListLength = Object.keys(realMoveList).length;
  console.log(realMoveList);

  for (var i = 0; i < moveListLength; i++){
    var option = document.createElement('option');
    option.innerHTML = realMoveList[i];
    moveList.add(option, i);
  }

  team[""];
}

var loadMove = function(e) {
    console.log(e);
    var move = document.getElementById("moveDropdown").value;

}
