from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import config

db = SQLAlchemy()
db_prefix = 'cs50_'

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)

    from .api import api as api_blueprint
    CORS(api_blueprint) 
    app.register_blueprint(api_blueprint)

    return app
