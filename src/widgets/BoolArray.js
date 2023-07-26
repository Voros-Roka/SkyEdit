import { createGroup } from "./Group.js"

export function createBoolArray(container, id, data, entry, change_callback)
{
	return new Promise((resolve, reject) => {

		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		let map = entry;
		let readonly = false;
		map.new_value = [];
		for(let i = 0; i < map.options.length; i++)
		{
			if(map.options[i].access)
			{
				if(map.options[i].access == "readonly")
				{
					readonly = true;
				}
			}
		}

		let [gelement, gcontainer] = createGroup(container,id + "_bool_array_group",map.name);

		for(let i = 0; i < entry.size;i++)
		{
			let label = document.createElement("label");
			label.id = id + "_bool_array_label_" + i;
			label.classList.add("bool_label_" + i);
			label.classList.add("bool_label");

			let input_container = document.createElement("span");
			input_container.classList.add("bool_input_container");

			let input = document.createElement("input");
			input.id = id + "bool_array_input_" + i;
			input.setAttribute("type","checkbox");
			input.setAttribute("value",map.map_to + "_" + i);
			if(readonly)
			{
				input.setAttribute("readonly","readonly");
				//input.setAttribute("disabled","disabled");
			}
			input.classList.add("bool_input_" + i);
			input.classList.add("bool_input");
			input.____map = map;
			input.____data = data;
			input.____changeCallback = change_callback;
			input.____update = resetBoolArray;
			input.____index = i;
			input.addEventListener("change", onBoolArrayChange);


			let reset = document.createElement("button");
			reset.classList.add("button");
			reset.classList.add("value_reset");
			reset.setAttribute("tabindex","-1");
			reset.setAttribute("hidden","hidden");
			reset.classList.add("bool_reset_hidden");
			reset.setAttribute("type","button");
			reset.addEventListener("click", onBoolArrayResetClick);
			reset.append("⟳");
			reset.____input = input;

			input.____reset = reset;
			resetBoolArray(input);

			let text = document.createElement("span");
			text.classList.add("bool_text");
			text.classList.add("label_text");

			if(entry.value_names)
			{
				if(Array.isArray(entry.value_names))
				{
					text.append(entry.value_names[i] + ":");
				}
				else if(typeof entry.value_names == "object")
				{
					let keys = Object.keys(entry.value_names);
					text.append(keys[i] + ":");
				}
				else
				{
					text.append(i + ":");
				}
			}
			else
			{
				text.append(i + ":");
			}


			input_container.appendChild(input);

			label.appendChild(text);
			label.appendChild(input_container);
			label.appendChild(reset);
			gcontainer.appendChild(label);
		}

		resolve(gelement);
	});
}

function resetBoolArray(input)
{
	let map = input.____map;
	let data = input.____data;

	if(data[map.map_to][input.____index] == true)
	{
		input.setAttribute("checked","checked");
		input.checked = true;
	}
	else
	{
		input.removeAttribute("checked");
		input.checked = false;
	}

	map.new_value[input.____index] = undefined;
	input.____reset.setAttribute("hidden","hidden");
	input.____reset.classList.add("bool_reset_hidden");

	if(input.____changeCallback)
	{
		input.____changeCallback(input);
	}
}

function onBoolArrayResetClick(event)
{
	let tgt = event.currentTarget;
	resetBoolArray(tgt.____input);
}

function onBoolArrayChange(event)
{
	let tgt = event.currentTarget;
	let map = tgt.____map;
	let data = tgt.____data;

	let value = tgt.checked?true:false;
	if(value != data[map.map_to][tgt.____index])
	{
		tgt.____reset.removeAttribute("hidden");
		tgt.____reset.classList.remove("bool_reset_hidden");
		map.new_value[tgt.____index] = value;
	}
	else
	{
		tgt.____reset.setAttribute("hidden","hidden");
		tgt.____reset.classList.add("bool_reset_hidden");
		map.new_value[tgt.____index] = undefined;
	}

	if(tgt.____changeCallback)
	{
		tgt.____changeCallback(tgt);
	}
}
