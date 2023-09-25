from flask import Flask,redirect,render_template,session,request
from flask_session import Session
import DBfuncs as db
import DBfamily as family
import datetime


# ------------------------------- #


app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True 
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


def homestr(string):
    return "<h1>" + string + "<a href='/' > home </a> </h1>" 

#------
# --------------main routes----------------------------#


@app.route('/')
def home():
        return render_template("home.html", session=session.get("id"))
    

@app.route('/tasks')
def tasks():
    if session.get("id"):
        return render_template("index.html", session=session.get("id"))
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
         
    return render_template("login.html",session = session)


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
    else: 
        return redirect("/")


@app.route('/notcompleted', methods=["POST"])
def notcompleted():
    if request.method == "POST":
        return {"tasks":db.pull_notcompleted_tasks(session["id"])}
    else: 
        return redirect("/")
    

@app.route('/newtask', methods=["POST","GET"])
def newtask():
    if request.method == "POST":

        title = request.form.get ("title")
        desc = request.form.get ("desc")
        task = {"title":title,"desc":desc}
        db.append_task(task=task,user_id=session["id"])
        return redirect("/tasks")
    else: 
        return redirect("/")

     
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
    else:
        return redirect("/")
    


# ------------family groups ---------------------

@app.route('/family')
def familys():
    
    return render_template('family.html', session=session)


@app.route('/family/removeme', methods = ["POST","GET"] )
def removeme():
    if request.method == "POST":
        id = session["id"]
        groupid = request.form.get("groupid")


@app.route("/family/creategroup", methods=["POST","GET"])
def createGroup():
    if request.method == "POST":
        selfid = session["id"]
        title = request.form.get("title")
        if family.make_family(selfid=selfid,title=title):
            return redirect('/family')
    
    return "there was a problem"

@app.route('/family/addmember')
def addmember():
    if request.method == 'POST':
        groupid = request.form.get("groupid")
        if session["id"] in family.pull_family(groupid)["heads"]:
            memberid = request.form.get("memberid")
            family.family_member(familyid=groupid,memberid=memberid)
        return redirect(f"/familys/{groupid}") 
    return "there was a problem"

@app.route('/family/completetask', methods=["POST","GET"])
def complete_group_task():
    if request.method == "POST":
        taskid = request.form.get("taskid")
        groupid = request.form.get("groupid")
        family.complete_group_task(taskid=taskid, groupid=groupid)
        return redirect(f"/familys") 


@app.route('/familys/addgrouptask', methods=["POST","get"])
def add_group_task():
    if request.method == "POST":
        groupid = int(request.form.get("groupid"))
        title = request.form.get("title")
        desc = request.form.get("desc")
        task = {"title":title,"desc":desc}
        family.family_task(familyid=groupid,task=task)
        return redirect("/familys")





# =========== family apis =======================
@app.route('/api/familys/group',methods=["POST","GET"])
def get_family():
    groupid = request.json.get("group")["groupid"]
    userid = session["id"]
    fam = family.pull_family(str(groupid))
    if (userid in fam["members"]) or (userid in fam["heads"]):
        print(fam)
        return fam
    else:"you have no access to this family"


@app.route('/api/familys/all', methods= ['POST','GET'] )
def getall_family():
    if request.method == "POST":
        id = session["id"]
        user = db.pull_user(id)
        userfamily_ids = user["familys"] 
        return {'groups':[family.pull_family(id) for id in userfamily_ids],}

    
@app.route('/session')
def get_session():
    if session:
        return {"id":session["id"]}


# ----------- production runserver ---------------


@app.route('/test')
def test():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
