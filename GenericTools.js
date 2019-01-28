//*********//
//copy an array to what ever depth
function infiniteArrayClone(pArray)
{
 //check what I have is an array
 //SpreadsheetApp.getUi().alert("start"+pArray)
 if (Array.isArray(pArray))
 {
   //when it is an array go through it
  var retVal = []
  for (var cA=0;cA<pArray.length;cA++)
  {
   // SpreadsheetApp.getUi().alert("daitem"+pArray[cA])
    //when an item is an array pass it through this
    if (Array.isArray(pArray[cA]))
    { 
      retVal.push(infiniteArrayClone(pArray[cA]))
     // SpreadsheetApp.getUi().alert("postCall"+retVal)
    }
    else
    {
      //when an item is not an array just push it
      retVal.push(pArray[cA])
      //SpreadsheetApp.getUi().alert("flat"+retVal)
    }
  }
//  SpreadsheetApp.getUi().alert("out"+retVal)
  return retVal;
  }
  else
  {
    //when it is not an array just return it
  //  SpreadsheetApp.getUi().alert("trunc"+retVal)
    return pArray;
  }
}

//*********//
//A tool for printing contents of labelled items
function printState(pState,pLabel)
{
	for (var key in pState)
	{
		var printString=pState[key];
/*		if(pState[key].constructor === Array)
		{
			printString="";
			for (var keyA in pState[key][0])
			{
			    var pString =pState[key][0][keyA];
				if (!(pState[key][0][keyA]))
				{
					pString="null";
				}
				printString=printString+keyA+":"+pString+":";
			}
			printString=printString+"+"+pState[key][1];
		}
    */
		console.log(pLabel+":"+key+": "+printString);
	}

}

//*********//
//A tool to put the resutls of a two dimensional array in a spreadsheet
function twoDArrayToSheet(startVal,outSheet)
{
  var capt = makeSetPatterns(startVal,startVal);
  //var outSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  for(var cA=0;cA<capt.length;cA++)
  {
    for (var cB=0;cB<capt[cA].length;cB++)
    {
      outSheet.getRange(cA+1,cB+1,1,1).setValue(capt[cA][cB])
    }
  }
}

//*********//
//A function to call my large size combinantorial
function myLargeCombin(pEn,pKay)
{
  return (new ACombinatorial(pEn,pKay)).prod
}

//*********//
//A function to call my large size combinantorial
function myLargeCombinWithDivide(pEn,pKay)
{
  return (new ACombinatorialWithDivide(pEn,pKay)).prod
}

/*
function testA()
{
  var dis = (new ACombinatorialWithDivide(100000,89).prod)
  var disb = (new ACombinatorial(100000,89).prod)
var int=dis-disb;
}
*/


//*********//
//A combinatorial which is fast but can run into capacity issues
function AFastCombinatorial(pEn,pKay) {
this.en = pEn
this.kay = pKay
//make a list of the number size that is just for the reminant of the top with the bottom crossed out.
this.newList = Array.apply(null, new Array(this.kay)).map(Function.call, Number).map(function(it){return it+this.en-this.kay+1},this)
//make the other denominator number, that was not cancelled
this.botList=this.newList.map(function(item){return item-(this.en-this.kay)},this)
this.revBotProd=1
//do the multiplication of the remnant
if (this.botList)
{
this.botList.forEach(function(item){this.revBotProd=this.revBotProd*item},this)    ;
}
//SpreadsheetApp.getUi().alert(newList)
this.prod=1/this.revBotProd
this.newList.forEach(function(item){this.prod=this.prod*item},this);
}
AFastCombinatorial.prototype.constructor = ACombinatorial;

//*********//
//A combinatorial which is slower but can process the larges possible numbers
function ACombinatorial(pEn,pKay) {
this.en = pEn
this.kay = pKay
//make a list of the number size that is just for the reminant of the top with the bottom crossed out.
this.newList = Array.apply(null, new Array(this.kay)).map(Function.call, Number).map(function(it){return it+this.en-this.kay+1},this)
//reverse the list
var revList=this.newList.map(function(item,index){return this.newList[this.newList.length-index-1]},this)
//make the other denominator number, that was not cancelled
this.botList=this.newList.map(function(item){return item-(this.en-this.kay)},this)
//reverse that list
var revBot=this.botList.map(function(item,index){return this.botList[this.botList.length-index-1]},this)
var tallyList = infiniteArrayClone(revBot);
//  Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList: "+revList)  
for (var cA=0;cA<revList.length;cA++)
{
    var cB=0;
  //while you still have numbers to use and your count is less than length
  //and the item is greater than 1
//  Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList[cA]: "+revList[cA]+" cB: "+cB)
   while ((tallyList)&&(cB<revBot.length)&&(revList[cA]!=1))
  {
    //if the top list item is divisible by the bottom item
    //eliminate the bottom list item and make the top the result of the division
    if ((revList[cA]%revBot[cB])==0)
    {
      revList[cA]=revList[cA]/revBot[cB];
//     Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList[cA]: "+revList[cA]+" cB: "+cB)

      tallyList.splice(tallyList.indexOf(revBot[cB]),1);
     Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList[cA]: "+revList[cA]+" cB: "+cB)
    }
    cB++;
  }
  revBot=infiniteArrayClone(tallyList);
}
this.revBotProd=1
//do the multiplication of the remnant
if (revBot)
{
revBot.forEach(function(item){this.revBotProd=this.revBotProd*item},this)    ;
}
//SpreadsheetApp.getUi().alert(newList)
this.prod=1/this.revBotProd
revList.forEach(function(item){this.prod=this.prod*item},this)    ;
//this.sum=0
//revList.forEach(function(item){this.sum+=item},this);
}
ACombinatorial.prototype.constructor = ACombinatorial;

//*********//
//A combinatorial which is slower but can process the larges possible numbers
function ACombinatorialWithDivide(pEn,pKay) {
this.en = pEn
this.kay = pKay
//make a list of the number size that is just for the reminant of the top with the bottom crossed out.
this.newList = Array.apply(null, new Array(this.kay)).map(Function.call, Number).map(function(it){return it+this.en-this.kay+1},this)
//reverse the list
var revList=this.newList.map(function(item,index){return this.newList[this.newList.length-index-1]},this)
//make the other denominator number, that was not cancelled
this.botList=this.newList.map(function(item){return item-(this.en-this.kay)},this)
//reverse that list
var revBot=this.botList.map(function(item,index){return this.botList[this.botList.length-index-1]},this)
var tallyList = infiniteArrayClone(revBot);
//  Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList: "+revList)  
for (var cA=0;cA<revList.length;cA++)
{
    var cB=0;
  //while you still have numbers to use and your count is less than length
  //and the item is greater than 1
//  Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList[cA]: "+revList[cA]+" cB: "+cB)
   while ((tallyList)&&(cB<revBot.length)&&(revList[cA]!=1))
  {
    //if the top list item is divisible by the bottom item
    //eliminate the bottom list item and make the top the result of the division
    if ((revList[cA]%revBot[cB])==0)
    {
      revList[cA]=revList[cA]/revBot[cB];
//     Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList[cA]: "+revList[cA]+" cB: "+cB)

      tallyList.splice(tallyList.indexOf(revBot[cB]),1);
     Logger.log(" tallyList: "+tallyList+" revBot: "+revBot+" revList[cA]: "+revList[cA]+" cB: "+cB)
    }
    cB++;
  }
  revBot=infiniteArrayClone(tallyList);
}
this.prod=1
//do the multiplication of the remnant
if (revBot)
{
revBot.forEach(function(item,ind){this.prod=this.prod*revList[ind]/item},this)    ;
}
for (var cH=revBot.length;cH<revList.length;cH++)
{
  this.prod*=revList[cH];
}
//this.sum=0
//revList.forEach(function(item){this.sum+=item},this);
}
ACombinatorialWithDivide.prototype.constructor = ACombinatorialWithDivide;

