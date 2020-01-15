var turnsPassed = 0;
var mode = 1;
var teams = JSON.parse(document.getElementById("teamsJson").name);
// console.log(teams);


var updatePage = function(){
  if (turnsPassed % 2 == 0){
    mode = 1;
    document.getElementById("turnIndicator").innerHTML = "Player 1's Turn";
    var moves = document.getElementsByClassName("team2moves");
    var pokemon = document.getElementsByClassName("team2pokemon");
    for (var i = 0; i < moves.length; i++){
      moves[i].disabled = true;
    }
    for (var i = 0; i < pokemon.length; i++){
      pokemon[i].disabled = true;
    }
    var moves = document.getElementsByClassName("team1moves");
    var pokemon = document.getElementsByClassName("team1pokemon");
    for (var i = 0; i < moves.length; i++){
      moves[i].disabled = false;
      moves[i].addEventListener("click", attack);
    }
    for (var i = 0; i < pokemon.length; i++){
      pokemon[i].disabled = false;
      pokemon[i].addEventListener("click", switchPokemon)
    }
  } else {
    mode = 2;
    document.getElementById("turnIndicator").innerHTML = "Player 2's Turn";
    var moves = document.getElementsByClassName("team1moves");
    var pokemon = document.getElementsByClassName("team1pokemon");
    for (var i = 0; i < moves.length; i++){
      moves[i].disabled = true;
    }
    for (var i = 0; i < pokemon.length; i++){
      pokemon[i].disabled = true;
    }
    var moves = document.getElementsByClassName("team2moves");
    var pokemon = document.getElementsByClassName("team2pokemon");
    for (var i = 0; i < moves.length; i++){
      moves[i].disabled = false;
      moves[i].addEventListener("click", attack);
    }
    for (var i = 0; i < pokemon.length; i++){
      pokemon[i].disabled = false;
      pokemon[i].addEventListener("click", switchPokemon)
    }
  }
}


var switchPokemon = function(e) {
  console.log(e);
  e.active = true;
  var x = 0;
  if (mode == 1){
    for (var i = 0; i < 6; i++){
      if (teams['team1'][i]['name'] == e.target.innerText){
        x = i;
      }
    }
    document.getElementById("team1pic").src = teams['team1'][x]['pic']
  } else if (mode == 2){
    for (var i = 0; i < 6; i++){
      if (teams['team2'][i]['name'] == e.target.innerText){
        x = i;
      }
    }
    document.getElementById("team2pic").src = teams['team2'][x]['pic']
  }
  turnsPassed++;
  updatePage();

}

var attack = function(e) {

}

updatePage();
