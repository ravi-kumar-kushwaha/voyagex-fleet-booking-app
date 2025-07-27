
const calculatedRideDuration = (fromPincode,toPincode)=>{
  try {
    const from = parseInt(fromPincode);
    const to = parseInt(toPincode);
    const distance = Math.abs(from - to)%24;
    return distance;
  } catch (error) {
    throw new Error("Error in calculateRideDuration "+error.message);
  }
}

export default calculatedRideDuration