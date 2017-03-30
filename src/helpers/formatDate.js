export function formatDate(date) {
    const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];

    const dayNames = [
        'Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    let today = new Date(date);
    today.setTime( today.getTime() + today.getTimezoneOffset() * 60*1000 );

    const dayOfWeek = today.getDay();
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();

    return (dayNames[dayOfWeek] + ', ' + monthNames[monthIndex] + ' ' + day + ', ' + year);
}

export function currentDateToString() {
    let date = new Date();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return date = [year, month, day].join('-');
}