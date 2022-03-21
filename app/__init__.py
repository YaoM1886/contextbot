#app/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_session import Session
from flask_migrate import Migrate


db = SQLAlchemy()
bootstrap = Bootstrap()
migrate = Migrate()


def create_app():

    app = Flask(__name__)
    app.secret_key = "4*z]NLj$Lm@pk?dA"

    configuration = os.path.join(os.getcwd(), 'config', 'prod.py')
    #  to load the configuration file
    app.config.from_pyfile(configuration)
    #
    app.config['SESSION_TYPE'] = 'sqlalchemy'
    app.config['SESSION_SQLALCHEMY'] = db
    #
    app.static_folder = 'static'
    Session(app)
    #
    # to attach the Flask app with DB instance created on line
    db.init_app(app)
    migrate.init_app(app, db)

    # initialize Bootstrap with flask
    bootstrap.init_app(app)

    from app.main import main
    app.register_blueprint(main)

    return app
