from flask import Flask,redirect,render_template,session,request
from flask_session import Session
import DBfuncs as db
import datetime
# ------------------------------- #
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True 
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


def homestr(string):
    return "<h1>" + string + "<a href='/' > home </a> </h1>" 

#--------------------main routes----------------------------#

@app.route('/')
def home():
    return render_template("home.html", session=session.get("id"))
    

@app.route('/tasks')
def tasks():
    if session.get("id"):
        return render_template("tasks.html", session=session)
    else: 
        return redirect("/login")


@app.route("/login", methods=["POST", "GET"])
def login():
    if session.get("id"):
        return homestr("you are already loged in") 
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        user = db.pull_user(username)
        if user:
            if password == user["password"]:
                session["id"] = user["id"]
                return redirect("/")  
            else:
                return homestr("wrong password")
        else:
            return homestr("wrongusername")
         
    return render_template("login.html")


@app.route('/logout')
def logout():
    session.clear()
    return redirect("/")


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
        session["id"] = db.append_user(user)
        return redirect("/")
    else: 
        redirect("/")


# --------------- crud -----------------------

@app.route('/taskop', methods=["POST","GET"])
def task_options():
    if request.method == "POST":
        option = request.form["option"] 
        taskid = int(request.form["taskid"])
        if option == "delete":
            db.remove_task(user_id=session["id"],task_id=taskid)
        elif option == "complete":
            db.complete_task(userid=session["id"], taskid=taskid)
    return redirect("/tasks")
# --------------- api ----------------------------
@app.route('/completed', methods=["POST"])
def completed():
    if request.method == "POST":
        return {"tasks":db.pull_completed_tasks(session["id"])}
    
@app.route('/notcompleted', methods=["POST"])
def notcompleted():
    if request.method == "POST":
        return {"tasks":db.pull_notcompleted_tasks(session["id"])}
    

@app.route('/newtask', methods=["POST","GET"])
def newtask():
    if request.method == "POST":

        title = request.form.get ("title")
        desc = request.form.get ("desc")
        task = {"title":title,"desc":desc}
        db.append_task(task=task,user_id=session["id"])
        return redirect("/tasks")

     

@app.route('/pulltasks/', methods=["GET","POST"])
def pulltasks():
    if request.method == "POST":
        text = request.json["text"]
        print(text)
        tasks = db.pull_tasks(session["id"])
        sendBack = []
        for task in tasks:
            if (text in task["title"]) or (text in task["desc"]):
                sendBack.append(task)
        return {'tasks':sendBack}

# ----------- production runserver ---------------
if __name__ == "__main__":
    app.run(debug=True)
