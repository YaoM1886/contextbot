import os
DEBUG = False
SECRET_KEY=os.urandom(24)
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
SQLALCHEMY_TRACK_MODIFICATIONS=False