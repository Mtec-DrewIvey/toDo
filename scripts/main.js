/* 

Multiple Lists:

Allow users to create and manage multiple to-do lists.
Implement a user-friendly way to switch or view various lists, such as tabs or a dropdown menu.
Task Management:

Enable users to add, edit, and delete tasks within each list.
Implement drag-and-drop functionality for task reordering.
Provide a way to mark tasks as completed and clear completed tasks.
LocalStorage or Database Integration:

Store the to-do lists and tasks persistently using LocalStorage or integrate a backend database if possible.
This ensures data is not lost when the user refreshes the page or closes the browser.
User Authentication (Optional):

If you want to add an extra layer of functionality, consider implementing user authentication to allow multiple users to have their own sets of to-do lists.
Error Handling:

Implement error handling to gracefully handle situations like network errors, incorrect user inputs, or unexpected issues.

Performance Optimization:

Optimize your code and assets to improve loading times.
Use lazy loading for images and scripts.
Minify and compress your CSS and JavaScript files.
*/

const listsContainer = document.querySelector("[data-lists]");
const listInput = document.querySelector("#newListInput");
const newListBtn = document.querySelector("#newListButton");
const deleteListBtn = document.querySelector("[data-delete-list-button]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
// Initialize array from local storageto store list objects. If no objects - start empty list.
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) ?? [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

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
	renderList();
}

//Add Event Listener to button for new List
newListBtn.addEventListener("click", function () {
	let newlistInput = listInput.value;
	if (newlistInput == null || newlistInput === "") {
		return;
	}
	const list = createList(newlistInput);

	listInput.value = null; // return input to null once finished
	lists.push(list);

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

// Render Task List from array
function renderList() {
	clearElement(listsContainer);

	lists.forEach((list) => {
		const listElement = document.createElement("li");

		listElement.dataset.listId = list.id; // Set data attr on list so we can identify which list is active.
		listElement.classList.add("list-name");

		listElement.innerText = list.name;
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

renderList();