//*********//
//A tool to calculate the number of permutation for En of a given size Kay
function APermutation(pEn,pKay)
{
this.en = pEn
this.kay = pKay
this.enLesKey=this.en-this.kay
this.listStart = Array.apply(null, new Array(this.kay)).map(Function.call, Number).map(function(it){return it+this.enLesKey+1},this)
this.prod=1
this.listStart.forEach(function(item){this.prod=this.prod*item},this)    ;
}
APermutation.prototype.constructor = APermutation;

function myMultiCombin(pEn,pKayArray)
{
  return (new AMultipleCombinatorial(pEn,pKayArray)).prod
}

function myMultiCombinT()
{
  Logger.log((new AMultipleCombinatorial(100,[84,8,4,4])).prod)
}

//*********//
//calculate the value of a multiple combinatorial with some efficiency
function AMultipleCombinatorial(pEn,pKays) {
this.en = pEn
if (typeof pKays === 'number')
{pKays=[pKays];}
var sumOfVals = pKays.reduce(function(total,val){return total+=val});
if (sumOfVals<pEn)
{
  pKays.push(pEn-sumOfVals)
}
//biggest k
this.maxKay = pKays.reduce(function(total,val){return (total>val)?total:val});
if (this.maxKay==1)
{
this.prod=(Array.apply(null,new Array(pEn)).map(Function.call, Number).map(function(it){return it+1})).reduce(function(prd,val){return prd*=val;},1)
}
else{
this.functionToMakeList= function(disKay,aKay){return Array.apply(null,new Array(disKay)).map(Function.call, Number).map(function(it){return it+aKay+1})}
this.functionToReverseLists = function(disArray){return disArray.map(function(val,ind){return disArray[disArray.length-ind-1]})}
//Take it out of set
pKays.splice(pKays.indexOf(this.maxKay),1);
//make a list of the number size that is just for the reminant of the top with the bottom crossed out.
//array apply null ducks giving apply context, which is the point of the arguments in call, apply, and bind
//so it just runs the new array constructor for the number, which makes an array which has indexes for three undefined slots
//map (function.call), uses function call as a callback, which calls the call back in the context of the Number function
//now map takes val, ind, array which are what number.call gets, so this is a fancy way to pass (val, ind, array) as the parameters
// of  any function. Remember first argument of number.call is context, which is val in this case, which is undefined, which gets thrown out
//the next is taken as the one parameter of the Number method, which is the index.
//you are using call call game to create a circumstance to through out maps first value
//so we make a list just as long as maxKay which takes the numbers from max to kay and boosts them all up so the last one is em
var newList = this.functionToMakeList(pEn-this.maxKay,this.maxKay);
//reverse the list
this.revList=this.functionToReverseLists(newList);
//make the other denominator number, that was not cancelled
this.botLists=pKays.map(function(val){return this.functionToMakeList(val,0);},this);
//reverse these list
this.revBots=this.botLists.map(function(dArray){return this.functionToReverseLists(dArray)},this);
//  Logger.log("maxKey: "+this.maxKay+" PK: "+pKays+" newList: "+newList+" rb: "+this.revBots+" TL: "+this.tallyListOfLists+" RL: "+this.revList)
//go through the toplist
//go through the bot list
//alter top and bottom
//kill record when one is done  
  
  this.tallyListOfLists = infiniteArrayClone(this.revBots)
  var revBotLengths= this.revBots.map(function(val){return val.length});
  revBotLengths.sort(function(a, b){return a - b});
//  var poses = []
//  for (var cA=revBotLengths.length-1;cA>-1;cA--)
//  {
//   var cB= this.revBots.length-1;
//    while (this.revBots[cB].length!=revBotLengths[cA])
//    {
//      cB--;
//    }
//    poses.push(this.revBots.length-cB-1);
//  }
//  this.tallyListOfLists = [];
//  poses.forEach(function(val){this.tallyListOfLists.push(this.revBots[val])},this)
//  this.revBots = infiniteArrayClone(this.tallyListOfLists);

  
for (var cA=0;cA<this.revList.length;cA++)
{
  //while you still have numbers to use and your count is less than length
  //and the item is greater than 1
  var cC=0;
//  var huh=this.tallyListOfLists.length
//  var huha=this.revBots.length
//  var huhb=this.revList[cA];
  while ((this.tallyListOfLists.length>0)&&(cC<this.revBots.length)&&(this.revList[cA]!=1))
  {
    var cB=0;

    while ((this.tallyListOfLists[cC].length>0)&&(cB<this.tallyListOfLists[cC].length)&&(this.revList[cA]!=1))
  {
    //if the top list item is divisible by the bottom item
    //eliminate the bottom list item and make the top the result of the division
    if ((this.revList[cA]%this.revBots[cC][cB])==0)
    {
      this.revList[cA]=this.revList[cA]/this.revBots[cC][cB];
      this.tallyListOfLists[cC].splice(this.tallyListOfLists[cC].indexOf(this.revBots[cC][cB]),1);
    }
    cB++;
  }
  cC++;
}
this.revBots=infiniteArrayClone(this.tallyListOfLists);
}
  this.revBots= this.revBots.filter(function(val){return (val.length>0)});
  this.revBotProd=1
//do the multiplication of the remnant
  this.revBots.forEach(function(val){val.forEach(function(item){this.revBotProd=this.revBotProd*item})});
//SpreadsheetApp.getUi().alert(newList)
this.prod=1/this.revBotProd
this.revList.forEach(function(item){this.prod=this.prod*item},this)    ;
//this.revList.forEach(function(item){this.sum+=item},this);
}
}
AMultipleCombinatorial.prototype.constructor = AMultipleCombinatorial;

//*********//
//small function to make a product of an array
function arrayProd(pArray)
{
  return pArray.reduce(function(tot,item){return tot*=item},1,this)
}


//*********//
//a small function to make a sum
function arraySum(pArray)
{
  return pArray.reduce (function(tot,item){tot+=item},0,this)
  return sum;
}

//*********//
//Output a binaryAssignment to, which generates all possible combos
function testBA()
{
  var valsToPlace = ["a","b","c","d","e","f","g","h","i","j","k"]
  var resRep = binaryAssignment(11,5,valsToPlace,false);
  //var resRep = cloneAndReplace(res,valsToPlace,0)
 // valsToPlace[valsToPlace.indexOf("c")]="z";
  actSheet.clear();
  for (var cA=0;cA<resRep.length;cA++)
  {
      var colRunTot=0;
    for (var cB=0;cB<resRep[cA].length;cB++)
    {
      for (var cC=0;cC<resRep[cA][cB].length;cC++)
      {
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pasc").getRange(cA+1,colRunTot+1,1,1).setValue(resRep[cA][cB][cC]);
        colRunTot++;
      }      
    }
  }
//  Logger.log(resRep);
}

