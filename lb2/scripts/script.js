AOS.init();
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

loaderDiv = document.getElementById("loader");

var rightManEye = document.getElementById("right-man-eye");
document.addEventListener('mousemove', e => {
    var xEye = (e.clientX * 3 / window.innerWidth) + "%";
    var yEye = (e.clientY * 3 / window.innerHeight - 0.7) + "%";
    
    rightManEye.style.left = xEye;
    rightManEye.style.top = yEye;
    console.log(`${xEye} : ${yEye}`)
    rightManEye.style.transform = "translate("+xEye+","+yEye+")";
    console.log("mousemove")

});



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
    
        if(value.title)  title.innerText = value.title;
        /* if(value.text){
            text.innerText = value.text;
        } */
            
        if (value.years) {  
            years.innerText = `${value.years} Years`;

            if (value.years < -1000000 || value.years > 1000000) {
                years.innerText = `${value.years / 1000000} Million Years`
            }else if (value.years < -1000 || value.years > 1000) {
                years.innerText = `${value.years / 1000}K Years`
            }
        }

        

        containerSide.dataset.aos = "fade-up";
        
        if (value.jsonName){
            TimelineRedirect(value.jsonName);
        } else {
            InfoRedirect(value);
        }
        contentDiv.append(years, title, text);
        containerSide.append(contentDiv);
        timeline1Div.append(containerSide);
    
        i++;
    }
}

function TimelineRedirect(urlToJson){
    containerSide.addEventListener("click", () => {
        loaderDiv.style.animation = "fade-out 1s linear";
        setTimeout(function(){
             window.location.href = `timeline.html?urlToJson=./json/${urlToJson}.json`;
            }, 1000);
    })
}

function InfoRedirect(value){
    containerSide.addEventListener("click", () => {
        loaderDiv.style.animation = "fade-out 1s linear";
        setTimeout(function(){
             window.location.href = `./html/info.html`;
             localStorage.setItem("jsonItem", JSON.stringify(value));
            }, 1000);
    })
}
