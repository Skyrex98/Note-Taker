$(document).ready(function () {
  getAllNotes();
});

$("body").delegate("#save_notes", "click", function () {
  var description = $("#description").val();
  var title = $("#title").val();
  if (title == "" || description == "") {
    return;
  } else {
    createNewNote(title, description);
  }
});

$("body").delegate(".delete-note", "click", function () {
  var id = $(this).attr("data-id");
  if (id !== "" || id !== undefined || id !== null) {
    deleteNote(id);
  }
});

$("body").delegate(".edit-note", "click", function () {
  var title = $(this).attr("data-title");
  var description = $(this).attr("data-description");
  $("#title").val(title);
  $("#description").val(description);
});

function deleteNote(id) {
  $.ajax({
    type: "POST",
    url: `http://localhost:5000/api/notes/delete-note`,
    dataType: "json",
    data: { id: id },
    success: function (data) {
      if (data.success) {
        $("#description").val("");
        $("#title").val("");
        getAllNotes();
      }
    },
  });
}
function createNewNote(title, description) {
  $.ajax({
    type: "POST",
    url: `http://localhost:5000/api/notes/post-note`,
    dataType: "json",
    data: { title: title, description: description },
    success: function (data) {
      if (data.success) {
        $("#description").val("");
        $("#title").val("");
        getAllNotes();
      }
    },
  });
}
function getAllNotes() {
  $.ajax({
    type: "GET",
    url: `http://localhost:5000/api/notes/getAll`,
    dataType: "json",
    success: function (data) {
      $("#save_notes").show();
      $("#update_notes").hide();
      $("#description").val("");
      $("#title").val("");
      console.log(data.data);
      var htmlToShow = ``;
      data.data.forEach((element) => {
        htmlToShow += `<div class="single-output mt-1">
          <p class="edit-note" data-title="${element.title}" data-description="${element.description}" data-id="${element.id}">
            <span id="single-output-title edit-note" >${element.title}</span>
            <span class="float-right mr-1 text-danger delete-note" data-id="${element.id}" >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </span>
          </p>
        </div>`;
      });

      $(".output").html("");
      $(".output").html(htmlToShow);
    },
  });
}
