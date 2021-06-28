showtask();

let addinput = document.getElementById("addinput");
let addbtn = document.getElementById("addbtn");
let addinputval = addinput.value;

function addlist(){
    addinputval = addinput.value;

    if(addinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");

        if(webtask == null){
           Tasks =[];
        }

        else{
            Tasks = JSON.parse(webtask);
        }

        Tasks.push(addinputval);
        localStorage.setItem("localtask", JSON.stringify(Tasks));
        addinput.value = '';
    }
    
    showtask();
}


addbtn.addEventListener("click",function(){

   addlist();

})


addinput.addEventListener("keyup",function(event){

    if(event.which===13){

       addlist();
   }
})


function showtask(){
    let webtask = localStorage.getItem("localtask");

    if(webtask === null){
       Tasks = [];
    }
    else{
        Tasks = JSON.parse(webtask);
    }

    let html = '';
    let addedlist =document.getElementById("addedlist");
    Tasks.forEach((item,index) => {
                html += ` <tr >
                 <th scope="row">${index+1}</th>
                 <td>${item}</td>
                 <td><button type="button" onclick="edittask(${index})" class="btn btn-outline-warning">
                  Edit </button></td>
                 <td><button type="button" onclick= "deleteitem(${index})" class="btn btn-outline-danger">
                  Delete </button></td>
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
    let Tasks = JSON.parse(webtask);
    addinput.value = Tasks[index];

    addbtn.style.display = "none";
    savebtn.style.display = "block"; 
}


let savebtn = document.getElementById("savebtn");

savebtn.addEventListener("click",function(){
    let addbtn = document.getElementById("addbtn");
    let webtask = localStorage.getItem("localtask");
    let Tasks = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;
    Tasks[saveindex] = addinput.value;

    savebtn.style.display = "none";
    addbtn.style.display = "block";
    localStorage.setItem("localtask", JSON.stringify(Tasks));
    addinput.value = ''; 
    showtask();
})

function deleteitem(index){
    var result = confirm("Are you sure to delete?");
    if(result){
        let webtask = localStorage.getItem("localtask");
        let Tasks = JSON.parse(webtask);
        Tasks.splice(index, 1);
        localStorage.setItem("localtask",JSON.stringify(Tasks));
        showtask();
    }
    
}  

let deleteallbtn = document.getElementById("deleteallbtn");

deleteallbtn.addEventListener("click", function(){
    let result = confirm("Are you sure to delete?");
    if(result){

        let savebtn = document.getElementById("savebtn");
        let addbtn = document.getElementById("addbtn");
        let webtask = localStorage.getItem("localtask");
        let Tasks = JSON.parse(webtask);

        if(webtask == null){
            Tasks = [];
             }
        else{
            Tasks = JSON.parse(webtask);
              Tasks = [];
            }
        
        savebtn.style.display = "none";
        addbtn.style.display = "block";

        localStorage.setItem("localtask",JSON.stringify(Tasks));
        showtask();
        }
})

let searchtextbox = document.getElementById("searchtextbox");

const reduceFetch = (func,delay)=>{
    let timer;
    return function(args){
        let that = this;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            func(that,args);
        },delay)
    }

}


    

function dataFatch(field,args){
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
}

searchtextbox.addEventListener("input",reduceFetch(dataFatch,300));
