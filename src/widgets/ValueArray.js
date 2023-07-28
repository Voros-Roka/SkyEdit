import { createGroup } from "./Group.js"

export function createValueArray(container, id, data, entry, change_callback)
{
	return new Promise((resolve, reject) => {
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		let map = entry;
		map.new_value = [];
		let style = "dec";
		let readonly = false;
		for(let i = 0; i < map.options.length; i++)
		{
			if(map.options[i].display)
			{
				style = map.options[i].display;
				break
			}

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
			label.id = id + "_value_array_label_" + i;
			label.classList.add("value_label_" + i);
			label.classList.add("value_label");
			label.setAttribute("for",id + "input_" + i);


			let input = document.createElement("input");
			input.id = id + "input_" + i;
			input.setAttribute("type","text");
			input.setAttribute("autocomplete","off");
			input.setAttribute("spellcheck","false");
			input.setAttribute("autocorrect","off");
			input.setAttribute("size",map.max.toString().length);
			input.____style = style;
			input.____map = map;
			input.____data = data;
			input.____update = value_array_resetValue;
			input.____changeCallback = change_callback;
			input.____index = i;
			if(readonly)
			{
				input.setAttribute("readonly","readonly");
				//input.setAttribute("disabled","disabled");
			}
			input.classList.add("value_input_" + i);
			input.classList.add("value_input");
			input.addEventListener("change", value_array_onInputChange);
			input.addEventListener("keydown", value_array_onInputKeyDown);


			let spin_up = document.createElement("button");
			spin_up.classList.add("value_spin_up");
			//spin_up.append("▲");
			spin_up.append("+");
			spin_up.setAttribute("tabindex","-1");
			spin_up.setAttribute("type","button");
			spin_up.addEventListener("click", value_array_onSpinUpClick);
			spin_up.____input = input;

			let spin_down = document.createElement("button");
			spin_down.classList.add("value_spin_down");
			//spin_down.append("▼");
			spin_down.append("-");
			spin_down.setAttribute("tabindex","-1");
			spin_down.setAttribute("type","button");
			spin_down.addEventListener("click", value_array_onSpinDownClick);
			spin_down.____input = input;

			let reset = document.createElement("button");
			reset.classList.add("button");
			reset.classList.add("value_reset");
			reset.setAttribute("tabindex","-1");
			reset.setAttribute("hidden","hidden");
			reset.classList.add("value_reset_hidden");
			reset.setAttribute("type","button");
			reset.addEventListener("click", value_array_onResetClick);
			reset.append("⟳");
			reset.____input = input;

			let radix_container = document.createElement("div");
			radix_container.classList.add("value_radix_container");

			let radix = document.createElement("select");
			radix.classList.add("value_radix_" + i);
			radix.classList.add("value_radix");
			radix.addEventListener("change", value_array_onRadixChange);
			radix.____input = input;

			input.____radix = radix;
			input.____reset = reset;
			value_array_resetValue(input);

			let cdec = document.createElement("option");
			cdec.setAttribute("value","dec");
			cdec.append("dec");
			if(style == "dec")
			{
				cdec.setAttribute("selected","selected");
			}

			let chex = document.createElement("option");
			chex.setAttribute("value","hex");
			chex.append("hex");
			if(style == "hex")
			{
				chex.setAttribute("selected","selected");
			}

			let cbin = document.createElement("option");
			cbin.setAttribute("value","bin");
			cbin.append("bin");
			if(style == "bin")
			{
				cbin.setAttribute("selected","selected");
			}

			radix.appendChild(cdec);
			radix.appendChild(chex);
			radix.appendChild(cbin);

			let text = document.createElement("span");
			text.classList.add("value_text");
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

			radix_container.appendChild(radix);

			label.appendChild(text);
			label.appendChild(spin_down);
			label.appendChild(input);
			label.appendChild(radix_container);
			label.appendChild(spin_up);
			label.appendChild(reset);
			gcontainer.appendChild(label);
		}

		resolve(gelement);
	});
}

