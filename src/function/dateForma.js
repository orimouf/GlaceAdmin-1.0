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