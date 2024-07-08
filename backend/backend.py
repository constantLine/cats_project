#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests
from flask import Flask
import os


app = Flask(__name__)

@app.route("/cat_get")
def hello_world():
    resp = requests.get('https://api.thecatapi.com/v1/images/search')
    cat_json = resp.json()

    if cat_json:
        return cat_json[0].get('url', '')
    else:
        return ''

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--socket', help='Socket file')
    args = parser.parse_args()

    socket_file = args.socket or '/backend.sock'

    if os.path.exists(socket_file):
        os.remove(socket_file)

    app.run(debug=True, host=socket_file)

