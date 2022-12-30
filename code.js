console.log("he");

    //model script
    const modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];


    //function create tusk
    
let i=1,taskAddIconId = 0;
mainFunction = (eachTaskBar) =>{

    //create model
    const modal=document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("id", "myModal");

    //modal div inner html creat
    modal.innerHTML =
        `<div class="modal-content">
           
          <span class="close">&times;</span>
          
         
          <div class="task-input">
            <label for="task-header-input">Enter The Task Heading</label>
            <div><input type="text" id="task-header-input" class="task-header-input" /></div>

            <label for="task-description-input">Enter The Task Description</label>
            <div><textarea class="task-description-input" id="task-description-input"  cols="30" rows="10"></textarea></div>

            <div class="save-cancel-button-wrapper">
                <button class="button success add-button" id="save_button">Save</button>
                <button class="button delete" id="cancel_button">Cancel</button>

            </div>
          </div>
        </div> `

eachTaskBar.appendChild(modal);
    
     
    //creat  addIconBox and icon
    const  addIconBox= document.createElement("div");
    addIconBox.classList.add("add-icon-box");
    const  taskAddIcon= document.createElement("i");
    taskAddIcon.classList.add("fa-solid", "fa-thumbtack", "task_add_icon");
    taskAddIcon.setAttribute("id",`${i}`);
    i++;

    // When the user clicks the button, open the modal 
    taskAddIcon.addEventListener("click", () =>{
        modal.style.display = "block";
        taskAddIconId = (taskAddIcon.id);
    })
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    //connect the iconbox and icon with main task bar
    addIconBox.appendChild(taskAddIcon);
    eachTaskBar.appendChild(addIconBox);





    //task add to the task bar by call the method onclick on the save button
    //

    //take save and cancel button from model
    const  saveButton= document.getElementById("save_button");
    const  cancelButton= document.getElementById("cancel_button");

    //on click the save button call the function createTask
    saveButton.addEventListener("click", () => {
        console.log(eachTaskBar.id);
        const  taskHeaderInput= document.getElementById("task-header-input");
        
            const  taskHeader= document.createElement("header");
            taskHeader.classList.add("task-header");
        
            console.log(taskHeaderInput.value);
            taskHeader.innerText = taskHeaderInput.value;

            const  taskbarFInd= document.getElementById("in-progress");
            taskbarFInd.appendChild(taskHeader);

            console.log("taskbarFInd");
        
        });
    //eachTaskBar.appendChild(cheildTask);

    //crat and append all task
    const  taskBox= document.createElement("task");
    taskBox.classList.add("task-header-div");

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

    
}

 const taskBars = document.querySelectorAll(".task-bar");
 taskBars.forEach(mainFunction);
//   console.log("again he");
//   console.log(tasks);

