
export function createBool(container, id, data, entry, change_callback)
{
	return new Promise((resolve, reject) => {
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		let map = entry;
		let readonly = false;

		map.new_value = undefined;
		map.new_value = undefined;
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

		let label = document.createElement("label");
		label.id = id;
		label.classList.add("bool_label");

		let input_container = document.createElement("span");
		input_container.classList.add("bool_input_container");

		let input = document.createElement("input");
		input.id = id + "_bool_input";
		input.setAttribute("type","checkbox");
		input.setAttribute("value",map.map_to);
		if(readonly)
		{
			input.setAttribute("readonly","readonly");
			//input.setAttribute("disabled","disabled");
		}
		input.classList.add("bool_input");
		input.____map = map;
		input.____data = data;
		input.____update = resetBool;

		input.addEventListener("change", onBoolChange);
		input.____changeCallback = change_callback;

		let reset = document.createElement("button");
		reset.classList.add("button");
		reset.classList.add("bool_reset");
		reset.setAttribute("tabindex","-1");
		reset.setAttribute("hidden","hidden");
		reset.classList.add("bool_reset_hidden");
		reset.setAttribute("type","button");
		reset.addEventListener("click", onBoolResetClick);
		reset.append("⟳");
		reset.____input = input;

		input.____reset = reset;
		resetBool(input);

		let text = document.createElement("span");
		text.classList.add("bool_text");
		text.classList.add("label_text");
		text.append(map.name + ":");


		input_container.appendChild(input);

		label.appendChild(text);
		label.appendChild(input_container);
		label.appendChild(reset);

		resolve(label);
	});
}

function resetBool(input)
{
	let map = input.____map;
	let data = input.____data;

	if(data[map.map_to] == true)
	{
		input.setAttribute("checked","checked");
		input.checked = true;
	}
	else
	{
		input.removeAttribute("checked");
		input.checked = false;
	}

	map.new_value = undefined;
	input.____reset.setAttribute("hidden","hidden");
	input.____reset.classList.add("bool_reset_hidden");

	if(input.____changeCallback)
	{
		input.____changeCallback(input);
	}
}

function onBoolResetClick(event)
{
	let tgt = event.currentTarget;
	resetBool(tgt.____input);
}

function onBoolChange(event)
{
	let tgt = event.currentTarget;
	let map = tgt.____map;
	let data = tgt.____data;

	let value = tgt.checked?true:false;
	if(value != data[map.map_to])
	{
		tgt.____reset.removeAttribute("hidden");
		tgt.____reset.classList.remove("bool_reset_hidden");
		map.new_value = value;
	}
	else
	{
		tgt.____reset.setAttribute("hidden","hidden");
		tgt.____reset.classList.add("bool_reset_hidden");
		map.new_value = undefined;
	}

	if(tgt.____changeCallback)
	{
		tgt.____changeCallback(tgt);
	}
}
