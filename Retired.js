
//wtf
//I think making this consider a different power and base
//is a simple matter of refining the while test
//it biulds out by column
//you just have to stop building out
//or maybe you total lower

//this is the function that makes all the possible set pattersn for a size n
//create all the possible multidemensional
//combinations posssible with size en
function makeSetPatternsRet(en)
{
  var retVal=[];
  for (var cA=1;cA<(en+1);cA++)
  {
    retVal.push([cA]);
  }
  var workRetVal = function(pArray,pEn)
  {
    var cR=0;
    var end = pArray.length;
    while (cR<end)
    {
     var appendedVal = 1;
     var curTot=pArray[cR].reduce(function(total,val){return total+val});
     while ((curTot<(pEn+1))&&(appendedVal<=pArray[cR][pArray[cR].length-1]))
     {
       if ((curTot+appendedVal)<=en)
       {
         var temp = pArray[cR].slice()
         temp.push(appendedVal);
         pArray.push(temp);
       }
       appendedVal++;
     }
     if (curTot<pEn)
     {
       pArray.splice(cR,1)
       cR--;
       end--;
     }
     cR++;
    }
    
  }
  
  var col=1;
  var stepInRV=0;
  while (col<en)
  {
    workRetVal(retVal,en);
    col++;
  }
return retVal;
}



