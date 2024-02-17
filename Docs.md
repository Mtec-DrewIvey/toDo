<!-- Documentation For Javascript -->

Let's go through different parts of the javascript and document what it is doing. This will make it easier for me to go back and see what I've done as well as help anyone else follow the logic.

---

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/

```
const listsContainer = document.querySelector("[data-lists]");
const listInput = document.querySelector("#newListInput");
const newListBtn = document.querySelector("#newListButton");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
```

- Grab the ul element from the DOM so we can append children li elements in a later function.
- initialize storage list key called task.lists. This is the key for the local storage. a unique namespace will help it not be overridden.
- Lists will look at local storage for saved key/values and get those items. If it doesn't exist, we will initalize an empty array.

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/

---

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/

```
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
```

- Render Function:
  - First, call the clearElement function on the existing elements in the listsContainer
  - Next, we need to loop through each object in the list array and do a few things:
    - create 3 elements:
      1. <li></li> to hold each list item
      2. <span></span> to contain the 'text' of the list item
      3. <i></i> to grab a trash icon to use for deleting the list later.
    - Next, we need to use .dataset on the list element to hold the id of said list item. This is important for later when we need to delete/edit lists
    - After, we need to add classes to the li and i tags. May also go back and add styling to span tag.
    - Now, lets use appendChild to get these sent to the DOM.
    - Lastly, using the list array we are going to grab the name value and show that to the user using .innerText

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/

---

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/

```
// removes any old elements and only adds new elements to page
function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}
```

- clearElement function:
  - Takes an element as param and clears any children currently in said element. This is used to make sure I am only displaying new lists that we store in our list array.
  - This is called within our render() function to make sure we remove existing elems before pushing lists to user.

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/

---

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/

```
function saveToLocal() {
localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

// Create function to save and render to save time calling both functions later
function saveAndRender() {
saveToLocal();
renderList();
}
```

- saveToLocal function simply stores the objects we pushed to the list array using the click eventlistener.
- saveAndRender function calls saveToLocal() and renderList() functions. This should save us time calling both in the future.

/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/---/
