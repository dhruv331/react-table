const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

//cors
//cors
app.all("*", function (req, res, next) {
	var origin = req.get("origin");
	res.header("Access-Control-Allow-Origin", origin);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});
var cors = require("cors");
app.use(cors());

app.use(express.json());

async function fetchData() {
	var resp = await fetch("https://terriblytinytales.com/test.txt");
	resp = await resp.text();
	// console.log(resp)
	// var str = "hello hello hello this is a list of different words that it is",
	var split, obj;
	var split = resp.split(" ");
	var obj = {};

	for (var x = 0; x < split.length; x++) {
		if (obj[split[x]] === undefined) {
			obj[split[x]] = 1;
		} else {
			obj[split[x]]++;
		}
	}

	var obj2 = new Array(split.length + 10);
	for (const item in obj) {
		if (!obj2[obj[item]]) obj2[obj[item]] = [];

		obj2[obj[item]].push(item);

		// console.log(item,obj[item]);
	}
	var endi;
	for (var i = obj2.length - 1; i >= 0; i--) {
		if (obj2[i]) {
			endi = i;
			break;
		}
		// continue;
	}

	// console.log(obj2,endi);

	var ans = [];
	for (var i = endi; i >= 0; i--) {
		// console.log(obj2[i],i);
		if (!obj2[i]) continue;
		for (var j = 0; j < obj2[i].length; j++) {
			var temp = { word: obj2[i][j], freq: i };
			ans.push(temp);
		}
	}

	console.log(ans);
	return ans;
}

app.get("/", async function (req, res) {
	const frequencyArray = await fetchData();
	res.send(frequencyArray);
	// res.send("122");
});

app.listen(port, () => {
	console.log("Server is up on port " + port);
});
