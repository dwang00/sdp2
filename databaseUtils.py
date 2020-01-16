import sqlite3

FILENAME = "data.db"

def createUsers():
    db = sqlite3.connect(FILENAME)
    c = db.cursor()

    command = "CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)"
    c.execute(command)

    db.commit()
    db.close()

def addUser(user, passw):
    #adds user and password to the database
    #also adds user's starting pokemon
    #creates table if it doesn't exist
    db = sqlite3.connect(FILENAME)
    c = db.cursor()

    command = 'INSERT INTO users VALUES ({}, {})'
    command = command.format(user, passw)
    c.execute(command)

    db.commit()
    db.close()

def getUser(user):
    #gets stored user info like their pokemon and returns it
    db = sqlite3.connect(FILENAME)
    c = db.cursor()

    user = "\"" + user + "\""
    userDict = {}

    c.execute("SELECT * FROM users WHERE username = " + user)
    s = c.fetchall()
    if len(s) == 0:
        return {}
    else:
        s = s[0]
        userDict["user"] = s[0]
        userDict["pass"] = s[1]

        db.commit()
        db.close()
        return userDict

def register(user, passw):
    userDict = getUser(user)
    # if the username is already in the DB
    if 'user' in userDict:
        return False

    user = "\"" + user + "\""
    passw = "\"" + passw + "\""

    addUser(user, passw)
    return True

def validate(user, passw):
    # 0 -> validated
    # 1 -> username wrong
    # 2 -> password wrong

    userDict = getUser(user)
    if 'user' not in userDict:
        return 1
    if userDict["pass"] != passw:
        return 2
    return 0

def addPokemon(name):
    #adds specified pokemon to the user's list
    return 0

def getRandTeam(level):
    #randomly gets a full team of pokemon to battle against
    #if we have time add level so that we sometimes filter to stronger pokemon
    team = {}
    return team
