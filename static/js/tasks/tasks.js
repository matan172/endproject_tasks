//  components html


function complete(task) {
    // <= task dict
    // => () 'if task.complete == false' 'else': => html for complete button at "/taskop" via form/post {taskid:task.id,option:'complete'}
    if (task.completed == false) {
        return (
            <span>
                <form action="/taskop" method="POST">
                    <input type="hidden" value={task.id} name="taskid" />
                    <input type="hidden" value="complete" name="option" />
                    <input type="submit" value="complete" />
                </form> </span>
        )}
}

function taskcard (task) {
    //  <= task dict 
    // => task card html

    let color = "white"
    if (task.completed) {
        color = "yellow"
    }
    return (
        <li className="tasks" id={task.id} style={{backgroundColor: color}}>
            <span className="tasktitle">
                <h1>{task.title}</h1>

            </span>
               <hr />
            <span className="taskdesc">
                <h3>{task.desc}</h3>
            </span>
            <hr />
            <span className="taskdate">
                <p>{task.date}</p>

            </span>
            <span className="taskoptions">
                <span>
                 <form action="/taskop" method="POST">

                    <input type="hidden" value={task.id} name="taskid" />
                    <input type="hidden" value="delete" name="option" /> 
                    <input type="submit" value="delete" />

                </form></span>
                {complete(task)}
                
            
                
            </span>
        </li>
    )


    
}


function Newtaskcard () {
    //  return form for new task to be added via form/post at '/newtask'
    return (
        <div className="newtask">
            <form action="/newtask" method="post" id="newtask">
                <label htmlFor="title">task title : </label>
                <input type="text" name="title" id="formtitle"/><hr />
                <label htmlFor="desc">desc :</label>
                
                <textarea type="text" name="desc" id="formdesc" rows="4" cols="50" maxlength="100" />
                
                <hr />
                <input type="submit" value="add new task" />
                


            </form>
        </div>
    )
}


//  react func


function Showtasks () {
    // requast post all non-completed tasks from '/notcompleted'
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

// function quete () {
//    axios.get('https://zenquotes.io/api/random').then((res) => {let q =  res.data[0].h})
//    return (
//         <div>
//             <p>you have completed nothing</p>
//             {q}

//         </div>
//    )

// }
function Showcompletedtasks () {
    const [tasks, settasks] = React.useState([]);
    React.useEffect (()=> {axios({method: 'POST',url: '/completed',data: {}}).then((res) => settasks(res.data.tasks))},[]);


    
    return tasks.map((task) => {
        return taskcard(task)
    })

}  


// const removetask = (task) => {
//     axios({
//         method: 'post',
//         url: '/deletetask',
//         data: {"id": task.id}
//     })


function Filtertasksfunc () {
    const [tasks, settasks] = React.useState([]);
    var text = document.getElementById("search").value;
    React.useEffect (()=>  {axios({method: 'post',url: '/pulltasks',data: {"text":text}}).then((res) => settasks(res.data.tasks))},[]);
    
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

function showcompleted() {
    const taskBoard = document.getElementById("taskboard")
    const taskroot = ReactDOM.createRoot(taskBoard)
    taskroot.render(<Showcompletedtasks />)
}
    


const taskBoard = document.getElementById("taskboard");
const taskroot = ReactDOM.createRoot(taskBoard);
taskroot.render(<Showtasks />)
