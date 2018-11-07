window.onload = function(){ 
	document.querySelector("#produce").onclick = produce;
	document.querySelector("#Award").onclick = Award;
	document.querySelector("#leave").onclick = leave;
}
//-----Global Variable-----//
let x=0,y=0,z=0;
//-------------------------//
function produce(){	//按下開始對獎時,產生一組亂數並且送到伺服端保存,並且顯示對獎功能
	//產生三組六位數亂數(偷懶寫法XD
	let rand1 = Math.floor(Math.random()*999999);
	let rand2 = Math.floor(Math.random()*999999);
	let rand3 = Math.floor(Math.random()*999999);
	while(rand1<100000||rand2<100000||rand3<100000){
		rand1 = Math.floor(Math.random()*999999);
		rand2 = Math.floor(Math.random()*999999);
		rand3 = Math.floor(Math.random()*999999);
	}
	//顯示產生的亂數,並且顯示兌獎功能
	document.querySelector("#number").innerText = rand1+","+rand2+","+rand3;
	document.querySelector("#taward").style.display = "block";
	//將亂數送至伺服端保存
	ajax_save_number(rand1,rand2,rand3);
}
function Award(){
	let the_number = new Array(),number_1 = new Array(),number_2 = new Array(),number_3 = new Array();
	ajax_get_number(function(result){
		if(result!=0){
			the_number = result.split(",");
		}
	});
	number_1 = the_number[0].split("");
	number_2 = the_number[1].split("");
	number_3 = the_number[2].split("");
	let input = document.getElementById("input").value;
	let Comparison = input.split("");
	if(Comparison.length != 6){
		alert("輸入的資料錯誤");
	}
	for(let i=5;i>-1;i--){
		if(Comparison[i] == number_1[i]){
			x++;
		}else{
			break;
		}
	}
	for(let i=5;i>-1;i--){
		if(Comparison[i] == number_2[i]){
			y++;
		}else{
			break;
		}
	}
	for(let i=5;i>-1;i--){
		if(Comparison[i] == number_3[i]){
			z++;
		}else{
			break;
		}
	}
	if(x==6||y==6||z==6){
		document.querySelector("#info").innerText = "恭喜獲得頭獎";
		x=0,y=0,z=0;
	}else if(x==5||y==5||z==5){
		document.querySelector("#info").innerText = "恭喜獲得二獎";
		x=0,y=0,z=0;
	}else if(x==4||y==4||z==4){
		document.querySelector("#info").innerText = "恭喜獲得三獎";
		x=0,y=0,z=0;
	}else if(x==3||y==3||z==3){
		document.querySelector("#info").innerText = "恭喜獲得四獎";
		x=0,y=0,z=0;
	}else{
		document.querySelector("#info").innerText = "未獲獎!請再接再厲!";
		x=0,y=0,z=0;
	}
	
}
function leave(){
	document.querySelector("#game").style.display="none";
	document.querySelector("#leaveinfo").innerText ="已經離開";
}
function ajax_save_number(rand1,rand2,rand3){
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET",`save.php?rand1=${rand1}&rand2=${rand2}&rand3=${rand3}`,true);
	xhttp.send();
}
function ajax_get_number(callback){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		callback(xhttp.responseText);
	};
	xhttp.open("GET",`take.php`,false);
	xhttp.send();
}