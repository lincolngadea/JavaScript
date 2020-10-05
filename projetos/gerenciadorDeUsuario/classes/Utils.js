class Utils{

 static dateFormat(date){

    let dualDate ='';

    if(date.getDate() < 10){
        dualDate = '0'+date.getDate();
    }else{
        dualDate = date.getDate();
    }
        return dualDate+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
    }
}