const roundVoteAverage = (avg) => {
  let roundedAvg = avg
  if(avg <= 0.5) roundedAvg = 0
  if(avg < 1 && avg >= 0.5) roundedAvg = 0.5
  if(avg < 1.5 && avg >= 1) roundedAvg = 1
  if(avg < 2 && avg >= 1.5) roundedAvg = 1.5
  if(avg < 2.5 && avg >= 2) roundedAvg = 2
  if(avg < 3 && avg >= 2.5) roundedAvg = 2.5
  if(avg < 3.5 && avg >= 3) roundedAvg = 3
  if(avg < 4 && avg >= 3.5) roundedAvg = 3.5
  if(avg < 4.5 && avg >= 4) roundedAvg = 4
  if(avg < 5 && avg >= 4.5) roundedAvg = 4.5
  return roundedAvg
}

export default roundVoteAverage