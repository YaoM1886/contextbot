import os
DEBUG = False
SECRET_KEY=os.urandom(24)
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
SQLALCHEMY_TRACK_MODIFICATIONS=False

SESSION_TYPE = 'sqlalchemy'
SESSION_REDIS = redis.from_url(os.environ.get('SESSION_REDIS'))
SESSION_TYPE = os.environ.get('SESSION_TYPE')
SESSION_REDIS = redis.from_url(os.environ.get('SESSION_REDIS'))