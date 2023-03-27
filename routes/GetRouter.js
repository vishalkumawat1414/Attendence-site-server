const router = require("express").Router();
const { google } = require("googleapis");

router.get("/get", async (req, res) => {
	// res.send("Hello Google!");

	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const client = await auth.getClient();
	const googleSheet = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = process.env.SPREADSHEET_ID;
	const getSheetData = await googleSheet.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: "Sheet1!A2:D",
	});
	// console.log(getSheetData.data)
	return res.send(getSheetData.data.values);
});

module.exports = router;
