const currentPage = window.location.pathname.slice(1);

const addActive = function() {
	if (typeof(currentPage) !== 'undefined' && currentPage !== null && currentPage !== '') {
		if (currentPage !== 'home')
			if (currentPage !== 'login')
			  if (document.getElementById(`${currentPage}`))
					document.getElementById(`${currentPage}`).classList.add("active");
	}
}

addActive();
