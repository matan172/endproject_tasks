

function taskcard (task) {

    let color = "white"
    if (task.completed) {
        color = "yellow"
    }
    return (
        <div className="tasks" id={task.id} style={{backgroundColor: color}}>
            <div className="tasktitle">
                <h3>{task.title}</h3>

            </div>
               <hr />
            <div className="task desc">
                {task.desc}
            </div>
            <div id="options">
                {/* <form action="/deletetask" method="POST">
                    <input type="hidden" value="task.id" name="taskid" />
                    <input type="submit" value="delete" />

                </form>
                <form action="/completetask" method="POST">
                    <input type="hidden" value="task.id" name="taskid" />
                    <input type="submit" value="complete" />
                </form> 
                 */}
            
                
            </div>
        </div>
    )


    
}

function Showtasks () {
    const [tasks, settasks] = React.useState([]);
    React.useEffect (()=> {axios({method: 'POST',url: '/notcompleted',data: {}}).then((res) => settasks(res.data.tasks))},[]);
    
    
    return tasks.map((task) => {
        return taskcard(task)
    })
        

}


function showtasks () {
    const taskBoard = document.getElementById("taskboard")
    const taskroot = ReactDOM.createRoot(taskBoard)
    taskroot.render(<Showtasks />)
}


function Showcompletedtasks () {
    const [tasks, settasks] = React.useState([]);
    React.useEffect (()=> {axios({method: 'POST',url: '/completed',data: {}}).then((res) => settasks(res.data.tasks))},[]);
    
    
    return tasks.map((task) => {
        return taskcard(task)
    })

}  

function showcompleted() {
    const taskBoard = document.getElementById("taskboard")
    const taskroot = ReactDOM.createRoot(taskBoard)
    taskroot.render(<Showcompletedtasks />)
    
}

const removetask = (task) => {
    axios({
        method: 'post',
        url: '/deletetask',
        data: {"id": task.id}
    })

}
function Filtertasksfunc () {
    const [tasks, settasks] = React.useState([]);
    var text = document.getElementById("search").value;
    React.useEffect (()=> {axios({method: 'post',url: '/pulltasks',data: {"text":text}}).then((res) => settasks(res.data.tasks))},[]);
    
    if (tasks == []) {
        showtasks()
    }
    console.log(tasks);
    return tasks.map((task) => {
        return taskcard(task)
    })
        
    
}   

function filtertasks() {
    const taskBoard = document.getElementById("taskboard")
    const taskroot = ReactDOM.createRoot(taskBoard)
    taskroot.render(<Filtertasksfunc />)

};


const taskBoard = document.getElementById("taskboard");
const taskroot = ReactDOM.createRoot(taskBoard);
taskroot.render(<Showtasks />)
