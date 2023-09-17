from flask import Flask,redirect,render_template,session,request
from flask_session import Session
import DBfuncs as db
# ------------------------------- #
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True 
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#--------------------main routes----------------------------#

@app.route('/')
def home():
    return render_template("home.html", session=session)


@app.route("/login", methods=["POST", "GET"])
def login():
    
    return render_template("login.html")


@app.route('/register', methods=["POST", "GET"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
        user = {"username":username,"password": password, "email":email}
        if db.pull_user(username):
            return "username is alreay in the system"
        if db.pull_user(email):
            return "email is already in the system"
        session["userid"] = db.append_user(user)
        return redirect("/")




# ----------- production runserver ---------------
if __name__ == "__main__":
    app.run(debug=True)
