const currentPage = window.location.pathname.slice(1);    

let removeAllActive = function(){
    document.getElementById("properties").classList.remove("active");
    document.getElementById("app").classList.remove("active");
    document.getElementById("contact").classList.remove("active");
}

let addActive = function(){
   
    if (typeof(currentPage) != 'undefined' && some_variable != null){
        document.getElementById(`${currentPage}`).classList.add("active");
    }
}
removeAllActive();
addActive();
