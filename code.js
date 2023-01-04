console.log("he");
//import {createModel} from "./function.js"

//store the all object of comment in the commentObjectArray
const storeArray = [[], [], [], [], []];


//create object of tasks
const createObject = (taskHeaderInputValue, taskDescriptionInputValue) =>{
    return {
        id : Math.random(),
        taskHeaderInputValue : taskHeaderInputValue,
        taskDescriptionInputValue : taskDescriptionInputValue,
    }
}

//------------------------------------------------------------------------------

//create modal 
function createModel(flag,eachTask){
    //console.log(flag);
    // if(flag===true){
    //     const idd =console.log(eachTask.id);
    //     const task = document.getElementById(idd);
    //     console.log(task);
    // }
    const modal=document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("id", "myModal");

    const modalContent=document.createElement("div");
    modalContent.classList.add("modal-content");

    const taskInput=document.createElement("div");
    taskInput.classList.add("task-input");

    const labelTaskHeaderInput=document.createElement("label");
    labelTaskHeaderInput.setAttribute("for", "task-header-input");
    labelTaskHeaderInput.innerText ="Enter The Task Heading";

    const taskHeaderInput=document.createElement("input");
    taskHeaderInput.classList.add("task-header-input");
    taskHeaderInput.setAttribute("id", "task-header-input");
    if(flag===true){
        taskHeaderInput.setAttribute("value", `${eachTask.taskHeaderInputValue}`);
    }

    //take task Description and label it 
    const labelTaskDescriptionInput=document.createElement("label");
    labelTaskHeaderInput.setAttribute("for", "task-description-input");
    labelTaskDescriptionInput.innerText = "Enter The Task Description";

    const taskDescriptionInput=document.createElement("textarea");
    taskDescriptionInput.classList.add("task-description-input");
    taskDescriptionInput.setAttribute("id", "task-description-input");
    if(flag===true){
        taskDescriptionInput.setAttribute("value", `${eachTask.taskDescriptionInputValue}`);
    }


    const saveCancelButtonWrapper=document.createElement("div");
    saveCancelButtonWrapper.classList.add("save-cancel-button-wrapper");

    //save button in the model
    const saveButton=document.createElement("button");
    saveButton.setAttribute("id", "save_button");
    saveButton.classList.add("button", "success", "add-button");
    saveButton.innerText ="Save";
    saveButton.addEventListener("click",() => {
        if(flag===true){
            eachTask.taskHeaderInputValue =taskHeaderInput.value;
            eachTask.taskDescriptionInputValue =labelTaskDescriptionInput.value;
        }else{
            // when input box is not empty call function create object.
            const newTaskObject = createObject(taskHeaderInput.value, taskDescriptionInput.value);
         
            //store all task object in the storeArray
            storeArray[taskAddIconId].push(newTaskObject);
            
            //play the audio
            const audio = new Audio("./sound/taskAdd.mp3");
            audio.play(); 
        } 
        i=1;
        fun();
    })

    //cancel button in the model
    const cancelButton=document.createElement("button");
    cancelButton.setAttribute("id", "cancel_button");
    cancelButton.classList.add("button", "delete");
    cancelButton.innerText ="Cancel";

        // When the user clicks on cancel button, close the modal
        cancelButton.addEventListener("click", () => {
            //console.log(taskHeaderInput.value);
            taskHeaderInput.value = "";
            taskDescriptionInput.value ="";
            modal.style.display = "none";
            //eachTask.classList.remove
        })


    //connect and append all the model element and button
    modal.appendChild(modalContent);

    modalContent.appendChild(taskInput);

    taskInput.appendChild(labelTaskHeaderInput);
    taskInput.appendChild(taskHeaderInput);
    taskInput.appendChild(labelTaskDescriptionInput);
    taskInput.appendChild(taskDescriptionInput);
    taskInput.appendChild(saveCancelButtonWrapper);
    
    saveCancelButtonWrapper.appendChild(saveButton);
    saveCancelButtonWrapper.appendChild(cancelButton);

    return modal;
}


//find the storeArray index for each click in taskbar
//-------------------------------------------------------------------------------------------
 function findIndex(taskBarId) {
    let index=0;
    if(taskBarId==="open"){
        index=1;
    }else if(taskBarId==="in-progress"){
        index=2;
    }else if(taskBarId==="in-review"){
        index=3;
    }else if(taskBarId==="done"){
        index=4;
    }

    return index;
}
//-------------------------------------------------------------------------------------------


//calculatHight of the task bar
//-------------------------------------------------------------------------------------------
function calculatHight(index) {
    //const tasks = document.querySelectorAll(".task");
    //const taskBarId = eachTaskBar.id;
    //const index = findIndex(taskBarId);
    let height = 0;
    storeArray[index].forEach((obj) => {
        const task = document.getElementById(obj.id);
        //console.log(task);
      height += task.offsetHeight;
    });
  return height;
}
//-------------------------------------------------------------------------------------------


