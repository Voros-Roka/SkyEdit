
import { mapping_render } from "./DataMappingRendering.js"

export function createList(container, id, data, map, itemname, itemvalid, itemnameenum, change_callback)
{
	return new Promise((resolve, reject) => {
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		let treecont = document.createElement("div");
		treecont.classList.add("list_tree_container");

		let tree = document.createElement("ul");
		tree.id = id + "list_tree";
		tree.setAttribute("role","tree");
		tree.classList.add("list_tree");
		tree.____items = [];
		tree.____current = 0;

		let item_array = data[map.map_to];
		let item_array_size = item_array.length;
		for(let i = 0; i < item_array_size; i++)
		{
			let idata = item_array[i];

			let li = document.createElement("li");

			let item = document.createElement("span");
			item.setAttribute("role","treeitem");
			item.setAttribute("aria-setsize",item_array_size);
			item.setAttribute("aria-posinset",i+1);
			item.classList.add("list_tree_item_" + i);
			item.classList.add("list_tree_item");
			item.addEventListener('click', onTreeListClick);
			item.addEventListener('keydown', onTreeListKeydown);
			item.addEventListener('focus', onTreeListFocus);
			item.addEventListener('blur', onTreeListBlur);
			item.____data = idata;
			item.____detail = undefined;
			item.____index = i;
			item.____tree = tree;
			item.____nameenum = itemnameenum;
			item.____name = itemname;
			item.____name_map = undefined;
			item.____valid = itemvalid;
			item.____valid_map = undefined;

			onTreeListChange(null,item);

			li.appendChild(item);
			tree.appendChild(li);

			tree.____items.push(item);
		}

		tree.addEventListener('focusin', onTreeListFocusIn);
		tree.addEventListener('mousedown', onTreeListFocusIn);
		tree.____content = document.createElement("div");
		tree.____content.id = id + "list_content";
		tree.____content.classList.add("list_detail_container");
		tree.____container = treecont;
		tree.____onChangeCallback = change_callback;
		updateTreeListFocus(tree.____items[tree.____current]);
		updateTreeListContent(tree.____items[tree.____current]);

		treecont.appendChild(tree);
		treecont.appendChild(tree.____content);
		resolve(treecont)
	});
}

function updateTreeListContent(item)
{
	let tree = item.____tree;
	if(item.____detail == undefined)
	{
		let cont = document.createElement("div");
		cont.classList.add("list_tree_detail");
		cont.setAttribute("tabindex",0);
		item.____detail = cont;
		mapping_render(cont, cont, item.____data, null, null, null, null, null, null, (element) => {onTreeListChange(element, item);});
	}

	tree.____content.replaceChildren(item.____detail);
}

function setTreeListFocusToTreeItem(item)
{
	item.focus();
	updateTreeListContent(item);
}

function setTreeListFocusToPreviousTreeitem(item)
{
	let items = item.____tree.____items;
	let current = item.____index - 1;

	if(current < 0)
	{
		current = items.length-1;
	}

	setTreeListFocusToTreeItem(items[current]);
}

function setTreeListFocusToNextTreeitem(item)
{
	let items = item.____tree.____items;
	let current = item.____index + 1;

	if(current > items.length-1)
	{
		current = 0;
	}

	setTreeListFocusToTreeItem(items[current]);
}

function setTreeListFocusToFirstTreeitem(item)
{
	let items = item.____tree.____items;
	setTreeListFocusToTreeItem(items[0]);
}

function setTreeListFocusToLastTreeitem(item)
{
	let items = item.____tree.____items;
	setTreeListFocusToTreeItem(items[items.length-1]);
}

function setTreeListFocusByFirstCharacter(item, char)
{
	let items = item.____tree.____items;
	char = char.toLowerCase();

	let start = item.____index + 1;
	if(start > items.length-1)
	{
		start = 0;
	}

	let index = -1;
	for (let i = start; i < items.length; i++)
	{
		ti = items[i];
		if(char == ti.textContent.trim()[0].toLowerCase())
		{
			index = i;
			break;
		}
	}

	if(index == -1)
	{
		for (let i = 0; i < start; i++)
		{
			ti = items[i];
			if(char == ti.textContent.trim()[0].toLowerCase())
			{
				index = i;
				break;
			}
		}
	}

	if(index > -1)
	{
		setTreeListFocusToTreeitem(items[index]);
	}
}

