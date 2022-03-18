from app.main import main
from flask import render_template
from flask import request, session


@main.route('/')
def index_MI():
    worker_id = request.args.get('PROLIFIC_PID')
    session["worker_id"] = worker_id
    return render_template("index_MI.html")


@main.route('/early_MI')
def early_MI():
    worker_id = session.get('worker_id')
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


