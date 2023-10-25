// Funkce pro nastaveni spravneho formatu casu
export const readableTimeConverter = (time: string) => {
    const redableTime = new Date(time)
    const day = redableTime.getDate()
    const month = redableTime.getMonth() + 1
    const year = redableTime.getFullYear()
    const hours = redableTime.getHours()
    const minutes = redableTime.getMinutes()
    return `${day}.${month}.${year} ${hours}:${minutes < 10 ? '0' + String(minutes) : minutes}`
}