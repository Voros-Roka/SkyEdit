export function createValue(container, id, data, entry, change_callback)
{
	return new Promise((resolve, reject) => {
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		let map = entry;
		map.new_value = undefined;
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

		let label = document.createElement("label");
		label.id = id;
		label.classList.add("value_label");
		label.setAttribute("for",id + "input");


		let input = document.createElement("input");
		input.id = id + "input";
		input.setAttribute("type","text");
		input.setAttribute("autocomplete","off");
		input.setAttribute("spellcheck","false");
		input.setAttribute("autocorrect","off");
		input.setAttribute("role","spinbutton");
		input.setAttribute("size",map.max.toString().length);
		input.____style = style;
		input.____map = map;
		input.____data = data;
		input.____update = value_resetValue;
		input.____changeCallback = change_callback;
		if(readonly)
		{
			input.setAttribute("readonly","readonly");
			//input.setAttribute("disabled","disabled");
		}
		input.classList.add("value_input");
		input.addEventListener("change", value_onInputChange);
		input.addEventListener("keydown", value_onInputKeyDown);

		let spin_up = document.createElement("button");
		spin_up.classList.add("value_spin_up");
		//spin_up.append("▲");
		spin_up.append("+");
		spin_up.setAttribute("tabindex","-1");
		spin_up.setAttribute("type","button");
		spin_up.addEventListener("click", value_onSpinUpClick);
		spin_up.____input = input;

		let spin_down = document.createElement("button");
		spin_down.classList.add("value_spin_down");
		//spin_down.append("▼");
		spin_down.append("-");
		spin_down.setAttribute("tabindex","-1");
		spin_down.setAttribute("type","button");
		spin_down.addEventListener("click", value_onSpinDownClick);
		spin_down.____input = input;

		let reset = document.createElement("button");
		reset.classList.add("button");
		reset.classList.add("value_reset");
		reset.setAttribute("tabindex","-1");
		reset.setAttribute("hidden","hidden");
		reset.classList.add("value_reset_hidden");
		reset.setAttribute("type","button");
		reset.addEventListener("click", value_onResetClick);
		reset.append("⟳");
		reset.____input = input;

		let radix_container = document.createElement("div");
		radix_container.classList.add("value_radix_container");

		let radix = document.createElement("select");
		radix.classList.add("value_radix");
		radix.addEventListener("change", value_onRadixChange);
		radix.____input = input;

		input.____radix = radix;
		input.____reset = reset;
		value_resetValue(input);

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
		text.append(map.name + ":");

		radix_container.appendChild(radix);

		label.appendChild(text);
		label.appendChild(spin_down);
		label.appendChild(input);
		label.appendChild(radix_container);
		label.appendChild(spin_up);
		label.appendChild(reset);

		resolve(label);
	});
}

function value_setValue(value, input)
{
	let style = input.____style;
	let map = input.____map;
	let data = input.____data;

	if(isNaN(value) || value == undefined || value == null)
	{
		value = data[map.map_to];
	}

	if(value < map.min)
	{
		value = map.min;
	}

	if(value > map.max)
	{
		value = map.max;
	}

	if(value != data[map.map_to])
	{
		input.____reset.classList.remove("value_reset_hidden");
		input.____reset.removeAttribute("hidden","hidden");
		input.____map.new_value = value;
	}
	else
	{
		input.____reset.classList.add("value_reset_hidden");
		input.____reset.setAttribute("hidden","hidden");
		input.____map.new_value = undefined;
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

function value_readValue(input)
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

function value_resetValue(input)
{
	value_setValue(input.____data[input.____map.map_to],input);
}

function value_increment(input,fast)
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
		let value = value_readValue(input);
		value += diff;
		if(value > input.____map.max)
		{
			value = input.____map.max;
		}
		value_setValue(value,input);
	}
}

function value_decrement(input,fast)
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
		let value = value_readValue(input);
		value -= diff;
		if(value < input.____map.min)
		{
			value = input.____map.min;
		}
		value_setValue(value,input);
	}
}

function value_setMax(input)
{
	if(!input.getAttribute("readonly"))
	{
		let value = input.____map.max;
		value_setValue(value,input);
	}
}

function value_setMin(input)
{
	if(!input.getAttribute("readonly"))
	{
		let value = input.____map.min;
		value_setValue(value,input);
	}
}

function value_onResetClick(event)
{
	let tgt = event.currentTarget;
	value_resetValue(tgt.____input);
}

function value_onSpinUpClick(event)
{
	let tgt = event.currentTarget;
	value_increment(tgt.____input,false);
}

function value_onSpinDownClick(event)
{
	let tgt = event.currentTarget;
	value_decrement(tgt.____input,false);

}

function value_onInputChange(event)
{
	tgt = event.currentTarget;
	let value = value_readValue(tgt);
	value_setValue(value,tgt);
}

function value_onInputKeyDown(event)
{
	let tgt = event.currentTarget;
	let flag = false;
	let key = event.key;

	switch(key)
	{
		case 'Up':
		case 'ArrowUp':
		{
			value_increment(tgt,false);
			flag = true;
		}
		break;

		case 'Down':
		case 'ArrowDown':
		{
			value_decrement(tgt,false);
			flag = true;
		}
		break;

		case 'PageUp':
		{
			value_increment(tgt,true);
			flag = true;
		}
		break;

		case 'PageDown':
		{
			value_decrement(tgt,true);
			flag = true;
		}
		break;

		case 'Home':
		{
			value_setMin(tgt);
			flag = true;
		}
		break;

		case 'End':
		{
			value_setMax(tgt);
			flag = true;
		}
		break;

		case 'Escape':
		{
			value_resetValue(tgt);
			flag = true;
		}
		break;
	}

	if(flag) {
		event.stopPropagation();
		event.preventDefault();
	}
}

function value_onRadixChange(event)
{
	let value = value_readValue(event.currentTarget.____input);
	event.currentTarget.____input.____style = event.currentTarget.value;
	value_setValue(value, event.currentTarget.____input);
}