function testBAMini()
{
  var valsToPlace = ["a","b","c","d","e","f","g","h","i","j","k"]
  var resRep = binaryAssignment(11,5,valsToPlace,true);
  var int = 5;
}

//calls prduce an en which is supposed to produce the power set but looks broken
function startProduction()
{
//    var mapA=Array.apply(null,new Array(eN)).map(Function.call, Number).map(function(it){return it})
    var capt = produceAnEn(5)
    var outSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pasc")
    outSheet.clear()
    var row=0;
  var col=0;
    for (var cA=0;cA<capt.length;cA++)
    {
      row++;
      col=0;
      for (var cB=0;cB<capt[cA].length;cB++)
      {
        col++;
        for (var cC=0;cC<capt[cA][cB].length;cC++)
        { 
           col++;
           outSheet.getRange(row, col,1,1).setValue(capt[cA][cB][cC]);
        }
      }
    }
}

//This assumes a set of patterns
//Each pattern describes how the en slots are organized
//Specifically the pattern all the patterns of groups of unique digits of different sizes that you could have
//This takes those groups and assigns the available slots to the groups.
//specifically it creates every possible assignments of slots to those groups.
//this orders the groups, but says nothing about which symbols are in each group
//the next step is to put symbols in each of the slots.
//however there are multiple subsets of symbols that good go with each group as set as each set is a subset of all the symbols
//so each set could be run assigning different symbols to each set
//Also, one you have the sets of symbols, the order of those symbols matter to the extent that you have symbols groups of different sizes.
//you should actually run the symbol ordering ans selection first.
//this program assumes you want em to the em
//this should be refined to work with a different power that is different than em
//in pascal terms the base is the dimension, so we are taking about not going to so may dimensions
//make set pattern would have to be changed to take two arguments
//I once that is right, this is simple to adjust

function produceAnEn(en)
{ 
//  var endOfRun = (en,2).prod
//  var en=mapA.length
    var baseSet = []
  if (en==1)
  {
    return [1];
  }
  else
  {
    baseSet.push(Array.apply(null,new Array(en)).map(Function.call, Number).map(function(it){return 0}));
    var patterns = makeSetPatterns(en,en);
    for (var cA=0;cA<patterns.length;cA++)
    {
        var priorSet =[];
        var disSet =[];
        var priorTotal=0;
        var disTotal=0;
//        var newSet = [];
        var baseSetNotPassed = true;
 //     if (cA==14)
 //     {
        
  //      var x=patterns[cA].length;
  //      var y=5;
  //    }
      if (patterns[cA].length>1)
      {
      
      for (var cQ=0;cQ<(patterns[cA].length-1);cQ++)
      {
        if (cQ==0)
        {
          priorTotal = patterns[cA][0]+patterns[cA][1]
        //  if (patterns[cA][0]==1)
         // {
          //  priorSet=Array.apply(null,new Array(en)).map(Function.call, Number).map(function(it){return it}); 
          //  baseSetNotPassed=false;
           // baseSet = baseSet.concat([priorSet.slice()]);
           // break;
         // }
        //  else
         // {
            priorSet=binaryAssignment(priorTotal,patterns[cA][0],false)[0];
       //   }
          if ((cQ==patterns[cA].length-2)&&(baseSetNotPassed))
          {
            baseSetNotPassed=false;
              baseSet = baseSet.concat(priorSet);
          }
        }
        else
        {   
            disTotal=priorTotal+patterns[cA][cQ+1];
            disSet=binaryAssignment(disTotal,priorTotal,false)[0];
            var newSet =[]
            for (var cB=0;cB<disSet.length;cB++)
            {
              for (var cR=0;cR<priorSet.length;cR++)
              {
                var bitA=disSet[cB][0].slice();              
                var cop=cloneAndReplace(priorSet[cR].slice(),disSet[cB][1],0);
                var temp =  cop.reduce(function(tot,val){return tot.concat([val.slice()])},[bitA])
                newSet.push(temp)
              }
            }
            priorTotal=disTotal;
            priorSet=infiniteArrayClone(newSet);
        }
        }
        /*
        var lentot = 0;
        for (var cC=0;cC<priorSet[0].length;cC++)
        { 
          lentot+=priorSet[0][cC].length;
        }
        
        if (lentot<7)
        {
          Logger.log(lenTot)
        }
      */
        if (baseSetNotPassed)
        {
        baseSet = baseSet.concat(infiniteArrayClone(priorSet));
        }
    }
      
  }
}
  return baseSet;
}

//set must be of size en
function binaryAssignment(en,kay,set,split)
{
  this.splitB= split;
  this.captureF =[];
  this.captureS =[];
  this.capture = [];
  var low = ((en-kay)>kay)?kay:en-kay;
  var top = en-low;
  var apArray = []
  var bpArray = []
  var lastStart=[0]
  var aftFirst = false;
  if (en==kay)
  { if (split)
  {
    return [[set],[[]]]
  }
  else
  {
    return [[set,[]]]
  }
  }
  for (var cA=0;cA<top;cA++)
  {
    if (cA<low)
    {
      apArray.push(set[cA]);
    }
    bpArray.push(set[cA+low])
  }


function BAForRep(start,pSet,aftFirst,en,apArray,bpArray,leve,leveA,lastStart)
{
  //if we are at last row
  if(leve==apArray.length-1)
  {
    for (var cj=start;cj<(en-apArray.length+leve+1);cj++)
    {
      if ((cj==(apArray.length-1))&&(leve==(apArray.length-1)))
      {
        aftFirst = false
      }
      else
      {
        aftFirst = true;
      }
      apArray[leve]=pSet[cj];
//      Logger.log("content: "+apArray[apArray.length-1]+ "ref : "+(apArray.length-1)+" dif : "+(apArray[apArray.length-1]-(apArray.length-1))+"boolean :"+aftFirst)
//      if (apArray[apArray.length-1]>(apArray.length-1))
      if (aftFirst)
      {
         if (cj==start)
         {
           for (var cp=cj-leve-1;cp<bpArray.length;cp++)
            if(cp==cj-leve-1)
            {
              bpArray[cp]=pSet[cp+(leve-1)-lastStart[0]];
             }
             else
             {
             bpArray[cp]=pSet[cp+apArray.length];
             }
           }
           else
           {
             bpArray[cj-apArray.length]=pSet[cj-1];           
           }
       }
    if (this.splitB)
    {
      this.captureF.push(apArray.slice());
      this.captureS.push(bpArray.slice());
    }
    else
    {
      this.capture.push([apArray.slice(),bpArray.slice()])
    }
    }
    if (start==(en-1))
    {
      lastStart[0]=lastStart[0]+1;
      var int = 5;
    }
    else
    {
      lastStart[0]=0;
    }
  }
  else
    {
    //on any call the start value is the value at the current level
   start=leveA;
    //starting at that value go up to the en - length+leve +1
    for (var ck=start;ck<(en-apArray.length+leve+1);ck++)
    {
      //write the counter value to this level position
      leveA++;
      apArray[leve]=pSet[ck];
      //call the next level with this one holding array that
      //has just been fed ck.
      //increase level by one and
      //make the value one higher
      BAForRep(ck+1,pSet,aftFirst,en,apArray,bpArray,leve+1,leveA,lastStart)
      //after we have written arrays for the last level
      //we will snap back at each level
      //and we run the ascending sequence to the end
      for (var cm=leve+1;cm<apArray.length-1;cm++)
      {
        apArray[cm]=pSet[ck+(cm-leve)+1];
      }
    }
    }
}

  BAForRep(0,set,aftFirst,en,apArray.slice(),bpArray,0,0,lastStart);
  if (this.splitB)
  {
    return [this.captureF,this.captureS];
  }
  else
  {
    return capture;
  }
}

