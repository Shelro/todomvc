window.model = {
    data: {
        todos: [
            // {descri:'', time:'', completed: false, priority:false}
        ],
        descri: '',
        time: '',
        HideComp: false
    },
    TOKEN: 'YI-todomvc',
    getData: function(callback) {
        var data = window.localStorage.getItem(model.TOKEN);
        if (data) model.data = JSON.parse(data);
        if (callback) callback();
    },
    setData: function(callback) {
        window.localStorage.setItem(model.TOKEN, JSON.stringify(model.data));
        if (callback) callback();
    },
    cleatDate: function() {
        window.localStorage.clear();
    }
}
