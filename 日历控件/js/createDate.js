/**

 @Name : createDate v1.1 日期控件-手机端
 @Author: 不留汗
 @Date: 2015-08-25
 @QQ：342782880

 */
;(function($){
	$.creatDate=function (opt) {
			var options={
				showMonth:5,//显示月份数
				type:"after",
				direct:"#body"
			};
			var opts = $.extend(options,opt);
			var nowTime=new Date();
			var year=nowTime.getFullYear(),
				month=nowTime.getMonth(),
				showMonth=opts.showMonth;//
			var dateArr=[],ArrMonth;
			if(opts.type=="before"){
				month=month-showMonth+1;
				if(month<0){
					month=month+12;
					year--;
				}
			}
			//生成月份和天数;
			for(var m=0;m<showMonth;m++){
				dateArr[m]=[];
				ArrMonth=month+m;//当前月份
				for(var d=0;d<33;d++){
					var b=new Date();
					b.setFullYear(year,ArrMonth,d);
					dateArr[m].push({y:b.getFullYear(),m:(b.getMonth()+1),d:b.getDate(),z:b.getDay()});
					b=null;
				}
				d=null;
				//补位
				if(dateArr[m][0].z!=6){
					//第一项不是周日,补齐上月
					for(var q=dateArr[m][0].z;q>0;q--){
						dateArr[m].unshift({y:dateArr[m][0].y,m:dateArr[m][0].m,d:dateArr[m][0].d-1,z:q});
					}
				}else{
					//第一项是周日
					dateArr[m].shift();
				}

				var len=dateArr[m].length;
				//最后项是不是周日
				if(dateArr[m][(len-1)].z!=0){
					for(var q=1;q<(7-dateArr[m][(len-1)].z);q++){
						dateArr[m].push({y:dateArr[m][(len-1)].y,m:dateArr[m][(len-1)].m,d:dateArr[m][(len-1)].d+q,z:dateArr[m][(len-1)].z+q});
					}
				}else{
					dateArr[m].pop();
				}
			}
			m=null;
			console.log(dateArr);

			//生成html部分
			for(var i=0,l=dateArr.length;i<l;i++){
				var tableHtml="",weekHtml="",html="",reback=0;
				tableHtml="<table rel='"+dateArr[i][15].m+"' width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					"<tr class='tt'>"+
					"<th>日</th>"+
					"<th>一</th>"+
					"<th>二</th>"+
					"<th>三</th>"+
					"<th>四</th>"+
					"<th>五</th>"+
					"<th>六</th>"+
					"<tr class='fullYear'>"+
					"<th colspan='7'>"+dateArr[i][15].y+"年"+dateArr[i][15].m+"月"+"</th>"+
					"</tr>"+
					"</tr>";
				for(var t=0,tl=dateArr[i].length;t<tl;t++){
					html+="<td year='"+dateArr[i][t].y+"' mon='"+dateArr[i][t].m+"' day='"+dateArr[i][t].d+"' id='d_"+dateArr[i][t].y+"-"+dateArr[i][t].m+"-"+dateArr[i][t].d+"'><div>"+dateArr[i][t].d+"</div></td>";
					if((t+1)%7==0){
						html="<tr rel='"+dateArr[i][15].m+"'>"+html+"</tr>";
						weekHtml+=html;
						html="";
					}
				}
				tableHtml+=weekHtml;
				tableHtml+="</table>";
				$("#dateMobile").append(tableHtml);
			}
			$(opt.direct).find("td").each(function(){
				if($(this).attr("mon")==$(this).parent().attr("rel")){
					$(this).addClass("can");
				}
				$(this).click(function(){
					if($(this).attr("class")!=undefined&&$(this).attr("class")!=""){
						$(this).closest("#dateMobile").find("td").removeClass("on");
						$(this).addClass("on");
					}
				});
			});

			$("#d_"+nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+nowTime.getDate()).trigger("click");
		}
})(Zepto);