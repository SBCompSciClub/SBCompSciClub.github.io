
createdDownloadButton = false;
data = {};
function createAttendanceButton()
{
    createdDownloadButton = true;
    let navElement = document.getElementsByClassName('navbar-nav')[0];
    navElement.innerHTML+='<li class="nav-item"><a href="#" class="nav-link" id="downloadButton">Download</a></li>';
    document.getElementById("downloadButton").addEventListener("click", e => {
        
        let people = [];
        let content = "";
        
        for(let z in data)
        {
            let x = data[z]
            let blankCount = 0;
            for(y in x["attendance"])
                if(x["attendance"][y] === "")
                    blankCount++;
            if(x["requirements"] != undefined && x["attendance"] != undefined && Object.keys(x["attendance"]).length - blankCount >= 6  && ((x["requirements"]["ptp"]!=undefined && x["requirements"]["ptp"].indexOf("$25")!=-1) || (x["requirements"]["verifiedptp"]!=undefined && x["requirements"]["verifiedptp"].indexOf("$25")!=-1))  && x["requirements"]["dues"] != undefined && x["requirements"]["dues"].indexOf("$5") > -1)
                people.push([x.name.first, x.name.last]);
        }

        for(let i = 0; i < people.length; i++) {
            let m = i;
            for(let j = i+1; j< people.length; j++)
                if(people[j][1].localeCompare(people[m][1])<0)
                    m = j;

            let temp = people[i];
            people[i] = people[m];
            people[m] = temp;
        }
                
        for(let i=0; i<people.length;i++)
            content+=people[i][0]+" "+people[i][1]+", "
        content = content.substring(0, content.length-2);
        
        let blob = new Blob([content],{type: "text/plain;charset=utf-8"});
        saveAs(blob,"attedance.txt");
        console.log(content);
    });
}

firebase.database().ref("2017/members").on("value", snap => {
    data = snap.val();
});