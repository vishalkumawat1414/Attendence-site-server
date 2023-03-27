const router = require("express").Router();
const { google } = require("googleapis");

router.post("/del", async (req, res) => {
	const data = await req.body;
	//  console.log("element to be deleted ",data)
	// res.send(data);
	var value = data;
	//const{i,len,flen} = data
	var ListNo = value.data.i + 2; //for making index equal to current element(in sheet) which to be deleted
	console.log(ListNo)

	//logic for range of sheet (for clearAll)
	var f = 0;
	var l = 0;
	if (ListNo) {
		f = l = ListNo;
	} else {
		f = value.data.first + 2;
		l = value.data.last + 1;
	}

	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const client = await auth.getClient();
	const googleSheet = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = process.env.SPREADSHEET_ID;
	const response = await googleSheet.spreadsheets.values.clear({
		auth,
		spreadsheetId,
		range: `Sheet1!A${f}:D${l}`,
	});
});

module.exports = router;
