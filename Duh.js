function binaryAssignmentRec()
{
  var capture = [];
  var en = 14;
  var kay =6;
  var low = ((en-kay)>kay)?kay:en-kay;
  var top = en-low;
  var apArray = []
  var bpArray = []
//  var papArray = []
//  var pbpArray = []
  var lastStart=[0]

  for (var cA=0;cA<top;cA++)
  {
    if (cA<low)
    {
//      papArray.push([cA]);
      apArray.push([cA]);
    }
//    pbpArray.push([cA+low]);
    bpArray.push([cA+low])
  }
  
//  forRep(0,14,apArray.slice(),bpArray,0,capture,papArray,pbpArray,captureA,0,lastStart);
  BAForRepRec(0,en,apArray.slice(),bpArray,0,capture,0,lastStart);
  var x=5;
}



//function forRep(start,en,apArray,bpArray,leve,capt,apo,bpo,captA,leveA,lastStart)
function BAForRepRec(start,en,apArray,bpArray,leve,capt,leveA,lastStart)
{
  //if we are at last row
  if(leve==apArray.length-1)
  {
    for (var cj=start;cj<(en-apArray.length+leve+1);cj++)
    {
//          apo[leve]=[cj]
          apArray[leve]=[cj];
      if (apArray[apArray.length-1]>(apArray.length-1))
      {
         if (cj==start)
         {
           for (var cp=cj-leve-1;cp<bpArray.length;cp++)
            if(cp==cj-leve-1)
            {
//              bpo[cp]=[bpArray[cp]-1];
//              Logger.log("cp : "+cp+"bpArray[cp]-1 : "+(bpArray[cp]-1)+"di: "+((bpArray[cp]-1)-cp-(leve-1)+lastStart[0])+"cj : "+cj+"lstart :"+lastStart);
//              bpArray[cp]=bpArray[cp]-1;
              bpArray[cp]=[cp+(leve-1)-lastStart[0]];
             }
             else
             {
             //what I am adding here on the third level is wrong
             //first two are good 0 and 1
             //
//             bpo[cp]=[cp+apArray.length];
             bpArray[cp]=[cp+apArray.length];
             }
           }
           else
           {
//              Logger.log("cj : "+cj+"written val : "+(bpArray[cj-apArray.length]-1)+"di: "+((bpArray[cj-apArray.length]-1)-(cj-1))+"lstart :"+lastStart);
//             bpo[cj-apArray.length]=[bpArray[cj-apArray.length]-1];
//             bpArray[cj-apArray.length]=bpArray[cj-apArray.length]-1;
             bpArray[cj-apArray.length]=[cj-1];           
           }
       }  
    capt.push([apArray.slice(),bpArray.slice()])
//    captA.push([apo.slice(),bpo.slice()])  
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
 //     apo[leve]=[ck];
      leveA++;
      apArray[leve]=[ck];
      //call the next level with this one holding array that
      //has just been fed ck.
      //increase level by one and
      //make the value one higher
//      forRep(ck+1,en,apArray,bpArray,leve+1,capt,apo,bpo,captA,leveA,lastStart)
      BAForRepRec(ck+1,en,apArray,bpArray,leve+1,capt,leveA,lastStart)
        //    bpArray=bpo.slice();
      //after we have written arrays for the last level
      //we will snap back at each level
      //and we run the ascending sequence to the end
      for (var cm=leve+1;cm<apArray.length-1;cm++)
      {
//        apo[cm]=[ck+(cm-leve)+1]
        apArray[cm]=[ck+(cm-leve)+1];
      }
    }
    }

}



function testSFCv()
{
	binaryAssignmentAlt(9,4,true);
}
//lastest binary assignment
function binaryAssignmentAlt(en,pKay,includeHigh)
{
  var allVal=[];
  var kay = (pKay<(en/2))?pKay:(en-pKay);
  var endCount = (new AFastCombinatorial(en,pKay)).prod;
  var retArray = [];
  var secondSet = [];
  var firstSet = [];
  var initPosVals =[];
//  var zerosArray =[];
  var initTruths =[];
  var initResetCount =[];
  for (var cA=0;cA<en;cA++)
  {
    allVal.push([cA]);
  if((cA>=0)&&(cA<=kay-1))
  {
    initPosVals.push([cA]);
    firstSet.push([cA]);
  if (cA<kay-1)
  {
    initTruths.push(false);
    initResetCount.push(0);
  }
  }
  else
  {
    secondSet.push([cA]);
  }
  }
  initTruths.push(true);
  initResetCount.push(-1); 
  var initTruthsPreserve = initTruths.slice();
  var currentSet=secondSet.slice();
  var currentLSet=firstSet.slice();
  var lowestAboveKay=kay;
  var aAtLast =0;
//  var lastTrueIfAnyTest = kay-1;
  for (var cA=0;cA<endCount;cA++)
  {
  
    var outsT=[];
    var insT=[];
  var lastTrueIfAny = initTruths.reduce(function(tot,val,ind){return ((tot==-1)&&(!val))?-1:(tot>-1)?tot:ind;},-1)
  initTruths=initTruthsPreserve.slice();
  var lastIncr = (lastTrueIfAny>-1)?initResetCount[lastTrueIfAny]+1:-1;
  if (lastTrueIfAny<(kay-1))
  {
    aAtLast=cA;
  }
    for (var cC=kay-1;cC>=lastTrueIfAny;cC--)
    {
        initResetCount[cC]=lastIncr;
        var ccVal = allVal[cC][0]+initResetCount[cC];
        initPosVals[cC]=[ccVal];
      if(includeHigh)
      {
        if ((ccVal>kay-1)&&(cC<lowestAboveKay))
        {
          lowestAboveKay=cC;
        }
        if ((ccVal<=kay-1)&&(cC>=lowestAboveKay))
        {
          if ((cC+1)<=(kay-1))
          {
            lowestAboveKay=cC+1;
          }
        }
      }
//        if (((initPosVals[cC][0]+(kay-allVal[cC][0]))==en)&&((cC-1)<lastTrueIfAnyTest))
//        {
 //         lastTrueIfAnyTest=cC-1;
 //       }
        initTruths[cC-1]=((initPosVals[cC][0]+(kay-allVal[cC][0]))==en);
    }
    if (includeHigh)
    {
currentLSet=firstSet.slice();    
currentSet=secondSet.slice();
for (var cE=initPosVals.length-1;cE>-1;cE--)
{
  if (cE>=lowestAboveKay)
  {
    currentSet.splice(initPosVals[cE][0]-(kay-1)-1,1);
  }
  else
  {
    currentLSet.splice(initPosVals[cE][0],1);
  }
}
if (currentLSet.length>0)
{
currentLSet=currentLSet.concat(currentSet)
 }
 else
 {
 currentLSet=currentSet.slice();
 }
   retArray.push([initPosVals.slice(),currentLSet.slice(),aAtLast]);
 }
 else
 {
   retArray.push(initPosVals.slice());
 }
  }
  return retArray;
}

