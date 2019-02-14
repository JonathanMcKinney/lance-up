$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);

    $("#submitNewProject").on("click", function(event) {
      event.preventDefault();

      var skillsArray = [];

      $("input[name='skills']:checked").each(function() {
        skillsArray.push(this.id);
      });

      var newProject = {
        client_name: data.email,
        project_name: $("#projectTitleInput")
          .val()
          .trim(),
        project_description: $("#projectDescription")
          .val()
          .trim(),
        start_budget: $("#projectBudgetInput")
          .val()
          .trim(),
        project_length: $("#timelineInput")
          .find(":selected")
          .text(),
        desired_skills: skillsArray
      };

      // console.log(newProject)

      $.post("/api/projects").then(function(data) {
        console.log("created new project");
      });

      $.post("/api/devs").then(function(results){
        console.log("this is a list of all devs" + results);
      });

      console.log(newProject);
    });
  });
});
