function SamplingScenario(pPopS,pSampS,pNumbA)
{
  var totalProba=0;
  var probsArray =[]
  var sampPermuter = (new APermutation(pSampS,pSampS)).prod;
  var numbOfSampPerms = (new APermutation(pPopS,pSampS)).prod;
  var limit = (pSampS<pNumbA)?pSampS:pNumbA;
  for (var cA=0;cA<=limit;cA++)
  {
    var combsOfSucc = (new ACombinatorial(limit,cA)).prod;
    var combsOfFail = (new ACombinatorial(pPopS-limit,pSampS-cA)).prod;
    var maxOne=combsOfSucc;
    var secondOne=combsOfSucc;
    var thirdOne=combsOfSucc;
    if (combsOfSucc>combsOfFail)
    {
      if(sampPermuter>combsOfSucc)
      {
        maxOne=sampPermuter;
        thirdOne=combsOfFail;
      }
      else
      {
        if(sampPermuter>combsOfFail)
        {
          secondOne=sampPermuter;
          thirdOne=combsOfFail;
        }
        else
        {
          secondOne=combsOfFail;
          thirdOne=sampPermuter;
        }
      }
    }
    else
    {
      if(sampPermuter>combsOfFail)
      {
        maxOne=sampPermuter;
        secondOne=combsOfFail;
      }
      else
      {
        if(sampPermuter>combsOfSucc)
        {
          maxOne=combsOfFail;
          secondOne=sampPermuter;
        }
        else
        {
          maxOne=combsOfFail
          thirdOne=sampPermuter;
        }
      }
    }
    var temp = maxOne/numbOfSampPerms;
    var disVal =temp*secondOne*thirdOne;
    probsArray.push(disVal);
//    probsArray.push(combsOfFail);
    totalProba+=disVal;
  }

  return probsArray;
}
