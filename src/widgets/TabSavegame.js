export class TabSavegame
{
	#tab_list = null;
	#id = "tab_normal";
	#controls = null;
	#tab_button = null;
	#save_button = null;
	#download_button = null;
	#file_name = "file";
	#span = null;
	#savegame = null;
	#save_map = null;
	#bound_save_callback = null;
	#bound_on_save_changes = null;
	#bound_on_download = null;
	#bound_on_key_down = null;

	constructor(tab_list, id, text, selected, controls, savegame)
	{
		if(typeof tab_list == "string")
		{
			tab_list = document.getElementById(tab_list);
		}

		if(typeof controls != "string")
		{
			controls = controls.id;
		}

		this.#tab_list = tab_list;
		this.#controls = controls;
		this.#id = id;
		this.#savegame = savegame;
		this.#save_map = new Map();
		this.#file_name = text;

		this.#bound_save_callback = this.onSaveValueChange.bind(this);
		this.#bound_on_save_changes = this.onSaveChanges.bind(this);
		this.#bound_on_download = this.onDownload.bind(this);
		this.#bound_on_key_down = this.onKeyDown.bind(this);

		this.#tab_button = document.createElement("button");
		this.#tab_button.id = id;
		this.#tab_button.dataset.tabType = "tab";
		this.#tab_button.setAttribute("role","tab");
		this.#tab_button.setAttribute("type","button");
		this.#tab_button.setAttribute("aria-controls",this.#controls);
		this.#tab_button.setAttribute("aria-selected",selected == true?"true":"false");
		if(selected == true)
		{
			this.#tab_button.setAttribute("tabIndex","-1");
		}
		this.#tab_button.classList.add("tab_savegame_focus");
		this.#tab_button.classList.add("tab_savegame_button");
		this.#tab_button.classList.add("tab_savegame_normal");
		this.#tab_button.classList.add("tab_savegame");
		this.#tab_button.classList.add("tab_focus");
		this.#tab_button.classList.add("tab");


		this.#save_button = document.createElement("button");
		this.#save_button.classList.add("button");
		this.#save_button.classList.add("tab_savegame_save_button");
		this.#save_button.setAttribute("type","button");
		this.#save_button.setAttribute("tabindex","-1");
		this.#save_button.setAttribute("hidden","hidden");
		this.#save_button.classList.add("tab_savegame_save_button_hidden");
		this.#save_button.append("🖫");
		this.#save_button.addEventListener("click", this.#bound_on_save_changes);

		this.#download_button = document.createElement("button");
		this.#download_button.classList.add("button");
		this.#download_button.classList.add("tab_savegame_download_button");
		this.#download_button.setAttribute("type","button");
		this.#download_button.setAttribute("tabindex","-1");
		this.#download_button.append("⭳");
		this.#download_button.addEventListener("click", this.#bound_on_download);

		this.#span = document.createElement("span");
		this.#span.classList.add("tab_label");
		this.#span.append(text);
		this.#tab_button.appendChild(this.#span);
		this.#tab_button.appendChild(this.#download_button);
		this.#tab_button.appendChild(this.#save_button);
	}

	get element()
	{
		return this.#tab_button;
	}

	get save_callback()
	{
		return this.#bound_save_callback;
	}

	onSaveValueChange(element)
	{
		let data = element.____data;
		let map = element.____map;
		let result = false;

		if(Array.isArray(map.new_value))
		{
			result = !map.new_value.every((ele) => {return ele == undefined;});
		}
		else
		{
			result = map.new_value != undefined;
		}

		if(result)
		{
			this.#save_map.set(map,element);
		}
		else
		{
			this.#save_map.delete(map);
		}

		if(this.#save_map.size)
		{
			this.#save_button.removeAttribute("hidden");
			this.#download_button.setAttribute("hidden","hidden");
			this.#save_button.classList.remove("tab_savegame_save_button_hidden");
			this.#download_button.classList.add("tab_savegame_download_button_hidden");
		}
		else
		{
			this.#save_button.setAttribute("hidden","hidden");
			this.#download_button.removeAttribute("hidden");
			this.#save_button.classList.add("tab_savegame_save_button_hidden");
			this.#download_button.classList.remove("tab_savegame_download_button_hidden");
		}
	}

	onSaveChanges(event)
	{
		this.#savegame.apply();
		this.#save_map.forEach((ele) => { ele.____update(ele);})
		this.#save_map.clear();
		this.#save_button.setAttribute("hidden","hidden");
		this.#download_button.removeAttribute("hidden");
		this.#save_button.classList.add("tab_savegame_save_button_hidden");
		this.#download_button.classList.remove("tab_savegame_download_button_hidden");
	}

	onDownload(event)
	{
		let blob = this.#savegame.getBlob();
		let url = URL.createObjectURL(blob);

		let anchor = document.createElement("a");
		anchor.href = url;
		anchor.target = "_blank";
		anchor.download = this.#file_name;
		anchor.click();

		URL.revokeObjectURL(url);

	}

	append(before)
	{
		if(before)
		{
			if(typeof before == "string")
			{
				before = document.getElementById(before);
			}

			this.#tab_list.insertBefore(this.#tab_button,before);
		}
		else
		{
			this.#tab_list.appendChild(this.#tab_button);
		}

		document.addEventListener("keydown", this.#bound_on_key_down);
	}

	remove()
	{
		this.#tab_button.remove();

		document.removeEventListener("keydown", this.#bound_on_key_down);
	}

	onKeyDown(event)
	{
		let tgt = this.#tab_button;
		let key = event.key;

		if(key == "s" && event.ctrlKey)
		{
			if(tgt.getAttribute("aria-selected") == "true")
			{
				if(this.#save_map.size)
				{
					this.onSaveChanges(tgt);
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}
	}
}