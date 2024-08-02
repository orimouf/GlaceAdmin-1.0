
export const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   
export const DateForma = (date, type) => {
    let array = []
    if (type === "DB") {
        const arr = date.split("T")
        array = arr[0].split("-")
    } else { 
        array = date.split("-") 
    }

    return `${Months[parseInt(array[1])-1]} ${array[2]}, ${array[0]}`
}

export const getDate = () => {
   
    const today = new Date();
    const month_raw = today.getMonth() + 1;
    const year = today.getFullYear();
    const date_raw  = today.getDate();
    var date, month;

    if (date_raw<10)  {  date ="0"+date_raw.toString()} else {  date =date_raw.toString()}
    if (month_raw<10)  {  month ="0"+month_raw.toString()} else {  month =month_raw.toString()}

    return `${date}-${month}-${year}`;

}