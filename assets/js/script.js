let taskIdCounter = 0;
let tasks = [];

///////////////////////////////////
// When the textField submit button is clicked
$("#addTask").click(function(event) {
    event.preventDefault();

    // collect val from text area
    let userText = $("#userInput").val().trim();

    // if userText exists 
    if (userText) {

        // create an object
        let taskObj = {
            text: userText
        };

        // run html generation script
        createTaskEl(taskObj);
        
        // reset the form 
        userInput.value = "";
    } else if (userText === "") {
        window.alert("You need to type something down");
    }
});

// .val of textField dynamically generated in htmlEl
let createTaskEl = function(taskObj) {    
    //  <li> container to hold the user task
    let taskContainerEl = $("<ul>").addClass("taskItem d-flex flex-row");

    // instead of connecting to UL straight, create a li item wrapper and pass setAttribute into it
    // add an id to element
    // taskContainerEl.setAttribute("taskID", taskIdCounter);

    // delete this task btn
    let deleteBtn = $("<button>").addClass("deleteBtn btn btn-primary pr-2");

    // inside create a <span> element that contains userText.val();
    let taskTextEl = $("<span>").text(taskObj.text).addClass("taskText border");

    // append taskTextEl to taskContainerEl
    taskContainerEl.append(deleteBtn, taskTextEl);

    $("#taskList").append(taskContainerEl);

    // set parameter for taskObj
    taskObj.id = taskIdCounter;

    // push into the array
    tasks.push(taskObj);

    // increase counter for the next element
    taskIdCounter++;

};

///////////////////////////////////

// add event listener for the button 
$("#deleteBtn").each(function(createTaskEl) {

    // $(this).remove("<ul>");
    // let removeHTML = $(this).remove("<ul>");
    // delete task based on that ID

    // add a console.log to pickup the interaction
});
///////////////////////////////////

///////////////////////////////////

// Function - deleteAllBtn

// When this btn is clicked, delete all list items on the page. 

// Clear the tasks object