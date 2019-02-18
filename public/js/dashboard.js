$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // var state = "expanded";
  // //Check if navbar is expanded or minimized and handle
  // $("#navbar-toggle").click(function() {
  //   if (state === "expanded") {
  //     $(".sidebar").css("margin-left", "-100px");
  //     $("#content").css("width", "93vw")
  //     $("#content").css("transition", "width 0.3s")
  //     state = "minimized";
  //   } else {
  //     if (state === "minimized") {
  //       $(".sidebar").css("margin-left", "0px");
  //       $("#content").css("width", "87vw")
  //       $("#content").css("transition", "width 0.3s")
  //       state = "expanded";
  //     }
  //   }
  // });

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    name = data.email;
    return name;
  });

  $("#submitNewProject").on("click", function(event) {
    event.preventDefault();

    var skillsArray = [];

    $("input[name='skills']:checked").each(function() {
      skillsArray.push(this.id);
    });

    var newProject = {
      client_name: name,
      project_name: $("#projectTitleInput")
        .val()
        .trim(),
      project_description: $("#projectDescription")
        .val()
        .trim(),
      start_budget: $("#projectBudgetInput")
        .val()
        .trim(),
      remain_budget: $("#projectBudgetInput")
        .val()
        .trim(),
      project_length: $("#timelineInput")
        .find(":selected")
        .text(),
      desired_skills: skillsArray.toString()
    };

    $.post("/api/projects", newProject, function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    }).then(function(response) {
      console.log("created new project: " + response);
    });

    console.log(newProject);

    $.get("/api/devs").then(function(results) {
      // console.log("this is a list of all devs" + results);
    });

    window.location.reload();
  });

  $("#addDevs").on("click", function(event) {
    event.preventDefault();

    $.get("/api/devs").then(function(devs) {
      console.log(devs[0].dev_img);

      // for (var i = 0; i < devs.length; i++){

      //   var newDiv = $("<div>")
      //   var devImage = $("<img>").attr({ src: devs[i].dev_img});
      //   var newCheckbox = $('<input/>').attr({ type: 'checkbox', name:'devCheckboxes'})
      //   $("#devChoiceForm").prepend(devCheckbox)

      // };
    });
  });
});
