const groArray = ["beef|1","jar of pickles|1","cucumber|1","banana|1","apple|1","eggs|1","lamb|1","lamb sauce|1","pork chops|1","chicken|1","broccoli|1","cauliflower|1","fish|1",
"frozen pizza|1","cereal|1","instant noodles|1","lettuce|1","cabbage|1","tomatoes|1","potatoes|1","turkey|1","lobster|1","milk|1"];
const ITEM = 0, QUANTITY = 1;
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
