const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let option = document.querySelectorAll(".dropdown select");
let exchangebtn = document.querySelector(".btn");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


for(let opt of option){
    for(let Currcode in countryList){
        let newopt = document.createElement("option");
        newopt.innerText = Currcode;
        newopt.value = Currcode;
        if(opt.name === "from" && Currcode === "USD"){
            newopt.selected = "selected";
        }
        else if(opt.name === "to" && Currcode === "INR"){
            newopt.selected = "selected";
        }
        opt.append(newopt);
    }
    opt.addEventListener("change", (e) => {
        updateflag(e.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

exchangebtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];

    let finalamt = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
}