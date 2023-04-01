export class TabNormal
{
	#tab_list = null;
	#id = "tab_normal";
	#controls = null;
	#tab_button = null;
	#span = null;

	constructor(tab_list, id, text, selected, controls)
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
		this.#tab_button.classList.add("tab_focus");
		this.#tab_button.classList.add("tab_button");
		this.#tab_button.classList.add("tab_normal");
		this.#tab_button.classList.add("tab");


		this.#span = document.createElement("span");
		this.#span.classList.add("tab_label");
		this.#span.append(text);
		this.#tab_button.appendChild(this.#span);
	}

	get element()
	{
		return this.#tab_button;
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
	}

	remove()
	{
		this.#tab_button.remove();
	}

}