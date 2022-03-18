from app.main import main
from flask import render_template
from flask import request, url_for, redirect


@main.route('/index_MI')
def index_MI():
    worker_id = request.args.get('PROLIFIC_PID')
    return redirect(url_for('main.early_MI', name=worker_id))


@main.route('/early_MI/<worker_id>')
def early_MI(worker_id):
    db_worker = worker_id
    print("This is gonna be in db", db_worker)
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


