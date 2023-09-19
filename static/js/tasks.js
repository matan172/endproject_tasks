

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
            <div className="taskdesc">
                {task.desc}
            </div>
            <hr />
            <div className="taskdate">
                {task.date}

            </div>
            <div id="options">
                 <form action="/taskop" method="POST">
                    <input type="hidden" value={task.id} name="taskid" />
                    <input type="hidden" value="delete" name="option" /> 
                    <input type="submit" value="delete" />

                </form>
                <form action="/taskop" method="POST">
                    <input type="hidden" value={task.id} name="taskid" />
                    <input type="hidden" value="complete" name="option" />
                    <input type="submit" value="complete" />
                </form> 
                
            
                
            </div>
        </div>
    )


    
}


function Newtaskcard () {
    return (
        <div className="newtask">
            <form action="/newtask" method="post" id="newtask">
                <label htmlFor="title">:task title</label>
                <input type="text" name="title" id="formtitle"/>
                <label htmlFor="desc">desc:</label>
                <input type="text" name="desc" id="formdesc"/>
                <input type="submit" value="add new task" />
                


            </form>
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

function quete () {
   axios.get('https://zenquotes.io/api/random').then((res) => {let q =  res.data[0].h})
   return (
        <div>
            <p>you have completed nothing</p>
            {q}

        </div>
   )

}
function Showcompletedtasks () {
    const [tasks, settasks] = React.useState([]);
    React.useEffect (()=> {axios({method: 'POST',url: '/completed',data: {}}).then((res) => settasks(res.data.tasks))},[]);

    if (tasks.lenght == 0 ) {return (
        <div>
            <h1>you have completed nothing ! </h1>
        </div>
    )}
    
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


function Clicknewtask() {
    const taskBoard = document.getElementById("taskboard")
    const taskroot = ReactDOM.createRoot(taskBoard)
    taskroot.render(<Newtaskcard />)

}


const taskBoard = document.getElementById("taskboard");
const taskroot = ReactDOM.createRoot(taskBoard);
taskroot.render(<Showtasks />)
