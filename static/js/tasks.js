const taskBoard = document.getElementById("taskboard")
const taskroot = ReactDOM.createRoot(taskBoard)


function taskcard (task) {

    let color = "white"
    if (task.completed) {
        color = "yellow"
    }
    return (
        <div className="tasks" id={task.id} style={{backgroundcolor:color}}>
            <div className="tasktitle">
                <h3>{task.title}</h3>

            </div>
               <hr />
            <div className="task desc">
                {task.desc}
            </div>
            <div id="options">
                <form action="/deletetask" method="POST">
                    <input type="hidden" value="task.id" name="taskid" />
                    <input type="submit" value="delete" />

                </form>
                <form action="/completetask" method="POST">
                    <input type="hidden" value="task.id" name="taskid" />
                    <input type="submit" value="complete" />
                </form>
            </div>
        </div>
    )


    
}

function showtasks () {

}


function showcompleted() {
    
}

function hideoptions() {
    console.log("hide")
}
function showoptions() {
    console.log("showoptions")
}

function Filtertasksfunc () {
    const [tasks, settasks] = React.useState([]);
    var text = document.getElementById("search").value;
    React.useEffect (()=> {axios.get('/pulltasks/'+text).then((res) => settasks(res.data.tasks))},[]);
    
    
    console.log(tasks);
    
    return tasks.map((task) => {
        return taskcard(task)
    })
        
    
}   

function filtertasks() {
    const taskBoard = document.getElementById("taskboard")
    const taskroot = ReactDOM.createRoot(taskBoard)
    taskroot.render(<Filtertasksfunc />)

}

