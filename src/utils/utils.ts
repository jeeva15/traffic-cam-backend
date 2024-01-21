
export const getCurrentDateTimeString = (date: Date): string => {
   //  const date = new Date();
    //YYYY-MM-DD[T]HH:mm:ss (SGT) format
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
 }

 export const calculateDistanceInKM = (latitude1:number, latitude2:number, longitude1:number, longitude2: number)=>{
    // reference https://www.movable-type.co.uk/scripts/latlong.html
    const metres = 6371e3; 
    const radians1 = latitude1 * Math.PI/180; // φ, λ in radians
    const radian2 = latitude2 * Math.PI/180;
    const ab = (latitude2-latitude1) * Math.PI/180;
    const ac = (longitude2-longitude1) * Math.PI/180;

    const a = Math.sin(ab/2) * Math.sin(ab/2) +
            Math.cos(radians1) * Math.cos(radian2) *
            Math.sin(ac/2) * Math.sin(ac/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return metres * c / 1000; // in km

 }

 export const decryptData =(data: string):string => {
   return atob(data);
 }

 export const reverseDateFormat = (inputDate:string) :string => {
   const dateComponents = inputDate.split('/');
   return `${dateComponents[2]}/${dateComponents[1]}/${dateComponents[0]}`;
 }


 export const findIndexOfKeyInAnArrayOfObject = (arrayOfObject: {}[], keyToSearch: string):number => {
  return arrayOfObject.findIndex((obj:any) => obj.hasOwnProperty(keyToSearch) || keyToSearch in obj);
}

export const isWithinNextHour = (firstDate: Date, secondDate: Date): boolean =>{
  const timeDifference = firstDate.getTime() - secondDate.getTime();
  const oneHourInMillis = 60 * 60 * 1000; // 1 hour in milliseconds
 
  return timeDifference > 0 && timeDifference <= oneHourInMillis;
}
