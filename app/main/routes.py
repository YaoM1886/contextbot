from app.main import main
from flask import render_template


@main.route('/')
def index_MI():
    return render_template("index_MI.html")


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


