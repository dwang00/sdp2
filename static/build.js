var moves = 0;
var allPokemon = JSON.parse(document.getElementById('allPokemonJson').name);
//console.log(allPokemon);
var team = {};
currentPokemon = {};
teamLength = 0;
var allChosenMoves = [];
var numberChosenMoves = 0;

var pokemonButton = document.getElementById("pokeButton");
pokemonButton.addEventListener("click", loadPokemon);
//console.log(pokemonButton);

var pokemonDropdown = document.getElementById("pokemonDropdown");
//console.log(pokemonDropdown.value);

var moveButton = document.getElementById("moveButton");
moveButton.addEventListener("click", loadMove);

var finishPokemon = document.getElementById("finishPokemon");
finishPokemon.addEventListener("click", finishPokemon);

// var loadPokemon = function(e) {
//     var image = document.getElementById("pdisplay");
//     image.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png";
// }

var loadPokemon = function(e){
//  console.log(e);
  var pokemon = {};
  pokemon['name'] = pokemonDropdown.value;
  //console.log(pokemon['name'])
  var pic = document.getElementById("pdisplay");
  //console.log(pic);
  for (var i = 1; i < 152; i++){
    //console.log(allPokemon[i]['name']);
    if (pokemon['name'] == allPokemon[i]['name']){
      pokemon['id'] = i;
      //console.log(i);
    }
  }
  pic.src = allPokemon[pokemon['id']]['pic'];
  moveList = document.getElementById("moveDropdown");
  realMoveList = allPokemon[pokemon['id']]['moves'];
  moveListLength = Object.keys(realMoveList).length;
  //console.log(realMoveList);

  for (var i = 0; i < moveListLength; i++){
    var option = document.createElement('option');
    option.innerHTML = realMoveList[i];
    moveList.add(option, i);
  }
  team[teamLength] = pokemon;
  teamLength++;
  //console.log(team);
}

var loadMove = function(e) {
    //console.log(e);
    var id = 0;
    var move = document.getElementById("moveDropdown").value;
    var manyMoves = Object.keys(allPokemon[team[teamLength - 1]['id']]['moves']).length;
    //console.log(manyMoves);
    for (var i = 0; i < manyMoves; i++){
      if (move == allPokemon[team[teamLength - 1]['id']]['moves'][i]){
        id = i;
      //  console.log(id);
      }
    }
    var chosenMoves = document.getElementById("chosenMoves");
    var item = document.createElement('li');
    item.innerHTML = move;
    chosenMoves.appendChild(item, i);
    allChosenMoves[numberChosenMoves] = id;
    numberChosenMoves++;
  //  console.log(team);
}

var finishPokemon = function(){
//  console.log(e);
  var pokemon = team[teamLength-1];
  pokemon['moves'] = allChosenMoves;
//  console.log(team);
  allChosenMoves = [];
  numberChosenMoves = 0;
  //console.log("poke" + teamLength - );
  var img = document.getElementById("poke" + (teamLength-1));
  img.src = allPokemon[pokemon['id']]['pic'];
  var chosenMoves = document.getElementById("chosenMoves");
  chosenMoves.innerHTML = "";
  var moveList = document.getElementById("moveDropdown");
  moveList.innerHTML = "";
  var finalize = document.getElementById("finalize");
  finalize.value = team;
  //console.log(team);
  //console.log(finalize.name);
}


var randomTeam() = function(){
  thisteam = {};
  for (var i = 0; i < 6; i++){
    var thispokemon = {};
    thispokemon['id'] = Math.floor(Math.random() * 151);
    var numMoves = Object.keys(allPokemon['id']['moves']).length;

    var img = document.getElementById("poke" + (teamLength-1));
    img.src = allPokemon[pokemon['id']]['pic'];
    for (var j = 0; j < 4; j++){
      thispokemon['moves'][j] = Math.floor(Math.random() * numMoves);
    }
    thisteam[i] = thispokemon;
    teamLength++;
  }

}
