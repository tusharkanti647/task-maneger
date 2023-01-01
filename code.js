console.log("he");




    //function create tusk
    
let i=1,taskAddIconId = 0;
mainFunction = (eachTaskBar) =>{

    //create model
    const modal=document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("id", "myModal");

    const modalContent=document.createElement("div");
    modalContent.classList.add("modal-content");

    const close=document.createElement("span");
    close.classList.add("close");
    close.innerText ="&times;";

    const taskInput=document.createElement("div");
    taskInput.classList.add("task-input");

    const labelTaskHeaderInput=document.createElement("label");
    labelTaskHeaderInput.setAttribute("for", "task-header-input");
    labelTaskHeaderInput.innerText ="Enter The Task Heading";

    const taskHeaderInput=document.createElement("input");
    taskHeaderInput.classList.add("task-header-input");
    taskHeaderInput.setAttribute("id", "task-header-input");

    const labelTaskDescriptionInput=document.createElement("label");
    labelTaskHeaderInput.setAttribute("for", "task-description-input");
    labelTaskDescriptionInput.innerText = "Enter The Task Description";

    const taskDescriptionInput=document.createElement("textarea");
    taskDescriptionInput.classList.add("task-description-input");
    taskDescriptionInput.setAttribute("id", "task-description-input");


    const saveCancelButtonWrapper=document.createElement("div");
    saveCancelButtonWrapper.classList.add("save-cancel-button-wrapper");

    const saveButton=document.createElement("button");
    saveButton.setAttribute("id", "save_button");
    saveButton.classList.add("button", "success", "add-button");
    saveButton.innerText ="Save";

    saveButton.addEventListener("click",)

    const cancelButton=document.createElement("button");
    cancelButton.setAttribute("id", "cancel_button");
    cancelButton.classList.add("button", "delete");
    cancelButton.innerText ="Cancel";

    modal.appendChild(modalContent);

    modalContent.appendChild(close);
    modalContent.appendChild(taskInput);

    taskInput.appendChild(labelTaskHeaderInput);
    taskInput.appendChild(taskHeaderInput);
    taskInput.appendChild(labelTaskDescriptionInput);
    taskInput.appendChild(taskDescriptionInput);
    taskInput.appendChild(saveCancelButtonWrapper);
    
    saveCancelButtonWrapper.appendChild(saveButton);
    saveCancelButtonWrapper.appendChild(cancelButton);

    eachTaskBar.appendChild(modal);
 //---------------------------------------------------------------


    //modal div inner html creat
    // modal.innerHTML =
    //     `<div class="modal-content">
           
    //       <span id="close" class="close">&times;</span>
          
         
    //       <div class="task-input">
    //         <label for="task-header-input">Enter The Task Heading</label>
    //         <div><input type="text" id="task-header-input" class="task-header-input" /></div>

    //         <label for="task-description-input">Enter The Task Description</label>
    //         <div><textarea class="task-description-input" id="task-description-input"  cols="30" rows="10"></textarea></div>

    //         <div class="save-cancel-button-wrapper">
    //             <button class="button success add-button" id="save_button">Save</button>
    //             <button class="button delete" id="cancel_button">Cancel</button>

    //         </div>
    //       </div>
    //     </div> `
 //------------------------------------------------------------------------------------------------------


    //crat and append all task
    const  taskBox= document.createElement("div");
    taskBox.classList.add("task");

    const  taskHeaderDiv= document.createElement("div");
    taskHeaderDiv.classList.add("task-header-div");

    const  taskHeader= document.createElement("header");
    taskHeader.classList.add("task-header");

    const  taskBody= document.createElement("div");
    taskBody.classList.add("task-body");

    const  description= document.createElement("p");
    description.classList.add("description");

    const editDeleteButtonWrapper= document.createElement("div");
    description.classList.add("edit-delete-button-wrapper");

    const  taskEdit= document.createElement("div");
    taskEdit.classList.add("task-edit");

    const  taskEditIcon= document.createElement("i");
    taskEditIcon.classList.add("fa-solid", "fa-pen-to-square", "task_edit_icon");
    

    const  taskDelete= document.createElement("div");
    taskDelete.classList.add("task-delete");

    const  taskDeleteIcon= document.createElement("i");
    taskDeleteIcon.classList.add("fa-solid", "fa-trash", "task_delete_icon");

    taskBox.appendChild(taskHeader);
    eachTaskBar.appendChild(taskBox);
 //-----------------------------------------------------------------------------------

 //---------------------------------------------------------------------------      
    //creat  addIconBox and icon
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
        taskAddIconId = (taskAddIcon.id);
    })
    
    // When the user clicks on <span> (x), close the modal
    close.addEventListener("click", () => {
        modal.style.display = "none";
    })
//-------------------------------------------------------------------------------

    //connect the iconbox and icon with main task bar
    addIconBox.appendChild(taskAddIcon);
    eachTaskBar.appendChild(addIconBox);  
}

 const taskBars = document.querySelectorAll(".task-bar");
 taskBars.forEach(mainFunction);


