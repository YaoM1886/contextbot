from app import create_app, db

# --------local testing----------------
flask_app = create_app()
if __name__ == "__main__":
    with flask_app.app_context():
        db.create_all()
    flask_app.run()
# ------------------------------------------

# #-----------------PRODUCTION---------------------
# flask_app = create_app('prod')
#
# with flask_app.app_context():
#     db.create_all()
#     try:
#         if not User.query.filter_by(user_name='harry').first():
#             User.create_user(user='harry', email='harry@potters.com', password='secret')
#     except exc.IntegrityError:
#         pass
