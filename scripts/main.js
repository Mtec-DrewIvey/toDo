const res = document.getElementById("res");
const ct = document.getElementById("count");
const currentTime = document.getElementById("time");
const tRes = document.getElementById("timeRes");

function currentTimeCount() {
	let time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let t_str = `${hours}:${minutes} `;
	if (hours > 11) {
		t_str += "PM";
	} else {
		t_str += "AM";
	}
	currentTime.innerHTML = `Current Time: ${hours}:${minutes}`;
	if (hours >= "0" && hours <= "12") {
		tRes.innerHTML = `Good Morning`;
	} else if (hours >= "13" && hours <= "16") {
		tRes.innerHTML = `Good Afternoon`;
	} else if (hours >= "17" && hours <= "19") {
		tRes.innerHTML = `Good Evening`;
	} else if (hours >= "20" && hours <= "23") {
		tRes.innerHTML = `Good Night`;
	}
}
setInterval(currentTimeCount, 1000);
