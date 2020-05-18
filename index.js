import axios from 'axios';
function getTotalPriceInBaseCurrency(text,currency,date){
    text=text.replace('$','USD');
    text=text.replace('€','EUR');
    text=text.replace('₹','INR');
    console.log(text);
    let result=text.match(/([A-Z]{3}\s*)([\d,.]*)/g);
    console.log(result);
    let currencyArray=[];
    for(let i=0;i<result.length;i++){
        let temp=[];
        temp.push(result[i].match(/[A-Z]{3}/g));
            temp.push(result[i].match(/[\d,.]+/g));
        currencyArray.push(temp);
    }
console.log(currencyArray);
    axios.get('https://openexchangerates.org/api/latest.json/currencies.json/historical/'+date+'.json')
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });

}
getTotalPriceInBaseCurrency(`apples $16.00
orange juice €4
rice packets ₹700
Washing machine AUD1,286.22
cashew nuts CHF48
4 motorcycles IDR 2,600,000`, "AUD", '2020-02-16')