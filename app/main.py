from flask import Flask, request, render_template, url_for, send_file, redirect, make_response, jsonify
from flask_cors import CORS
import json
import datetime as dt
import mods.api as api
from settings import DEFAULT_RANDOMIZER

app = Flask(__name__)
CORS(app)

@app.route('/')
def get_home():
    """
    Homepage
    """
    # api.create_db_schema()
    # api.create_url("https://google.de", 0, "goo", -1, 0)
    # api.create_url("https://google.de", 0, "keks", 2, 2)
    return render_template('index.html')

@app.route('/outdated')
def get_outdated():
    """
    Page that loads if remaining references of a link is 0
    """
    return render_template('outdated.html')

@app.route('/<short_url>')
def redirect_user(short_url):
    # search for short url
    connection = api.connect_db()
    cursor = connection.cursor(buffered=True)
    new_path = api.prettify_string(request.path)

    app.logger.warning(new_path)
    query = f"SELECT reference_url FROM link WHERE short_url='{new_path}'"
    cursor.execute(query)
    for row in cursor:
        app.logger.warning(row)
        if row is not None:
            x = api.check_limit(new_path, connection)
            cursor.close()
            connection.close()
            return redirect(row[0], code=302)
    cursor.close()
    connection.close()
    return render_template('404.html')

@app.route('/api/create', methods=["GET"])
def use_api():
    """
    for creation of a new shortened url
    """
    #return make_response(jsonify({"message": "hi"}), 200)
    url = request.args.get('url')
    custom_tag = request.args.get('custom')
    random_method = request.args.get('random_method')
    is_private = request.args.get('private')
    refs_available = request.args.get('refs_available')
    app.logger.warning(refs_available)
    if url is None or not(type(url) == str):
        return make_response(jsonify({"message":"Param url is required as string"}), 406)
    else:
        url = url # TODO to prevent sql injections

    if not(is_private is None): 
        app.logger.warning(is_private)
        try:
            is_private = int(is_private)
        except:
            return make_response(jsonify({"message":"Error in API Syntax"}), 406)
    elif is_private is None:
        is_private = 0

    if not(random_method is None): 
        app.logger.warning(random_method)
        try:
            random_method = int(random_method)
        except:
            return make_response(jsonify({"message":"Error in API Syntax"}), 406)
        app.logger.warning(type(random_method))
        
    elif random_method is None:
        random_method = DEFAULT_RANDOMIZER

    if not(type(refs_available)==int) and not(refs_available is None):
        try:
            refs_available = int(refs_available)
        except:
            return make_response(jsonify({"message":"Error in API Syntax"}), 406)
    elif refs_available is None:
        refs_available = -1
    link = api.create_url(url, int(is_private), custom_tag, int(refs_available), int(random_method))
    return make_response(jsonify({"message": f"Your url {link} was created", "url": link}), 201)

@app.route('/api/statistics')
def get_statistic():
    """
    returns: JSON {short:str, reference:str, frequency:int}
    """
    connection = api.connect_db()
    res = api.get_statistics(connection)
    app.logger.warning(res)
    return make_response(jsonify(res), 200)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=False, debug=True)
