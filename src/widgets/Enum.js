
export let createEnum_cache = new Map();

export function createEnum(container, id, data, entry, change_callback)
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
		label.id = id + "_enum_label";
		label.classList.add("enum_label");

		let select = null;
		let opt = null;
		if(createEnum_cache.has(map.etype))
		{
			select = createEnum_cache.get(map.etype).cloneNode(true);
		}
		else
		{
			select = document.createElement("select");
			if(readonly)
			{
				select.setAttribute("readonly","readonly");
				//select.setAttribute("disabled","disabled");
			}
			select.classList.add("enum_select");

			let enum_count = Object.keys(map.etype).length;
			let enum_pos = 0;

			for(let e in map.etype)
			{
				opt = document.createElement("option");
				opt.setAttribute("value",map.etype[e]);
				opt.append(e);
				select.appendChild(opt);
			}

			createEnum_cache.set(map.etype,select);
			select = select.cloneNode(true);
		}

		select.id = id + "enum";
		select.____map = map;
		select.____data = data;
		select.____update = resetEnum;

		let select_container = document.createElement("div");
		select_container.classList.add("enum_select_container");

		let reset = document.createElement("button");
		reset.classList.add("button");
		reset.classList.add("enum_reset");
		reset.setAttribute("tabindex","-1");
		reset.classList.add("enum_reset_hidden");
		reset.setAttribute("type","button");
		reset.setAttribute("hidden","hidden");
		reset.addEventListener("click", onEnumResetClick);
		reset.append("⟳");
		reset.____select = select;

		select.____reset = reset;

		resetEnum(select);
		select.addEventListener("change", onEnumChange);
		select.____changeCallback = change_callback;

		let text = document.createElement("span");
		text.classList.add("enum_text");
		text.classList.add("label_text");
		text.append(map.name + ":");

		select_container.appendChild(select);

		label.appendChild(text);
		label.appendChild(select_container);
		label.appendChild(reset);

		resolve(label);
	});
}

function resetEnum(select)
{
	let map = select.____map;
	let data = select.____data;

	let opt = select.querySelector('[selected="selected"]');
	if(opt)
	{
		opt.removeAttribute("selected");
	}

	opt = select.querySelector('[value="'+ data[map.map_to] +'"]');
	opt.setAttribute("selected","selected");

	select.value = opt.value;

	select.____reset.setAttribute("hidden","hidden");
	select.____reset.classList.add("enum_reset_hidden");

	map.new_value = undefined;

	if(select.____changeCallback)
	{
		select.____changeCallback(select);
	}
}

function onEnumResetClick(event)
{
	let tgt = event.currentTarget;
	resetEnum(tgt.____select);
}

function onEnumChange(event)
{
	let tgt = event.currentTarget;
	let map = tgt.____map;
	let data = tgt.____data;
	let value = parseInt(tgt.value,10);
	if(value != data[map.map_to])
	{
		tgt.____reset.removeAttribute("hidden");
		tgt.____reset.classList.remove("enum_reset_hidden");
		tgt.____map.new_value = value;
	}
	else
	{
		tgt.____reset.setAttribute("hidden","hidden");
		tgt.____reset.classList.add("enum_reset_hidden");
		tgt.____map.new_value = undefined;
	}

	if(tgt.____changeCallback)
	{
		tgt.____changeCallback(tgt);
	}
}
