# import necessary libraries
import os
import numpy as np
from sqlalchemy.sql import text
from sqlalchemy import bindparam
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Yas.123@localhost:5432/Parking_db'
# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/visualize")
def plot():
    return render_template("visualize.html")   

@app.route("/data")
def data():
    return render_template("loaddata.html")

@app.route("/filter")
def filter():
        results = db.engine.execute(text("""
        SELECT area_name
        FROM "Area"
    """)
    )
        return jsonify([dict(row) for row in results]) 


@app.route("/api/<area>")
def area(area):
    results = db.engine.execute(text("""
        SELECT p.bay_id, d.durationminutes
        FROM "Parking_bay" as p
        LEFT JOIN "Parking_duration" as d
        ON p.bay_id = d.bay_id
        LEFT JOIN "Area" as y
        ON p.areaname_id = y.area_id
        where y.area_name = :area
    """).bindparams(
        area=area.lower()
    ))
    return jsonify([dict(row) for row in results])


if __name__ == "__main__":
    app.run(debug=True)
