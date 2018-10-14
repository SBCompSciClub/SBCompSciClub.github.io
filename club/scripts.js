let looper = null;
let logger = [];
let p = null;
let target = "";
let frame = null;
let k = false;

function activateScripts(state){

	switch(state){
		case 'home':
			p = document.getElementsByClassName("display-3")[0]
			if(p !== undefined){
				p.onmouseup = (event)=>{mk.rickroll()};
			}
			break;
		case 'beginner':
			target = "38,38,40,40,37,39,37,39,66,65,32";
			window.onkeyup = (event)=>{
				let key = event.which || event.charCode;
				logger.push(key);
			}
			looper = setInterval( ()=>{
				if(logger.join().indexOf(target) >= 0){
					alert("Were you expecting some kind of reward for this?");
					logger = [];
				}
			}, 1000/30);
			break;
		case 'advanced':
			p = document.getElementsByClassName("display-3")[0];
			if(p !== undefined){

				p.onmouseenter = (event)=>{
					p.style.fontSize = "14px";
					let color = `hsl(${Math.floor(Math.random()*360)}, 70%, 70%)`;
					p.style.color = color;
					let text = "Advanced Portal";
					if(Math.random() < 0.05){
						text = "iOS is better";
					}
					mk.rewrite(p, mk.asciiArt(text, "#"));
				}
				p.onmouseleave = (event)=>{
					p.style.fontSize = "";
					p.style.color = "";
					mk.rewrite(p, "Advanced Portal");
				}

			}
			break;
		case 'about':
	setTimeout( ()=>{
			let p = document.querySelector(".lead");
			let sp;
			if(p !== undefined){
				p.innerHTML = p.innerHTML.replace("Rishav Bhagat", "<span id='abcdefg'>Rishav Bhagat</span>");
				sp = document.querySelector("#abcdefg");
				sp.onmouseenter = (event)=>{
					sp.innerHTML = mk.getMeme();
				}
				sp.onmouseleave = (event)=>{
					sp.innerHTML = "Rishav Bhagat";
				}
			}
	}, 100);
			break;
		case 'calendar':
			let dates = document.querySelectorAll("li:not(.nav-item)");
			if(dates[0] !== undefined && k === false){
				k = true;
				document.querySelector("[draggable='true']").ondragstart = (event)=>{
					dates.forEach( (e)=>{
						mk.messWithElement(e, Math.floor(Math.random()*5000)+5000);
					});
				}
			}
			break;
		case 'signup':
	setTimeout( ()=>{
			frame = document.querySelector("form");
			if(frame !== undefined){
				target = "EASTER EGG";
				window.onkeydown = (event)=>{
					let key = String.fromCharCode(event.which || event.charCode);
					logger.push(key);
				}
				looper = setInterval( ()=>{
					if(logger.join("").indexOf(target) >= 0){
						mk.animateColor(frame, "backgroundColor", [20, 120, 20], [200, 210, 255], 100, 30);
						mk.animateBox(frame, 300, 800, 300, 1000, 100, 20);
						logger = [];
					}
				}, 1000/30);
			}
	}, 100);
			break;
		default:
			break;
	}

}
