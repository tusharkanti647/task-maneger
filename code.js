console.log("he");
// import {
//   get as getFromLocalStorage,
//   set as setInLocalStorage,
// } from "./function.js";
//import {createModel} from "./function.js"

//take task bar slect
const taskBars = document.querySelectorAll(".task-bar");

//sound div and icon slect;
const soundIconDiv = document.querySelector(".sound-icon-div");
const soundIcon = document.querySelector(".sound-icon");
const soundIconId = soundIcon.id;
console.log(soundIconId);

//show descrption modal costants
const descriptionModal = document.getElementById("descriptionModal");
const descriptionModalHeading = document.getElementById("description_heading");
const descriptionModalStatatus = document.getElementById(
  "description_statatus"
);
const taskModalDescription = document.getElementById("p_description");
const descriptionModalCloseButton = document.querySelector(".close");
//take model input
const modal = document.getElementById("myModal");
const taskStatusInput = document.getElementById("task-status-input");
const taskHeaderInput = document.getElementById("task-header-input");
const taskDescriptionInput = document.getElementById("task-description-input");

const cancelButton = document.getElementById("cancel_button");
const saveButton = document.getElementById("save_button");

const localStorageKey = "key";
const getFromLocalStorage = (key) => {
  let string = localStorage.getItem(key);

  if (!string) {
    return [[], [], [], [], []];
  }

  return JSON.parse(string);
};

const setInLocalStorage = (key, value) => {
  let string = JSON.stringify(value);

  localStorage.setItem(key, string);
};
const storeArray = getFromLocalStorage(localStorageKey);

//store the all object of comment in the commentObjectArray
//const storeArray = [[], [], [], [], []];

//sound on off
//-------------------------------------------------------------------------------------------
soundIcon.addEventListener("click", () => {
  if (soundIcon.id === "sound_icon_on") {
    soundIcon.src = "./icon/volume_off.png";
    soundIcon.id = "sound_icon_off";
  } else {
    soundIcon.src = "./icon/volume_on.png";
    soundIcon.id = "sound_icon_on";
  }
});

//create object of tasks
//-------------------------------------------------------------------------------------------
const createObject = (
  taskStatusValue,
  taskHeaderInputValue,
  taskDescriptionInputValue
) => {
  return {
    id: Math.random(),
    taskStatusValue: taskStatusValue,
    taskHeaderInputValue: taskHeaderInputValue,
    taskDescriptionInputValue: taskDescriptionInputValue,
  };
};
//------------------------------------------------------------------------------

//find the storeArray index for each click in taskbar
//-------------------------------------------------------------------------------------------
function findIndex(taskBarId) {
  let index = 0;
  if (taskBarId === "open") {
    index = 1;
  } else if (taskBarId === "in-progress") {
    index = 2;
  } else if (taskBarId === "in-review") {
    index = 3;
  } else if (taskBarId === "done") {
    index = 4;
  }

  return index;
}
//-------------------------------------------------------------------------------------------

