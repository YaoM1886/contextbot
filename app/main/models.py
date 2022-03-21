from app import db
import datetime



class Message(db.Model):
    __tablename__ = "message"
    id = db.Column(db.Integer, primary_key = True)
    w_id = db.Column(db.String(50))
    worker_utterance = db.Column(db.String(500), nullable = False)
    time_stamp = db.Column(db.DateTime, default = datetime.datetime.utcnow())

    def __init__(self, w_id, worker_utterance):
        self.worker_utterance = worker_utterance
        self.w_id = w_id


class WorkerBehavior(db.Model):
    __tablename__ = "worker_behavior"
    id = db.Column(db.Integer, primary_key = True)
    w_id = db.Column(db.String(50))
    b_name = db.Column(db.String(200))
    time_stamp = db.Column(db.DateTime, default = datetime.datetime.utcnow())

    def __init__(self, w_id, b_name):
        self.w_id = w_id
        self.b_name = b_name


class TimeSpent(db.Model):
    __tablename__ = 'timespent'
    id = db.Column(db.Integer, primary_key = True)
    w_id = db.Column(db.String(50))

    stage = db.Column(db.String(500), nullable = False)
    start_time = db.Column(db.DateTime, default = datetime.datetime.utcnow())
    end_time =db.Column(db.DateTime)

    def __init__(self, stage, w_id, start_time, end_time):
        self.stage = stage
        self.w_id = w_id
        self.end_time = end_time
        self.start_time = start_time












