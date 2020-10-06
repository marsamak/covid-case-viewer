function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "." + mm + "." + yyyy;
  return today;
}
var publikationsDatum = getCurrentDate(); //setting a current date

//let summaryTableData = {}; //creating a dictionary

function updateSummaryTable() { //here we fill our summaryTableData with numbers
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
       
        //is there a better way to fill the summary table???
        document.getElementById("casesWorldwide").innerText = result.Global.TotalConfirmed.toLocaleString();
        document.getElementById("deathsWorldwide").innerText = result.Global.TotalDeaths.toLocaleString();
        document.getElementById("casesEU").innerText = "??";
        document.getElementById("deathsEU").innerText = "??";
        document.getElementById("casesGermany").innerText = result.Countries[63].TotalConfirmed.toLocaleString();
        document.getElementById("deathsGermany").innerText = result.Countries[63].TotalDeaths.toLocaleString();
        document.getElementById("casesBavaria").innerText = Number(0).toLocaleString();
        document.getElementById("deathsBavaria").innerText = Number(0).toLocaleString();
        // summaryTableData.casesWorldwide = result.Global.TotalConfirmed.toLocaleString();
        // summaryTableData.deathsWorldwide = result.Global.TotalDeaths.toLocaleString();
        // summaryTableData.casesEU = "??";
        // summaryTableData.deathsEU = "??";
        // summaryTableData.casesGermany = result.Countries[63].TotalConfirmed.toLocaleString();
        // summaryTableData.deathsGermany = result.Countries[63].TotalDeaths.toLocaleString();
        // summaryTableData.casesBavaria = 0;
        // summaryTableData.deathsBavaria = 0;
    })
    .catch((error) => console.log("error", error));
}
