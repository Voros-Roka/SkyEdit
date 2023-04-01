export class TabControl
{
	#tablist_element = null;
	#tabs = [];
	#panel_hidden_class = ""
	#delete_callback = null;
	#insert_callback = null;
	#bound_onclick = null;
	#bound_onkeydown = null;

	constructor(container, panel_hidden_class, delete_callback, insert_callback)
	{
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		this.#tablist_element = container.querySelector("[role=tablist]");
		this.#panel_hidden_class = panel_hidden_class;
		this.#delete_callback = delete_callback;
		this.#insert_callback = insert_callback;

		this.#bound_onclick = this.onClick.bind(this);
		this.#bound_onkeydown = this.onKeydown.bind(this);
		this.update();
		this.select(this.#tabs[0],false);
	}

	update()
	{
		this.#tabs = Array.from(this.#tablist_element.querySelectorAll("[role=tab]"));
		for(let i = 0; i < this.#tabs.length; i++)
		{
			let tab = this.#tabs[i];
			let panel = document.getElementById(tab.getAttribute("aria-controls"));

			tab.tabIndex = -1;
			tab.setAttribute("aria-selected", "false");
			tab.classList.remove("tab_enabled");

			//if(tab.dataset.tabType != "control")
			//{
				tab.removeEventListener("click", this.#bound_onclick);
				tab.addEventListener("click", this.#bound_onclick);
			//}

			tab.removeEventListener("keydown", this.#bound_onkeydown);
			tab.addEventListener("keydown", this.#bound_onkeydown);
		}
	}

	select(current, setFocus)
	{
		if(typeof setFocus != "boolean")
		{
			setFocus = true;
		}

		for(var i = 0; i < this.#tabs.length; i += 1)
		{
			let tab = this.#tabs[i];

			if(current == tab)
			{
				tab.setAttribute("aria-selected", "true");
				tab.classList.add("tab_enabled");
				tab.removeAttribute("tabindex");
				if(tab.dataset.tabType != "control")
				{
					let panel = document.getElementById(tab.getAttribute("aria-controls"));
					if(panel)
					{
						for(let c = 0; c < this.#panel_hidden_class.length; c++)
						{
							panel.classList.remove(this.#panel_hidden_class[c]);
						}
					}
				}

				if(setFocus)
				{
					tab.focus();
				}
			}
			else
			{
				tab.setAttribute("aria-selected", "false");
				tab.classList.remove("tab_enabled");
				tab.setAttribute("tabindex","-1");
				if(tab.dataset.tabType != "control")
				{
					let panel = document.getElementById(tab.getAttribute("aria-controls"));
					if(panel)
					{
						for(let c = 0; c < this.#panel_hidden_class.length; c++)
						{
							panel.classList.add(this.#panel_hidden_class[c]);
						}
					}
				}
			}
		}
	}

	prev(current)
	{
		if(current == this.#tabs[0])
		{
			this.select(this.#tabs[this.#tabs.length-1]);
		}
		else
		{
			let index = this.#tabs.indexOf(current);
			this.select(this.#tabs[index - 1]);
		}
	}

	next(current)
	{
		if(current == this.#tabs[this.#tabs.length-1])
		{
			this.select(this.#tabs[0]);
		}
		else
		{
			let index = this.#tabs.indexOf(current);
			this.select(this.#tabs[index + 1]);
		}
	}

	onKeydown(event)
	{
		switch(event.key)
		{
			case "ArrowLeft":
			{
				this.prev(event.currentTarget);

				//event.stopPropagation();
				event.preventDefault();
				break;
			}

			case "ArrowRight":
			{
				this.next(event.currentTarget);

				//event.stopPropagation();
				event.preventDefault();
				break;
			}

			case "Home":
			{
				this.select(this.#tabs[0]);

				//event.stopPropagation();
				event.preventDefault();
				break;
			}

			case "End":
			{
				this.select(this.#tabs[this.#tabs.length-1]);

				//event.stopPropagation();
				event.preventDefault();
				break;
			}

			case "Delete":
			{
				if(event.currentTarget.dataset.tabType != "control")
				{
					if(this.#delete_callback)
					{
						this.next(event.currentTarget);
						let result = this.#delete_callback(this,event.currentTarget);
						if(result)
						{
							this.update();

							//event.stopPropagation();
							event.preventDefault();
						}
						else
						{
							this.prev(event.currentTarget);
						}
					}
				}

				break;
			}

			case "Insert":
			{
				if(this.#insert_callback)
				{
					let result = this.#insert_callback(this,event.currentTarget);
					if(result)
					{
						this.update();
						//event.stopPropagation();
						event.preventDefault();
					}
				}

				break;
			}

			default:
			{
				break;
			}
		}
	}

	onClick(event)
	{
		this.select(event.currentTarget);
	}
}