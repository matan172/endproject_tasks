import react from "react";

export function Newtaskcard () {
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



export function taskcard (task) {

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


function complete(task) {
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