function testBP()
{
  var valsToPlace = ["a","b","c","d","e","f","g","h","i","j","k"]
  var valsToPlaceNew = ["A","B"]

  var resRep = binaryPlacement(11,5,valsToPlaceNew);
  //var resRep = cloneAndReplace(res,valsToPlace,0)
 // valsToPlace[valsToPlace.indexOf("c")]="z";
  actSheet.clear();
  for (var cA=0;cA<resRep.length;cA++)
  {
      var colRunTot=0;
    for (var cB=0;cB<resRep[cA].length;cB++)
    {
      for (var cC=0;cC<resRep[cA][cB].length;cC++)
      {
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pasc").getRange(cA+1,colRunTot+1,1,1).setValue(resRep[cA][cB][cC]);
        colRunTot++;
      }      
    }
  }
//  Logger.log(resRep);
}

function binaryPlacementBESTSOFAR(pEn,pKay,pItemSet)
{
  this.inPosition =[];
  this.itemSet=pItemSet;
  this.kay=pKay;
  this.en=pEn;
  var low = ((this.en-this.kay)>this.kay)?this.kay:this.en-this.kay;
  var curPosCapt =[];
  var lastStart=[0]
  var aftFirst = false;
  for (var cA=0;cA<this.en;cA++)
  {
    if (cA<low)
    {
      curPosCapt.push(this.itemSet[0]);
    }
    else
    {
    curPosCapt.push(this.itemSet[1])
    }
  }
  if (en==pKay)
  {
    return curPosCapt.slice();
  }
function BAForRep(start,aftFirst,leve,leveA,lastStart,curPosCapt)
{
  if(leve==this.kay-1)
  {
    for (var cj=start;cj<(this.en-this.kay+leve+1);cj++)
    {
      if ((cj==(this.kay-1))&&(leve==(this.kay-1)))
      {
        aftFirst = false
      }
      else
      {
        aftFirst = true;
      }
      curPosCapt[cj]=this.itemSet[0];
      if (aftFirst)
      {
         if (cj==start)
         {
           for (var cp=cj-leve-1;cp<(this.en-this.kay);cp++)
            if(cp==cj-leve-1)
            {
              curPosCapt[cp+(leve-1)-lastStart[0]]=this.itemSet[1];
             }
             else
             {
              curPosCapt[cp+this.kay]=this.itemSet[1];
             }
           }
           else
           {
             curPosCapt[cj-1]=this.itemSet[1];
           }
       }
      this.inPosition.push(curPosCapt.slice());
    }
    if (start==(this.en-1))
    {
      lastStart[0]=lastStart[0]+1;
      var int = 5;
    }
    else
    {
      lastStart[0]=0;
    }
  }
  else
    {
   start=leveA;
    for (var ck=start;ck<(this.en-this.kay+leve+1);ck++)
    {
      leveA++;
      curPosCapt[ck]=this.itemSet[0];
      BAForRep(ck+1,aftFirst,leve+1,leveA,lastStart,curPosCapt)
      for (var cm=leve+1;cm<this.kay-1;cm++)
      {
        curPosCapt[ck+(cm-leve)+1]=this.itemSet[0];
      }
    }
    }
}

  BAForRep(0,aftFirst,0,0,lastStart,curPosCapt.slice());
        return this.inPosition;

}


//WORKING HERE//
//this is what I need to do
//right now this generates sets like [9,10,10,10,10] and 
//right now this generates sets like [10,9,10,10,10] and
//what we want this to do instead is taking the "writtenTo" array
//and in the last five positions make it ......A,B,B,B,B
//and in the last five positions make it ......B,A,B,B,B
//BUT it is only the last five because we were passed 6,7,8,9,10
//it could be 1,5,7,8,10
//which we would want to be written to as A,B,B,B,B and B,A,B,B,B
//for the corresponding positions
//this is why I needed resurrect aParray and Abarray
//these track the positions we want to place to and so we need to actually
//use those.
function binaryPlacement(pEn,pKay,set,pItemSet,writtenTo)
{
  this.inPosition =[];
  this.itemSet=pItemSet;
  this.kay=pKay;
  this.en=pEn;
  var low = ((this.en-this.kay)>this.kay)?this.kay:this.en-this.kay;
  var top = en-low;
  var curPosCapt =writtenTo.slice();
  var lastStart=[0]
  var aftFirst = false;

for (var cA=0;cA<set.length;cA++)
  {
    if (cA<low)
    {
      curPosCapt[set[cA]]=this.itemSet[0];
    }
    else
    {
    curPosCapt[set[cA]]=this.itemSet[1];
    }
  }
  
  if (this.en==this.kay)
  {
    return curPosCapt.slice();
  }
  
function BAForRep(start,pSet,aftFirst,leve,leveA,lastStart,curPosCapt)
//function BAForRep(start,pSet,aftFirst,en,leve,leveA,lastStart,curPosCapt)
{
  //if we are at last row
  if(leve==this.kay-1)
  {
    for (var cj=start;cj<(this.en-this.kay+leve+1);cj++)
    {
      if ((cj==(this.kay-1))&&(leve==(this.kay-1)))
      {
        aftFirst = false
      }
      else
      {
        aftFirst = true;
      }
      curPosCapt[pSet[cj]]=this.itemSet[0];
      
//      Logger.log("content: "+apArray[apArray.length-1]+ "ref : "+(apArray.length-1)+" dif : "+(apArray[apArray.length-1]-(apArray.length-1))+"boolean :"+aftFirst)
//      if (apArray[apArray.length-1]>(apArray.length-1))
      if (aftFirst)
      {
         if (cj==start)
         {
           for (var cp=cj-leve-1;cp<(this.en-this.kay);cp++)
            if(cp==cj-leve-1)
            {
              curPosCapt[cp+(leve-1)-lastStart[0]]=this.itemSet[1];
             }
             else
             {
              curPosCapt[pSet[cp+this.kay]]=this.itemSet[1];
             }
           }
           else
           {
             curPosCapt[pSet[cj-1]]=this.itemSet[1];
           }
       }
      this.inPosition.push(curPosCapt.slice());
    }
    if (start==(this.en-1))
    {
      lastStart[0]=lastStart[0]+1;
      var int = 5;
    }
    else
    {
      lastStart[0]=0;
    }
  }
  else
    {
    //on any call the start value is the value at the current level
   start=leveA;
    //starting at that value go up to the en - length+leve +1
    for (var ck=start;ck<(this.en-this.kay+leve+1);ck++)
    {
      //write the counter value to this level position
      leveA++;
      curPosCapt[pSet[ck]]=this.itemSet[0];
      //call the next level with this one holding array that
      //has just been fed ck.
      //increase level by one and
      //make the value one higher
      BAForRep(ck+1,pSet,aftFirst,leve+1,leveA,lastStart,curPosCapt)
//      BAForRep(ck+1,pSet,aftFirst,en,leve+1,leveA,lastStart,curPosCapt)
      //after we have written arrays for the last level
      //we will snap back at each level
      //and we run the ascending sequence to the end
      for (var cm=leve+1;cm<this.kay-1;cm++)
      {
        curPosCapt[pSet[ck+(cm-leve)+1]]=this.itemSet[0];
      }
    }
    }
}

  BAForRep(0,set,aftFirst,0,0,lastStart,curPosCapt.slice());
//  BAForRep(0,set,aftFirst,en,0,0,lastStart,curPosCapt.slice());
//  if (this.splitB)
//  {
//    return [this.captureF,this.captureS,this.inPosition];
//  }
//  else
//  {
//    return [capture,this.inPosition];
        return this.inPosition;

//  }
}

