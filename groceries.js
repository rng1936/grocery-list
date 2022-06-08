const groArray = ["beef|1","jar of pickles|1","cucumber|1","banana|1","apple|1","eggs|1","lamb|1","lamb sauce|1","pork chops|1","chicken|1","broccoli|1","cauliflower|1","fish|1",
"frozen pizza|1","cereal|1","instant noodles|1","lettuce|1","cabbage|1","tomatoes|1","potatoes|1","turkey|1","lobster|1","milk|1"];
const ITEM = 0, QUANTITY = 1;
function initialize()
{
	list = document.getElementById("groceries");
	choices = document.getElementById("userchoices");
	addItemText = document.getElementById("additem");
	remItemText = document.getElementById("removeitem");
	moveItemText = document.getElementById("moveitem");
	changeQuanText = document.getElementById("changequant");
	
	addNewItem = document.getElementById("newitem"); // records the name of the new item.
	removeAnItem = document.getElementById("removenum"); // records the position of the item that user wants to remove.
	movePos = document.getElementById("itemLoc"); // records the position of the item that the user wants to move.
	itemChange = document.getElementById("itemnum"); // records the position of the item that the user wants to increase/decrease.
	changeAmount = document.getElementById("amount"); // records amount that the user wants to increase/decrease.
	
	firstMove = true; // will be used to determine whether the user wants to move another item.				
	position = -1; // position has to be defined, so I assigned it a value of -1 since positions of the array can't be negative.
	display();
}
function userInput(inputNum) // userAdd, userRemove and userMove shows the text boxes and button for the corresponding action and hides the choice buttons.
{
	if (inputNum == 1)
	{
		addItemText.style.display = "block";
	}
	if (inputNum == 2)
	{
		remItemText.style.display = "block";
	}
	if (inputNum == 3)
	{
		moveItemText.style.display = "block";
	}
	if (inputNum == 4)
	{
		changeQuanText.style.display = "block";
	}
	choices.style.display = "none";
}
function addItem() 
{
	var newItem = addNewItem.value.toLowerCase();
	var idxOfNew = checkInList(newItem); // uses parameter to find index of new item. If returned a value less than 0, item is not in the list.
	if (idxOfNew >= 0 || addNewItem.value == "") // if the text box is blank or the item is not in the list, it will return false.
	{
		addNewItem.value = "";
		return false;
	} else 
	{
		groArray.push(newItem + "|1");
		addNewItem.value = "";
		display();
	}
	choices.style.display = "block"; // redisplays the choice buttons and removes the text boxes/buttons for corresponding action.
	addItemText.style.display = "none"; // hides add item text box.
}
function removeItem()
{
	var itemPos = removeAnItem.value;
	if (itemPos < 1 || itemPos > groArray.length) // checks if item can be removed.
	{
		removeAnItem.value = 1;
		return false;
	} else
	{
		groArray.splice(itemPos - 1, 1) //removes item from the list
		removeAnItem.value = 1; // default value in text box is 1.
		display();
	}
	choices.style.display = "block"; 
	remItemText.style.display = "none";
}
function removeAll() {
	groArray.length = 0;
	display();
	choices.style.display = "block";
	remItemText.style.display = "none";
}
function moveItem(direction) 
{
	if (firstMove && (movePos.value == "" || movePos.value < 1)) // if the number inputted is invalid, it will return false.
	{
		return false;
	} else if (firstMove && movePos.value > 0) 
	{
		itemName = getItemData(groArray[movePos.value - 1], ITEM); // gets name of item the user chooses and then finds the position of the item.
		position = checkInList(itemName); 
		firstMove = false;
		movePos.value = ""; // clears the text box.
	}
	if (!firstMove && movePos.value < 0)
	{
		return false;
	} else if (movePos.value !== "" && movePos.value > 0) // if firstMove is false and text box is not empty, then that means the user wants to move another item.
	{
		itemName = getItemData(groArray[movePos.value - 1], ITEM);
		position = checkInList(itemName); 
		movePos.value = "";
	}
	if (direction == "up")
	{
		if (position == 0)
		{
			display();
		} else
		{
			groArray.splice(position - 1, 2, groArray[position], groArray[position - 1]); // uses splice to replace the order of grocery list.
			position = checkInList(itemName); // updates the position of item.
		}
	}
	if (direction == "down")
	{
		if (position >= groArray.length - 1) // if position is already last, nothing will happen.
		{
			display();
		} else
		{
			groArray.splice(position, 2, groArray[position + 1], groArray[position]);
			position = checkInList(itemName);
		}
	}
	display();					
}
function cancel(inputNum) // brings user back to choices in case they clicked on wrong action
{
	if (inputNum == 1)
	{
		addItemText.style.display = "none";
	}
	if (inputNum == 2)
	{
		remItemText.style.display = "none";
	}
	if (inputNum == 3)
	{
		moveItemText.style.display = "none";
		movePos.value = "";
	}
	if (inputNum == 4)
	{
		changeQuanText.style.display = "none";
	}
	choices.style.display = "block";
	firstMove = true;
	position = -1;
	display();
}
function chanQuant()
{
	var itemChoose = itemChange.value - 1; // records position of the item in the array.
	var itemAmountAdd = parseInt(changeAmount.value,10); // converts string into an integer.
	var itemAmount = parseInt(getItemData(groArray[itemChoose], QUANTITY),10); // converts default item amount from a string into an integer.
	itemAmount += itemAmountAdd;
	if (itemAmount + itemAmountAdd < 1) // if quantity is less than 0, item will be removed.
	{
		groArray.splice(itemChoose, 1);
	} else 
	{
		groArray.splice(itemChoose, 1, getItemData(groArray[itemChoose], ITEM) + "|" + itemAmount); // replaces the item with new item and altered quantity
	}
	itemChange.value = "";
	changeAmount.value = "";
	choices.style.display = "block";
	changeQuanText.style.display = "none";
	display();				
}
function getItemData(item, index)
{
	return item.split("|")[index];
}
function checkInList(item) // will check the grocery list and record the position of the item.
{
	var groArrayNames = []; // creates a new array with the names of the grocery.
	for (i = 0; i < groArray.length; i++)
	{
		groArrayNames.push(getItemData(groArray[i], ITEM));
	}
	var idxOfItem = groArrayNames.indexOf(item); 
	return idxOfItem;
}
function display()
{
	list.innerHTML = "";
	for (var i = 0; i < groArray.length; i++)
	{
		if (i == position) // used to highlight the item being moved
		{
			list.innerHTML += "<span class = 'highlight'>" + (i + 1) + ". " + getItemData(groArray[i], ITEM) + " (" + getItemData(groArray[i], QUANTITY) + ")" 
			+ "</span><br />";
		} else
		{
			list.innerHTML += (i + 1) + ". " + getItemData(groArray[i], ITEM) + " (" + getItemData(groArray[i], QUANTITY) + ")<br />";
		}
	}
}
