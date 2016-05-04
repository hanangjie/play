// JavaScript Document
var x=2,
	y=0,
	items=3,
	items_xy=[],
	a=function(){x++;},
	keyNum=39,
	time=100,
	aa=function(){};
$(function(){
	
	var html="";
	for(var i=0;i<20;i++){
		html+="<tr>";
		for(var j=0;j<20;j++){
			html+="<td id='td"+j+"_"+i+"'></td>";
		}
		html+="</tr>";
	}
	$("#she_c").html(html);
	
	$("#start").click(function(){
		$("#she_c").find("td").removeClass("on");
		$("#she_c").find("td").removeClass("food");
		for(var i=0;i<items;i++){
					$("#td"+(x-i)+"_"+y).addClass("on");
					items_xy[i]=[(x-i),y];
		}
		foot();
		aa=function(){
				setTimeout(function(){
					$("#td"+items_xy[items-1][0]+"_"+items_xy[items-1][1]).removeClass("on");
					a();
					if($("#td"+x+"_"+y).attr("class")=="food"){
						$("#td"+x+"_"+y).removeClass("food");
						items++;
						time--;
						foot();
					}else if($("#td"+x+"_"+y).attr("class")=="on"||x<0||x>19||y<0||y>19){
						confirm("游戏结束");
						aa=function(){};
						x=2;
						y=0;
						items=3;
						items_xy=[];
						a=function(){x++;};
						keyNum=39;
						time=100;
						return;
					}
					
					
					$("#td"+x+"_"+y).addClass("on");
					for(var t=(items-1);t>0;t--){
						items_xy[t]=[items_xy[(t-1)][0],items_xy[(t-1)][1]];
					}
					items_xy[0]=[x,y];
					aa();
			},time);
		};
		aa();
	});
	
	$(document).keydown(function(event){
				//left
					if(event.keyCode==37)
					{
						if(keyNum!=39){
							a=function(){
								x--;
							};
						}
						
						keyNum=37;
					}
				//right
					if(event.keyCode==39)
					{
						if(keyNum!=37){
							a=function(){
								x++;
							};
						}
						keyNum=39;
					}
				//up
					if(event.keyCode==38)
					{
						if(keyNum!=40){
							a=function(){
								y--;
							};
						}
						keyNum=38;
					}
				//down	
					if(event.keyCode==40)
					{
						if(keyNum!=38){
							a=function(){
								y++;
							};
						}
						keyNum=40;
						
					}
				});
	
});

function foot(){
	var foot_x=parseInt(Math.random()*20);
	var foot_y=parseInt(Math.random()*20);
	if($("#td"+(foot_x)+"_"+foot_y).attr("class")!="on"){
		$("#td"+(foot_x)+"_"+foot_y).addClass("food");
	}else{
		arguments.callee();
	}
}