//calculatHight of the task bar
//-------------------------------------------------------------------------------------------
function calculatHight(index) {
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
function findeTaskObjectIndex(index, eachTaskId) {
  for (let ind = 0; ind < storeArray[index].length; ind++) {
    const findeId = storeArray[index][ind].id;

    if (eachTaskId === findeId) {
      return ind;
    }
  }
}
//-------------------------------------------------------------------------------------------

//rander the each taskbar
//-------------------------------------------------------------------------------------------
let i = 1,
  taskAddIconId = 0;
mainFunction = (eachTaskBar) => {
  eachTaskBar.innerHTML = "";

  //create heder of each task bar
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("header-div");

  const header = document.createElement("header");
  header.classList.add("header");
  if (i === 1) {
    header.innerText = "OPEN";
  } else if (i === 2) {
    header.innerText = "IN PROGRESS";
  } else if (i === 3) {
    header.innerText = "IN REVIEW";
  } else if (i === 4) {
    header.innerText = "DONE";
  }
  headerDiv.appendChild(header);
  eachTaskBar.appendChild(headerDiv);
  //---------------------------------------------------------------

  //crate and append all task
  //---------------------------------------------------------------
  storeArray[i].forEach((eachTask) => {
    //crate all element in the new task
    const taskBox = document.createElement("div");
    taskBox.classList.add("task");
    taskBox.setAttribute("id", eachTask.id);
    taskBox.setAttribute("draggable", "true");

    const taskHeaderDiv = document.createElement("div");
    taskHeaderDiv.classList.add("task-header-div");

    const taskHeader = document.createElement("header");
    taskHeader.classList.add("task-header");
    taskHeader.innerText = eachTask.taskHeaderInputValue;

    const bodyButtonWrapper = document.createElement("div");

    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");

    const editDeleteButtonWrapper = document.createElement("div");
    editDeleteButtonWrapper.classList.add("edit-delete-button-wrapper");

    const taskEdit = document.createElement("div");
    taskEdit.classList.add("task-edit");

    const taskEditIcon = document.createElement("i");
    taskEditIcon.classList.add(
      "fa-solid",
      "fa-pen-to-square",
      "task_edit_icon"
    );
    //edit the task using the delete icon on the task
    taskEditIcon.addEventListener("click", () => {
      modal.style.display = "block";
      taskStatusInput.value = eachTask.taskStatusValue;
      taskHeaderInput.value = taskHeader.innerText;
      taskDescriptionInput.value = eachTask.taskDescriptionInputValue;
      console.log(eachTask.taskDescriptionInputValue);

      modal.setAttribute("data_each_askBar", `${eachTaskBar.id}`);
      modal.setAttribute("data_each_task", `${eachTask.id}`);
      modal.setAttribute("flag", "true");
    });

    const taskDelete = document.createElement("div");
    taskDelete.classList.add("task-delete");

    const taskDeleteIcon = document.createElement("i");
    taskDeleteIcon.classList.add("fa-solid", "fa-trash", "task_delete_icon");

    //delete the task using the delete icon on the task
    taskDeleteIcon.addEventListener("click", () => {
      //finde the taskbar index in the storeArray
      const taskBarId = eachTaskBar.id;
      const index = findIndex(taskBarId);

      //delete the task from the taskbar array in store array and rander

      const ind = findeTaskObjectIndex(index, eachTask.id);
      storeArray[index].splice(ind, 1);
      setInLocalStorage(localStorageKey, storeArray);

      const task = document.getElementById(eachTask.id);
      task.innerHTML = "";
      task.classList.remove("task");

      if (soundIcon.id === "sound_icon_on") {
        const audio = new Audio("./sound/taskDelete.mp3");
        audio.play();
      }
    });

    //descrption modal show
    //------------------------------------------------------------------------------
    taskHeaderDiv.addEventListener("click", () => {
      descriptionModal.style.display = "block";
      console.log(eachTask.taskDescriptionInputValue);

      //descrption modal inner taxt add
      //------------------------------------------------------------------------------
      descriptionModalHeading.innerText = eachTask.taskHeaderInputValue;
      descriptionModalStatatus.innerText = `Task Status :-  ${eachTask.taskStatusValue}`;
      taskModalDescription.innerText = eachTask.taskDescriptionInputValue;
    });

    //descrption modal close
    //-------------------------------------------------------------
    descriptionModalCloseButton.addEventListener("click", () => {
      descriptionModal.style.display = "none";
    });
    //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------

    // taskHeaderDiv.addEventListener("mouseover", () => {
    //   taskBody.style.display = "block";

    //   //calculate the all task hight sum when curser over the task
    //   //and increase the taskBar hight
    //   const taskBarId = eachTaskBar.id;
    //   const index = findIndex(taskBarId);
    //   let hight = calculatHight(index);
    //   if (hight > 370) {
    //     let taskBarHight = hight + taskBody.offsetHeight;
    //     eachTaskBar.style.height = `${taskBarHight}px`;
    //   }
    // });
    // taskHeaderDiv.addEventListener("mouseout", () => {
    //   taskBody.style.display = "none";

    //   const taskBarId = eachTaskBar.id;
    //   const index = findIndex(taskBarId);
    //   let hight = calculatHight(index);
    //   if (hight < 370) {
    //     let taskBarHight = 500;
    //     eachTaskBar.style.height = `${taskBarHight}px`;
    //   } else if (hight > 370) {
    //     let taskBarHight = eachTaskBar.offsetHeight - taskBody.offsetHeight;
    //     eachTaskBar.style.height = `${taskBarHight}px`;
    //   }
    // });
    //-----------------------------------------------------------------

    //connect and append all the child each other
    //-----------------------------------------------------
    taskBox.appendChild(taskHeaderDiv);
    taskBox.appendChild(taskBody);
    //taskBox.appendChild(taskStatus);
    taskBox.appendChild(editDeleteButtonWrapper);

    taskHeaderDiv.appendChild(taskHeader);
    //taskBody.appendChild(description);

    editDeleteButtonWrapper.appendChild(taskEdit);
    editDeleteButtonWrapper.appendChild(taskDelete);

    taskEdit.appendChild(taskEditIcon);
    taskDelete.appendChild(taskDeleteIcon);

    //check the id of add icon and add respectivly in the task bar
    //-------------------------------------------------------------------------------
    if (i === 1) {
      const open = document.getElementById("open");
      open.appendChild(taskBox);
    } else if (i === 2) {
      const inProgress = document.getElementById("in-progress");
      inProgress.appendChild(taskBox);
    } else if (i === 3) {
      const inReview = document.getElementById("in-review");
      inReview.appendChild(taskBox);
    } else if (i === 4) {
      const done = document.getElementById("done");
      done.appendChild(taskBox);
    }
  });
  //-----------------------------------------------------------------------------------

  //create  addIconBox and icon to add task and model show in screen
  //---------------------------------------------------------------------------
  const addIconBox = document.createElement("div");
  addIconBox.classList.add("add-icon-box");
  const taskAddIcon = document.createElement("i");
  taskAddIcon.classList.add("fa-solid", "fa-thumbtack", "task_add_icon");
  taskAddIcon.setAttribute("id", `${i}`);
  i++;
  //--------------------------------------------------------------------------------

  //const modal = document.getElementById("myModal");

  // When the user clicks the button, open the modal
  taskAddIcon.addEventListener("click", () => {
    modal.style.display = "block";
    taskAddIconId = taskAddIcon.id;

    //createModel2(taskAddIconId);
  });

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
  document.addEventListener("dragstart", (event) => {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("text/plain", event.target.id);

    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
  });

  // Output some text when finished dragging the p element and reset the opacity
  document.addEventListener("dragend", function (event) {
    event.target.style.opacity = "1";
  });

  //Events fired on the drop target

  // When the draggable div element enters the droptarget, change the DIVS's border style
  document.addEventListener("dragenter", function (event) {
    if (event.target.className == "task-bar") {
      event.target.style.border = "3px dotted red";
    }
  });

  // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
  document.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // When the draggable p element leaves the droptarget, reset the DIVS's border style
  document.addEventListener("dragleave", function (event) {
    if (event.target.className == "task-bar") {
      event.target.style.border = "";
    }
  });

  document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.className == "task-bar") {
      //document.getElementById("demo").style.color = "";
      event.target.style.border = "";
      const id = event.dataTransfer.getData("text/plain");
      event.target.removeChild(addIconBox);
      const dropTask = document.getElementById(id);
      event.target.appendChild(dropTask);
      event.target.appendChild(addIconBox);

      const index = findIndex(event.target.id);

      //finde the task in store array after that splice it from taskbar
      // and connect it new taskbar by push it
      for (let indI = 1; indI < storeArray.length; indI++) {
        for (let indJ = 0; indJ < storeArray[indI].length; indJ++) {
          if (storeArray[indI][indJ].id == id) {
            storeArray[indI][indJ].taskStatusValue = event.target.id;
            storeArray[index].push(storeArray[indI][indJ]);

            storeArray[indI].splice(indJ, 1);
            setInLocalStorage(localStorageKey, storeArray);
            return;
          }
        }
      }
    }
  });
  //-------------------------------------------------------------------------------
};
//-------------------------------------------------------------------------------
function fun() {
  taskBars.forEach(mainFunction);
}
//-------------------------------------------------------------------------------

