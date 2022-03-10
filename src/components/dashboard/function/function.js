const formatDate = (date)=>{
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        mins = ''+ d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if(hours.length < 2)
        hours = '0' + hours;
    if(mins.length < 2)
        mins = '0' + mins;

    return [year, month, day].join('-') + ' ' + [hours, mins].join(':');
}

export default formatDate;