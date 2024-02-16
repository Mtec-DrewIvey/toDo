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

let lists = [
	{
		id: 1,
		name: "name",
	},
	{
		id: 2,
		name: "todo",
	},
];

// Render Task List from array
function render() {
	clearElement(listsContainer);

	lists.forEach((list) => {
		const listElement = document.createElement("li");
		const listSpan = document.createElement("span");
		const listTrashEl = document.createElement("i");

		listElement.dataset.listID = list.id; // Set data attr on list so we can identify which list is active.
		listElement.classList.add("list-name");
		listTrashEl.classList.add("fas", "fa-trash", "fa-sm");

		listsContainer.appendChild(listElement);
		listElement.appendChild(listSpan);
		listElement.appendChild(listTrashEl);

		listSpan.innerText = list.name;
	});
}

// removes any old elements and only adds new elements to page
function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

render();
