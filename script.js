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
    document.getElementById(elementId).innerText = summaryTableData[elementId];
  }
}

function getEUSummary(allCountries) {
  var EUCodes = Object.keys(EUCountries);
  EUCodes = EUCodes.concat(Object.keys(EEACountries));
  EUCodes = EUCodes.concat(Object.keys(UKCountries));
  const EUData = allCountries.filter(country => EUCodes.includes(country.CountryCode));
  const EUSummary = EUData.reduce((accumulator, country) => {
    accumulator.casesEU += country.TotalConfirmed;
    accumulator.deathsEU += country.TotalDeaths;
    return accumulator;
  }, {
    casesEU: 0,
    deathsEU: 0
  });
  return EUSummary;
}

function updateSummaryTable() {
  //here we fill our summaryTableData with numbers
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  var summaryRequest = "https://api.covid19api.com/summary";

  fetch(summaryRequest, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const summaryDE = result.Countries.find(country => country.CountryCode == "DE");
      const summaryEU = getEUSummary(result.Countries);
      const summaryTableData = {
        casesWorldwide: result.Global.TotalConfirmed.toLocaleString(),
        deathsWorldwide: result.Global.TotalDeaths.toLocaleString(),
        casesEU: summaryEU.casesEU.toLocaleString(),
        deathsEU: summaryEU.deathsEU.toLocaleString(),
        casesGermany: summaryDE.TotalConfirmed.toLocaleString(),
        deathsGermany: summaryDE.TotalDeaths.toLocaleString(),
        casesBavaria: Number(0).toLocaleString(),
        deathsBavaria: Number(0).toLocaleString(),
      };

      fillTableFromDict(summaryTableData);
    })
    .catch((error) => console.log("error", error));
}
