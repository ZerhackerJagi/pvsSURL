import mysql.connector
from mysql.connector import errorcode
from settings import *
from model.table_description import *


def create_db_schema():
    """creates the database schema"""
    db_connection = mysql.connector.connect(
        host = DB_HOST,
        user = 'root',
        password= DB_PASSWORD    
        )
    cursor = db_connection.cursor()
    # create database
    try:
        query = """CREATE DATABASE IF NOT EXISTS {}""".format(DB_NAME)
        cursor.execute(query)
    except mysql.connector.Error as e:
        print("Creating Database failed..")

    # use pvsSURL
    try:
        query = """USE {}""".format(DB_NAME)
        cursor.execute(query)
    except mysql.connector.Error as e:
        print("Using Database failed..")

    # create tables
    for table_name in TABLES:
        table_description = TABLES[table_name]
        try:
            print("Creating table {}: ".format(table_name))
            cursor.execute(table_description)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                pass
            else:
                print(err.msg)
        else:
            print("OK")
    cursor.close()
    db_connection.close()

if __name__ == '__main__':
    create_db_schema()