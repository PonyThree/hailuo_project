var jugeNum = function(n) {
    return n<10? '0'+n :n;
  }
//   展示年月日
var getTime=function(myTime){
    var t=new Date(myTime);
    var y=t.getFullYear();
    var mon=t.getMonth()+1;
    var d=t.getDate();
    return y+'-'+jugeNum(mon)+'-'+jugeNum(d);
}
var getTime1=function(myTime){
    var t=new Date(myTime);
    var y=t.getFullYear();
    var mon=t.getMonth()+1;
    var d=t.getDate();
    var h=t.getHours();
    var m=t.getMinutes();
    var s=t.getSeconds();
    return y+'-'+jugeNum(mon)+'-'+jugeNum(d)+" "+jugeNum(h)+":"+jugeNum(m)+":"+jugeNum(s);
}
export default{
    jugeNum:jugeNum,
    getTime: getTime,
    getTime1: getTime1
  }