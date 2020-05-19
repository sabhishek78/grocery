const axios = require('axios')
async function getTotalPriceInBaseCurrency (text,currency,date) {
    let total=0;
    let conversionRates;
    text=text.replace('$','USD');
    text=text.replace('€','EUR');
    text=text.replace('₹','INR');
    // console.log('text='+text);
    let result=text.match(/([A-Z]{3}\s*)([\d,.]*)/g);
     console.log('result='+result);
    let currencyArray=[];
    for(let i=0;i<result.length;i++){
        let temp=[];
        temp.push(result[i].match(/[A-Z]{3}/g).toString());
        let currency=result[i].match(/[\d,.]+/g);
        console.log("currency="+currency);
        var currencyWithoutComma = currency.toString().replace(/,/g, "");
        temp.push(Number(currencyWithoutComma));
        currencyArray.push(temp);
    }
    console.log("currencyArray");
    console.log(currencyArray);
   let response=await axios.get('https://openexchangerates.org/api/historical/'+date+'.json'+'?app_id='+'bf1f6617d05f4a89bb07726cb61558c6');
   if(response.status!==200){
       throw(error);
   }
   else{
       conversionRates=(response['data']['rates']);
        console.log(conversionRates);
       // console.log(currencyArray[0][0]);
       // console.log(conversionRates[currencyArray[0][0]]);
       // console.log(conversionRates['AUD']);
       for(let i=0;i<currencyArray.length;i++){
           total=total+(currencyArray[i][1])/(conversionRates[currencyArray[i][0]])*(conversionRates[currency]);
           console.log("ttal="+total);
       }
     return total.toFixed(2);
   }

}
console.log(getTotalPriceInBaseCurrency(`apples $16.00
orange juice €4
rice packets ₹700
Washing machine AUD1,286.22
cashew nuts CHF48
4 motorcycles IDR 2,600,000`, "AUD", '2020-02-16'));