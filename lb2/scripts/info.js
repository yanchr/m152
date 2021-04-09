jsonElement = JSON.parse(localStorage.getItem("jsonItem"));
console.log(jsonElement.title)

infoBody = document.getElementById("infoBody");

//title
titleH1 = document.createElement("h1");
if (jsonElement.title) titleH1.innerHTML = jsonElement.title;
infoBody.appendChild(titleH1);

//time
if (jsonElement.years) {
    timeH3 = document.createElement("h3");
    timeH3.innerHTML = `${jsonElement.years} Years`;
    if (jsonElement.years < -1000000 || jsonElement.years > 1000000) timeH3.innerHTML = `${jsonElement.years / 1000000} Million Years`;
    infoBody.appendChild(timeH3);
}

//backgroundimg
if (jsonElement.image) {
    backgroundImg = document.createElement("img");
    backgroundImg.src = `../assets/${jsonElement.image}`;
    backgroundImg.classList = "background";
    backgroundImg.width = "2000";
    backgroundImg.heigth = "2000";
    backgroundImg.scale = 2;
    infoBody.appendChild(backgroundImg);

}

document.onscroll = function(){onScroll()}

function onScroll() {

        // print "false" if direction is down and "true" if up
        scrollingDown = this.oldScroll < this.scrollY
        this.oldScroll = this.scrollY;

            if (scrollingDown && backgroundImg.width > 1000) {
               backgroundImg.width -= 100;
               backgroundImg.heigth -= 100;
            }
            if (!scrollingDown && backgroundImg.width < 2000) {
               backgroundImg.width += 100;
               backgroundImg.heigth += 100;
            }
}