function testNTC()
{
  var en = 9;
  var kay =4;
  var retVal =[]
  for (var cA=0;cA<((new AFastCombinatorial(en,kay)).prod);cA++)  
  {
    retVal.push(numberToComb(cA,en,kay))
  }
  
  return retVal;
}




//this takes a number and converts it to a combination in a set of size en choose kay
function numberToComb(val,en,kay)
{
  var positions =[]
  var total = 0;
  var manVal = val;
  var manEn =en;
  var enDrops =-1;
  var manKay = kay-1;
  var priorTotal = 0;
  var pushVal=0;
  var firstRun = true;
  var lastManKay = 0;
  var lastManEn = 0;

  var lastCombo=0;
//  var lastOrigCombo=0;
//  var newCombo=0;
  
//  var testingArray =[];
  
  
  while (manKay>=0)
  {
    manEn--;
    enDrops++;
    priorTotal=total;

    
    
 //   var testingTotal = total;
    if (((lastManEn-manEn)==1)&&(Math.abs(lastManKay-manKay)==1)&&(lastManKay>3)&&(lastManEn>3))
    {
      lastCombo=lastCombo*(Math.min(lastManKay,(lastManEn-lastManKay))/lastManEn)
    }
    else
    {
      lastCombo=(new AFastCombinatorial(manEn,manKay)).prod
    }
    total+=lastCombo
//    testingTotal+=lastCombo
//    lastOrigCombo=newCombo;
//    newCombo = (new AFastCombinatorial(manEn,manKay)).prod
//    total+=newCombo;
//    total+=(new AFastCombinatorial(manEn,manKay)).prod
    
//     testingArray.push(total,testingTotal)
    lastManEn=manEn;
    lastManKay=manKay;

    if (manVal<=total)
      {

          if (manKay==0)
          {
            if (!firstRun)
            {
              manVal-=priorTotal;
            }
            positions.push([enDrops+manVal]);
          }
          else
          {
            if (manVal==total)
            {
              enDrops++;
              positions.push([enDrops]);
              manVal=0;
            }
            else
            {
              if (!firstRun)
              {
                manVal-=priorTotal;
              }
              positions.push([enDrops]);
            }
          }
          total=0;
          priorTotal=0;
          manKay--;
          firstRun=true;
      }
      else
      {
      firstRun=false;
      }
  }
  return positions;
}

function deArray(val)
{
  if (Array.isArray(val[0]))
  {
    if (((val.length>1)&&(val[0].length==1))&&(!Array.isArray(val[0][0])))
    {
      val = val.map(function(eVal){return eVal[0]})
    }
    else
    {
    if (((val.length==1)&&(val[0].length>1))&&(!Array.isArray(val[0][0])))
    {
    
      val = val[0].map(function(eVal){return eVal})
    }
    else
    {
        if (((val.length>1)&&(val[0].length==1))&&(((Array.isArray(val[0][0])))&&(val[0][0].length==1)))
        {
          val = val.map(function(eVal){return eVal[0][0]})
        }
        else
        {
          if (((val.length==1)&&(val[0].length>1))&&(((Array.isArray(val[0][0])))&&(val[0][0].length==1)))
          {
            val = val[0].map(function(eVal){return eVal[0]})
          }
        }    
    }
    }
  }
    return val;


}

function testCFN()
{
  var en=9;
  var kay=4;
  var set = testNTC()
  var allAns=[];
  for (var cA=0;cA<set.length;cA++)
  {
      allAns.push(combToNumber(set[cA],en,kay))
  }
  var tester = allAns.reduce(function(tot,val,ind){return tot&&(val==ind)},true)

  return allAns;
}


//give me a combo and I can turn it into a number
//with en items to chose from.
function combToNumber(val,en)
{
  var lastVal=0;
  var tot=0;
  var manEn=en-1;
  var manKay=val.length;
  val = deArray(val);

for (var cA=0;cA<val.length;cA++)
  {
    var dif = val[cA]-lastVal;
    lastVal=val[cA]+1;
    var levTot=0;
    manKay--;
    if (manKay==0)
    {
      levTot=dif
    }
    else{
    for (var cB=0;cB<dif;cB++)
    {
//        manEn--;
        levTot+=(new AFastCombinatorial(manEn,manKay)).prod
         manEn--;
    }
    }
      manEn--;
    tot+=levTot;
  }
  return tot;
}


//tool to output a pascal
//but it looks pretty broken
function pascGenOut()
{
    actSheet.clear()
    var em = 7;
    var tea = 7;
  //var pasc = makeSevenBruitForce();
    var pascB = genTwoPascal(12);
  //the em is a number above 2.
    var pasc= pascGen(pascB,em-2,7,0,pascB)
  var level=0;
   while (level!=em)
  {
    //cA is first row
    var newStructure = [];
    for (var cA=0;cA<tea+1;cA++)
    {
      //cBgoes across first row
      var tempArray =[];
      for (var cB=0;cB<cA+1;cB++)
      {
        //so we get the structures in the last dimension accordig to cb
        //there is something wrong with the multipliers
      var multip = basePascal[cA][cB];
      var curS = pCurrentStructure[cB]
 //     Logger.log("level: "+level+" cA: "+cA+" cB: "+cB+" multip: "+multip +"ohter: "+basePascal[cA][cB])
      var cloeMultRes=cloneAndMultiply(pCurrentStructure[cB],basePascal[cA][cB])
      tempArray.push(cloeMultRes);
      }
      newStructure.push(tempArray);
    }
    pCurrentStructure = newStructure;
    level++;
 }
//    var captRes = makePasc(newStructure,em,tea,level,basePascal);
  return pCurrentStructure;
}

