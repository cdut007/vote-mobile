//阻止事件冒泡 
function cancelBubble(e) { //一般用在鼠标或键盘事件上
	if(e && e.stopPropagation) { //W3C取消冒泡事件  
		e.stopPropagation();
	} else { //IE取消冒泡事件   
		window.event.cancelBubble = true;
	}
}
//获取当前时间
function getNowFormatDate() {    
	var date = new Date();    
	var seperator1 = "-";    
	var seperator2 = ":";    
	var month = date.getMonth() + 1;    
	var strDate = date.getDate();    
	if(month >= 1 && month <= 9) {        
		month = "0" + month;    
	}    
	if(strDate >= 0 && strDate <= 9) {        
		strDate = "0" + strDate;    
	}    
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " +
		date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();    
	return currentdate;
}
//获取时间
function getNowFormatDate(o) { 
	var date=new Date(o);     
    var seperator1 = "-";    
    var seperator2 = ":";    
    var month = date.getMonth() + 1;    
    var strDate = date.getDate();    
    if(month >= 1 && month <= 9) {        
        month = "0" + month;    
    }    
    if(strDate >= 0 && strDate <= 9) {        
        strDate = "0" + strDate;    
    }    
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " +
        date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();    
    return currentdate;
}

/*当月最后一天*/
function getCurrentMonthLast(){
 var date=new Date();
 var currentMonth=date.getMonth();
 var nextMonth=++currentMonth;
 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
 var oneDay=1000*60*60*24;
 return new Date(nextMonthFirstDay-oneDay);
}

/*内容过长*/
function cutStr(str){//无全选
	if(str.length>9){
		str=str.substring(0,8)+"...";
		return str;
	}
	return str;
}
function cutStr2(str){
	if(str.length>7){
		str=str.substring(0,6)+"...";
		return str;
	}
	return str;
}
/*null转字符串*/
function nullToStr(str) {
    if(str == null || str == ""||str==undefined) {
        str = "";
        return str;
    }
    return str;
}