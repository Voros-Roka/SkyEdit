
import { i18n } from "./utils.js"
import { TabSavegame } from "./widgets/TabSavegame.js"
import { TabControl } from "./widgets/TabControl.js"
import { TabFileOpen } from "./widgets/TabFileOpen.js"
import { PanelSavegame } from "./widgets/PanelSavegame.js"

export class SaveEditor
{
	#container = null;
	#name = "editor";

	#bound_on_tab_delete = null;
	#bound_on_tab_insert = null;
	#bound_on_tab_file_open = null;

	#bound_on_handle_drop = null;
	#bound_on_handle_dragover = null;
	#bound_on_handle_dragenter = null;
	#bound_on_handle_dragleave = null;

	#tab_container = null;
	#tab_list = null;
	#tab_list_container = null;
	#tab_panel_container = null;

	#tab_list_control = null;
	#tab_file_open = null;

	#file_list = [];
	#file_type_list = [];

	constructor(container, name, visually_hidden_class)
	{
		if(typeof container == "string")
		{
			container = document.getElementById(container);
		}

		this.#container = container;
		this.#name = name;

		this.#bound_on_tab_delete = this.onTabDelete.bind(this);
		this.#bound_on_tab_insert = this.onTabInsert.bind(this);
		this.#bound_on_tab_file_open = this.onTabFileOpen.bind(this);


		this.#bound_on_handle_drop = this.handle_drop.bind(this);
		this.#bound_on_handle_dragover = this.handle_dragover.bind(this);
		this.#bound_on_handle_dragenter = this.handle_dragenter.bind(this);
		this.#bound_on_handle_dragleave = this.handle_dragleave.bind(this);

		this.#tab_container = document.createElement("div");
		this.#tab_container.id = name + "_tab_container";
		this.#tab_container.classList.add(name + "_tab_container");
		this.#tab_container.classList.add("tab_container");

		this.#tab_list_container = document.createElement("div");
		this.#tab_list_container.id = name + "_tab_list_container";
		this.#tab_list_container.classList.add(name + "_tab_list_container");
		this.#tab_list_container.classList.add("tab_list_container");

		this.#tab_list = document.createElement("div");
		this.#tab_list.id = name + "_tab_list";
		this.#tab_list.setAttribute("role","tablist");
		this.#tab_list.classList.add(name + "_tab_list");
		this.#tab_list.classList.add("tab_list");

		this.#tab_panel_container = document.createElement("div");
		this.#tab_panel_container.id = name + "_tab_panel_container";
		this.#tab_panel_container.classList.add(name + "_tab_panel_container");
		this.#tab_panel_container.classList.add("tab_panel_container");

		this.#tab_list_container.appendChild(this.#tab_list);
		this.#tab_container.appendChild(this.#tab_list_container);
		this.#tab_container.appendChild(this.#tab_panel_container);
		this.#container.appendChild(this.#tab_container);

		this.#tab_list_control = new TabControl(this.#tab_list_container, [name + "_tab_panel_hidden", "tab_panel_hidden", visually_hidden_class], this.#bound_on_tab_delete, this.#bound_on_tab_insert);
		this.#tab_file_open = new TabFileOpen(this.#tab_list, name + "_control", "+", true, "*", "multiple" , [name + "_control_hidden", "control_hidden", visually_hidden_class], this.#bound_on_tab_file_open);
		this.#tab_file_open.append();
	}

	get file_count()
	{
		return this.#file_list.length;
	}

	onTabFileOpen(file)
	{
		console.log(i18n`Tab wants to open file ${file.name}`);
		this.openFile(file);

		return true;
	}

