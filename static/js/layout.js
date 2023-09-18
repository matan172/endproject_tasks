function NavItemCard(item,ref){
    return <span classname = "navitem" href={ref} > {item} </span>
}


function logout() {
    var massage = "are you sure you want to logout?!";
    if (window.confirm(massage)){
    window.location.href = "/logout";}
    
 }








