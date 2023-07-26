
export function createText(container, id, data, entry, change_callback)
{
	return new Promise((resolve, reject) => {
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		let map = entry;
		let readonly = false;
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
		label.classList.add("text_label");


		let input = document.createElement("input");
		input.id = id + "input";
		input.setAttribute("type","text");
		input.setAttribute("autocomplete","off");
		input.setAttribute("spellcheck","false");
		input.setAttribute("autocorrect","off");
		input.setAttribute("size",map.length);
		input.setAttribute("maxlength",map.length);
		input.____map = map;
		input.____data = data;
		input.____update = resetText;
		if(readonly)
		{
			input.setAttribute("readonly","readonly");
			//input.setAttribute("disabled","disabled");
		}
		input.classList.add("text_input");
		input.addEventListener("change", onTextChange);
		input.____changeCallback = change_callback;

		let reset = document.createElement("button");
		reset.classList.add("button");
		reset.classList.add("value_reset");
		reset.setAttribute("tabindex","-1");
		reset.setAttribute("hidden","hidden");
		reset.classList.add("text_reset_hidden");
		reset.setAttribute("type","button");
		reset.addEventListener("click", onTextResetClick);
		reset.append("⟳");
		reset.____input = input;

		input.____reset = reset;
		resetText(input);


		let text = document.createElement("span");
		text.classList.add("text_text");
		text.classList.add("label_text");
		text.append(map.name + ":");

		label.appendChild(text);
		label.appendChild(input);
		label.appendChild(reset);

		resolve(label);
	});
}


function resetText(input)
{
	let map = input.____map;
	let data = input.____data;

	input.setAttribute("value",data[map.map_to]);
	input.value = data[map.map_to];

	map.new_value = undefined;
	input.____reset.classList.add("text_reset_hidden");
	input.____reset.setAttribute("hidden","hidden");

	if(input.____changeCallback)
	{
		input.____changeCallback(input);
	}
}

function onTextResetClick(event)
{
	let tgt = event.currentTarget;
	resetText(tgt.____input);
}

function onTextChange(event)
{
	let tgt = event.currentTarget;
	let map = tgt.____map;
	let data = tgt.____data;
	let value = tgt.value;

	if(value != data[map.map_to])
	{
		tgt.____reset.classList.remove("text_reset_hidden");
		tgt.____reset.removeAttribute("hidden");
		tgt.____map.new_value = value;
	}
	else
	{
		tgt.____reset.classList.add("text_reset_hidden");
		tgt.____reset.setAttribute("hidden","hidden");
		tgt.____map.new_value = undefined;
	}

	if(tgt.____changeCallback)
	{
		tgt.____changeCallback(tgt);
	}
}