function testRecursion()
{
	
	var initArray=[];
    var base = 5;
    var places =5;
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

//brute force make all combinations
//engine to make all possible combinations em by tea
//it takes an array whose length represents the exponenent or
//the power of our combination
//and the base which is the base of the combination
//base is the dimension power is the item
//so base is the dimension is the digits used in the row
//places is power or the dimension

//the length of the array represents the power we are building to
//which is usually the dimension of the pascal
//the base, which us used as level count
//is the actual symbol or digit that we are including.
//captuer all just takes each orwo

//

function recurse(arrayIP,levelCount,captureAll)
{
   //we start at the highest digit we number and count down
  //to zero, this count is for the creation of each array
   levelCount=levelCount-1;
    if (levelCount==0)
	{
        //when we hit zero return the created array
        //and proceed with the recursion
//      Logger.log("a: "+arrayIP+" Leve: "+levelCount+"LE :"+loopend)
		captureAll.push(arrayIP);
	}
	else
	{   //at the new level
		//find the positions to replace
		//as the zeroes not filled
        //after the last run these positios are unfilled
        //findZeros takes an array and returns
        //returns the zero positions in this array
		var zPos=findZeros(arrayIP);
		//console.log("after find zero:"+zPos);
        //find the number of non-zero slots
		//2 to this length is number of base 2 numbers, 1,0 sets, 1 want
		//to use to select which positions to replace
        //when you are checking present or not
        //base 2 in an array tells you the possible combinationss
        //of present or not you can make
        //each base 2 number is a unique representation of
        //empty or not
		var numZs =zPos.length;
		//console.log("numZeros:"+numZs);
		//by generating base two numbers we
		//systematically pick all change or not
		//options for the unfilled or zeros spots
        //we will go through each combination to fill.
		for (var cA=0;cA<Math.pow(2,numZs);cA++)
		{
        //here is the magic part
          //TRACE: 0,0,0,0,0,0,0 comes
          //and will be altered passed to the next iteration
          //each time recurse is called at the end of this loop
          //the recurse will follow the path down
          //until you hit level 0, in which case the resulting
          //number is booked
          //0,0,0,0,0,0 comes in
          //sees all 0's
          //so we are going to initiate a loop from 0 to 2^6th
          //we generate 0 as a polynomial of base 2
          //we get to the recurse and the for loop is in the stack at the top level
          //waiting to count to 2^6
          //hung when it passed 0,0,0,0,0,0
          //The next iteration sees the same list
          //we enter the same loop with all zeros
          //we get stacked this one is also waiting to count to 2^6
          //we stack all the 0,0,0,0,0 pending to count to every number down pascals
          //tree up to the level of this base.
          //final 0,0,0,0,0,0 is sent with a level of 0
          //we return this null string and start to playback.
          //the first loop we return to is waiting to count to 2^6 at level 1
          //It next sends a one, which gets replaced with a 1 and now we enter the
          //loop again but on for 2^5.
          //The orginal loop started at level 1 will create many sub loops that at each power
          //of two that will stay with a number 1 in the position.
          //the subloops fill in the spaces up to the loops they are nested froms (length-numberofzerostofill)
          //so when the ones fill everything in we fill in twos in the pattern of counting in binary with the ones
          //but for every 2 based binary number we then fill the rest in arround it with 1s.
          //we then count binary putting in threes, put in count binar 2s, which are sub filled in with ones. etc.
		//console.log("loop num:"+cA)
		var copyArrayIP=arrayIP.slice();
		//console.log("copied:"+copyArrayIP);
		//for this base 2 number get the
		//index positions of the 1s (backwards)
        //ton of work here, makes base two number
        //finds the ones in the base two representation of this number
		var onePoses=chooseArrayPositions(cA);
		//console.log("one poses in cA:"+onePoses);
		//these one positions indicate
		//which indices from the indices of the zero set we replace
        //zPos is the positions
        //this just reverses the order value of the indices
		var indToReplace=selectFromSubArray(onePoses,zPos);
		//console.log("ind to rep:"+indToReplace)
		//console.log("bef rep:"+copyArrayIP)
        //use the level count as the value being replaced
        //takes the current array and replaces the passed positions
        //with the base
		makeReplacements(levelCount,copyArrayIP,indToReplace);
		//console.log("aft rep:"+copyArrayIP)
		recurse(copyArrayIP,levelCount,captureAll);

		//console.log("return:"+levelCount);
//			console.log("full:"+copyArrayIP);
		}

	}
}

//used by recurse
//returns the zero positions in this array
function findZeros(pArray)
{
	return pArray.map(function(value,index,self){return (value==0)?(self.length-index):0},this).filter(function(value){return (value>0)}).map(function(value){return value-1})
}

//used by recurse
//returns the one positions in a binary array
//as their index
function chooseArrayPositions(en)
{
	//console.log("seed to make bi arr pos:"+en);
    //takes a base two number
    //multiplies each index by the value which returns 0
    //for each empty spot and the index for each slot with a 1
	return polyBase(en,2).map(function(value,index,self){return value*(self.length-index);},this).filter(function(val){return (val>0);}).map(function(val){return (val-1);});
}


//used by recurse
function selectFromSubArray(selections,pSubArray)
{
	//console.log("selection:"+selections+" subarray:"+pSubArray)
	//console.log("step 1:"+this.subArray[selections[0]]);
	return selections.map(function(value){return pSubArray[pSubArray.length-value-1];});
}

//used by recurse
function makeReplacements(pRepNumb,pArray,spotsToReplace)
{

	spotsToReplace.forEach(function(value,index,self){pArray.splice(pArray.length-value-1,1,pRepNumb);});
}

//used by recurse
//creates a polynomial base
//for a given value and base
function polyBase(pInt,altBase)
{
  if (pInt==0)
  {
    return [0];
  }
    var retVal =[]
//    Logger.log(pInt+";"+altBase)
    var startVal = Math.floor(Math.log(pInt)/Math.log(altBase))
    var cA=startVal;
    while (cA>0)
	{
      var powA=Math.pow(altBase,cA);
      var valOM =Math.floor(pInt/powA);   
        retVal.push(valOM);
      pInt=pInt-valOM*powA;
		cA--;
    }
  retVal.push(pInt);
//        Logger.log(retVal);

	return retVal;
}


function binaryAssignmentOLDPrior(en,pKay)
{
  var allVal = []
  //the numbers to en
  for (var cA=0;cA<en;cA++)
  {
    allVal.push(cA);
  }
  //pick the bigger kay
  var kay = (pKay<(en/2))?pKay:(en-pKay);
    var retArray = [];
    var startingSet = []
    var secondSet = []
    //the numbers to kay
    for (var cA=0;cA<kay;cA++)
    {
        startingSet.push(cA);
    }
    var copy = startingSet.slice();
    //a copy of 0 through k and a set made as follows
    //and all the values not in the kay set.
    //this is the original split.
    retArray.push([copy,allVal.slice().filter(function(val){return copy.indexOf(val)<0})]);
    var countSteps =1;
    //we are going to make this many versions
    var fixLevel =kay-1;
    //we are going to make this many more versions
    var enChooseKay=(new AMultipleCombinatorial(en,[en-kay,kay])).prod
    var assignments = [];
    while (countSteps<enChooseKay)
    {
        //find the last array we made, take the first subset for that array
        assignments = retArray[retArray.length-1][0].slice();
        //searching back to find the last
        //slot that can be added to
        var cB = kay-1;
        var slotNotFound = true;
        while ((cB>0)&&(slotNotFound))
        {
          //the last slot that can have one added to it
          //with each subsequent slot one higher
          //is the slot we add to
          
          
          
          if (assignments[cB]<(en-(kay-cB-1)-1))
          {
            slotNotFound=false;
            cB++;
          }
          cB--;
        }        
                 //if the slot we are adding to is other than the last one
                 //then we create a sequence from that slot up ascending to the end
                 if (cB<(kay-1))
                 {
                    assignments[cB]=assignments[cB]+1;
                    for (var cC=cB+1;cC<kay;cC++)
                    {
                      assignments[cC]=assignments[cC-1]+1;
                    }
                 }
                 else
                 {
                     assignments[kay-1]=assignments[kay-1]+1;
                 }
          retArray.push([assignments.slice(),allVal.slice().filter(function(val){return assignments.indexOf(val)<0})]);
          countSteps++
        }
  return retArray;
}
