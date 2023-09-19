import json
import datetime

# writing to json file
def write_json(data, filename):
    """writes data to json file
    
    Keyword arguments:
    data -- full json.load()
    filename -- path to filename 
    return : None
    """
    
    with open(filename, "w") as f:
        json.dump(data,f, indent=4)


# users setup string
def append_user(user:dict):
    """
    !!! PK-AI user id !!!
    argument - user = {username:str , password:str}
    
    append to "./databases/01_users.json"
    Return: userid
    """
    file_name = "./databases/01_users.json"
    with open(file_name, "r") as f:
        data = json.load(f)
        temp = data["users"]
        data["index"]+=1
        user["id"] = str(data["index"])
        
        temp.append(user)
        write_json(data=data,filename=file_name)
    
    return user["id"]



def append_task(task:dict,user_id:str):
    """
    appends task dict
    append to "./databases/02_tasks.json"
    Return: None
    """
    
    file_name = "./databases/02_tasks.json"
    with open(file_name,'r') as f:
        data = json.load(f)
        try: # test if user already have a k:v pair in database
            user_data = data[user_id]["tasks"]
        except: # make a fresh k=user_id : v={"tasks":[],"index":0} 
            data[user_id] = {"tasks":[],"index":0}
            user_data = data[user_id]["tasks"]
        task["id"] = data[user_id]["index"]
        task["completed"] = False
        task['date'] = datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")
        data[user_id]["index"]+=1
        user_data.append(task)
        write_json(data=data,filename=file_name)

        
test_user = {"username":"test","password":"yesy"}


def pull_user(info):
    """get user {username ,password , id}
    
    Keyword arguments:
    info = id || email || username
    Return: user dict obj 
    return: false if userid dosent exists
    """
    
    with open("./databases/01_users.json","r") as f: 
        data = json.load(f)
        for user in data["users"]:
            if (user["id"]==info) or (user["email"] == info ) or (user["username"] == info ):
                 return user
        return False

def pull_completed_tasks(userid):
    sendback = []
    with open("./databases/02_tasks.json","r") as f: 
        try:
            for task in json.load(f)[userid]["tasks"]:
                if task["completed"]:
                    sendback.append(task)
            return sendback 
        except:
            return False
        
def pull_notcompleted_tasks(userid):
    sendback = []
    with open("./databases/02_tasks.json","r") as f: 
        try:
            for task in json.load(f)[userid]["tasks"]:
                if not task["completed"]:
                    sendback.append(task)
            return sendback 
        except:
            return False

def pull_tasks(userid:str):
    """
    argument -- userid
    Return: [all tasks] list obj  
    """
    
    with open("./databases/02_tasks.json","r") as f: 
        try:
            return json.load(f)[userid]["tasks"]
        except:
            return False

def remove_task(user_id,task_id):
    """removes a task
    
    Keyword arguments:
    argument -- user_id
    argument -- taks_id
    Return: None
    """
    
    with open("./databases/02_tasks.json","r") as f:
        data = json.load(f)
        user_tasks = data[user_id]["tasks"]
        for task in user_tasks:
            if task["id"] == task_id:
                user_tasks.remove(task)
                print("remove")
        write_json(filename="./databases/02_tasks.json",data=data)

def complete_task(userid, taskid):
    with open ("./databases/02_tasks.json","r") as f:
        data = json.load(f)
        user_tasks = data[userid]["tasks"]
        for task in user_tasks: 
            if task["id"] == taskid:
                task["completed"] = True
        write_json(filename="./databases/02_tasks.json",data=data)

 
                

test_task ={"title":"this is tile", "date":"this is a date", "desc":"this is what i need to do", "completed":False}
test_user = {"username":"username","password":"pass"}


# append_user(test_user)

# print(pull_user('1'))
# append_task(task=test_task,user_id="1")

remove_task(user_id="1", task_id=1) 