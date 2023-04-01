export class Panel
{
	#container = null;
	#id = "panel";
	#panel = null;
	#panel_container = null;
	#panel_content = null;
	#tab = null;

	constructor(container, id, selected, tab, panel_hidden_class)
	{
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		if(typeof tab != "string")
		{
			tab = tab.id;
		}

		this.#container = container;
		this.#tab = tab;
		this.#id = id;

		this.#panel = document.createElement("div");
		this.#panel.id = this.#id;
		this.#panel.setAttribute("role","tabpanel");
		this.#panel.setAttribute("aria-labelledby",this.#tab);
		this.#panel.setAttribute("tabIndex","0");
		this.#panel.classList.add("tab_panel");
		if(!(selected == true))
		{
			for(let i = 0; i < panel_hidden_class.length; i++)
			{
				this.#panel.classList.add(panel_hidden_class[i]);
			}
		}

		this.#panel_content = document.createElement("div");
		this.#panel_content.classList.add("tab_panel_content");
		this.#panel_content.id = this.#id + "content";

		this.#panel_container = document.createElement("div");
		this.#panel_container.classList.add("tab_panel_container");
		this.#panel_container.id = this.#id + "container";

		this.#panel.appendChild(this.#panel_content);
		this.#panel.appendChild(this.#panel_container);
	}

	get element()
	{
		return this.#panel_container;
	}

	get content()
	{
		return this.#panel_content;
	}

	append(before)
	{
		if(before)
		{
			if(typeof before == "string")
			{
				before = document.getElementById(before);
			}

			this.#container.insertBefore(this.#panel,before);
		}
		else
		{
			this.#container.appendChild(this.#panel);
		}
	}

	remove()
	{
		this.#panel.remove();
	}

}