	onTabDelete(widget,tab)
	{
		console.log(i18n`Tab widet ${widget} wants tab ${tab} deleted`);

		for(let i = 0; i < this.#file_list.length; i++)
		{
			if(tab == this.#file_list[i].tab.element)
			{
				this.#file_list[i].tab.remove();
				this.#tab_list_control.update();
				this.#file_list[i].panel.remove();
				this.#file_list[i] = undefined;
				break;
			}
		}

		return true;
	}

	onTabInsert(widget,tab)
	{
		console.log(i18n`Tab widet ${widget} wants to insert new tab after/before ${tab}`);

		this.#tab_file_open.element.click();

		return true;
	}

	openFile(file)
	{
		file.text().then( (text_Data) => {
			file.arrayBuffer().then( (bin_data) => {
				for(let i = 0; i < this.#file_type_list.length; i++)
				{

					let sf = new this.#file_type_list[i]();

					try
					{
						let panel = new PanelSavegame(this.#tab_panel_container, "editor_file_panel_" + this.#file_list.length, false, "editor_file_tab_" + this.#file_list.length, ["tab_panel_hidden","tab_panel_savegame_hidden"])
						panel.append();
						let tab = new TabSavegame(this.#tab_list, "editor_file_tab_" + this.#file_list.length, file.name, false, "editor_file_panel_" + this.#file_list.length,sf);
						tab.append(this.#tab_file_open.element);

						this.#tab_list_control.update();
						this.#tab_list_control.select(tab.element);

						this.#file_list.push({savefile: sf, tab: tab, panel: panel});

						console.log(i18n`Trying to open file '${file.name}' with '${sf.name}' as '${sf.datatype}'`);
						if(sf.datatype == "binary")
						{
							sf.validate(bin_data);
							panel.load(sf.parse(bin_data),tab.save_callback);
						}
						else if(sf.datatype == "text")
						{
							sf.validate(bin_data);
							panel.load(sf.parse(text_Data),tab.save_callback);
						}
						else
						{
							throw Error(i18n`Savetype '${sf.name}' wants unknow datatype '${sf.datatype}'`);
						}
						break;
					}
					catch(exception)
					{
						console.error(i18n`Could not open file '${file.name}' with '${sf.name}': ${exception.message}\n${exception.stack}`);
						continue;
					}
				}
			}).catch((reason) => {
				console.error(i18n`Could not open file '${file.name}': ${reason}`);
			})
		}).catch((reason) => {
			console.error(i18n`Could not open file '${file.name}': ${reason}`);
		})
	}

	register_file_type(type)
	{
		this.#file_type_list.push(type);
	}

	handle_drop(event)
	{
		console.log(i18n`Handle Drop`);
		event.stopPropagation();
		event.preventDefault();
		if(event.currentTarget.classList.contains("file_dropzone"))
		{
			if(event.target == event.currentTarget)
			{
				event.target.classList.remove('file_dropzone_mark')
			}

			if(event.dataTransfer.items)
			{
				for(let item of event.dataTransfer.items)
				{
					if(item.kind == "file")
					{
						let file = item.getAsFile();
						this.openFile(file)
					}
				}
			}
		}
	}

	handle_dragover(event)
	{
		console.log(i18n`Handle Drag Over`);
		event.stopPropagation();
		event.preventDefault();
	}

	handle_dragenter(event)
	{
		console.log(i18n`Handle Drag Enter`);
		event.stopPropagation();
		event.preventDefault();
		if(event.currentTarget.classList.contains("file_dropzone"))
		{
			event.currentTarget.classList.add('file_dropzone_mark');
		}
	}

	handle_dragleave(event)
	{
		console.log(i18n`Handle Drag Leave`);
		event.stopPropagation();
		event.preventDefault();

		if(event.currentTarget.classList.contains("file_dropzone"))
		{
			if(event.currentTarget == event.target)
			{
				event.currentTarget.classList.remove('file_dropzone_mark');
			}
		}
	}

	update_file_dropzones()
	{
		if(this.file_count == 0)
		{
			this.#tab_container.classList.remove('file_dropzone_mark');
			this.#tab_container.classList.remove("file_dropzone");
			this.#tab_container.removeEventListener("drop", this.#bound_on_handle_drop);
			this.#tab_container.removeEventListener("dragover", this.#bound_on_handle_dragover);
			this.#tab_container.removeEventListener("dragenter", this.#bound_on_handle_dragenter);
			this.#tab_container.removeEventListener("dragleave", this.#bound_on_handle_dragleave);

			let drag_file_open = document.getElementById("editor_container");
			drag_file_open.classList.remove('file_dropzone_mark');
			drag_file_open.classList.add("file_dropzone");
			drag_file_open.addEventListener("drop", this.#bound_on_handle_drop);
			drag_file_open.addEventListener("dragover", this.#bound_on_handle_dragover);
			drag_file_open.addEventListener("dragenter", this.#bound_on_handle_dragenter);
			drag_file_open.addEventListener("dragleave", this.#bound_on_handle_dragleave);
		}
		else
		{
			this.#tab_container.classList.remove("file_dropzone_mark");
			this.#tab_container.classList.remove("file_dropzone");
			this.#tab_container.removeEventListener("drop", this.#bound_on_handle_drop);
			this.#tab_container.removeEventListener("dragover", this.#bound_on_handle_dragover);
			this.#tab_container.removeEventListener("dragenter", this.#bound_on_handle_dragenter);
			this.#tab_container.removeEventListener("dragleave", this.#bound_on_handle_dragleave);

			let drag_file_open = document.getElementById("editor_container");
			drag_file_open.classList.remove('file_dropzone_mark');
			drag_file_open.classList.add("file_dropzone");
			drag_file_open.addEventListener("drop", this.#bound_on_handle_drop);
			drag_file_open.addEventListener("dragover", this.#bound_on_handle_dragover);
			drag_file_open.addEventListener("dragenter", this.#bound_on_handle_dragenter);
			drag_file_open.addEventListener("dragleave", this.#bound_on_handle_dragleave);
		}
	}
}