//find the dimensions of any array of arrays
function findDimensions()
{
  var pasca = genTwoPascal(7);
//    var pasc = genTwoPascal(12);
//    var pasc = makeSevenBruitForce();
var pasc = pascGen(pasca,5,7,0,pasca)
//var pasc = testRecursion()
  var map =[]
  dimensionRecurse(pasc,map);
//  Logger.log(map);
  
}

function dimensionRecurse(pArray,map)
{
  if (!Array.isArray(pArray))
  {
    return;
  }
  else
  {
     map.push(pArray.length)
     dimensionRecurse(pArray[pArray.length-1],map);
  }
  
    
}

function genTwoPascal(tea)
{
  var pascDimTwo = [];
  for (var cA=0;cA<(tea+1);cA++)
  {
    var pascDimOne = []
    for (var cB=0;cB<(cA+1);cB++)
    {
      pascDimOne.push((new AMultipleCombinatorial(cA,[cB,cA-cB])).prod);
    }
    pascDimTwo.push(pascDimOne);
  }

  return pascDimTwo;
}

function testPascRecurse()
{
    map =[]
    dimensionRecurse(genTwoPascal(7),map);
  var caught= pascRecurse(genTwoPascal(7),map,genTwoPascal(7));
  Logger.log(caught)
}


function cloneAndMultiply(pArray,multiplier)
{
 //check what I have is an array
 if (Array.isArray(pArray))
 {
   //when it is an array go through it
  var retVal = []
  for (var cA=0;cA<pArray.length;cA++)
  {
    //when an item is an array pass it through this
    if (Array.isArray(pArray[cA]))
    { 
      retVal.push(cloneAndMultiply(pArray[cA],multiplier))
    }
    else
    {
      retVal.push(pArray[cA]*multiplier)
      //SpreadsheetApp.getUi().alert("flat"+retVal)
    }
  }
//  SpreadsheetApp.getUi().alert("out"+retVal)
  return retVal;
  }
  else
  {
    //when it is not an array just return it
  //  SpreadsheetApp.getUi().alert("trunc"+retVal)
    return pArray;
  }
}

//Takes an array, no matter how many levels
//of positions in the second array
//and replaces
//allows an offset of position, one makes number references into array indices.
function cloneAndReplace(pArray,replace,offset)
{
 //check what I have is an array
 if (Array.isArray(pArray))
 {
   //when it is an array go through it
  var retVal = []
  for (var cA=0;cA<pArray.length;cA++)
  {
    //when an item is an array pass it through this
    if (Array.isArray(pArray[cA]))
    { 
      retVal.push(cloneAndReplace(pArray[cA],replace,offset))
    }
    else
    {
      retVal.push(replace[pArray[cA]-offset])
      //SpreadsheetApp.getUi().alert("flat"+retVal)
    }
  }
//  SpreadsheetApp.getUi().alert("out"+retVal)
  return retVal;
  }
  else
  {
    //when it is not an array just return it
  //  SpreadsheetApp.getUi().alert("trunc"+retVal)
    return pArray;
  }
}

//*********//
function runPrint(){
  actSheet.clear()
  var em = 7;
  var tea = 7;
    var pascB = genTwoPascal(12);
  //the em is a number above 2.
  var pasc= pascGen(pascB,em-2,7,0,pascB)
  printAllOfArray(pasc,[1],1,0,tea,[],actSheet)
}

function printAllOfArray(pArray,row,col,level,tea,totals,sheet)
{
 //check what I have is an 
 //because the code below checks ahead for non-array
  //content this check is simply one to kick out if the
  // pArray argument is not na array
 if (Array.isArray(pArray))
 {
  //for the array we start a loop to go through
  //this array
  //as this loop can make a recursive, we will revert
  //to this loop at different levels.
  //but what gets to this point is always an array
  var numbValsTotal=0;
  for (var cA=0;cA<pArray.length;cA++)
  {
    //when an item is an array pass it through this
    //when the array holds an array
    //continue down
    if (Array.isArray(pArray[cA]))
    { 
      //we when we revert from lower levels we want to
      //lose their total records
      var preserveTotal = totals.slice();
      //because we are starting an array we give this level
      totals.push(0);
      //preserve level for reverting and 
      //bump it a level for descending
      var preserveLevel = Number(level);
      level++;
      printAllOfArray(pArray[cA],row,col,level,tea,totals);
      level = Number(preserveLevel);
      totals = preserveTotal.slice();
    }
    else
    { 
      //not an array, then we are marching through printable content
      numbValsTotal+=pArray[cA];
      sheet.getRange(row,cA+1,1,1).setValue(pArray[cA])
      
      if (cA==(pArray.length-1))
      {
        totals=totals.forEach(function(value,ind,arra){
          arra[ind]=arra[ind]+numbValsTotal;
//          Logger.log(row+","+tea)
        sheet.getRange(row,tea+2,1,1).setValue(value);},this)
        row[0]=row[0]+1;
        numbValsTotal=0;
      }
    }
    
  }

  }
}


function testGoodOne()
{
  var pasc = genTwoPascal(12);
  //the em is a number above 2.
  var res= pascGen(pasc,5,7,0,pasc)
//  Logger.log(res)
}

//generate multidimenasional pascal down to a certain level
function pascGen(pCurrentStructure,em,tea,level,basePascal)
{
   while (level!=em)
  {
    //cA is first row
    var newStructure = [];
    for (var cA=0;cA<tea+1;cA++)
    {
      //cBgoes across first row
      var tempArray =[];
      for (var cB=0;cB<cA+1;cB++)
      {
        //so we get the structures in the last dimension accordig to cb
        //there is something wrong with the multipliers
      var multip = basePascal[cA][cB];
      var curS = pCurrentStructure[cB]
//      Logger.log("level: "+level+" cA: "+cA+" cB: "+cB+" multip: "+multip +"ohter: "+basePascal[cA][cB])
      var cloeMultRes=cloneAndMultiply(pCurrentStructure[cB],basePascal[cA][cB])
      tempArray.push(cloeMultRes);
      }
      newStructure.push(tempArray);
    }
    pCurrentStructure = newStructure;
    level++;
 }
//    var captRes = makePasc(newStructure,em,tea,level,basePascal);
  return pCurrentStructure;
}

function test()
{
googleSheetsOut(4,3)
}

//printer for recursion set
function googleSheetsOut(places,base){

var capted =startRecursion(places,base);
return capted;
}


//this should encase recursion
//it takes the places which is the exponenent or
//the power of our combination
//and the base which is the base of the combination
//base is the dimension power is the item
//so base is the dimension is the digits used in the row
//places is power or the dimension
function startRecursion(places,base)
{
	//var initialNum=polyBase(numb,2);
	var initArray=[];
	for (var cA=0;cA<places;cA++)
	{
		initArray.push(0)
	}
	var captureAll=[];
    //start with 
	recurse(initArray,base,captureAll);
  return captureAll;
//	captureAll.forEach(function(value){console.log(value);});
	}



