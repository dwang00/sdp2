


var turnsPassed = 0;
var mode = 1;
var teams = JSON.parse(document.getElementById("teamsJson").name);
var currentPokemon = {"team1": teams['team1'][0], "team2": teams['team1'][0]};
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
      pokemon[i].addEventListener("click", switchPokemon);
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
    document.getElementById("team1pic").src = teams['team1'][x]['pic'];
    currentPokemon['team1'] = teams['team1'][x];
    var moves = document.getElementsByClassName("team1moves");
    for (var i = 0; i < 4; i++){
      moves[i].innerHTML = currentPokemon['team1']['moves'][i]['name'];
    }
    healthbar = document.getElementById("team1health");
    healthbar.attributes[4]['value'] = currentPokemon['team1']['stats']['hp'];
    healthbar.attributes[6]['value'] = currentPokemon['team1']['stats']['hp'];
  } else if (mode == 2){
    for (var i = 0; i < 6; i++){
      if (teams['team2'][i]['name'] == e.target.innerText){
        x = i;
      }
    }
    document.getElementById("team2pic").src = teams['team2'][x]['pic'];
    currentPokemon['team2'] = teams['team2'][x];
    var moves = document.getElementsByClassName("team2moves")
    for (var i = 0; i < 4; i++){
      moves[i].innerHTML = currentPokemon['team2']['moves'][i]['name'];
    }
    healthbar = document.getElementById("team2health");
    healthbar.attributes[4]['value'] = currentPokemon['team2']['stats']['hp'];
    healthbar.attributes[6]['value'] = currentPokemon['team2']['stats']['hp'];
  }
  turnsPassed++;
  updatePage();

}

var attack = function(e) {
  var team = "";
  var otherTeam = "";
  if (mode == 1){
    team = "team1";
    otherTeam = "team2";
  } else {
    team = "team2";
    otherTeam = "team1";
  }
  var movename = e.target['innerText'];
  var move = {};
  for (var i = 0; i < 4; i++){
    if (movename == currentPokemon[team]['moves'][i]['name']){
      move = currentPokemon[team]['moves'][i];
    }
  }
  console.log(currentPokemon[team]['stats']['special-attack']);
  var A = 0;
  var D = 0;
  if (move['dmgclass'] == "special"){
    A = currentPokemon[team]['stats']['special-attack'];
    D = currentPokemon[otherTeam]['stats']['special-defense'];
  } else {
    A = currentPokemon[team]['stats']['attack']
    D = currentPokemon[otherTeam]['stats']['defense']
  }

  var B = move['power'];
  var damage = Math.floor(((2 * 100 + 10) / 250) * (A / D) * B + 2) / 6;
  var healthbar = document.getElementById(otherTeam + "health");
  console.log(healthbar)
  healthbar.attributes[4]['value'] = healthbar.attributes[4]['value'] - damage;

  healthbar.attributes[3]['value'] = "width:" + Math.floor(100 * (healthbar.attributes[4]['value'] / (currentPokemon[otherTeam]['stats']['hp']))) + "%";
  currentPokemon[otherTeam]['stats']['hp'] = healthbar.attributes[4]['value'];

  turnsPassed++;
  updatePage();
}

updatePage();
