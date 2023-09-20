
function setred (element) {
    element.style.background = "red";
}

function setwhite (element) {
    element.style.background = "white";
}



function loginFromCheacker () {
    let username = document.getElementById("username");
    let pass = document.getElementById("password");
    let repass = document.getElementById("repassword");
    let email = document.getElementById("email");
    let fail= false

    if ( username.value.length < 8 ) {
        window.alert("username is too short");
        setred(username);
        fail = true;
       
    ;
    } else if (username.value.length > 16 ){ 
        window.alert("username is too long");
        setred(username);
        fail = true;
        
    } else {setwhite(username)}
    
    if (email.value == "") {
        window.alert("must fill email")
        setred(email);
        fail = true;
        
    } else {setwhite(email) }
    
    if (pass.value != repass.value) {
        window.alert("password dont match");
        setred(repass);
        fail = true;
        
    } else { setwhite(repass)} 
    if (pass.value.length < 8) {
        window.alert("password too short");
        setred(pass);
        fail = true;
           
    
    } else if (pass.value.length > 30) {
        window.alert("password too long");
        setred(pass);
        fail = true;
        return false;
        
    } else {setwhite(pass)}
    if (fail) {
        return;
    }
    document.getElementById('registerform').submit()

}