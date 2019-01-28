function secondFact(range)
{
  var uniques=[];
  var cA=0;
  var test=true;
  var totOnes=0;
  var uniqueCounts=[];
  var totItems=0;
  //for the whole length of the row (0 is because of the 2d array of rows and columns
  while (cA<range[0].length)
  {
    //if not a zero item
    if (range[0][cA]!=0)
    {
      //count items in set not == to 0;
      totItems++;
      //if no one is entered yet
      //initialize set
      if (uniques.length==0)
      {
        uniques.push(range[0][cA]);
        uniqueCounts.push(1);
      }
      else
      {
        //look for the value in this position
        //in the unique set
        //if not there add it.
        //we never add in 0
        var foundOrNot = true;
        var cB=0;
        while ((foundOrNot)&&(cB<uniques.length))
        {
          if (range[0][cA]==uniques[cB])
          {
            foundOrNot=false;
            uniqueCounts[cB]=uniqueCounts[cB]+1;
          }
            cB++;
        }
        if (foundOrNot)
        {
          uniques.push(range[0][cA]);
          uniqueCounts.push(1);
        }  
      }
    }
    
    cA++;
  }
  var prog=1;
  for (var cA=0;cA<uniqueCounts.length;cA++)
  {
    prog*=(new Combinations.APermutation(uniqueCounts[cA],uniqueCounts[cA])).prod;
  }
  return (new Combinations.APermutation(totItems,totItems)).prod/prog;
}