// input modal creat;
//-------------------------------------------------------------------------------

// When the user clicks on cancel button, close the modal
cancelButton.addEventListener("click", () => {
  //console.log(taskHeaderInput.value);
  if (modal.getAttribute("flag") === "true") {
    const deachTaskBarId = modal.getAttribute("data_each_askBar");
    const dataEachTask = modal.getAttribute("data_each_task");
    modal.removeAttribute("data_each_askBar", `${deachTaskBarId}`);
    modal.removeAttribute("data_each_askBar", `${deachTaskBarId}`);
    modal.removeAttribute("flag", "true");
  }
  taskHeaderInput.value = "";
  taskDescriptionInput.value = "";
  modal.style.display = "none";
  //eachTask.classList.remove
});

//save the task and append it
saveButton.addEventListener("click", () => {
  if (modal.getAttribute("flag") === "true") {
    const deachTaskBarId = modal.getAttribute("data_each_askBar");
    const dataEachTask = modal.getAttribute("data_each_task");

    //finde object in storeArray
    const storeArrayIndex = findIndex(deachTaskBarId);
    const object = {};
    for (let ind = 0; ind < storeArray[storeArrayIndex].length; ind++) {
      if (storeArray[storeArrayIndex][ind].id == dataEachTask) {
        storeArray[storeArrayIndex][ind].taskHeaderInputValue =
          taskHeaderInput.value;
        storeArray[storeArrayIndex][ind].taskDescriptionInputValue =
          taskDescriptionInput.value;
        storeArray[storeArrayIndex][ind].taskStatusValue =
          taskStatusInput.value;

        //finde the storararry index
        const newStoreArrayIndex = findIndex(taskStatusInput.value);

        //store all task object in the storeArray
        storeArray[newStoreArrayIndex].push(storeArray[storeArrayIndex][ind]);

        //delit the object
        storeArray[storeArrayIndex].splice(ind,1);

        setInLocalStorage(localStorageKey, storeArray);
        break;
      }
    }

    modal.removeAttribute("data_each_askBar", `${deachTaskBarId}`);
    modal.removeAttribute("data_each_askBar", `${deachTaskBarId}`);
    modal.removeAttribute("flag", "true");
  } else {
    //creat new object
    const newTaskObject = createObject(
      taskStatusInput.value,
      taskHeaderInput.value,
      taskDescriptionInput.value
    );

    //finde the storararry index
    const storeArrayIndex = findIndex(taskStatusInput.value);

    //store all task object in the storeArray
    storeArray[storeArrayIndex].push(newTaskObject);
    setInLocalStorage(localStorageKey, storeArray);

    //play the audio
    if (soundIcon.id === "sound_icon_on") {
      const audio = new Audio("./sound/taskAdd.mp3");
      audio.play();
    }
  }

  //model againe hide
  modal.style.display = "none";
  taskHeaderInput.value = "";
  taskDescriptionInput.value = "";
  //}
  i = 1;
  fun();
});
//-------------------------------------------------------------------------------

fun();
