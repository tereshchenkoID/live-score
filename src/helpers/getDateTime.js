export const getDateTime = (data, type) => {
    const now = new Date(data);
    const date = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear().toString();
    const day = String(now.getDate()).padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    if (type === 0) {
        return `${hours}:${minutes}:${seconds}`
    }
    else if(type === 1) {
        return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
    else if(type === 2) {
        return `${date}/${month}/${year}`
    }
    else if (type === 3) {
        return `${hours}:${minutes}`
    }
    else if (type === 4) {
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}
