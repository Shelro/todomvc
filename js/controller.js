window.onload = function() {
    var model = window.model;

    model.getData(function() {
        var data = model.data;
        if(data.HideComp) isHideComp = true;

        update();

        var addButton = document.getElementById("add");
        addButton.addEventListener("click", function() {
            var todo = document.getElementById("todo");
            var todo_time = document.getElementById("todo-time");

            data.descri = todo.value;
            data.time = todo_time.value;

            if (data.descri == '' || data.time == '') {
                console.warn('enter information is empty');
                return;
            }

            model.setData();

            data.todos.push({
                descri: data.descri,
                time: data.time,
                completed: false,
                priority: false
            });
            data.descri = '';
            data.time = '';
            todo.value = ''
            todo_time.value = '';
            isCompAll = false;
            update();
        });

        var expandButton = document.getElementById("expand");
        expandButton.addEventListener("click", expandList);

        var clearCompleted = document.querySelector('.clear-completed');
        clearCompleted.addEventListener('click', removeCompleted);

        var compAll = document.querySelector('.complete-all');
        compAll.addEventListener('click', updateStatusAll);

        var compAll = document.querySelector('.hide-complete');
        compAll.addEventListener('click', hideCompList);
    });
};

function update() {
    model.setData();
    var data = model.data;

    removeAllTodo();

    num = 0;
    data.todos.forEach(function(todo_thing, i) {
        createTODO(todo_thing.descri, todo_thing.time, i, todo_thing.completed, todo_thing.priority);
    });
    updateLeft();
    switchCompButton();
}

function removeTODO() {
    var data = model.data;
    var id = this.getAttribute("id");
    var index = parseInt(id);
    data.todos.splice(index, 1);
    update();
}

function updateStatus() {
    var data = model.data;
    var id = this.getAttribute("id");
    var index = parseInt(id);
    if (!isEditing) {
        data.todos.forEach(function(todo_thing, i) {
            if (i == index) {
                if (todo_thing.completed) todo_thing.completed = false;
                else todo_thing.completed = true;
            }
        });
        update();
    }
}

var temp_comp = [];

function updateStatusAll() {
    var data = model.data;
    if (!isEditing) {
        if (temp_comp.length == 0) {
          console.log("in");
            data.todos.forEach(function(todo_thing, i) {
                if (!todo_thing.completed) {
                    todo_thing.completed = true;
                    temp_comp.push(i);
                }
            });
            isCompAll = true;
        } else {
            data.todos.forEach(function(todo_thing, i) {
                for (var j = 0; j < temp_comp.length; j++) {
                    if (i == temp_comp[j]) {
                        todo_thing.completed = false;
                    }
                }
            });
            temp_comp = [];
            isCompAll = false;
        }
        update();
    }
}

function removeCompleted() {
    isCompAll = false;
    var t_comp = [];
    var data = model.data;
    data.todos.forEach(function(todo_thing, i) {
        if (todo_thing.completed) {
            t_comp.push(i);
        }
    });
    for (var j = t_comp.length - 1; j >= 0; j--) {
        data.todos.splice(t_comp[j], 1);
    }
    update();
}

function hideCompList(){
  var data = model.data;
  switchHideButton();
  if(isHideComp){
    data.HideComp = false;
    isHideComp = false;
  }
  else{
    data.HideComp = true;
    isHideComp = true;
  }
  update();
  switchHideButton();
}

function changePriority(){
  var data = model.data;
  var id = this.getAttribute("id");
  var index = parseInt(id);
  data.todos.forEach(function(todo_thing, i) {
      if (i == index) {
          if (todo_thing.priority) todo_thing.priority = false;
          else todo_thing.priority = true;
      }
  });
  update();
}
