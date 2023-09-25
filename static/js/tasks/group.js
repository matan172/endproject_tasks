



function GroupCard({ title, date, viewGroup, removeGroup}) {
    return (
      <div className="card">
        <h3>{title}</h3>
        <button className="btn accept" onClick={viewGroup}>view</button>
        <button className="btn remove" onClick={removeGroup}>remove me</button>
      </div>
    );
  }


function TaskCard({ title,desc, date, complete}) {
    return (
      <div className="card">
        <h3>{title}</h3>
        <h4>{desc}</h4>
        <p>{date}</p>

        <button className="btn complete" onClick={complete}></button>
      </div>
    );
  }




  function GroupBoard() {
    const [groups, setGroups] = React.useState([]);
    React.useEffect (()=> {axios({method: 'POST',url: '/api/familys/all',data: {}}).then((res) => setGroups(res.data.groups))},[]);

    const HandleView = (groupId) => {
        showGroupTasks(groupId)
        
      
    };

    const handleRemove = (groupId) => {
        if (window.confirm("are you sure you want to leave the group?")){
            // remove me from group 
            

        }
    };

    return (
      <div className="board">
        <div className="column">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              title={group.title}
              viewGroup={() => HandleView(group.id)}
              removeGroup={() => handleRemove(group.id)}
            />
          ))}
        </div>
        {/* Repeat the same structure for other columns (In Progress, Review, Done) */}
        {/* Add more columns and customize the logic for moving cards between columns */}
      </div>
    );
  }

function allgroups() {
    const family = document.getElementById("family");
    const taskroot = ReactDOM.createRoot(family);
    taskroot.render(<GroupBoard />)
}



function NewGroupCard() {
    return (
        <div>
            <h2>select title/name for your new group</h2>
            <form action="/family/creategroup" method="post">
                <input type="text" name="title" />
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}
function newgroup() {
    const family = document.getElementById("family");
    const taskroot = ReactDOM.createRoot(family);
    taskroot.render(<NewGroupCard />)

}

function complete (taskid,groupId) {
    React.useEffect (()=> {axios({method: 'POST',url: '/family/completetask',data: {"taskid":taskid,'groupid':groupId}})},[]);
    
}

function ShowTasks(groupId) {
    const [group, setGroup] = React.useState([]);
    React.useEffect (()=> {axios.post({method: 'json',url: '/api/familys/group',data: {"group":groupId}}).then((res) => setGroup(res.data))},[]);
    console.log(group)
    return (
        <div className="board">
        <div>
            <form action='/familys/addgrouptask'>
                <input type="hidden" value={group.id} name="groupid"/>
                <input type="text" name="title" placeholer="title"/>
                <input type="text" name="desc" placeholer="desc..." />
                <input type="submit" />
            </form>
        </div>
          <div className="column">
            {group.tasks.map((task) => (
              <TaskCard
              title = {task.title}
              desc = {task.desc}

                complete = {complete(task.id,groupId)}
              />
            ))}
          </div>
          {/* Repeat the same structure for other columns (In Progress, Review, Done) */}
          {/* Add more columns and customize the logic for moving cards between columns */}
        </div>
      );


    
}

function showGroupTasks(groupId) {
    const family = document.getElementById("family");
    const taskroot = ReactDOM.createRoot(family);
    taskroot.render(<ShowTasks groupid={groupId} />)

}