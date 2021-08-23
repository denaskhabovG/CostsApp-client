export const formatDate = (date) => {
    const newDate = new Date(date);

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    return newDate.toLocaleString('ru', options);
}