//find the task object index in storeArray 
//-------------------------------------------------------------------------------------------
function findeTaskObjectIndex(index, eachTaskId){
    for(let ind=0;ind<storeArray[index].length;ind++){
        const findeId = storeArray[index][ind].id;

        if (eachTaskId === findeId) {
            return ind;  
        }
    }
}
//-------------------------------------------------------------------------------------------


//rander the each taskbar
//-------------------------------------------------------------------------------------------
let i=1,taskAddIconId = 0;
mainFunction = (eachTaskBar) =>{
    eachTaskBar.innerHTML ="";

    //create heder of each task bar
    const headerDiv=document.createElement("div");
    headerDiv.classList.add("header-div");
    
    const header=document.createElement("header");
    header.classList.add("header");
    if(i===1){
        header.innerText ="OPEN"
    }else if(i===2){
        header.innerText ="IN PROGRESS"
    }else if(i===3){
        header.innerText ="IN REVIEW"
    }else if(i===4){
        header.innerText ="DONE"
    }
    headerDiv.appendChild(header);
    eachTaskBar.appendChild(headerDiv);
 //---------------------------------------------------------------  
 
    //function call to create and coonect the modal
    const modal = createModel(false);
    eachTaskBar.appendChild(modal);


    //crate and append all task
  //---------------------------------------------------------------
    storeArray[i].forEach((eachTask) => {
        //crate all element in the new task
        const  taskBox= document.createElement("div");
        taskBox.classList.add("task");
        taskBox.setAttribute("id", eachTask.id);
        taskBox.setAttribute("draggable", "true");

        const  taskHeaderDiv= document.createElement("div");
        taskHeaderDiv.classList.add("task-header-div");

        const  taskHeader= document.createElement("header");
        taskHeader.classList.add("task-header");
        taskHeader.innerText = eachTask.taskHeaderInputValue;

        const bodyButtonWrapper = document.createElement("div");

        const  taskBody= document.createElement("div");
        taskBody.classList.add("task-body");

        const  description= document.createElement("p");
        description.classList.add("description");
        description.innerText = eachTask.taskDescriptionInputValue;

        const editDeleteButtonWrapper= document.createElement("div");
        editDeleteButtonWrapper.classList.add("edit-delete-button-wrapper");
    
        const  taskEdit= document.createElement("div");
        taskEdit.classList.add("task-edit");

        const  taskEditIcon= document.createElement("i");
        taskEditIcon.classList.add("fa-solid", "fa-pen-to-square", "task_edit_icon");
        //edit the task using the delete icon on the task
        taskEditIcon.addEventListener("click", () => {
            modal.style.display = "block";
            //taskBox.classList.remove("hidden");
            taskBox.classList.add("hidden");
            //eachTask.classList.add("hidden");
            
        });
    

        const  taskDelete= document.createElement("div");
        taskDelete.classList.add("task-delete");

        const  taskDeleteIcon= document.createElement("i");
        taskDeleteIcon.classList.add("fa-solid", "fa-trash", "task_delete_icon");

        //delete the task using the delete icon on the task
        taskDeleteIcon.addEventListener("click", () => {

            //finde the taskbar index in the storeArray
            const taskBarId = eachTaskBar.id;
            const index = findIndex(taskBarId);
            
            //delete the task from the taskbar array in store array and rander
            
            const ind = findeTaskObjectIndex(index, eachTask.id);
            storeArray[index].splice(ind, 1);

            const task = document.getElementById(eachTask.id);
            task.innerHTML = "";
            task.classList.remove("task");

            const audio = new Audio("./sound/taskDelete.mp3");
            audio.play();

            // i=1;
            // fun();
        })


        //hide and visabel
        //----------------------------------------------
        taskBody.style.display = "none";

        taskHeaderDiv.addEventListener("mouseover", () => {
            taskBody.style.display = "block";

            //calculate the all task hight sum when curser over the task
            //and increase the taskBar hight
            const taskBarId = eachTaskBar.id;
            const index = findIndex(taskBarId);
            let hight = calculatHight(index);
            if(hight > 370){
                let taskBarHight = hight + taskBody.offsetHeight;
                eachTaskBar.style.height = `${taskBarHight}px`;
            }
        });
        taskHeaderDiv.addEventListener("mouseout", () => {
            taskBody.style.display = "none";

            const taskBarId = eachTaskBar.id;
            const index = findIndex(taskBarId);
            let hight = calculatHight(index);
            if(hight < 370){

                let taskBarHight = 500; 
                eachTaskBar.style.height = `${taskBarHight}px`;
            }else if(hight > 370){
                let taskBarHight = eachTaskBar.offsetHeight - taskBody.offsetHeight;
                eachTaskBar.style.height = `${taskBarHight}px`;
            }
        });
        //----------------------------------------------
        
        //connect modal in the each taskBox
        const modal = createModel(true,eachTask);
        taskBox.appendChild(modal);

        //connect and append all the child each other
        taskBox.appendChild(taskHeaderDiv);
        taskBox.appendChild(taskBody);
        taskBox.appendChild(editDeleteButtonWrapper);

        taskHeaderDiv.appendChild(taskHeader);
        taskBody.appendChild(description);
 
        editDeleteButtonWrapper.appendChild(taskEdit);
        editDeleteButtonWrapper.appendChild(taskDelete);

        taskEdit.appendChild(taskEditIcon);
        taskDelete.appendChild(taskDeleteIcon);

        //check the id of add icon and add respectivly in the task bar
     //-------------------------------------------------------------------------------
        if(i===1){
            const open = document.getElementById("open");
            open.appendChild(taskBox);
        }else if(i===2){
            const inProgress = document.getElementById("in-progress");
            inProgress.appendChild(taskBox);
        }else if(i===3){
            const inReview = document.getElementById("in-review");
            inReview.appendChild(taskBox);
        }else if(i===4){
            const done = document.getElementById("done");
            done.appendChild(taskBox);
        }
    })
 //-----------------------------------------------------------------------------------


     //create  addIconBox and icon to add task and model show in screen
 //---------------------------------------------------------------------------      
    const  addIconBox= document.createElement("div");
    addIconBox.classList.add("add-icon-box");
    const  taskAddIcon= document.createElement("i");
    taskAddIcon.classList.add("fa-solid", "fa-thumbtack", "task_add_icon");
    taskAddIcon.setAttribute("id",`${i}`);
    i++;
 //--------------------------------------------------------------------------------




    // When the user clicks the button, open the modal 
    taskAddIcon.addEventListener("click", () =>{
        modal.style.display = "block";
        taskAddIconId = taskAddIcon.id;
       
    })
    

    //connect the iconbox and icon with main task bar
 //-------------------------------------------------------------------------------
    addIconBox.appendChild(taskAddIcon);
    eachTaskBar.appendChild(addIconBox);  
 //-------------------------------------------------------------------------------
 

 //increase hight of the bar
 //------------------------------
    const taskBarId = eachTaskBar.id;
    const index = findIndex(taskBarId);
    let height = calculatHight(index);
    if (height > 370) {
        //const open = document.querySelector("#open");
        const eachTaskBarHight = eachTaskBar.offsetHeight;
        const c = eachTaskBarHight + 70;
        eachTaskBar.style.height = `${c}px`;
    }
  //-------------------------------------------------------------------------------------------


    //drag and drop function
 //-------------------------------------------------------------------------------
    document.addEventListener("dragstart", (event) =>{
        // The dataTransfer.setData() method sets the data type and the value of the dragged data
        event.dataTransfer.setData("text/plain", event.target.id);

        // Change the opacity of the draggable element
        event.target.style.opacity = "0.4";

        
    })

    // Output some text when finished dragging the p element and reset the opacity
    document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "1";
    });


    //Events fired on the drop target

    // When the draggable div element enters the droptarget, change the DIVS's border style
    document.addEventListener("dragenter", function(event) {
        if ( event.target.className == "task-bar" ) {
            event.target.style.border = "3px dotted red";
        }
    });

    // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    // When the draggable p element leaves the droptarget, reset the DIVS's border style
    document.addEventListener("dragleave", function(event) {
        if ( event.target.className == "task-bar" ) {
            event.target.style.border = "";
        }
    });

    document.addEventListener("drop", function(event) {
        event.preventDefault();
        if ( event.target.className == "task-bar" ) {
          //document.getElementById("demo").style.color = "";
          event.target.style.border = "";
          const id = event.dataTransfer.getData('text/plain');
          event.target.appendChild(document.getElementById(id));

          
          const index = findIndex(event.target.id);

         //finde the task in store array after that splice it from taskbar
         // and connect it new taskbar by push it
         for(let indI=1; indI<storeArray.length; indI++){
            for(let indJ=0; indJ<storeArray[indI].length; indJ++){
                if(storeArray[indI][indJ].id ==id){
                    storeArray[index].push(storeArray[indI][indJ]);

                    storeArray[indI].splice(indJ, 1);

                    //i=1;
                    //fun();
                }
            }
         }
        }
    });
 //-------------------------------------------------------------------------------

}

function fun(){ 
    const taskBars = document.querySelectorAll(".task-bar");
    taskBars.forEach(mainFunction);
}

fun();