//this approach to permutations is this
//start with a set in any order
//the first set is on
//the next step attends to the first item to the left
//it moves that item into the next position doing a swap
//this generates 2 versions.
//the next step attends to the prior item
//it is moved through both of the prior two versions left to right
//generating size items
//etc where then next step will generate 24 items
///you do this sequentially by triggering at each combination level
//the first item
//the second item
//the sixth item
//within each of those tranches you don't regenerate the first set
//but each set, the size of the prior factorial, looks back to this set
//and marches the new item through each of its rows.
//so at the sixth factorial process you have an existing set of 120 items
//the 121 first step takes row 1 and moves the sixth item from the left into position 1, sliding things along.
//the 122 step moves this item one step further
//when you get to 120th position, you move to the second row
//you move the sixth item through this row.

function testPAA()
{
var capt = permuteAnArray([[1],[2],[3],[4],[5],[6],[7]])
var bbb=1;

}


function permuteAnArray(val)
{
  var permArray=[];
  var endNumb = val.reduce(function(tot,sVal,ind){return tot*=(ind+1)},1)
  //how far we go in this factorial level, the actual countnum
  var endOfFactLevel=0;
  var factorialNumber = val.length
  var curStepSize=0;
  //this goes from 1-6
  var itemToWorkOne=0;
  var curFactLevel=1;

  //this number is always the prior factorial number
  
  //item to work goes 0-0
  //0-1
  //0-5
  //curSubFactLevel should go 1-6
  //
  
    for (var cA=0;cA<endNumb;cA++)
    {
      //this resets to the original bracket of the size
      //of the last factorial number
      //so I am going to use the same initial set over and over again
      //so I will be putting the current thing into different positions
      //each time in this set
      itemToWorkOne= (cA>0)?cA%curStepSize:0;
    
      if (permArray.length==0)
      {
        permArray.push(val.slice());
            endOfFactLevel=1;
            curStepSize=1;
            curFactLevel=2;
    }
      else
      {
          //curStepSize is actually end of last level,
          //take amount over that and find out our mod relative to that
          var stepsIntoFactorLevel = (cA-curStepSize)%curStepSize
          var curSubLevel=Math.floor(cA/curStepSize);
          //say we are going from the fives to the 6*5
          //you have the first set of 20 items each of which we have processed the last 5 items
          //we will first generate a bucket of 20 by putting the sixth item in first position for all 20
          var manipArr=permArray[itemToWorkOne].slice()
          //we put in according to the sub level positions
          //we take out by which factorial stage
          //factorial number is 6, the end number  first: {6-1=5-1 to make an index of 4, second to last
          //taking out the second to last
          manipArr.splice(factorialNumber-curFactLevel,1);
          //put the one I took out back in one position further down 6-5=4 {now the current last} +1 makes 5
          //put in 6-1=5
          manipArr.splice(factorialNumber-curFactLevel+curSubLevel,
          0,permArray[itemToWorkOne][factorialNumber-curFactLevel])
          permArray.push(manipArr);
      
      
        //end of fact levels should be 1,2,6,24,120,720
       //so when we are first working on 0 and history of subs is 1 end of fact should be 2
       
        if ((itemToWorkOne+curStepSize*curSubLevel)==endOfFactLevel)
        {
            //where this bucket ends
            //if we are at the last step, then we don't have to change values again
            //if we are have just ended any other level we take the last known size and
            //multiply it by the current stage + 1
            curStepSize = (endOfFactLevel+1);
            curFactLevel++;
            endOfFactLevel=(curFactLevel)*(endOfFactLevel+1)-1
        }
        }
    }
    return permArray;
}


//*********//
//WORKING HERE//
function testMCFAS()
{
  var size = 7;
  var numbSet = []
  for (var cD=0;cD<size;cD++)
  {
    numbSet.push([cD])
  }

  var captSPs= makeSetPatterns(size,size)
  var captPower = makeCombosForAllSets(captSPs,numbSet);
    var map =[]
//  dimensionRecurse(captPower,map);
//  printAllOfArray(pasc,[1],1,0,tea,[],actSheet)

  printAllOfArray(captPower,[1],1,0,tea,totals)
  var inte = 5;
}

//*********//
//I have a way to generate all the possible set types with the 
//description of the set.
//I have a way to generate all the combinations of that type
//the forEach is starting to do that
//once I have that I can use the description of the sets
//to command creating of all the possible value choices
function makeCombosForAllSets(recordedSets,numbset)
{
  var res = [];
  for (var cA=0;cA<recordedSets.length;cA++)
  {
    var out =generateMultipleCombins(numbset.length,recordedSets[cA].curBranch,numbset);
    res.push(out);
  }
//  recordedSets.forEach(function(val){res.push(generateMultipleCombins(numbset.length,val.curBranch,numbset))})
  return res;
}



//*********//
//test the function that does multiple combinatorials
function testGMC()
{
  var numbSet = []
  for (var cD=0;cD<11;cD++)
  {
    numbSet.push([cD])
  }

  var ans = generateMultipleCombins(numbSet.length,[1,3,2,1,4],numbSet)
//  var map =[]
//  dimensionRecurse(ans,map);

  var int = 5;
}

//*********//
//the function that does multiplecombinatorials
//size is en
//the sets we are making is pSets
//numbset is the actual set
function generateMultipleCombins(en,pSets,numbSet)
{
 
function makeTwoSets(en,pSetsNumb,pNumbSet)
{
  var keepSet = []
  var splitSet =[]
  var baOut = binaryAssignment(en,pSetsNumb,pNumbSet,true);
  if ((baOut[0][0].length==pSetsNumb))
  {
    splitSet=baOut[1].slice();
    keepSet=baOut[0].slice();
  }
  else
  {
    splitSet=baOut[0].slice();
    keepSet=baOut[1].slice();  
  }
  return [splitSet,keepSet]
}
  
  
function splitAndReturn(pSets,setPos,setToSplit)
{
//  if ((setPos==(pSets.length-1))&&(setToSplit.length==pSets[setPos]))
  if (setPos==(pSets.length-2))
  {
    return binaryAssignment(setToSplit.length,pSets[setPos],setToSplit,false);
  }
  else
  {
     var twoSets = makeTwoSets(setToSplit.length,pSets[setPos],setToSplit);
      var groupToKeep =  twoSets[1].slice();
      var groupToSplit = twoSets[0].slice();
      var stepRet = []
//      if (pSets.length==1)
      for (var cA=0;cA<groupToSplit.length;cA++)
      {
        stepRet.push([groupToKeep[cA],splitAndReturn(pSets,setPos+1,groupToSplit[cA])])
      }
      return stepRet.slice(); 
 }
}

if (pSets.length==1)
{
  return binaryAssignment(numbSet.length,pSets[0],numbSet,true)[0];
}


if (pSets.length==2)
{
  return binaryAssignment(numbSet.length,pSets[0],numbSet,false);
}

return splitAndReturn(pSets,0,numbSet);

}
  
//*********//
//test the function that does multiple combinatorials
function testGMP()
{
  var numbSet = []
  var objSet = []
  for (var cD=0;cD<6;cD++)
  {
    numbSet.push(cD)
    objSet.push([String.fromCharCode(cD+65)])
  }

//  var ans = generateMultiplePlacements(numbSet.length,[1,3,2,1,4],numbSet,objSet)
  var ans = generateMultiplePlacements(numbSet.length,[1,3,2],numbSet,objSet)
//  var map =[]
//  dimensionRecurse(ans,map);

  var int = 5;
}

