import os
DEBUG = False
SECRET_KEY=os.urandom(24)
SQLALCHEMY_DATABASE_URI = "postgres://muvnlpvkkkfeas:39e45c82b2b49f622a80a15a0fdcf9918444bb96250a19f04c3bfbf6349c3e89@ec2-54-217-195-234.eu-west-1.compute.amazonaws.com:5432/d9sercrk6p3ngv"
SQLALCHEMY_TRACK_MODIFICATIONS=False