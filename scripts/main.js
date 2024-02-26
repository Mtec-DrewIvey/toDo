const listsContainer = document.querySelector("[data-lists]");
const listInput = document.querySelector("#newListInput");
const newListBtn = document.querySelector("#newListButton");
const deleteListBtn = document.querySelector("[data-delete-list-button]");
const toDoContainer = document.querySelector("[data-list-container]");
const listTitle = document.querySelector("[data-list-title]");
const todoItem = document.querySelector("[data-todo-items]");
const taskTemplate = document.getElementById("taskTemplate");
const ToDoInput = document.querySelector("[data-new-task-input]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
// Initialize array from local storageto store list objects. If no objects - start empty list.
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) ?? [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
// console.log(selectedListId);
lists.forEach((list) => (list.tasks = list.tasks || []));

listsContainer.addEventListener("click", (e) => {
	if (e.target.tagName.toLowerCase() === "li") {
		selectedListId = e.target.dataset.listId;
		saveAndRender();
	}
});

deleteListBtn.addEventListener("click", (e) => {
	// Create new lists --> as long as list.id does not equal the list we have currently selected --> put list item in new list.
	lists = lists.filter((list) => list.id !== selectedListId);
	selectedListId = null;

	// Re-render entire page - this will make sure
	saveAndRender();
});

// Function to save items to local storage
function saveToLocal() {
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
	localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

// Create function to save and render to save time calling both functions later
function saveAndRender() {
	saveToLocal();
	renderToDo();
}

//Add Event Listener to button for new List
newListBtn.addEventListener("click", function () {
	const newlistInput = listInput.value;
	if (newlistInput == null || newlistInput === "") {
		return;
	}
	const list = createList(newlistInput);

	listInput.value = null; // return input to null once finished
	lists.push(list);

	saveAndRender();
});

const removeCompleted = document.getElementById("removeComplete");
removeCompleted.addEventListener("click", function () {
	selectedList = lists.find((list) => list.id === selectedListId);
	selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
	saveAndRender();
});
/*
Create list with param of list name we typed in
Return object with random id & name
tasks is an empty array to be used for todo tasks for each list.
*/
function createList(name) {
	return {
		id: Date.now().toString(),
		name: name,
		tasks: [],
	};
}

function createToDo(name) {
	return {
		id: Date.now().toString(),
		name: name,
		complete: false,
	};
}

function renderToDo() {
	renderList();

	selectedList = lists.find((list) => list.id === selectedListId);
	if (selectedList == null) {
		toDoContainer.style.display = "none";
	} else {
		toDoContainer.style.display = ""; // default is display: block;
		const addToDoBtn = document.querySelector("#newToDo");
		listTitle.innerText = selectedList.name;
		clearElement(todoItem);
		renderTasks(selectedList);
		addToDoBtn.addEventListener("click", function () {
			const toDoName = ToDoInput.value;
			if (toDoName == null || toDoName === "") {
				return;
			}
			const task = createToDo(toDoName);

			ToDoInput.value = null; // return input to null once finished
			selectedList.tasks.push(task);
			saveAndRender();
		});
	}
}

function renderTasks(selectedList) {
	// const addToDoBtn = document.querySelector("#newToDo");
	selectedList.tasks.forEach((task) => {
		const taskElement = document.importNode(taskTemplate.content, true);
		const checkbox = taskElement.querySelector("input");
		const deleteTask = taskElement.querySelector("button");
		checkbox.id = task.id;
		checkbox.checked = task.complete;
		const label = taskElement.querySelector("label");
		label.htmlFor = task.id;
		label.append(task.name);
		todoItem.appendChild(taskElement);

		checkbox.addEventListener("click", function () {
			task.complete = checkbox.checked;
			saveAndRender();
		});

		deleteTask.addEventListener("click", function () {
			selectedList.tasks = selectedList.tasks.filter(
				(todo) => todo.id !== task.id
			);
			saveAndRender();
		});
	});
}

// Render Task List from array
function renderList() {
	clearElement(listsContainer);

	lists.forEach((list) => {
		const listElement = document.createElement("li");

		listElement.dataset.listId = list.id; // Set data attr on list so we can identify which list is active.
		listElement.classList.add("list-name");

		listElement.innerText = list.name;
		if (list.id === selectedListId) {
			listElement.classList.add("active-list");
		}
		listsContainer.appendChild(listElement);
	});
}

// removes any old elements and only adds new elements to page
function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

saveAndRender();