//*********//
//the function that does multiplecombinatorials
//size is en
//the sets we are making is pSets
//numbset is the actual set
function generateMultiplePlacements(pEn,pSets,numbSet,pObjSet)
{
 this.objSet=pObjSet;
 this.tEn = pEn;
function makeTwoSets(subEn,pSetsNumb,pNumbSet)
{
  var keepSet = []
  var splitSet =[]
  var baOut = binaryAssignment(subEn,pSetsNumb,pNumbSet,true);
  if ((baOut[0][0].length==pSetsNumb))
  {
    splitSet=baOut[1].slice();
    keepSet=baOut[0].slice();
  }
  else
  {
    splitSet=baOut[0].slice();
    keepSet=baOut[1].slice();  
  }
  return [splitSet,keepSet]
}
  
  
function splitAndReturn(pSets,setPos,setToSplit,pCurSet)
{
//  if ((setPos==(pSets.length-1))&&(setToSplit.length==pSets[setPos]))
  if (setPos==(pSets.length-2))
  {
    var biSet=[];
    var pKay = 0;
    if (pSets[setPos+1]<pSets[setPos])
    {biSet=[setToSplit[setPos+1],setToSplit[setPos]];
      pKay = pSets[setPos+1];
      }
    else
    {biSet=[setToSplit[setPos],setToSplit[setPos+1]]
      pKay = pSets[setPos];}
    var forTesting =[];
//    for (var testA=0;testA<this.tEn;testA++)
//    {
//        forTesting.push("#")
//    }
    var tempA = binaryPlacement(pSets[setPos]+pSets[setPos+1],pKay,setToSplit,biSet,pCurSet.slice());
    return binaryAssignment(setToSplit.length,pSets[setPos],setToSplit,false);
  }
  else
  {
     var twoSets = makeTwoSets(setToSplit.length,pSets[setPos],setToSplit);
      var groupToKeep =  twoSets[1].slice();
      var groupToSplit = twoSets[0].slice();
      var stepRet = []
//      if (pSets.length==1)
      for (var cA=0;cA<groupToSplit.length;cA++)
      {
        stepRet.push([groupToKeep[cA],splitAndReturn(pSets,setPos+1,groupToSplit[cA],pCurSet.slice())])
      }
      return stepRet.slice(); 
 }
}

if (pSets.length==1)
{
   var tempB = binaryPlacement(numbSet.length,pSets[0],numbSet,numbSet,pObjSet.slice());
  return binaryAssignment(numbSet.length,pSets[0],numbSet,true)[0];
}


if (pSets.length==2)
{
   var tempC = binaryPlacement(numbSet.length,pSets[0],numbSet,numbSet,pObjSet.slice());
  return binaryAssignment(numbSet.length,pSets[0],numbSet,false);
}

var testLoop =splitAndReturn(pSets,0,numbSet,this.objSet);
return testLoop;
//return splitAndReturn(pSets,0,numbSet,this.objSet);

}

 



function testMakeSetPatterns()
{
//the twelve is not currently used
  var ans = makeSetPatterns(11,12)
  var int = 5;
}

//*********//
//given an en and a zee this makes a
//pattern of sets
function makeSetPatterns(en,zee)
{

//This function will provide the max and min value for the next item
//in the pattern
function maxAndMinNextValue(minSoFar,total,level)
{
var quotient = Math.floor(total/level)
var dividend = total%level
//th
//because the level is greater than one we can spread the total over the remaining slots
//the -1 is because we are putting one in every slot accept the one we are concerned with
//making the others one tells us this max
var maxCandidateByWhatsLeve = total-((level*1)-1)
//This value cannot be larger than the smallest so far
var max = (minSoFar<maxCandidateByWhatsLeve)?minSoFar:maxCandidateByWhatsLeve;
var min = quotient+((dividend>0)?1:0);
return [min,max];
}

function amendSet(pSet,priVal,val)
{
      if (priVal==val)
      {
        pSet[pSet.length-1]=pSet[pSet.length-1]+1;
      }
      else
      {
        pSet.push(1);
      }
}

//  descendAGrouping(en,cA,0,en,[1,en],record,[]);
//function descendAGrouping(pEn,numbOfSteps,sumSoFar,pMinSoFar,record,pBranch,setsTrack,pSetTrack)
function descendAGrouping(pEn,numbOfSteps,sumSoFar,pMinSoFar,record,pBranch)
{
  //First argument is the maximum value we can assign, which is the lowest so far
  //the second argument is the total remaining
  //last is number of steps
  //the result is a min and max vlalue
  var minMax = maxAndMinNextValue(pMinSoFar,pEn-sumSoFar,numbOfSteps)
  
  if ((numbOfSteps==1)&&(minMax[1]-minMax[0]<=1))
  {
      amendSet(pBranch.setTrack,pBranch.curBranch[pBranch.curBranch.length-1],pEn-sumSoFar)
      pBranch.curBranch.push(pEn-sumSoFar)
      record.push({curBranch:pBranch.curBranch.slice(),setTrack:pBranch.setTrack.slice()})
//      setsTrack.push(pBranch.setTrack.slice());
  }
  else
  {
      for (var cB=minMax[1];cB>=minMax[0];cB--)
      {
        var newBranch = {curBranch:pBranch.curBranch.slice(),setTrack:pBranch.setTrack.slice()}
        newBranch.curBranch.push(cB)
//        var newSetTrack = pSetTrack.slice();
        if (newBranch.curBranch.length>0)
        {
          amendSet(newBranch.setTrack,pBranch.curBranch[pBranch.curBranch.length-1],cB)
        }
        else
        {
          newBranch.setTrack.push(1);
        }
//        descendAGrouping(pEn,numbOfSteps-1,sumSoFar+cB,cB,record,newBranch,setsTrack,newSetTrack)
        descendAGrouping(pEn,numbOfSteps-1,sumSoFar+cB,cB,record,newBranch)
      }
    
  }
}

//for each level, which represents a number of spaces
    var record = [];
//    var setTrack = [];
for (var cA=1;cA<=en;cA++)
{
  //first is how many steps we need
  //second is sumSoFar
  //third is current cap
  //fourth is min and max for current consideration
  //fifth is answer set
  //sixth is the current branch
//  descendAGrouping(en,cA,0,en,record,{curBranch:[],branchDescr:[]},setTrack,[]);
  descendAGrouping(en,cA,0,en,record,{curBranch:[],setTrack:[]});
}
return record;
//So at this point we can do the following:
//run through the recorded set types.
//use their record track length to see how many picks we need.
//use existing tool to pick that many items.
//this will give a combination out of 11 of certain items
//for each of these use the set track to pick all combinations of the record slots these values could be assigned to.
//example so far:
//let's say the track set is 1,2,3 and record set 3,2,2,1,1,1
//record is 6 long. I pick a,c,d,f,g,k
//then choose 6C(1,2,3) so maybe {4},{1,5},{0,2,3}
//the f is the three, a and g are the twos, and 0,2, and 3 are the ones.
//so for each combo I now have multiple record list assignments.
//now for each of these I need to pick position sets
}