import mysql.connector
from mysql.connector import errorcode
from settings import *
from model.table_description import *
import datetime as dt
import random
from flask import logging, url_for
from main import app
import re
from settings import DOMAIN


def connect_db():
    """
    connects to the database 
    settings can be made in settings.py
    returns: mysql.connector.connection
    """
    db_connection = mysql.connector.connect(
        host = DB_HOST,
        port = DB_PORT,
        user = DB_USER,
        password = DB_PASSWORD,
        database = DB_NAME
    )
    return db_connection


def create_url(reference_url:str, is_private:bool, custom_tag:str, available_refs:int, shorten_method:int) -> str:
    """creates a shortened url"""
    connection = connect_db()
    cursor = connection.cursor()
    is_custom = True
    if custom_tag is None:
        is_custom = False
        if shorten_method == 1:
            # default, groß, klein, zahlen
            custom_tag = shorten_default()
        elif shorten_method == 2:
            # nur groß
            custom_tag = shorten_intervall(METHODS["2"]["lower"], METHODS["2"]["upper"], SHORT_LENGTH)
        elif shorten_method == 3:
            # nur klein
            custom_tag = shorten_intervall(METHODS["3"]["lower"], METHODS["3"]["upper"], SHORT_LENGTH)
        elif shorten_method == 4:
            # nur zahlen
            custom_tag = shorten_intervall(METHODS["4"]["lower"], METHODS["4"]["upper"], SHORT_LENGTH)   
    else:
        if not check_availability(custom_tag, cursor):
            cursor.close()
            connection.close()
            return f"The requested short URL: {custom_tag} is not available"
    if len(re.findall("http[s]*://", reference_url)) == 0:
        reference_url = f"https://{reference_url}"
    
    query = (f"INSERT INTO link(short_url, reference_url, is_custom, available_refs, date_created, is_private) values('{custom_tag}','{reference_url}','{int(is_custom)}','{available_refs}','{dt.datetime.now()}','{int(is_private)}')")
    try:
        cursor.execute(query)
        connection.commit()
    except Exception as e:
        app.logger.warning(e)
    
    cursor.close()
    connection.close()
    return f"{DOMAIN}/{custom_tag}"

def shorten_default() -> str:
    """
    creates a random string which is used as shortened url tag - contains Upper Case, Lower Case and Numbers
    length can be set in settings.py (SHORT_LENGTH)
    returns: random string
    """
    available = False
    connection = connect_db()
    cursor = connection.cursor()
    while not available:
        custom_tag = ""
        for i in range(SHORT_LENGTH):
            method = random.randint(2,4)
            custom_tag += shorten_intervall(METHODS[str(method)]["lower"],METHODS[str(method)]["upper"],1)
        available = check_availability(custom_tag, cursor)
    cursor.close()
    connection.close()
    return custom_tag       

def shorten_intervall(lborder:int, uborder:int, short_length:int) -> str:
    """
    creates a random string which is used as shortened url tag
    :param lborder: lower border for ascii char
    :param uborder: upper border for ascii char
    :param short_length: length for result
    :returns: random string
    """
    available = False
    connection = connect_db()
    cursor = connection.cursor()
    while not available:
        custom_tag = ""
        for i in range(short_length):
            nmb = random.randint(lborder,uborder)
            char = chr(nmb)
            custom_tag += str(char)
        available = check_availability(custom_tag, cursor)
    cursor.close()
    connection.close()
    return custom_tag

def check_availability(short_url, cursor) -> bool:
    """
    checks if string in database
    returns: true if not in db, false if in db
    """
    query = f"SELECT count(`short_url`) FROM link WHERE `short_url`='{short_url}'"
    cursor.execute(query)
    for row in cursor:
        if row[0] > 0:
            #gibts schon
            return False
        else:
            #gibts noch nicht
            return True

def prettify_string(text:str) -> str:
    """
    deletes everything thats not a number or a character
    preventing from sql injection
    returns: prettified string
    """
    pattern = "[a-zA-Z0-9]"
    path = re.findall(pattern, text)
    new_path = ""
    if len(path)>1:
        for c in path:
            new_path+=c
    else:
        new_path = path[0]
    return new_path

def check_limit(short_url:str, connection) -> bool:
    """
    checks limit of references, saves the reference for statistics, updates the limit
    returns: true if limit is not exceeded, false if limit is exceeded
    """
    cursor = connection.cursor()
    query= f"SELECT link_id, available_refs, is_private FROM link WHERE short_url='{short_url}'"
    cursor.execute(query)
    res = cursor.fetchall()
    app.logger.warning(query)
    app.logger.warning(res)
    for row in res:
        app.logger.warning(row)
        if row[2] == 0:
            query= f"INSERT INTO statistics(track_date, f_link_id) VALUES('{dt.datetime.now()}', '{row[0]}')"
            cursor.execute(query)
            connection.commit()
        app.logger.warning(row)
        if row[1] == -1:
            return True
        elif row[1] > 1:
            app.logger.warning(row[0])
            query = f"UPDATE link SET `available_refs`='{(int(row[0])-1)}' WHERE `short_url`='{short_url}'"
            cursor.execute(query)
            connection.commit()
            return True
        else:
            query = f"UPDATE link SET `reference_url`='{DOMAIN}/{short_url}/outdated' WHERE `short_url`='{short_url}'"
            cursor.execute(query)
            connection.commit()
            return False

def get_statistics(connection):
    """
    returns: JSON {short:str, reference:str, frequency:int}
    """
    cursor = connection.cursor()
    query = "SELECT l.short_url, l.reference_url, COUNT(l.short_url) as frequency from link l join statistics s on s.f_link_id = l.link_id group by l.short_url ORDER BY frequency DESC LIMIT 10"
    cursor.execute(query)
    res = cursor.fetchall()
    l = []
    for i, row in enumerate(res):
        j = {"position": i,
            "short": row[0],
            "reference": row[1],
            "frequency": row[2]}
        l.append(j)
    return l

def remove_http_from_url(url):
    if url[0:5] == "https":
        return url[8:]
    else:
        return url[7:]

