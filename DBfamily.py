import json
from DBfuncs import pull_user,write_json
import datetime

#request def (in this file)=> request the user to join new group by notification




def make_request(userid:int,group_id):
    return {"userid":userid,
            "task_group":group_id,
            "date": datetime.datetime.now().strftime,
            "title": pull_family(group_id)["title"]
            }

def load_json(database):
    with open(database,"r") as f:
        return json.load(f)

def make_family(selfid,title):
    database = "./databases/03_family.json"
    with open(database, 'r') as f:
        data = json.load(f)       
        
        index = data["index"]
        familytasks = data["familytasks"]
        #new group tasks

        new_family_tasks = {}
        new_family_tasks['title'] = title
        new_family_tasks['heads'] = [selfid,]
        new_family_tasks['members'] = []
        new_family_tasks['tasks'] = []
        new_family_tasks['index'] = 0

        #-----
        familytasks[index] = new_family_tasks
        data["index"] =  index + 1

    write_json(data=data,filename=database)
    family_to_userDB(userid=selfid,familyid=index)
    return True

def family_member(familyid,memberid):
    database = "./databases/03_family.json"
    with open(database, 'r') as f:
        data = json.load(f)
        family = data["familytasks"][familyid]
        if memberid not in family["members"]:
            family["members"].append(memberid)
        else:
            return "user is already a member of the family"
    write_json(data=data,filename=database)
    return True

def family_task(familyid,task):
    database = "./databases/03_family.json"
    with open(database, 'r') as f:
        data = json.load(f)
        family = data["familytasks"][familyid]
        index = family['index']
        task['id'] = index
        task['date'] = datetime.datetime.now().strftime
        task['completed'] = False
        family['index'] = index + 1
        family["tasks"].append(task)


    write_json(data=data,filename=database)
        


def pull_family(familyid:str):
    with open("./databases/03_family.json",'r') as f:
        family = json.load(f)["familytasks"][familyid]
        family["id"] = familyid
        return family

def family_to_userDB(userid,familyid):
    with open("./databases/01_users.json","r") as f:
        data = json.load(f)
        for user in data['users']:
            if user['id'] == str(userid):
                print(user['id'])
                user["familys"].append(str(familyid))
    write_json(data=data,filename="./databases/01_users.json")


def request_to_userDB(userid,request:dict):
    with open("./databases/01_users.json","r") as f:
        data = json.load(f)
        data[userid]["requests"].append(request)
    write_json(data=data,filename="./databases/01_users.json")

        
def accept_request(request:dict):
    userid = request["userid"]
    groupid = request["task_group"]
    if family_member(familyid=groupid,memberid=userid):
        family_to_userDB(userid=userid,familyid=groupid)
    return True

def complete_group_task(groupid,taskid):
    database = "./databases/03_family.json"
    data = load_json(database=database)
    for task in data["familytasks"][groupid]["tasks"]:
        if task["id"] == taskid:
            task["completed"] = True
            break
    write_json(database)
    return True


def remove_user_from_group (userid,groupid):
    database = "./databases/03_family.json"
    data = load_json(database=database)
    data["familytasks"][groupid]["members"].remove(userid)
    write_json(database=database,data=data)
    return True
   
    


