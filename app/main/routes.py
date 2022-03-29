from app.main import main
from app import db
from flask import request, session, jsonify, redirect, render_template
import datetime
from app.main.models import Message, WorkerBehavior, TimeSpent, Worker

@main.route('/MI_early')
def index_MI_early():
    return render_template("index_MI_early.html")


@main.route('/MI_half')
def index_MI_half():
    return render_template("index_MI_half.html")


@main.route('/MI_late')
def index_MI_late():
    return render_template("index_MI_late.html")

@main.route('/non_MI_early')
def index_non_MI_early():
    return render_template("index_non_MI_early.html")


@main.route('/non_MI_half')
def index_non_MI_half():
    return render_template("index_non_MI_half.html")


@main.route('/non_MI_late')
def index_non_MI_late():
    return render_template("index_non_MI_late.html")


@main.route('/history_early')
def history_early():
    return render_template("index_history_early.html")


@main.route('/history_half')
def history_half():
    return render_template("index_history_half.html")


@main.route('/history_late')
def history_late():
    return render_template("index_history_late.html")


@main.route('/setTime', methods=['GET', 'POST'])
def setTime():
    session['start_time'] = datetime.datetime.utcnow()
    worker_id = addWorker(request.get_json()["prolificID"])
    session["worker_id"] = worker_id
    return jsonify(123)


@main.route('/endTime', methods=['POST'])
def endTime():
    session['end_time'] = datetime.datetime.utcnow()
    data = request.get_json()
    if ('start_time' and "worker_id") in session:
        db.session.add(TimeSpent(data["expCondition"], session["worker_id"], session["start_time"], session["end_time"]))
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
    return jsonify("Message changed!")


@main.route('/main_MI_early')
def main_MI_early():
    return render_template("main_MI_early.html")


@main.route('/main_MI_half')
def main_MI_half():
    return render_template("main_MI_half.html")


@main.route('/main_MI_late')
def main_MI_late():
    return render_template("main_MI_late.html")

@main.route('/main_non_MI_early')
def main_non_MI_early():
    return render_template("main_non_MI_early.html")


@main.route('/main_non_MI_half')
def main_non_MI_half():
    return render_template("main_non_MI_half.html")


@main.route('/main_non_MI_late')
def main_non_MI_late():
    return render_template("main_non_MI_late.html")


@main.route('/main_history_early')
def main_history_early():
    return render_template("main_history_early.html")

@main.route('/main_history_half')
def main_history_half():
    return render_template("main_history_half.html")

@main.route('/main_history_late')
def main_history_late():
    return render_template("main_history_late.html")


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









