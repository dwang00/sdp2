


var turnsPassed = 0;
var mode = 1;
var teams = JSON.parse(document.getElementById("teamsJson").name);
var currentPokemon = { "team1": teams['team1'][0], "team2": teams['team2'][0] };
// console.log(teams);


var updatePage = function () {
    var team1pokemon = document.getElementsByClassName("team1pokemon");
    //console.log(team1pokemon);
    for (var i = 0; i < 6; i++) {
        if (team1pokemon[i]['innerText'] == currentPokemon['team1']['name']) {
            //  console.log(team1pokemon[i]['innerText']);
            team1pokemon[i]['attributes'][1]['value'] = "btn btn-primary team1pokemon";
        } else {
            team1pokemon[i]['attributes'][1]['value'] = "btn btn-secondary team1pokemon";
        }
        if (teams['team1'][i]['stats']['hp'] <= 0) {
            console.log(teams['team1'][i]['stats']['hp']);
            team1pokemon[i].disabled = true;
        }
    }
    var team2pokemon = document.getElementsByClassName("team2pokemon");
    for (var i = 0; i < 6; i++) {
        if (team2pokemon[i]['innerText'] == currentPokemon['team2']['name']) {
            team2pokemon[i]['attributes'][1]['value'] = "btn btn-primary team2pokemon";
        } else {
            team2pokemon[i]['attributes'][1]['value'] = "btn btn-secondary team2pokemon";
        }
        if (teams['team2'][i]['stats']['hp'] <= 0) {
            team2pokemon[i].disabled = true;
        }
    }
    if (turnsPassed % 2 == 0) {
        mode = 1;
        document.getElementById("turnIndicator").innerHTML = "Player 1's Turn";
        var moves = document.getElementsByClassName("team2moves");
        var pokemon = document.getElementsByClassName("team2pokemon");
        for (var i = 0; i < moves.length; i++) {
            moves[i].disabled = true;
        }
        for (var i = 0; i < pokemon.length; i++) {
            pokemon[i].disabled = true;
        }
        var moves = document.getElementsByClassName("team1moves");
        var pokemon = document.getElementsByClassName("team1pokemon");
        for (var i = 0; i < moves.length; i++) {
            moves[i].disabled = false;
            moves[i].addEventListener("click", attack);
        }
        for (var i = 0; i < pokemon.length; i++) {
            if (teams['team1'][i]['stats']['hp'] > 0) {
                pokemon[i].disabled = false;
                pokemon[i].addEventListener("click", switchPokemon);
            }
        }
    } else {
        mode = 2;
        document.getElementById("turnIndicator").innerHTML = "Player 2's Turn";
        var moves = document.getElementsByClassName("team1moves");
        var pokemon = document.getElementsByClassName("team1pokemon");
        for (var i = 0; i < moves.length; i++) {
            moves[i].disabled = true;
        }
        for (var i = 0; i < pokemon.length; i++) {
            pokemon[i].disabled = true;
        }
        var moves = document.getElementsByClassName("team2moves");
        var pokemon = document.getElementsByClassName("team2pokemon");
        for (var i = 0; i < moves.length; i++) {
            moves[i].disabled = false;
            moves[i].addEventListener("click", attack);
        }
        for (var i = 0; i < pokemon.length; i++) {
            if (teams['team2'][i]['stats']['hp'] > 0) {
                pokemon[i].disabled = false;
                pokemon[i].addEventListener("click", switchPokemon);
            }
        }
    }
}


var switchPokemon = function (e) {
    console.log(e);
    e.active = true;
    var x = 0;
    if (mode == 1) {
        for (var i = 0; i < 6; i++) {
            if (teams['team1'][i]['name'] == e.target.innerText) {
                x = i;
            }
        }
        document.getElementById("team1pic").src = teams['team1'][x]['pic'];
        currentPokemon['team1'] = teams['team1'][x];
        var moves = document.getElementsByClassName("team1moves");
        for (var i = 0; i < 4; i++) {
            moves[i].innerHTML = currentPokemon['team1']['moves'][i]['name'];
        }
        healthbar = document.getElementById("team1health");
        healthbar.attributes[4]['value'] = currentPokemon['team1']['stats']['hp'];
        healthbar.attributes[6]['value'] = currentPokemon['team1']['stats']['hp'];
        healthbar.attributes[3]['value'] = "width:" + Math.floor(100 * (healthbar.attributes[4]['value'] / (currentPokemon['team1']['stats']['startingHp']))) + "%";
        var percent1 = Math.floor(100 * (healthbar.attributes[4]['value'] / (currentPokemon['team2']['stats']['startingHp'])));
        if (percent1 > 10 && percent1 <= 40) {
            healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-warning"
        }
        else if (percent1 <= 10) {
            healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-danger"
        }
        else {
            healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-success"
        }
    }
    else if (mode == 2) {
        for (var i = 0; i < 6; i++) {
            if (teams['team2'][i]['name'] == e.target.innerText) {
                x = i;
                console.log(x);
            }
        }
        document.getElementById("team2pic").src = teams['team2'][x]['pic'];
        currentPokemon['team2'] = teams['team2'][x];
        var moves = document.getElementsByClassName("team2moves")
        for (var i = 0; i < 4; i++) {
            moves[i].innerHTML = currentPokemon['team2']['moves'][i]['name'];
        }
        healthbar = document.getElementById("team2health");
        healthbar.attributes[4]['value'] = currentPokemon['team2']['stats']['hp'];
        healthbar.attributes[6]['value'] = currentPokemon['team2']['stats']['hp'];
        healthbar.attributes[3]['value'] = "width:" + Math.floor(100 * (healthbar.attributes[4]['value'] / (currentPokemon['team2']['stats']['startingHp']))) + "%";
        var percent = Math.floor(100 * (healthbar.attributes[4]['value'] / (currentPokemon['team2']['stats']['startingHp'])));
        if (percent > 10 && percent <= 40) {
            healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-warning"
        }
        else if (percent <= 10) {
            healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-danger"
        }
        else {
            healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-success"
        }
    }
    console.log(currentPokemon);
    closeModal();
    turnsPassed++;
    updatePage();

}

