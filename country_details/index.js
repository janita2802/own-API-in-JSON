const countriesContainer = document.getElementById("countries-container");
const ViewButton = document.getElementById("view-countries");
const sortByPopulationButton = document.getElementById("sort-by-population");

sortByPopulationButton.style.display = "none";

ViewButton.addEventListener("click", async function(){
    try{
        const url = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries";
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        
        DisplayData(data);
        sortByPopulationButton.style.display = "inline-block";
        sortByPopulationButton.disabled = false; 
        ViewButton.disabled = true; 

    }catch(error){
        console.log("Error fetching data:",error);
    } ;
});


sortByPopulationButton.addEventListener("click", async function(){
    try{
        const baseurl = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries";
        const category = "population";
        const url = `${baseurl}?sort=${category}&order=desc`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        
        DisplayData(data);

        sortByPopulationButton.disabled = true; 
        ViewButton.disabled = false; 

    }catch(error){
        console.log("Error fetching data:",error);
    } ;
});

function DisplayData(data){
    countriesContainer.innerHTML = "";
    let countries = data.data;
    countries.forEach(country => {
        const countryCard = document.createElement("div");
        countryCard.classList.add("card");

        const rank = document.createElement("h3");
        rank.textContent = `Rank: ${country.Rank}`;

        const name = document.createElement("h3");
        name.textContent = `Name: ${country.country}`;

        const population = document.createElement("h4");
        population.textContent = `Population: ${country.population}`;
        population.style = "font-size:12px;"

        countryCard.appendChild(rank);
        countryCard.appendChild(name);
        countryCard.appendChild(population);
        

        countriesContainer.appendChild(countryCard);
    });
}
