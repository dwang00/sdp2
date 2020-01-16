from flask import Flask, render_template, session, request, jsonify, redirect, url_for, flash
import ast
import urllib
import json
import os
import math
import databaseUtils as help


app = Flask(__name__) #create instance of class Flask
app.secret_key = os.urandom(32)

@app.route("/")
def first():
    help.createUsers()
    if "username" in session:
        return redirect(url_for("a"))
    else:
        return render_template("login.html")

@app.route("/auth")
def auth():
    #Should check user and pass against the database and either send user abck to login or to welcome
    username = request.args["username"]
    password = request.args["password"]
    print(username)
    print(password)
    if help.validate(username,password) == 1:
        flash("Wrong username or password!")
        return redirect(url_for("first"))
    if help.validate(username,password) == 2:
        flash("Wrong username or password!")
        return redirect(url_for("first"))
    else:
        session["username"] = username
        print("Logged into account with username: " + username)
        return render_template("instructions.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/addUser")
def addUser():
    username = request.args["username"]
    password = request.args["password"]
    print(username)
    print(password)
    help.addUser(username,password)
    return render_template("login.html")

@app.route("/logout")
def logout():
    print("Logged out of session (username " + session["username"] + ")")
    session.clear()
    return redirect(url_for("first"))


@app.route("/welcome")
def landing():
    #should get all of the user's data from database
    #should send this data to html file
    #If the user is logging in for the first time, it should gift them their first pokemon
    return render_template("index.html")

@app.route("/a") #assign following fxn to run when root route requested
def a():

    print(__name__) #where will this go?

    link = "https://pokeapi.co/api/v2/pokemon/"
    request = urllib.request.Request(link)
    request.add_header('User-Agent', 'yes')
    u = urllib.request.urlopen(request)
    response = u.read()
    pokemon = json.loads(response)["results"]

    team1 = {}
    team2 = {}
    i = 0
    while i < 6:
        link = pokemon[i]["url"]
        request = urllib.request.Request(link)
        request.add_header('User-Agent', 'yes')
        u = urllib.request.urlopen(request)
        response = u.read()
        teammate = json.loads(response)

        teammateDict = {}
        x = 0
        moves = {}
        stats = {}

        while x < 4:
            moves = teammate["moves"][x]
            x = x + 1
        x = 0
        while x < 6:
            stats[teammate['stats'][x]['stat']['name']] = teammate['stats'][x]['base_stat']
            x = x + 1

        teammateDict['moves'] = moves
        teammateDict['pic'] = teammate['sprites']['back_default']
        teammateDict['type'] =  teammate['types'][0]['type']['name']
        teammateDict['stats'] = stats
        teammateDict['name'] = teammate['forms'][0]['name']
        team1[i] = teammateDict

        link = pokemon[12 - i]["url"]
        request = urllib.request.Request(link)
        request.add_header('User-Agent', 'yes')
        u = urllib.request.urlopen(request)
        response = u.read()
        teammate = json.loads(response)

        teammateDict = {}
        x = 0
        moves = {}
        stats = {}

        while x < 4:
            moves = teammate["moves"][x]
            x = x + 1
        x = 0
        while x < 6:
            stats[teammate['stats'][x]['stat']['name']] = teammate['stats'][x]['base_stat']
            x = x + 1

        teammateDict['moves'] = moves
        teammateDict['pic'] = teammate['sprites']['front_default']
        teammateDict['type'] =  teammate['types'][0]['type']['name']
        teammateDict['stats'] = stats
        teammateDict['name'] = teammate['forms'][0]['name']
        team2[i] = teammateDict
        i = i + 1

    teams = {}
    teams['team1'] = team1
    teams['team2'] = team2
    print(teams['team2'])
    return render_template("testBattle.html", teams = teams)


""" @app.route("/setupBattle")
def setupBattle():
    #takes in selected pokemon for battle
    #checks whether battle is set for pvp or pvNPC
    #depending on this, sends user to pvp.html or game.html
    return redirect(url_for("game"))

@app.route("/game")
def game():
    #gets user's selected pokemon
    #run game in javascript
    #oof
    return render_template("game.html")

@app.route("/pvp")
def pvp():
    #should get users selected pokemon
    #runs game in JS
    return render_template("pvp.html") """

def getPokemonByID(i, direction, moveslist):
    link = "https://pokeapi.co/api/v2/pokemon/" + str(i)
    request = urllib.request.Request(link)
    request.add_header('User-Agent', 'yes')
    u = urllib.request.urlopen(request)
    response = u.read()
    teammate = json.loads(response)





    teammateDict = {}
    x = 0
    moves = {}
    stats = {}

    while x < 4:
        link = teammate['moves'][moveslist[x]]["move"]['url']
        request = urllib.request.Request(link)
        request.add_header('User-Agent', 'yes')
        u = urllib.request.urlopen(request)
        response = u.read()
        apimove = json.loads(response)

        move = {
        "accuracy":apimove['accuracy'],
        "power":apimove['power'],
        "dmgclass":apimove['damage_class']['name'],
        "type":apimove['type']['name'],
        'name':apimove['name']
        }
        moves[x] = move
        x = x + 1
    x = 0
    while x < 6:
        stats[teammate['stats'][x]['stat']['name']] = teammate['stats'][x]['base_stat']
        x = x + 1
    stats['startingHp'] = stats['hp']
    teammateDict['moves'] = moves
    if (direction == "front"):
        teammateDict['pic'] = teammate['sprites']['front_default']
    else:
        teammateDict['pic'] = teammate['sprites']['back_default']
    teammateDict['type'] =  teammate['types'][0]['type']['name']
    teammateDict['stats'] = stats
    teammateDict['name'] = teammate['forms'][0]['name']
    return teammateDict

if __name__ == "__main__":
    app.debug = True
    app.run()
