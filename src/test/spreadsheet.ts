import { google } from "googleapis";

const auth = new google.auth.JWT({
  keyFile: "credentials/spreadsheet.json", //the key file
  //url to spreadsheets API
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const test = () => {
  const sheet = google.sheets({
    version: "v4",
    auth,
  });

  sheet.spreadsheets.values.get(
    {
      spreadsheetId: "1PLEkYhnBev3v4xJ_F2awtwyjwq_o-H4FuPZv5sUXguM",
      range: "A:C",
    },
    (err, res) => {
      if (err) return console.log("API Err", err);
      if (res?.data.values) {
        console.log(parseData(res.data.values));
      }
    },
  );
  return;
};

const dummy = [
  ["kategori1", "group1", "price1"],
  ["", "", "price2"],
  ["", "", "price3"],
  ["", "group2", "price1"],
  ["", "", "price2"],
  ["kategori2", "group1", "price1"],
  ["", "", "price2"],
];

function parseData(data: Array<unknown>) {}

const keyValue = () => {};

function testParseData() {
  let res = parseData(dummy);
  console.log(res);

  return;
}

export { test, testParseData };
