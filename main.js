var player = {
	saves: {
		save1: {
			worth: 0,
			quantums: 0,
			unstableQuarksLog: -2,
			playing: true,
			time: 0
		},
		save2: {
			worth: 0,
			quantums: 0,
			unstableQuarksLog: -2,
			playing: false,
			time: 0
		},
		save3: {
			worth: 0,
			quantums: 0,
			unstableQuarksLog: -2,
			playing: false,
			time: 0
		},
		save4: {
			worth: 0,
			quantums: 0,
			unstableQuarksLog: -2,
			playing: false,
			time: 0
		},
		save5: {
			worth: 0,
			quantums: 0,
			unstableQuarksLog: -2,
			playing: false,
			time: 0
		}
	},
	money: 0,
	trust: 1,
	speed: {
		gameSpeed: 1,
		speedUpgrades: 0,
		cost: 10
	},
	timeSelled: 0,
	lastUpdate: Date.now()
}

function playSave(save) {
	switch (save) {
		case 1: {
			player.saves.save1.playing = true;
			player.saves.save2.playing = false;
			player.saves.save3.playing = false;
			player.saves.save4.playing = false;
			player.saves.save5.playing = false;
			break
		}
		case 2: {
			player.saves.save1.playing = false;
			player.saves.save2.playing = true;
			player.saves.save3.playing = false;
			player.saves.save4.playing = false;
			player.saves.save5.playing = false;
			break
		}
		case 3: {
			player.saves.save1.playing = false;
			player.saves.save2.playing = false;
			player.saves.save3.playing = true;
			player.saves.save4.playing = false;
			player.saves.save5.playing = false;
			break
		}
		case 4: {
			player.saves.save1.playing = false;
			player.saves.save2.playing = false;
			player.saves.save3.playing = false;
			player.saves.save4.playing = true;
			player.saves.save5.playing = false;
			break
		}
		case 5: {
			player.saves.save1.playing = false;
			player.saves.save2.playing = false;
			player.saves.save3.playing = false;
			player.saves.save4.playing = false;
			player.saves.save5.playing = true;
			break
		}
	}
}

function save() {
	window.localStorage.setItem("save-fun", JSON.stringify(player))
	let p = JSON.parse(window.localStorage.getItem("save-fun"))
	player = p
}

function load() {
	if (window.localStorage.getItem("save-fun") === null) {
		hardReset()
	} else {
		let p = JSON.parse(window.localStorage.getItem("save-fun"))
		player = p
		window.localStorage.setItem("save-fun", JSON.stringify(player))
	}
}

function hardReset() {
	player = {
		saves: {
			save1: {
				worth: 0,
				quantums: 0,
				unstableQuarksLog: -2,
				playing: true,
				time: 0
			},
			save2: {
				worth: 0,
				quantums: 0,
				unstableQuarksLog: -2,
				playing: false,
				time: 0
			},
			save3: {
				worth: 0,
				quantums: 0,
				unstableQuarksLog: -2,
				playing: false,
				time: 0
			},
			save4: {
				worth: 0,
				quantums: 0,
				unstableQuarksLog: -2,
				playing: false,
				time: 0
			},
			save5: {
				worth: 0,
				quantums: 0,
				unstableQuarksLog: -2,
				playing: false,
				time: 0
			}
		},
	money: 0,
	trust: 1,
	speed: {
		gameSpeed: 1,
		speedUpgrades: 0,
		cost: 10
	},
	timeSelled: 0,
	lastUpdate: Date.now()
	}
	save()
	load()
}

function sellSave(save) {
	player.money += player.saves["save" + save].worth
	if (player.saves["save"+save].worth >= 1) player.trust *= Math.log(Math.log(player.saves["save"+save].worth)+1)/100 + 1
	player.saves["save" + save] = {
		worth: 0,
		quantums: 0,
		unstableQuarksLog: -2,
		playing: player.saves["save"+save].playing,
		time: 0
	}
}