function value_array_setValue(value, input)
{
	let style = input.____style;
	let map = input.____map;
	let data = input.____data;

	if(isNaN(value) || value == undefined || value == null)
	{
		value =  data[map.map_to][input.____index];
	}

	if(value < map.min)
	{
		value = map.min;
	}

	if(value > map.max)
	{
		value = map.max;
	}

	if(value != data[map.map_to][input.____index])
	{
		input.____reset.classList.remove("value_reset_hidden");
		input.____reset.removeAttribute("hidden","hidden");
		input.____map.new_value[input.____index] = value;
	}
	else
	{
		input.____reset.classList.add("value_reset_hidden");
		input.____reset.setAttribute("hidden","hidden");
		input.____map.new_value[input.____index] = undefined;
	}

	switch(style)
	{
		case "dec":
		{
			input.setAttribute("value",value.toString(10));
			input.value = value.toString(10);
		}
		break

		case "hex":
		{
			input.setAttribute("value",value.toString(16));
			input.value = value.toString(16);
		}
		break;


		case "bin":
		{
			input.setAttribute("value",value.toString(2));
			input.value = value.toString(2);
		}
		break;

		default:
		{
			console.log(i18n`Unknown style '${style}' for mapping '${JSON.stringify(map)}'`);
		}
		break;
	}

	if(input.____changeCallback)
	{
		input.____changeCallback(input);
	}
}

function value_array_resetValue(input)
{
	value_array_setValue(input.____data[input.____map.map_to][input.____index],input);
}

function value_array_readValue(input)
{
	let style = input.____style;
	switch(style)
	{
		case "dec":
		{
			return parseInt(input.value,10);
		}
		break

		case "hex":
		{
			return parseInt(input.value,16);
		}
		break;

		case "bin":
		{
			return parseInt(input.value,2);
		}
		break;
	}

	return null;
}

function value_array_increment(input,fast)
{
	if(!input.getAttribute("readonly"))
	{
		let style = input.____style;
		let diff = 1;
		if(fast == true)
		{
			switch(style)
			{
				case "dec":
				{
					diff = 10;
				}
				break

				case "hex":
				{
					diff = 16;
				}
				break;

				case "bin":
				{
					diff = 2;
				}
				break;
			}
		}
		let value = value_array_readValue(input);
		value += diff;
		if(value > input.____map.max)
		{
			value = input.____map.max;
		}
		value_array_setValue(value,input);
	}
}

function value_array_decrement(input,fast)
{
	if(!input.getAttribute("readonly"))
	{
		let style = input.____style;
		let diff = 1;
		if(fast == true)
		{
			switch(style)
			{
				case "dec":
				{
					diff = 10;
				}
				break

				case "hex":
				{
					diff = 16;
				}
				break;

				case "bin":
				{
					diff = 2;
				}
				break;
			}
		}
		let value = value_array_readValue(input);
		value -= diff;
		if(value < input.____map.min)
		{
			value = input.____map.min;
		}
		value_array_setValue(value,input);
	}
}

function value_array_setMax(input)
{
	if(!input.getAttribute("readonly"))
	{
		let value = input.____map.max;
		value_array_setValue(value,input);
	}
}

function value_array_setMin(input)
{
	if(!input.getAttribute("readonly"))
	{
		let value = input.____map.min;
		value_array_setValue(value,input);
	}
}

function value_array_onResetClick(event)
{
	let tgt = event.currentTarget;
	value_array_resetValue(tgt.____input);
}

function value_array_onSpinUpClick(event)
{
	let tgt = event.currentTarget;
	value_array_increment(tgt.____input,false);
}

function value_array_onSpinDownClick(event)
{
	let tgt = event.currentTarget;
	value_array_decrement(tgt.____input,false);

}

function value_array_onInputChange(event)
{
	let tgt = event.currentTarget;
	let value = value_array_readValue(tgt);
	value_array_setValue(value,tgt);
}

function value_array_onInputKeyDown(event)
{
	let tgt = event.currentTarget;
	let flag = false;
	let key = event.key;

	switch(key)
	{
		case 'Up':
		case 'ArrowUp':
		{
			value_array_increment(tgt,false);
			flag = true;
		}
		break;

		case 'Down':
		case 'ArrowDown':
		{
			value_array_decrement(tgt,false);
			flag = true;
		}
		break;

		case 'PageUp':
		{
			value_array_increment(tgt,true);
			flag = true;
		}
		break;

		case 'PageDown':
		{
			value_array_decrement(tgt,true);
			flag = true;
		}
		break;

		case 'Home':
		{
			value_array_setMin(tgt);
			flag = true;
		}
		break;

		case 'End':
		{
			value_array_setMax(tgt);
			flag = true;
		}
		break;

		case 'Escape':
		{
			value_array_resetValue(tgt);
			flag = true;
		}
		break;
	}

	if(flag) {
		event.stopPropagation();
		event.preventDefault();
	}
}

function value_array_onRadixChange(event)
{
	let value = value_array_readValue(event.currentTarget.____input);
	event.currentTarget.____input.____style = event.currentTarget.value;
	value_array_setValue(value, event.currentTarget.____input);
}
