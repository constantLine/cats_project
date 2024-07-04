#!/usr/bin/python
# -*- coding: utf-8 -*-
# backend/backend.py
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
    if os.path.exists("/var/run/backend.sock"):
        os.remove("/var/run/backend.sock")
    app.run(debug=True, unix_socket="/var/run/backend.sock")

