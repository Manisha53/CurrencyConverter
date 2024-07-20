const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

for(let select of dropdowns){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value=currcode;
        if(select.name ==="from" && currcode ==="USD"){
            newOption.selected="selected";
        } else if(select.name ==="to" && currcode ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption); 
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}   

const updateFlag = (element)=>{
    // console.log(element);
    let currcode=element.value;
    // console.log(currcode);
    let countryCode=countryList[currcode];
    let newSrcLink=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src=newSrcLink;
}

btn.addEventListener("click", async (event)=>{
    event.preventDefault();//to avoid default behaviour of the page
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    // console.log(amtValue);
    if(amtValue === "" || amtValue < 1){
        amtValue=1;
        amount.value=1;
    }

const fromCurr = document.querySelector(".from select").value.toLowerCase();
const toCurr = document.querySelector(".to select").value.toLowerCase();
const msg = document.querySelector(".msg");

const urlfrom = `${base_url}/${fromCurr}.json`;
const urlto = `${base_url}/${toCurr}.json`;
let responsefrom = await fetch(urlfrom);
let responseto = await fetch(urlto);
let datafrom = await responsefrom.json();
let datato = await responseto.json();
let exchangerate = datafrom[fromCurr][toCurr];

let finalAmount = exchangerate*amtValue;
console.log(finalAmount);
msg.innerText = `${amtValue} ${fromCurr.toUpperCase()} = ${finalAmount} ${toCurr.toUpperCase()}`;
});