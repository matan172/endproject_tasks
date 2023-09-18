


function loginFromCheacker () {
    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let repass = document.getElementById("repassword").value;
    let email = document.getElementById("email").value;

    if ( username.length < 8 ) {
        window.alert("username is too short");
        return false;
    } else if (username.length > 16 ){ 
        window.alert("username is too long");
        return false;
    }

    if (email == "") {
        window.alert("must fill email")
    }

    if (pass != repass) {
        window.alert("password dont match");
        return false;
    } else if (pass.length < 8) {
        window.alert("password too short");
        return false;        

    } else if (pass.length > 30) {
        window.alert("password too long");
        return false;
        
    }
    document.getElementById('registerform').submit()

}