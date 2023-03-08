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
};

///////////////////////////////////

// collect and present the current date
$(document).ready(function() {
    // get the current date & format it
    let currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // display date
    $(".dateDisplay").html(currentDate);
});

///////////////////////////////////

// toggle item visibility
let setNotification = function() {
    $(".notify").hide();
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

        $(".notifyUser").text("Task successfully added!").css("color", "var(--primary)").show();

        setTimeout(setNotification, 1000);

    } else if (userText === "") {
        $("#blankFormModal").modal("toggle");
    }
});

///////////////////////////////////

// .val of textField dynamically generated in htmlEl
let createTaskEl = function(taskObj) {    
    //  <li> container to hold the user task
    let taskContainerEl = $("<li>").addClass("taskItem d-flex flex-row pb-2");

    // add an id to element
    taskContainerEl.attr("taskID", taskIdCounter);

    // delete this task btn
    let deleteBtn = $("<button>").addClass("deleteBtn btn pr-2 border-dark clickAnimation glassEffect delBtnStyle fa-solid fa-rectangle-xmark fa-lg");

    // inside create a <span> element that contains userText.val();
    let taskTextEl = $("<span>").text(taskObj.text).addClass("taskText border border-dark rounded col-10 clickAnimation glassEffect");

    // append taskTextEl to taskContainerEl
    taskContainerEl.append(deleteBtn, taskTextEl);

    $("#taskList").append(taskContainerEl);

    // set parameter for taskObj
    taskObj.id = taskIdCounter;

    // push into the array
    tasks.push(taskObj);

    // increase counter for the next element
    taskIdCounter++;

    // save to localStorage
    saveTasks();
};

///////////////////////////////////

// edit existing task
$("#taskList").on("click", "span", function() {

    let taskText = $(this).text().trim();

    let textInput = $("<textarea>").addClass("form-control listForm").val(taskText);
    $(this).replaceWith(textInput);

    textInput.trigger("focus");

    // debugger;
});

///////////////////////////////////

// after editing task recreate the span 
$("#taskList").on("blur", "textarea", function() {
    
    // collect tasks current value
    let taskText = $(this).val().trim();

    // collect the index of taskItem undergoing edit
    let index = $(this).closest(".taskItem").index();

    // the text of said index will be replaced by value of taskText 
    tasks[index].text = taskText;

    // recreate the span element for editedTask
    let editedTask = $("<span>").addClass("taskText border border-dark rounded col-10 clickAnimation glassEffect").text(taskText);

    // replace the textarea with the span containing editedTask
    $(this).replaceWith(editedTask);

    // if editedTask is working
    if(editedTask) {
        // notify user of success
        $("#listNotify").text("Task successfully edited!").css("color", "var(--primary)").show();
        setTimeout(setNotification, 1000);
    } else {
        // inform error
        $("#listNotify").text("Something went wrong!").css("color", "var(--secondary)").show();
        setTimeout(setNotification, 1000);
    }
    
    // save changes
    saveTasks();
});

///////////////////////////////////

let saveTasks = function() {
    // store the created task in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

///////////////////////////////////

let loadTasks = function() {
    // retrieve the task from localStorage 
    let savedItem = localStorage.getItem("tasks");

    if(!savedItem) {
        return false;
    } else {
        // what does the log say? (insert old meme)
        console.log("Those saved tasks? They've been found");
        savedItem = JSON.parse(savedItem);
    }

    // run createTaskEl for every item saved to localStorage
    for (let i = 0; i < savedItem.length; i++) {
        createTaskEl(savedItem[i]);
    }
};

///////////////////////////////////

$(document).on('click', '.deleteBtn', function(taskObj) {

    // find and delete html elemenet 
    let deleteEl = $(this).parent("li").remove().attr("taskID");

    // deletes the task from the array 
    tasks.splice(deleteEl, 1);

    // using setItem to set it again with new task arr
    localStorage.setItem('tasks', JSON.stringify(tasks));

    $("#listNotify").text("Task successfully removed!").css("color", "var(--secondary)").show();

    setTimeout(setNotification, 1000);
    
});

///////////////////////////////////

// Function - deleteAllBtn (connected to popup modal)
$(".deleteAllBtn").click(function(event) {
    event.preventDefault();
    
    // Clear the tasks array
    tasks = [];

    // clear the localStorage 
    localStorage.clear();

    // find and delete html elemenet 
    $("ul").html("");

    $(".notifyUser").text("All tasks successfully deleted!").css("color", "var(--secondary)").show();

    setTimeout(setNotification, 1000);
}); 

///////////////////////////////////

loadTasks();
