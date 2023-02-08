let taskIdCounter = 0;
let tasks = [];

///////////////////////////////////
// initializes when body is loaded 
let timeInit = function() {
    // get the current local time
    let currentTime = new Date().toLocaleTimeString();

    // timeDisplay previews currentTime data
    $(".timeDisplay").html(currentTime);

    // update every second
    setTimeout(timeInit, 1000);
}

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

    // add an id to element
    taskContainerEl.attr("taskID", taskIdCounter);

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

    // check to see if taskObj displays correctly in the array
    console.log(tasks);
};

///////////////////////////////////

$(document).on('click', '.deleteBtn', function(taskObj) {

    // find and delete html elemenet 
    let deleteEl = $(this).parent("ul").remove().attr("taskID");

    tasks.splice(deleteEl, 1);
    
    // currently only the HTML is being removed onclick, need to think of a way that deletes the ID from the array next.
    // console.log(tasks);
    
    // new array to hold the updated list
    // let newTaskArr = [];

    // for (let i = 0; i < tasks.length; i++) {

    //     if (tasks[i].id !== parseInt("taskID")) {
    //         newTaskArr.push(tasks[i]);
    //     }
    // }

    // // connect the global arr to new arr 
    // tasks = newTaskArr;

    console.log(tasks);
})

///////////////////////////////////

///////////////////////////////////

// Function - deleteAllBtn
$("#delAllTasks").click(function(event) {
    // Clear the tasks array
    tasks = [];

    // alert user
    window.alert("All tasks have been deleted!");
})  
///////////////////////////////////