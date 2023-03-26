document.getElementById("update").style.display = "none";
let showNotification = (msg,type)=>{
    let bgColor;
     switch(type){
      case "success"  : 
       bgColor = "green";
       break;
       case "error" : 
       bgColor  = "red";
       break;
       default : 
       bgColor = "#000";
       break;
     }
     Toastify({
      text: msg,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: bgColor,
      
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }

// get input Field
function getValueElement(fieldId){
   return document.getElementById(fieldId).value;
 }

let handleSubmit  = ()=>{
    event.preventDefault();

    let title = getValueElement("title");
     let location =  getValueElement("location") ;
       let discription = getValueElement("disc");
       
      title=title.trim();
      location=location.trim();
      discription=discription.trim();

    if(title.length<3){
        showNotification("please enter title correctly", "error")
        return;
    
       }  
       if(location.length < 3){
        showNotification("please enter location correctly", "error");
        return;
       }
       if(discription.length <10){
        showNotification("please enter discription correctly", "error");
        return;
       }

       let todo = {title,location,discription}
       todo.id = getrandomValue();
       todo.createdTime = new Date().getTime();
       todo.status = "active";

       const todos = JSON.parse(localStorage.getItem("todos")) || [];
       todos.push(todo);
       localStorage.setItem("todos",JSON.stringify(todos));

       showNotification("your todo is successfully added","success")
       showOutput();
      //  outputclear function
       clearInputField()

}

function getrandomValue(){
    // dlkfjsl
    return Math.random().toString(36).slice(2);
  }

  let showOutput = ()=>{
    clearOutput();
    let todos = JSON.parse(localStorage.getItem("todos"))||[]
    if(!todos.length){
        showNotification("you have no value in to do","error");
        showOurOutput("<h5>you have no value in the list</h5>");
        return
    
    }

    let tableStart = '<div class="table-responsive"><table class="table">'
    let tableEnd = '</table></div>'
    let tableHead = '<thead><tr> <th scope="col">#</th> <th scope="col">Title</th> <th scope="col">Location</th> <th scope="col">discription</th>  <th scope="col">Action</th></tr> </thead>'
     let tableBody = '';

     for(let i=0; i<todos.length ; i++){
        tableBody += `<tbody>
        <tr>
          <th scope="row">${i+1}</th>
          <td>${todos[i].title}</td>
          <td>${todos[i].location}</td>
          <td>${todos[i].discription}</td>
          <td><button class="btn btn-info btn-sm" data-value="${todos[i].id}" onclick="editEvent(event)">Edit</button><button class="btn btn-danger btn-sm ms-2" data-value="${todos[i].id}" onclick="deleteEvent(event)">delete</button></td>
          
        </tr> </tbody>`
     }

     let table = tableStart + tableHead + tableBody + tableEnd
     
     showOurOutput(table);
      
    

  }

  let clearOutput = ()=>{
    document.getElementById("output").innerHTML = "";
  }

  function showOurOutput(output){
    document.getElementById("output").innerHTML = output
  }

  let clearInputField  = ()=>{
    let empty ;
    setFieldValue("title", "") 
    setFieldValue("location","") 
    setFieldValue("disc","") 

  }


 let deleteEvent= (event)=>{
        let todoId = event.target.getAttribute("data-value");
        console.log("get todoID",todoId);

        const todos = JSON.parse(localStorage.getItem("todos"));
        console.log("get array from local storage",todos);

        let toDoAffterDelte = todos.filter((todo)=>{
            return todo.id !== todoId;
            
        })

        localStorage.setItem("todos",JSON.stringify(toDoAffterDelte));
        showNotification("your data is successfully deleted", "success");
        showOutput();


 }

 let editEvent = (event)=>{
  let todoId = event.target.getAttribute("data-value");
        console.log("get todoID",todoId);

        const todos = JSON.parse(localStorage.getItem("todos"));
        console.log("get array from local storage",todos);

        let findEdit = todos.find((todo)=>{
             return  todo.id === todoId
        })
        // return single object
        console.log("single object return by find",findEdit)

        const {title, location , discription} = findEdit
        setFieldValue("title",title);
        setFieldValue("location",location);
        setFieldValue("disc",discription);

        localStorage.setItem("editMaterial",JSON.stringify(findEdit));

        document.getElementById("add").style.display = "none";
        document.getElementById("update").style.display = "inline-block";
        
      }
      
      const handleEdit = ()=>{
        const todoEdit = JSON.parse(localStorage.getItem("editMaterial"));
        
        let updateTitle = getValueElement("title")
        let updateLocation = getValueElement("location")
        let updateDiscription = getValueElement("disc")
        
        const uptdatedTode = {...todoEdit , title:updateTitle, location:updateLocation , discription:updateDiscription}

        console.log(uptdatedTode)
        
        document.getElementById("update").style.display = "none";
        document.getElementById("add").style.display = "inline-block";
      }
      
//  set field value

let setFieldValue = (fieldValue,value)=>{
  return   document.getElementById(fieldValue).value = value;
}