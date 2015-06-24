
//字符串替换
function stringReplace_com(data,template) {
    var temp=$("#"+template).html();
    var arr=[];
    arr=arr.concat(data);
    var str="";
    for(var i=0;i<arr.length;i++){
        str+=temp.replace(/\{\w+\}/g, function(word) {
            word=word.replace("{","");
            word=word.replace("}","");
            if(arr[i][word]!=""&&arr[i][word]!=undefined){
                return arr[i][word];
            }else{
                return "";
            }
        });
    }
    return str;
}

//url参数获取
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return r[2];
    return "";
}