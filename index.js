/*jshint esversion: 6 */
/*
function checkCashRegister(price, cash, cid) {
    let cashRegister = {status: '', change: cid};
    const changeNeeded = parseFloat(cash - price).toFixed(2);
    const changeAvailable = getTotalCashRegisterChange(cid);
    console.log(changeNeeded);

  }



  // Example cash-in-drawer array:
  // [["PENNY", 1.01],
  // ["NICKEL", 2.05],
  // ["DIME", 3.1],
  // ["QUARTER", 4.25],
  // ["ONE", 90],
  // ["FIVE", 55],
  // ["TEN", 20],
  // ["TWENTY", 60],
  // ["ONE HUNDRED", 100]]

  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
*/

function checkCashRegister(price,cash,cid){
    let change=cash-price;
    let response={
        status:'',
        change:[]
    };
    let cidAmt=cid.reduce((accumulator,current) =>{
        return accumulator+current[1];
    },0);
    console.log(`totalamount in drawer: ${cidAmt} and the change is ${change} \n`);
    if(cidAmt<change) {
        response.status='INSUFFICIENT_FUNDS';
    } else if (cidAmt===change) {
        response.status='CLOSED';
        response.change=cid;
    } else {
        let currencyTable=[
            {name: "ONE HUNDRED", val:100},
            {name: "TWENTY", val:20},
            {name: "TEN", val:10},
            {name: "FIVE", val:5},
            {name: "ONE", val:1},
            {name: "QUARTER", val:0.25},
            {name: "DIME", val:0.1},
            {name: "NICKEL", val:0.05},
            {name: "PENNY", val:0.01}
        ];
        let cidRev=cid.reverse();
        let mergedTable=[];
        let amount;
        let flag=false,totalDeducted=0;
        for(let i=0; i<currencyTable.length;i++){
            amount={};
            amount.name=currencyTable[i].name;
            amount.val=currencyTable[i].val;
            amount.total=cidRev[i][1];
            mergedTable.push(amount);
        }
        console.log(mergedTable + '\n');
        response.status='OPEN';
        for(let i=0;i<mergedTable.length;i++)
        {
            while(change>0 && change>=mergedTable[i].val && mergedTable[i].total>0){
                change-=mergedTable[i].val;
                change=change.toFixed(2);
                mergedTable[i].total-=mergedTable[i].val;
                totalDeducted+=mergedTable[i].val;
                flag=true;
            }
            if(flag){
                response.change.push([mergedTable[i].name,totalDeducted]);
                totalDeducted=0;
                flag=false;
            }
        }
        if(change!=0){
            response.status='INSUFFICIENT_FUNDS';
            response.change=[];
        }
    }
    console.log(response);
    return response;
}