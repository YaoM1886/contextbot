from app import db
import datetime

class Worker(db.Model):
    __tablename__ = "worker"
    id = db.Column(db.Integer, primary_key = True)
    prolific_id = db.Column(db.String(50))
    time_stamp = db.Column(db.DateTime, default = datetime.datetime.utcnow())

    def __init__(self, prolific_id, time_stamp):

        self.prolific_id = prolific_id
        self.time_stamp = time_stamp



class Message(db.Model):
    __tablename__ = "message"
    id = db.Column(db.Integer, primary_key = True)
    w_id = db.Column(db.Integer, db.ForeignKey('worker.id'))
    worker_utterance = db.Column(db.String(500), nullable = False)
    msg_status = db.Column(db.String(500), nullable = False)
    time_stamp = db.Column(db.DateTime, default = datetime.datetime.utcnow())

    def __init__(self, w_id, worker_utterance, msg_status, time_stamp):
        self.worker_utterance = worker_utterance
        self.w_id = w_id
        self.msg_status = msg_status
        self.time_stamp = time_stamp


class WorkerBehavior(db.Model):
    __tablename__ = "worker_behavior"
    id = db.Column(db.Integer, primary_key = True)
    w_id = db.Column(db.Integer, db.ForeignKey('worker.id'))
    b_name = db.Column(db.String(200))
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    def __init__(self, w_id, b_name, time_stamp):
        self.w_id = w_id
        self.b_name = b_name
        self.time_stamp = time_stamp


class TimeSpent(db.Model):
    __tablename__ = 'timespent'
    id = db.Column(db.Integer, primary_key = True)
    w_id = db.Column(db.Integer, db.ForeignKey('worker.id'))

    stage = db.Column(db.String(500), nullable = False)
    start_time = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    end_time =db.Column(db.DateTime)

    def __init__(self, stage, w_id, start_time, end_time):
        self.stage = stage
        self.w_id = w_id
        self.end_time = end_time
        self.start_time = start_time












