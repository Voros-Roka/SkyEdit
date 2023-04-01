import { i18n } from "../utils.js"
import { mapping_render } from "../widgets/DataMappingRendering.js"
import { Panel } from "../widgets/Panel.js"
import { TabControl } from "../widgets/TabControl.js"
import { TabNormal } from "../widgets/TabNormal.js"

export class PanelSavegame
{
	#container = null;
	#id = "tab_normal";
	#panel = null;
	#panel_container = null;
	#panel_content = null;
	#error = null;
	#loading = null;
	#display = null;
	#savegame = null;
	#tab = null;
	#slot_tab_list = null;
	#slot_tab_panels = null;
	#widgets = [];
	#bound_on_render_enter = null;
	#bound_on_render_exit = null;
	#bound_on_render_category = null;


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


		this.#bound_on_render_enter = this.onRenderEnter.bind(this);
		this.#bound_on_render_exit = this.onRenderExit.bind(this);
		this.#bound_on_render_category = this.onRenderCategory.bind(this);

		this.#container = container;
		this.#tab = tab;
		this.#id = id;

		this.#panel = document.createElement("div");
		this.#panel.id = this.#id;
		this.#panel.setAttribute("role","tabpanel");
		this.#panel.setAttribute("aria-labelledby",this.#tab);
		this.#panel.setAttribute("tabIndex","0");
		this.#panel.classList.add("tab_panel");
		this.#panel.classList.add("tab_panel_savegame");
		if(!(selected == true))
		{
			for(let i = 0; i < panel_hidden_class.length; i++)
			{
				this.#panel.classList.add(this.#id + "_" + panel_hidden_class[i]);
				this.#panel.classList.add(panel_hidden_class[i]);
			}
		}

		this.#error = document.createElement("div");
		this.#error.id = this.#id + "_error";
		this.#error.setAttribute("hidden","hidden");
		this.#error.classList.add(this.#id + "_tab_panel_error");
		this.#error.classList.add(this.#id + "_tab_panel_savegame_error");
		this.#error.classList.add("tab_panel_error");
		this.#error.classList.add("tab_panel_savegame_error");

		this.#loading = document.createElement("div");
		this.#loading.id = this.#id + "_loading";
		this.#loading.setAttribute("hidden","hidden");
		this.#loading.classList.add(this.#id + "_tab_panel_loading");
		this.#loading.classList.add(this.#id + "_tab_panel_savegame_loading");
		this.#loading.classList.add("tab_panel_loading");
		this.#loading.classList.add("tab_panel_savegame_loading");
		this.#loading.append(i18n`Loading`);

		this.#panel_content = document.createElement("div");
		this.#panel_content.classList.add("tab_panel_content");
		this.#panel_content.classList.add("tab_panel_savegame_content");
		this.#panel_content.id = this.#id + "content";

		this.#panel_container = document.createElement("div");
		this.#panel_container.classList.add("tab_panel_container");
		this.#panel_container.classList.add("tab_panel_savegame_container");
		this.#panel_container.id = this.#id + "content";


		this.#panel_content.appendChild(this.#error);
		this.#panel_content.appendChild(this.#loading);

		this.#panel.appendChild(this.#panel_content);
		this.#panel.appendChild(this.#panel_container);
	}

	load(savegame, change_callback)
	{
		this.#loading.removeAttribute("hidden");
		savegame.then((savegame) => {
			this.render(savegame,change_callback).then(() => {
				this.#loading.setAttribute("hidden","hidden");
			}).catch((reason) => {
				this.#loading.setAttribute("hidden","hidden");
				this.#error.innerText = reason.message + "\n" + reason.stack;
				this.#error.removeAttribute("hidden");
			});
		}).catch((reason) => {
			this.#loading.setAttribute("hidden","hidden");
			this.#error.innerText = reason.message + "\n" + reason.stack;
			this.#error.removeAttribute("hidden");
		});
	}

	onRenderEnter(callback_data, container, content, data, depth)
	{
		let data_info_mapping = data.getInfo().mapping;
		let category_count = Object.keys(data_info_mapping).length;
		if(category_count > 1)
		{
			//add navigation here and put everyhting it a extra container
			callback_data.tab_list = document.createElement("div");
			callback_data.tab_list.id = container.id + "_tl" + depth;
			callback_data.tab_list.classList.add("tab_list");
			callback_data.tab_list.setAttribute("role","tablist");

			let tab_panel_container = document.createElement("div");
			tab_panel_container.id = container.id + "_tbc" + depth;
			tab_panel_container.classList.add("tab_panel_container");

			container.appendChild(callback_data.tab_list);
			container.appendChild(tab_panel_container);

			callback_data.tab_control = new TabControl(container, ["tab_panel_hidden"]);
			this.#widgets.push(callback_data.tab_control);
			callback_data.first_select = true;
			callback_data.tabcount = 0;

			return [tab_panel_container, content];
		}
		return [container, content];
	}

	onRenderExit(callback_data, container, content, data, depth)
	{
		if(callback_data.tab_control)
		{
			callback_data.tab_control.update();
			callback_data.tab_control.select(callback_data.tab_first,false);
		}
	}

	onRenderCategory(callback_data, container, content, data, depth, category)
	{
		if(category != "")
		{
			let panel = new Panel(container, container.id + "_p" + callback_data.tabcount, callback_data.first_select, callback_data.tab_list.id + "_t" + callback_data.tabcount, ["tab_panel_hidden","tab_panel_slot_hidden"])
			panel.append();
			let tab = new TabNormal(callback_data.tab_list, callback_data.tab_list.id + "_t" + callback_data.tabcount, category, callback_data.first_select, container.id + "_p" + callback_data.tabcount);
			tab.append();
			this.#widgets.push(panel);
			this.#widgets.push(tab);
			callback_data.tabcount++;
			if(callback_data.first_select == true)
			{
				callback_data.tab_first = tab.element;
			}
			callback_data.first_select = false;

			return [panel.element, panel.content];
		}
		return [container, content];
	}

	render(savegame, change_callback)
	{
		return new Promise((resolve, reject) => {
			this.#savegame = savegame;

			let res = mapping_render(this.#panel_container, this.#panel_content, this.#savegame, null, this.#bound_on_render_enter, this.#bound_on_render_exit, this.#bound_on_render_category, null, null, change_callback);
			resolve(this);
		});
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