const axios = require('axios')
function getTotalPriceInBaseCurrency (text,currency,date) {
    let total=0;
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

        console.log(currencyWithoutComma);
             temp.push(currencyWithoutComma);
        currencyArray.push(temp);
    }
    console.log(currencyArray);


    const getCurrency = async () => {
        try {
            return await axios.get('https://openexchangerates.org/api/historical/'+date+'.json'+'?app_id='+'bf1f6617d05f4a89bb07726cb61558c6')
        } catch (error) {
            console.error(error)
        }
    }
    let currencyDetails={};
    const getCurrencyDetails = async () => {
         currencyDetails = await getCurrency()
        console.log(currencyDetails['data']['rates']);

         for(let i=0;i<currencyArray.length;i++){
           total=total+(Number(currencyArray[i][1])/Number(currencyDetails['data']['rates'][currencyArray[i][0]]))*Number(currencyDetails['data']['rates'][currency]);

         }
        console.log(total);
    }

     return  getCurrencyDetails();



}
console.log(getTotalPriceInBaseCurrency(`apples $16.00
orange juice €4
rice packets ₹700
Washing machine AUD1,286.22
cashew nuts CHF48
4 motorcycles IDR 2,600,000`, "AUD", '2020-02-16'));