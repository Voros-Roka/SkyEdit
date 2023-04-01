import { i18n } from "./utils.js"

export class DataMapping
{
	#data = { functions: [], mapping: {} };

	constructor()
	{
	}

	toString()
	{
		//return JSON.stringify(this.#data);
	}

	toJSON()
	{
		//return JSON.stringify(this.#data);
	}

	getInfo()
	{
		return this.#data;
	}

	initCategoryGroup(category, group)
	{
		if(!group)
		{
			group = "";
		}

		if(!category)
		{
			category = "";
		}

		if(!this.#data.mapping[category])
		{
			this.#data.mapping[category] = {};
		}

		if(!this.#data.mapping[category][group])
		{
			this.#data.mapping[category][group] = [];
		}
		return [category, group];
	}

	addBool(category, description, group, name, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "bool", category: category, description: description, group: group, name: name, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addValue(category, description, group, name, min, max, step, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "value", category: category, description: description, group: group, name: name, min: min, max: max, step: step, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addText(category, description, group, name, length, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "text", category: category, description: description, group: group, name: name, length: length, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addList(category, description, group, name, size, item_name, item_valid, item_enum, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "list", category: category, description: description, group: group, name: name, size: size, item_name: item_name, item_valid: item_valid, item_enum: item_enum, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addEnum(category, description, group, name, min, max, mapping, etype, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "enum", category: category, description: description, group: group, name: name, min: min, max: max, etype: etype, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addBoolArray(category, description, group, name, value_names, size, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "bool_array", category: category, description: description, group: group, name: name, value_names: value_names, size: size, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addBoolList(category, description, group, name, value_names, size, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "bool_list", category: category, description: description, group: group, name: name, value_names: value_names, size: size, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addValueArray(category, description, group, name, value_names, min, max, step, size, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "value_array", category: category, description: description, group: group, name: name, value_names: value_names, min: min, max: max, step: step, size: size, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addTextArray(category, description, group, name, value_names, length, size, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "text_array", category: category, description: description, group: group, name: name, value_names: value_names, length: length, size: size, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addEnumArray(category, description, group, name, value_names, min, max, etype, size, mapping, link, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "enum_array", category: category, description: description, group: group, name: name, value_names: value_names, min: min, max: max, etype: etype, size: size, map_to: mapping, link_to: link, link_from: [], options: options});
	}

	addChild(category, description, group, name, mapping, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "child", category: category, description: description, group: group, name: name, map_to: mapping, options: options});
	}

	addChildArray(category, description, group, name, value_names, size, mapping, options)
	{
		[category, group] = this.initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({data: this, type: "child_array", category: category, description: description, group: group, name: name, value_names: value_names, size: size, map_to: mapping, options: options});
	}

	/*addFunction(category, description, group, name, parameter, mapping, options)
	{
		if(!group)
		{
			group = "";
		}

		if(!category)
		{
			category = "";
		}

		this.#data.functions.push({type: "child", category: category, description: description, group: group, name: name, parameter: parameter, map_to: mapping, options: options});
	}

	addOption(category, description, group, option)
	{
		initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({});
	}

	addWidget(category, description, group, mapping, widget, link, options)
	{
		initCategoryGroup(category, group);
		this.#data.mapping[category][group].push({});
	}*/

	apply()
	{
		let data_info_mapping = this.getInfo().mapping;

		for(let category in data_info_mapping)
		{
			let cdata = data_info_mapping[category];
			for(let group in cdata)
			{
				let gdata = cdata[group];
				for(let i = 0; i < gdata.length; i++)
				{
					let readonly = false;
					if(gdata[i].options)
					{
						for(let ii = 0; ii < gdata[i].options.length; ii++)
						{
							if(gdata[i].options[ii].access)
							{
								if(gdata[i].options[ii].access == "readonly")
								{
									readonly = true;
								}
							}
						}
					}

					switch(gdata[i].type)
					{
						case "bool":
						case "value":
						case "text":
						case "enum":
						{
							if(!readonly)
							{
								if(gdata[i].new_value != undefined)
								{
									gdata[i].data[gdata[i].map_to] = gdata[i].new_value;
									gdata[i].new_value = undefined;
								}
							}
						}
						break;

						case "text_array":
						case "enum_array":
						case "value_array":
						case "bool_array":
						{
							if(!readonly)
							{
								if(gdata[i].new_value)
								{
									let curval = gdata[i].data[gdata[i].map_to];
									let changed = false;
									for(let ii = 0; ii < curval.length; ii++)
									{
										if(gdata[i].new_value[ii] != undefined)
										{
											curval[ii] = gdata[i].new_value[ii];
											gdata[i].new_value[ii] = undefined;
											changed = true;
										}
									}
									if(changed)
									{
										gdata[i].data[gdata[i].map_to] = curval;
									}
								}
							}
						}
						break;

						case "child":
						{
							gdata[i].data[gdata[i].map_to].apply();
						}
						break;

						case "list":
						case "child_array":
						{
							let cd = gdata[i].data[gdata[i].map_to];
							for(let ii = 0; ii < cd.length; ii++)
							{
								cd[ii].apply();
							}
						}
						break;

						default:
						{
							console.log(i18n`APPLY UNKNOWN TYPE!!!! -> Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}'`);
						}
						break
					}
				}
			}
		}
	}

}