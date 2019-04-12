
let fullNum=_=>_>=10?_:'0'+_;

export default (date=new Date())=>{

    const d=new Date(date);
    return {
        year:d.getFullYear(),
        month:fullNum(d.getMonth()+1),
        date:fullNum(d.getDate()),
        hours : fullNum(date.getHours()),
        minutes : fullNum(date.getMinutes()),
        seconds : fullNum(date.getSeconds()),
    }
}
