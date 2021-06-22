showtask();
let addinput = document.getElementById("addinput");
let addbtn = document.getElementById("addbtn");

addbtn.addEventListener("click",function(){
    addinputval = addinput.value;
    if(addinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
        taskObj =[];
        }
        else{
        taskObj = JSON.parse(webtask);
        }
        taskObj.push(addinputval);
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addinput.value = '';
    }
    
    showtask();
})

function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask === null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedlist =document.getElementById("addedlist");
    taskObj.forEach((item,index) => {
                html += ` <tr >
                 <th scope="row">${index+1}</th>
                 <td>${item}</td>
                 <td><button type="button" onclick="edittask(${index})" class="text-primary">
                 <i class="fa fa-edit"
                 ></i> Edit </button></td>
                 <td><button type="button" onclick= "deleteitem(${index})" class="text-danger">
                 <i class="fa fa-trash"
                  ></i> Delete </button></td>
               </tr>`;

    });
    addedlist.innerHTML = html;

}

function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addbtn = document.getElementById("addbtn");
    let savebtn = document.getElementById("savebtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    addinput.value = taskObj[index];
    addbtn.style.display = "none";
    savebtn.style.display = "block"; 
}

let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click",function(){
    let addbtn = document.getElementById("addbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;
    taskObj[saveindex] = addinput.value;
    savebtn.style.display = "none";
    addbtn.style.display = "block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addinput.value = ''; 
    showtask();
})

function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showtask();
}

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savebtn = document.getElementById("savebtn");
    let addbtn = document.getElementById("addbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savebtn.style.display = "none";
    addbtn.style.display = "block";
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showtask();
})

let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input",function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){
            item.style.display = "table-row";
        }
        else{
            item.style.display = "none";
        }
    })

})