from app.main import main
from app import db
from flask import request, session, jsonify, redirect, render_template
import datetime
from app.main.models import Message, WorkerBehavior, TimeSpent, Worker

@main.route('/')
def index_MI():
    return render_template("index_MI.html")


@main.route('/setTime', methods=['GET', 'POST'])
def setTime():
    session['start_time'] = datetime.datetime.utcnow()
    worker_id = addWorker(request.get_json()["prolificID"])
    session["worker_id"] = worker_id
    return jsonify(123)


@main.route('/endTime', methods=['POST'])
def endTime():
    session['end_time'] = datetime.datetime.utcnow()
    if ('start_time' and "worker_id") in session:
        db.session.add(TimeSpent("TotalTask", session["worker_id"], session["start_time"], session["end_time"]))
        db.session.commit()

    return jsonify("Task submitted!")

@main.route('/workerClick', methods=['POST'])
def workerClick():
    data = request.get_json()
    worker_behavior = WorkerBehavior(session["worker_id"], data["b_name"], datetime.datetime.utcnow())
    db.session.add(worker_behavior)
    db.session.commit()

    return jsonify(123)


@main.route('/message', methods=['POST'])
def message():
    data = request.get_json()
    message = Message(session["worker_id"], data["message"], data["status"], datetime.datetime.utcnow())
    db.session.add(message)
    db.session.commit()
    return jsonify("Message recorded!")


@main.route('/early_MI')
def early_MI():
    return render_template("early_MI.html")


@main.route('/half_MI')
def half_MI():
    return render_template("half_MI.html")


@main.route('/late_MI')
def late_MI():
    return render_template("late_MI.html")

@main.route('/early_history')
def early_history():
    return render_template("early_history.html")


####################FUNCTIONS##########################3
def addWorker(worker):
    if not Worker.query.filter_by(prolific_id = worker).first():
        new_worker = Worker(worker, datetime.datetime.utcnow())
        db.session.add(new_worker)
        db.session.flush()
        w_id = new_worker.id # got the id
        db.session.commit()
        return w_id
    else:
        new_worker = Worker.query.filter_by(prolific_id = worker).first()
        return new_worker.id









