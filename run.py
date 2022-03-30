from app import create_app, db

# --------local testing----------------
flask_app = create_app()
if __name__ == "__main__":
    with flask_app.app_context().push():
        db.create_all()
    flask_app.run()

