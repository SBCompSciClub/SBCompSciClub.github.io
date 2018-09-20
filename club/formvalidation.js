function setFormValidation(){
console.log("form validation set");
let f = document.querySelector("form");

if(f !== undefined){
	console.log(state, "hi");
    let radioCheck = (theRadio,saveVal) => {
		for (let i = 0, length = theRadio.length; i < length; i++) {
			if (radios[i].checked) {
				saveVal = radios[i].value;
				break;
			}
		}
	};
console.log(document.querySelector("form"));
let submit = () => {
	alert('submit function has been triggered');
	let gradeRadio = document.getElementsByName('grade'),
	theGrade, //Grade vale (returned as 'freshmen' etc.)
	sectionRadio = document.getElementsByName('section'),
	theSection, //Section value (returned as 'beginner' or 'advanced')
      firstName = document.getElementById('first-name').value, // First name as string
      lastName = document.getElementById('last-name').value,// Last name as string
      theEmail = document.getElementById('email').value, //Email as string
      theId = document.getElementById('id-num').value; //Id as int
      if (theId.length == 8){
         radioCheck(gradeRadio,theGrade);
         radioCheck(sectionRadio,theSection);
     //FIREBASE CODE SHOULD BE HERE


      }else{
          alert('Not valid SBHS ID number')
      }
 };
 f.onsubmit = (event)=>{
     submit();
}
}
}
