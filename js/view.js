//ADD ITEMS TO LIST
var num = 0;
const TODO_COMPLETED = 'completed';
var isEditing = false;
var isCompAll = false;
var isHideComp = false;

function createTODO(v, v_time, index, status, p) {
    var list = document.getElementById("list");
    var did = index.toString();
    var cid = index.toString() + "con";
    var pid = index.toString() + "p";

    if (isHideComp && status) return;

    var node = document.createElement('li');
    var nodePriority = document.createElement('input');
    var nodeEdit = document.createElement('button');
    var nodeContent = document.createElement('div');
    var nodeDelete = document.createElement('button');
    node.className = 'todo-item';
    nodeContent.innerHTML = "&nbsp;&nbsp;&nbsp;" + v + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + v_time + "&nbsp;&nbsp;&nbsp;";
    nodeContent.className = 'content';
    nodeContent.setAttribute("id", cid);
    nodeEdit.className = 'edit';
    nodeEdit.type = 'button';
    nodeDelete.type = 'button';
    nodeDelete.className = 'delete';
    nodeDelete.setAttribute("id", did);
    nodePriority.type = 'radio';
    nodePriority.setAttribute("id", pid);
    nodePriority.className = 'regular-radio';

    if (p) {
        nodePriority.checked = true;
        node.classList.add('priority');
    }

    if (status) {
        nodeContent.classList.add(TODO_COMPLETED);
        nodeEdit.disabled = true;
        nodePriority.disabled = true;
    }

    node.appendChild(nodePriority);
    node.appendChild(nodeEdit);
    node.appendChild(nodeContent);
    node.appendChild(nodeDelete);
    nodePriority.addEventListener('click', changePriority);
    nodeDelete.addEventListener('click', removeTODO);
    nodeEdit.addEventListener('click', function() {
        isEditing = true;
        nodeContent.innerHTML = "<input type='text' value='" + nodeContent.innerHTML + "' size='60' />";
        nodeEdit.disabled = true;
    });
    nodeContent.addEventListener('keyup', function(event) {
        if (event.keyCode == 13) {
            var temp = nodeContent.childNodes[0].value;
            nodeContent.innerHTML = temp;
            nodeEdit.disabled = false;
            isEditing = false;
        }
    })
    nodeContent.addEventListener('click', updateStatus);
    list.insertBefore(node, list.childNodes[0]);

    if (!status) num++;
}

function updateLeft() {
    var left = document.getElementById("active-left");
    left.innerHTML = num;
}

function removeAllTodo() {
    var list = document.getElementById("list");
    var children = list.childNodes;
    for (var j = children.length - 1; j >= 0; j--) {
        list.removeChild(children[j]);
    }
}

function expandList() {
    var list = document.getElementById("list");
    if (list.classList.contains("invisible")) {
        list.classList.remove("invisible");
    } else {
        list.classList.add("invisible");
    }
}

function switchCompButton() {
    var com_all = document.querySelector('.complete-all');
    if (isCompAll) {
        com_all.innerText = "Cancel";
    } else {
        com_all.innerText = "Complete All";
    }
}

function switchHideButton() {
    var hid_com = document.querySelector('.hide-complete');
    if (isHideComp) {
        hid_com.innerText = "Show Completed List";
    } else {
        hid_com.innerText = "Hide Completed List";
    }
}