function updateTreeListFocus(item)
{
	if (item.____tree)
	{
		let items = item.____tree.____items;
		for(let i = 0; i < items.length; i++)
		{
			if(items[i] == item)
			{
				items[i].tabIndex = 0;
				items[i].classList.add("list_tree_enabled");
			}
			else
			{
				items[i].tabIndex = -1;
				items[i].classList.remove("list_tree_enabled");
			}
		}
	}
}

function onTreeListFocusIn(event)
{
	let tgt = event.target;

	updateTreeListFocus(tgt);
}

function onTreeListChange(element, item)
{
	let idata = item.____data;
	let isvalid = true;

	if(!element)
	{
		if(idata[item.____valid] != null && idata[item.____valid] != undefined)
		{
			isvalid = idata[item.____valid]?true:false;
		}
	}
	else
	{
		if(element.____map)
		{
			if(element.____map.map_to == item.____valid)
			{
				item.____valid_map = element.____map;
				if(element.checked != undefined)
				{
					isvalid = element.checked?true:false;
				}
				else
				{
					isvalid = element.value!=0?true:false;
				}
			}
			else
			{
				if(idata[item.____valid] != undefined && idata[item.____valid] != null)
				{
					isvalid = idata[item.____valid]?true:false;
				}
				if(item.____valid_map)
				{
					if(item.____valid_map.new_value != undefined)
					{
						isvalid = item.____valid_map.new_value?true:false;
					}
				}
			}
		}

		if(item.____tree.____onChangeCallback)
		{
			item.____tree.____onChangeCallback(element);
		}
	}

	item.replaceChildren();

	if(isvalid)
	{
		let value = idata[item.____name];
		if(element)
		{
			if(element.____map)
			{
				if(element.____map.map_to == item.____name)
				{
					value = element.value;
					item.____name_map = element.____map;
				}
				else
				{
					if(item.____name_map)
					{
						if(item.____name_map.new_value != undefined)
						{
							value = item.____name_map.new_value;
						}
					}
				}
			}
		}

		if(item.____nameenum)
		{
			let keys = Object.keys(item.____nameenum);
			item.append(keys[value]);
		}
		else
		{
			item.append(value);
		}
	}
	else
	{
		item.append("----------");
	}

}

function onTreeListFocus(event)
{
	let tgt = event.currentTarget;
	tgt.classList.add('list_tree_item_focus');
}

function onTreeListBlur(event)
{
	let tgt = event.currentTarget;
	tgt.classList.remove('list_tree_item_focus');
}

function onTreeListClick(event)
{
	let tgt = event.currentTarget;
	updateTreeListContent(tgt);
	setTreeListFocusToTreeItem(tgt);

	event.preventDefault();
	event.stopPropagation();
}

function onTreeListKeydown(event)
{
	let tgt = event.currentTarget;
	let flag = false;
	let key = event.key;

	function isPrintableCharacter(str)
	{
		return str.length === 1 && str.match(/\S/);
	}

	if (event.altKey || event.ctrlKey || event.metaKey)
	{
		return;
	}
	switch(key)
	{
		// NOTE: Return key is supported through the click event
		case ' ':
		{
			updateTreeListContent(tgt);
			flag = true;
		}
		break;

		case 'Up':
		case 'ArrowUp':
		{
			setTreeListFocusToPreviousTreeitem(tgt);
			flag = true;
		}
		break;

		case 'Down':
		case 'ArrowDown':
		{
			setTreeListFocusToNextTreeitem(tgt);
			flag = true;
		}
		break;

		case 'Home':
		{
			setTreeListFocusToFirstTreeitem(tgt);
			flag = true;
		}
		break;

		case 'End':
		{
			setTreeListFocusToLastTreeitem(tgt);
			flag = true;
		}
		break;

		default:
		{
			if (isPrintableCharacter(key))
			{
				setTreeListFocusByFirstCharacter(tgt, key);
			}
		}
		break;
	}

	if(flag) {
		event.stopPropagation();
		event.preventDefault();
	}
}