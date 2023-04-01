import { createGroup } from "./Group.js"
import { createEnum_cache } from "./Enum.js"

export function createEnumArray(container, id, data, entry, change_callback)
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

		let [gelement, gcontainer] = createGroup(container,id + "_bool_array_enum",map.name);

		for(let i = 0; i < entry.size;i++)
		{

			let label = document.createElement("label");
			label.id = id + "_enum_array_label_" + i;
			label.classList.add("enum_label_" + i);
			label.classList.add("enum_label");

			let select = null;

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
					let opt = document.createElement("option");
					opt.setAttribute("value",map.etype[e]);
					opt.append(e);
					select.appendChild(opt);
				}

				createEnum_cache.set(map.etype,select);
				select = select.cloneNode(true);
			}

			select.classList.add("enum_select_" + i);
			select.id = id + "enum_array_" + i;
			select.____map = map;
			select.____data = data;
			select.____index = i;
			select.____update = resetEnumArray;

			let select_container = document.createElement("div");
			select_container.classList.add("enum_select_container");

			let reset = document.createElement("button");
			reset.classList.add("button");
			reset.classList.add("value_reset");
			reset.setAttribute("tabindex","-1");
			reset.setAttribute("hidden","hidden");
			reset.classList.add("enum_reset_hidden");
			reset.setAttribute("type","button");
			reset.addEventListener("click", onEnumArrayResetClick);
			reset.append("⟳");
			reset.____select = select;

			select.____reset = reset;

			resetEnumArray(select);
			select.addEventListener("change", onEnumArrayChange);
			select.____changeCallback = change_callback;

			let text = document.createElement("span");
			text.classList.add("enum_text");
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

			select_container.appendChild(select);

			label.appendChild(text);
			label.appendChild(select_container);
			label.appendChild(reset);
			gcontainer.appendChild(label);
		}

		resolve(gelement);
	});
}

function resetEnumArray(select)
{
	let map = select.____map;
	let data = select.____data;

	let opt = select.querySelector('[selected="selected"]');
	if(opt)
	{
		opt.removeAttribute("selected");
	}

	opt = select.querySelector('[value="'+ data[map.map_to][select.____index] +'"]');
	opt.setAttribute("selected","selected");

	select.value = opt.value;

	select.____reset.setAttribute("hidden","hidden");
	select.____reset.classList.add("enum_reset_hidden");

	map.new_value[select.____index] = undefined;
	if(select.____changeCallback)
	{
		select.____changeCallback(select);
	}
}

function onEnumArrayResetClick(event)
{
	let tgt = event.currentTarget;
	resetEnumArray(tgt.____select);
}

function onEnumArrayChange(event)
{
	let tgt = event.currentTarget;
	let map = tgt.____map;
	let data = tgt.____data;
	let value = parseInt(tgt.value,10);
	if(value != data[map.map_to][tgt.____index])
	{
		tgt.____reset.removeAttribute("hidden");
		tgt.____reset.classList.remove("enum_reset_hidden");
		tgt.____map.new_value[tgt.____index] = value;
	}
	else
	{
		tgt.____reset.setAttribute("hidden","hidden");
		tgt.____reset.classList.add("enum_reset_hidden");
		tgt.____map.new_value[tgt.____index] = undefined;
	}

	if(tgt.____changeCallback)
	{
		tgt.____changeCallback(tgt);
	}
}
