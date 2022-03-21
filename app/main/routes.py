from app.main import main
from app import db
from flask import request, session, jsonify, redirect, render_template
import datetime
from app.main.models import Message, WorkerBehavior, TimeSpent

@main.route('/')
def index_MI():
    return render_template("index_MI.html")


@main.route('/setTime', methods=['GET', 'POST'])
def setTime():
    session['start_time'] = datetime.datetime.utcnow()
    worker_id = request.get_json()["workerID"]
    session["worker_id"] = worker_id
    return jsonify(123)


@main.route('/endTime', methods=['POST'])
def endTime():
    session['end_time'] = datetime.datetime.utcnow()
    if ('start_time' and "worker_id") in session:
        db.session.add(TimeSpent("TotalTask", session["worker_id"], session["start_time"], session["end_time"]))
        db.session.commit()

    return jsonify(123)


@main.route('/workerClick', methods=['POST'])
def workerClick():
    data = request.get_json()
    worker_behavior = WorkerBehavior(session["worker_id"], data["b_name"])
    db.session.add(worker_behavior)
    db.session.commit()

    return jsonify(123)


@main.route('/early_MI', methods=["POST", "GET"])
def early_MI():

    if request.method == "POST":
        message_text = request.form["input_message"]
        worker_id = request.args.get('PROLIFIC_PID')
        message = Message(worker_id, message_text)
        db.session.add(message)
        db.session.commit()

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








