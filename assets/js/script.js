/* Author: */
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("myForm");
  var ul = document.getElementById("taskList");
  var data = JSON.parse(localStorage.getItem("EnteredData")) || [];
  var updateIndex = null;

  renderTasks();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(form);

    var firstname = formData.get("firstname");
    var lastname = formData.get("lastname");
    var address = formData.get("address");
    var gender = formData.get("gender");

    var error = document.querySelector(".error");
    var firstMessage = document.querySelector(".firsterror");
    var lastMessage = document.querySelector(".lasterror");
    var addressMessage = document.querySelector(".addresserror");
    var genderMessage = document.querySelector(".gendererror");

    if (!firstname || !lastname || !address || !gender) {
      firstMessage.classList.add("active");
      lastMessage.classList.add("active");
      addressMessage.classList.add("active");
      genderMessage.classList.add("active");
      return;
    }

    firstMessage.classList.remove("active");
    lastMessage.classList.remove("active");
    addressMessage.classList.remove("active");
    genderMessage.classList.remove("active");

    var inputValue = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      gender: gender,
    };

    if (updateIndex !== null) {
      data[updateIndex] = inputValue;
      updateIndex = null;
    } else {
      data.push(inputValue);
    }

    localStorage.setItem("Entered Data", JSON.stringify(data));
    renderTasks();
    form.reset();
  });

  function renderTasks() {
    ul.innerHTML = "";

    data.forEach(function (task, index) {
      var li = document.createElement("li");
      li.innerHTML = `  
        <div class="row">
                  <span class="column">${index + 1}.</span>
                  <span class="column">${task.firstname}</span>
                  <span class="column">${task.lastname}</span>
                  <span class="column">${task.address}</span>
                  <span class="column">${task.gender}</span> 
                  <span class="column"><button type="button" class="btn" onclick="updateTask(${index})">Edit</button></span>  
                  <span class="column"><button type="button" class="btn" onclick="deleteTask(${index})">Delete</button></span> 
        </div>          
              `;
      ul.appendChild(li);
    });
  }

  function deleteTask(index) {
    var confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) {
      return;
    }

    var filteredData = data.filter(function (task, taskIndex) {
      return taskIndex !== index;
    });

    data = filteredData;
    localStorage.setItem("Entered Data", JSON.stringify(data));
    renderTasks();
  }

  function updateTask(index) {
    var taskToUpdate = data[index];
    document.getElementById("firstname").value = taskToUpdate.firstname;
    document.getElementById("lastname").value = taskToUpdate.lastname;
    document.getElementById("address").value = taskToUpdate.address;

    // Check radio button based on stored gender value
    var radios = document.getElementsByName("gender");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].value === taskToUpdate.gender) {
        radios[i].checked = true;
        break;
      }
    }

    updateIndex = index;
  }
});
