from flask import request
import urllib, json, sqlite3

def runsqlcommand(command):
    DB_FILE = "data.db"
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute(command)
    if "select" in command.lower():
        return c.fetchall()
    db.commit()
    db.close()

def cacheMoves():
    # c = "DROP TABLE moves"
    # runsqlcommand(c)
    # c = "CREATE TABLE moves (name TEXT, effect TEXT, category TEXT, type TEXT, pp INTEGER, dmg INTEGER, accuracy INTEGER)"
    # runsqlcommand(c)
    i = 1
    while i <= 165 :
        link = "https://pokeapi.co/api/v2/move/{}".format(i)
        request = urllib.request.Request(link)
        request.add_header('User-Agent', 'yes')
        u = urllib.request.urlopen(request)
        response = u.read()
        id = (json.loads(response)["id"])
        name = (json.loads(response)["name"]).replace("-", " ")
        eff = (json.loads(response)["effect_entries"][0]["short_effect"])
        eff = ((eff.replace("é", "e")).replace("\'", "\'\'")).replace("$effect_chance%", "{}")
        eff = eff.format(json.loads(response)["effect_chance"])
        dcl = (json.loads(response)["damage_class"]["name"])
        type = (json.loads(response)["type"]["name"])
        pp = (json.loads(response)["pp"])
        dmg = (json.loads(response)["power"])
        acc = (json.loads(response)["accuracy"])
        if dmg is None:
            dmg = -1
        if acc is None:
            acc = -1
        cmd = "SELECT * FROM moves"
        r = runsqlcommand(cmd)
        if len(r) > 0:
            cmd = "SELECT * FROM moves WHERE name = '{}'".format(name)
        q = runsqlcommand(cmd)
        if len(q) == 0:
            ins = "INSERT INTO moves VALUES({}, '{}', '{}', '{}', '{}', {}, {}, {})".format(id, name, eff, dcl, type, pp, dmg, acc)
            runsqlcommand(ins)
        i+=1
