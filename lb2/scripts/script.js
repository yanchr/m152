currentUrl = "./json/defaultJson.json";
queryString = window.location.search;
urlParams = new URLSearchParams(queryString);

if(urlParams.get('urlToJson')){
    currentUrl = urlParams.get('urlToJson')
}

async function getJson(url = ''){
const response = await fetch(url)
return response.json();
}


getJson(currentUrl)
.then(data => {
    createTimeLine(data);
})



function createTimeLine(results){
    timeline1Div = document.getElementById("timeline");
    i = 1;
    for(const [key, value] of Object.entries(results)){
        
        containerSide = document.createElement("div");
        contentDiv = document.createElement("div");
        title = document.createElement("h2");
        text = document.createElement("p");
        years = document.createElement("h3");
        containerSide.classList.add("container");
        contentDiv.classList.add("content");
        if (i % 2 == 0){
            containerSide.classList.add("left");
        } else {
            containerSide.classList.add("right");
        }
        containerSide.id = `Container${i}`;
    
        if(value.title)  title.innerHTML = value.title;
        if(value.text)  text.innerHTML = value.text;
        if (value.years) {
            years.innerHTML = `${value.years} Years`;

            if (value.years < -1000000 || value.years > 1000000) {
                years.innerHTML = `${value.years / 1000000} Million Years`
            }
        }
        
        if (value.jsonName){
            TimelineRedirect(value.jsonName);
        } else {
            InfoRedirect(value);
        }
        
        contentDiv.appendChild(years);
        contentDiv.appendChild(title);
        contentDiv.appendChild(text);
        containerSide.appendChild(contentDiv);
        timeline1Div.appendChild(containerSide);
    
        i++;
    }
}



function TimelineRedirect(urlToJson){
    containerSide.addEventListener("click", () => {
        window.location.href = `timeline.html?urlToJson=./json/${urlToJson}.json`;
    })
}

function InfoRedirect(value){
    containerSide.addEventListener("click", () => {
        window.location.href = `./html/info.html`;
        localStorage.setItem("jsonItem", JSON.stringify(value));
    })
}