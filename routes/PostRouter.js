const router = require("express").Router();
const { google } = require("googleapis");

router.post("/post", async (req, res) => {
	// res.send("Data submitted!");
	const { data } = await req.body;

	//   console.log("data passed from FE to BE",data)

	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const client = await auth.getClient();
	const googleSheet = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = process.env.SPREADSHEET_ID;
	const response = await googleSheet.spreadsheets.values.append({
		auth,
		spreadsheetId,
		range: "Sheet1!A2:D",
		valueInputOption: "USER_ENTERED",
		resource: {
			values: [[data.Date, data.Name, data.Enrollment, data.Status]],
		},
	});

	return res.send(response.config.data.values);
});

module.exports = router;
