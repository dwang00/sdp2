var turnsPassed = 0;
var teams = JSON.parse(document.getElementById("teamsJson").name);
console.log(teams);

if (turnsPassed % 2 == 0){
  document.getElementById("turnIndicator").innerHTML = "Player 1's Turn"
} else {
  document.getElementById("turnIndicator").innerHTML = "Player 2's Turn"
}