var attack = function (e) {
    //  console.log(currentPokemon);
    var team = "";
    var otherTeam = "";
    if (mode == 1) {
        team = "team1";
        otherTeam = "team2";
    } else {
        team = "team2";
        otherTeam = "team1";
    }
    var movename = e.target['innerText'];
    var move = {};
    for (var i = 0; i < 4; i++) {
        if (movename == currentPokemon[team]['moves'][i]['name']) {
            move = currentPokemon[team]['moves'][i];
        }
    }
    var A = 0;
    var D = 0;
    if (move['dmgclass'] == "special") {
        A = currentPokemon[team]['stats']['special-attack'];
        D = currentPokemon[otherTeam]['stats']['special-defense'];
    } else {
        A = currentPokemon[team]['stats']['attack']
        D = currentPokemon[otherTeam]['stats']['defense']
    }
    // console.log(A);
    // console.log(D);
    var B = move['power'];
    //  console.log(move);
    //console.log(currentPokemon[team]);
    var damage = Math.floor(((2 * 100 + 10) / 250) * (A / D) * B + 2) / 6;
    //console.log(damage);
    var healthbar = document.getElementById(otherTeam + "health");
    healthbar.attributes[4]['value'] = healthbar.attributes[4]['value'] - damage;

    healthbar.attributes[3]['value'] = "width:" + Math.floor(100 * (healthbar.attributes[4]['value'] / (currentPokemon[otherTeam]['stats']['startingHp']))) + "%";
    currentPokemon[otherTeam]['stats']['hp'] = healthbar.attributes[4]['value'];
    var percent = Math.floor(100 * (healthbar.attributes[4]['value'] / (currentPokemon[otherTeam]['stats']['startingHp'])));
    if (percent > 10 && percent <= 40) {
        healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-warning"
    }
    else if (percent <= 10) {
        healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-danger"
    }
    else {
        healthbar.className = "progress-bar progress-bar-striped progress-bar-animated active bg-success"
    }
    //  console.log(currentPokemon[otherTeam]['stats']['hp']);
    if (currentPokemon[otherTeam]['stats']['hp'] <= 0) {

        var pokemon = document.getElementsByClassName("modalpokemon");
        var faintedPokemon = 0;
        for (var i = 0; i < 6; i++) {
            if (teams[otherTeam][i]['stats']['hp'] <= 0) {
                //console.log(teams[otherTeam][i]['stats']['hp']);
                pokemon[i].disabled = true;
                faintedPokemon++;
            } else {
                pokemon[i].disabled = false;
            }
            pokemon[i].innerHTML = teams[otherTeam][i]['name'];
            pokemon[i].addEventListener("click", switchPokemon);
        }
        if (faintedPokemon == 6) {
            const modal = document.querySelector('#winloss');
            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', closeModal1);
            modal.style.display = 'block';
            modalContent = document.getElementById('winorloss');
            modalContent.innerText = team + " is victorious over " + otherTeam;
        } else {
            const modal = document.querySelector('#notification');
            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', closeModal);
            modal.style.display = 'block';
            modalContent = document.getElementById('notifContent');
            modalContent.innerText = currentPokemon[otherTeam]['name'] + " has fainted. Switching to another pokemon";
            //console.log(modalContent);
        }
        if (mode == 1) {
            mode++;
        } else {
            mode--;
        }
        //  console.log(mode);
    } else {
        turnsPassed++;
        updatePage();
    }
}

var closeModal = function (e) {
    const modal = document.querySelector('#notification');
    modal.style.display = 'none';
}

var closeModal1 = function (e) {
    const modal = document.querySelector('#winloss');
    modal.style.display = 'none';
}

updatePage();
