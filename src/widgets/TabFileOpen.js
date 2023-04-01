import { i18n } from "../utils.js"

export class TabFileOpen
{
	#tab_list = null;
	#id = "tab_normal";
	#tab_label = null;
	#input = null;
	#span = null;
	#file_open_handler = null;
	#bound_on_input_change = null;

	constructor(tab_list, id, text, selected, accept, multiple, visually_hidden_class, file_open_handler)
	{
		if(typeof tab_list == "string")
		{
			tab_list = document.getElementById(tab_list);
		}

		this.#tab_list = tab_list;
		this.#id = id;
		this.#file_open_handler = file_open_handler;

		this.#bound_on_input_change = this.onInputChange.bind(this);

		this.#tab_label = document.createElement("label");
		this.#tab_label.id = id;
		this.#tab_label.setAttribute("for",id + "_input_file_open");
		this.#tab_label.dataset.tabType = "control";
		this.#tab_label.setAttribute("role","tab");
		this.#tab_label.setAttribute("type","button");
		this.#tab_label.setAttribute("aria-selected",selected == true?"true":"false");
		if(selected == true)
		{
			this.#tab_label.setAttribute("tabIndex","-1");
		}
		this.#tab_label.classList.add("tab");
		this.#tab_label.classList.add("tab_label");
		this.#tab_label.classList.add("tab_file_open");
		this.#tab_label.classList.add("tab_focus");

		this.#span = document.createElement("span");
		this.#span.classList.add("tab_label");
		this.#span.append(text);

		this.#input = document.createElement("input");
		this.#input.id = id + "_input_file_open";
		this.#input.setAttribute("accept",accept);
		this.#input.setAttribute("type","file");
		this.#input.setAttribute("tabindex","-1");
		if(multiple)
		{
			this.#input.setAttribute("multiple",multiple);
		}
		this.#input.classList.add(id + "_input_file_open");
		this.#input.classList.add("input_file_open");
		for(let i = 0; i < visually_hidden_class.length;i++)
		{
			this.#input.classList.add(visually_hidden_class[i]);
		}
		this.#input.addEventListener("change", this.#bound_on_input_change);

		this.#span.appendChild(this.#input);
		this.#tab_label.appendChild(this.#span);
	}

	get element()
	{
		return this.#tab_label;
	}

	append(before)
	{
		if(before)
		{
			if(typeof before == "string")
			{
				before = document.getElementById(before);
			}

			this.#tab_list.insertBefore(this.#tab_label,before);
		}
		else
		{
			this.#tab_list.appendChild(this.#tab_label);
		}
	}

	remove()
	{
		this.#tab_label.remove();
	}

	onInputChange(event)
	{
		console.log(i18n`Handle File Dialog`);
		let file_list = event.target.files;
		if(file_list.length != 0)
		{
			for(let file of file_list)
			{
				if(this.#file_open_handler)
				{
					this.#file_open_handler(file);
				}
			}
		}
		else
		{
			console.error(i18n`No files selected`);
		}
	}
}