function buySpeed() {
	if (player.money >= player.speed.cost) {
		player.money -= player.speed.cost
		player.speed.gameSpeed *= Math.sqrt(2)
		player.speed.cost *= 5
		player.speed.speedUpgrades++
	}
}

function updateGUI() {
	document.getElementById("money").innerHTML = "You have $" + player.money.toFixed(2)
	document.getElementById("trust").innerHTML = "Trust:" + player.trust.toFixed(2)
	document.getElementById("speed").innerHTML = "Game speed: " + player.speed.gameSpeed.toFixed(2) + "<br>Cost: $" + player.speed.cost.toFixed(2)
	if (player.saves.save1.playing = true) {
		document.getElementById("playing1").innerHTML = "O"
	}
	if (player.saves.save1.playing = false) {
		document.getElementById("playing1").innerHTML = " "
	}
	if (player.saves.save2.playing = true) {
		document.getElementById("playing2").innerHTML = "O"
	}
	if (player.saves.save2.playing = false) {
		document.getElementById("playing2").innerHTML = " "
	}
	if (player.saves.save3.playing = true) {
		document.getElementById("playing3").innerHTML = "O"
	}
	if (player.saves.save3.playing = false) {
		document.getElementById("playing3").innerHTML = " "
	}
	if (player.saves.save4.playing = true) {
		document.getElementById("playing4").innerHTML = "O"
	}
	if (player.saves.save4.playing = false) {
		document.getElementById("playing4").innerHTML = " "
	}
	if (player.saves.save5.playing = true) {
		document.getElementById("playing5").innerHTML = "O"
	}
	if (player.saves.save5.playing = false) {
		document.getElementById("playing5").innerHTML = " "
	}
	for (let i = 1; i <= 5; i++) {
		let sq = player.saves["save" + i].quantums
		let su = player.saves["save" + i].unstableQuarksLog
		let sw = player.saves["save" + i].worth
		document.getElementById("quantums" + i).innerHTML = sq.toFixed(2)
		document.getElementById("uq" + i).innerHTML = su.toFixed(2)
		document.getElementById("worth" + i).innerHTML = "$" + sw.toFixed(2)
	}
}

function mainLoop() {
	let date = Date.now()
	let diff = (Date.now() - player.lastUpdate) / 1000 * player.speed.gameSpeed
	let q = {
		q1: player.saves.save1.time / 10,
		q2: player.saves.save2.time / 10,
		q3: player.saves.save3.time / 10,
		q4: player.saves.save4.time / 10,
		q5: player.saves.save5.time / 10
	}
	player.saves.save1.quantums = Math.floor(q.q1)
	player.saves.save2.quantums = Math.floor(q.q2)
	player.saves.save3.quantums = Math.floor(q.q3)
	player.saves.save4.quantums = Math.floor(q.q4)
	player.saves.save5.quantums = Math.floor(q.q5)
	player.saves.save1.unstableQuarksLog = Math.max(-2,q.q1-123)
	player.saves.save2.unstableQuarksLog = Math.max(-2,q.q2-123)
	player.saves.save3.unstableQuarksLog = Math.max(-2,q.q3-123)
	player.saves.save4.unstableQuarksLog = Math.max(-2,q.q4-123)
	player.saves.save5.unstableQuarksLog = Math.max(-2,q.q5-123)
	player.saves.save1.time += diff
	player.saves.save2.time += diff
	player.saves.save3.time += diff
	player.saves.save4.time += diff
	player.saves.save5.time += diff
	for (let i = 1; i <= 5; i++) {
		player.saves["save" + i].worth = (Math.sqrt(q["q"+i]) + Math.pow(Math.max(0, player.saves["save" + i].unstableQuarksLog), 0.7)) * player.trust
	}
	player.lastUpdate = Date.now()
	updateGUI()
}

load()
setInterval(mainLoop, 100)
setInterval(save, 30000)
