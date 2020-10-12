function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "." + mm + "." + yyyy;
  return today;
}
var publikationsDatum = getCurrentDate(); //setting a current date

function fillTableFromDict(summaryTableData) {
  for (let elementId in summaryTableData) {
    const value = summaryTableData[elementId];
    document.getElementById(elementId).innerText = value;
  }
}

function updateSummaryTable() {
  //here we fill our summaryTableData with numbers
  console.log("in updateNumbers()");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  var summaryRequest = "https://api.covid19api.com/summary";

  fetch(summaryRequest, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      //console.log(result);

      let summaryTableData = {}; //creating a dictionary
      summaryTableData.casesWorldwide = result.Global.TotalConfirmed.toLocaleString(); 
      summaryTableData.deathsWorldwide = result.Global.TotalDeaths.toLocaleString();
      summaryTableData.casesEU = "??";
      summaryTableData.deathsEU = "??";
      summaryTableData.casesGermany = result.Countries[63].TotalConfirmed.toLocaleString();
      summaryTableData.deathsGermany = result.Countries[63].TotalDeaths.toLocaleString();
      summaryTableData.casesBavaria =  Number(0).toLocaleString();
      summaryTableData.deathsBavaria =  Number(0).toLocaleString();

      fillTableFromDict(summaryTableData);
    })
    .catch((error) => console.log("error", error));
}
