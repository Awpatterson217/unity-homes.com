"use strict"

const currentPage = window.location.pathname.slice(1);    

let addActive = function(){
	if(typeof(currentPage) !== 'undefined' && currentPage !== null && currentPage !== ''){
		if(currentPage !== 'home')
			if(currentPage !== 'login')
				document.getElementById(`${currentPage}`).classList.add("active");
	}
}

addActive();
