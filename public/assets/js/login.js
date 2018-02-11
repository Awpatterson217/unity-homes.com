const currentPage = window.location.pathname.slice(1);

const setCookie = function(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const getCookie = function(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
const autofillEmail = function() {
	const rememberedEmail = getCookie('remember');
	const loginEmail = document.getElementById('login-email');
	const rememberMe = document.getElementById('remember');
	const loginPassword = document.getElementById('login-password');

	if (rememberedEmail !== '') {
		loginEmail.value = rememberedEmail;
		rememberMe.checked = true;
		loginPassword.focus();
	}else{
		document.getElementById('login-email').focus();
	}
}

if (currentPage === 'login') {
	autofillEmail();
}
