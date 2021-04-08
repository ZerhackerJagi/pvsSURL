from flask import Flask, request, render_template, url_for, send_file, redirect, make_response, jsonify, abort
from flask_cors import CORS
import json
import datetime as dt
import mods.api as api
import createDB
from settings import DEFAULT_RANDOMIZER
import time
import re


app = Flask(__name__)
CORS(app)

@app.route('/')
def get_home():
    """
    Homepage
    """
    return render_template('index.html')

@app.route('/<short_url>/outdated')
def get_outdated(short_url):
    """
    Page that loads if remaining references of a link is 0
    """

    return render_template('index.html')



@app.route('/<short_url>')
def redirect_user(short_url):
    # search for short url
    connection = api.connect_db()
    cursor = connection.cursor(buffered=True)
    # new_path = api.prettify_string(request.path)
    # app.logger.warning(new_path)

    query = f"SELECT reference_url FROM link WHERE short_url='{short_url}'"
    cursor.execute(query)
    for row in cursor:
        app.logger.warning(row)
        if row is not None:
            x = api.check_limit(short_url, connection)
            cursor.close()
            connection.close()
            return redirect(row[0], code=302)
    cursor.close()
    connection.close()
    abort(404)
    # return redirect("/404", code=302)

@app.route('/<short_url>/safe')
def redirect_safe(short_url):
    # search for short url
    connection = api.connect_db()
    cursor = connection.cursor(buffered=True)
    # new_path = request.path
    new_path= request.path[1:-(len(request.path)-5)]
    app.logger.warning(new_path)
    app.logger.warning(short_url)
    query = f"SELECT reference_url FROM link WHERE short_url='{short_url}'"
    cursor.execute(query)
    for row in cursor:
        app.logger.warning(row)
        if row is not None:
            x = api.check_limit(short_url, connection)
            cursor.close()
            connection.close()
            url=row[0]
            app.logger.warning(f"sicher aufgerufene url: {url}")
            # return render_template("index.html", surl=url, code=200)
            return redirect(f"/safeView/{url}", code=302)
    cursor.close()
    connection.close()
    abort(404)
    # return app.send_static_file("index.html")
    # return redirect("/404", 302)

@app.route("/safeView/<path:short_url>")
def show_view(short_url):
    return render_template("index.html"),200


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
    if url is None or not(type(url) == str):
        return make_response(jsonify({"message":"Param url is required as string"}), 406)
    else:
        url = re.sub(r"[^\w/.:]","", url) # TODO to prevent sql injections

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
    if not(custom_tag is None):
        custom_tag = re.sub(r"\W", '', custom_tag)
    link = api.create_url(url, int(is_private), custom_tag, int(refs_available), int(random_method))
    app.logger.warning({"message": f"Your url {link} was created", "url": link})
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

@app.route('/images/logo/light')
def get_logo():
    return send_file("static/images/PerVerSo32x32.png")


@app.route('/images/logo/dark')
def get_logo_dark():
    return send_file("static/images/PerVerSo32x32_dark.png")


@app.route('/images/404')
def get_404_image():
    return send_file("static/images/404.png")

@app.route('/error/404')
def error404():
    return render_template("index.html"),404

@app.errorhandler(404)
def not_found(e):
    return redirect("/error/404", code=302)
    



if __name__ == '__main__':
    time.sleep(10)
    createDB.create_db_schema()
    time.sleep(5)
    app.run(host='0.0.0.0', port=5000, use_reloader=False, debug=False)
