$('.card').click(function () {
  $(this).toggleClass('flipped');
});

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

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
        .replace(/ /gi, "-"),
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
      desired_skills: skillsArray.toString(),
      dev_team: []
    };

    $.post("/api/projects", newProject, function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    }).then(function(response) {
      console.log("updated project: " + response);
    });

    console.log(newProject);

    $.get("/api/devs").then(function(results) {
      // console.log("this is a list of all devs" + results);
    });

    window.location.reload();
  });

  $("#submitDevs").on("click", function(event) {
    event.preventDefault();

    var devArr = [];

    $("input[name='developers']:checked").each(function() {
      devArr.push(this.id);
    });

    // console.log(devArr)

    var projectName = $(".projectName").attr("id")
 

    var devs = devArr.toString()


    console.log(devs.split(',').join(', '));

    $("#devTeam").text(devs.split(',').join(', '))


    // var queryURL = "/api/projects/" + projectName
    // $.ajax({
    //   url: queryURL,
    //   method: "PUT",
    //   data: devs
    // }).then(function(response) {
    //   console.log("updated project (0=false 1=true): " + response);
    // });

    //updates the dev's projectId to be the id of the passed-in project, and returns a promise for the updated dev
    // db.dev.setProject();
  });

  // $("#addDevButton").on("click", function(event){
  //   var budget = $("#remainBudget").attr("value");
  //   console.log("Remaining budget: $"+ budget)

  //   var desiredSkills = $("#desiredSkills").attr("value");
  //   console.log("Desired skills: "+ desiredSkills)

  //   var devSkills = $("#devSkills").attr("value");
  //   console.log("dev skills include: " + devSkills)

  //   var devRate = parseInt($(".devRate").attr("value"))
  //   console.log("dev weekly rate: " + devRate)

  //   var timelineWeeks = $("#timeline").attr("value")
  //   var timelineNumber = parseInt(timelineWeeks.charAt(0))
  //   console.log("project timeline: " + timelineNumber)

  //   // if (devRate <= budget && desiredSkills)


  // })
});
