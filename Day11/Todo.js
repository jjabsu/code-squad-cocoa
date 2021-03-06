class Model {

    isEmpty(input) {
        return input.replace(/ /g, '').length === 0;
    }

    checkEvent() {
        const target = this.parentNode;
        if (target.classList.contains('checked'))
            target.classList.remove("checked");
        else
            target.classList.add("checked");
    }

    deleteEvent() {
        const target = this.parentNode;
        target.remove();
    }
}
class View {

    createTodo(input) {
        const todo = document.createElement("div");
        todo.classList.add("todo");
        todo.append(input);
        return todo;
    }

    addCheckBox(target, event) {
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("change", event);
        target.append(checkbox);
    }

    addDeleteButton(target, event) {
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<img src=\"trashbin.png\" width=\"100%\"></img>";
        deleteButton.addEventListener("click", event);
        target.append(deleteButton);
    }
}
class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    input = document.querySelector("#input");
    add = document.querySelector("#add");
    list = document.querySelector("#list");

    init() {
        this.add.addEventListener("click", this.addToDo.bind(this));
        this.input.addEventListener("keypress", e => {
            if (e.keyCode === 13) {
                this.add.click();
            }
        });
    }

    addToDo() {
        if (this.model.isEmpty(this.input.value))
            return alert("입력칸이 비어있습니다!");
        const todo = this.view.createTodo(this.input.value);
        this.input.value = '';

        this.view.addCheckBox(todo, this.model.checkEvent);

        this.view.addDeleteButton(todo, this.model.deleteEvent);

        this.list.append(todo);
    }
}

const model = new Model();
const view = new View();
const test = new Controller(model, view);
test.init();