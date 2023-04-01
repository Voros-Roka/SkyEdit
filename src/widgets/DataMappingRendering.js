import { i18n } from "../utils.js"

import { createValue } from "./Value.js"
import { createValueArray } from "./ValueArray.js"
import { createEnum } from "./Enum.js"
import { createEnumArray } from "./EnumArray.js"
import { createBool } from "./Bool.js"
import { createBoolArray } from "./BoolArray.js"
import { createText } from "./Text.js"
import { createList } from "./List.js"
import { createGroup } from "./Group.js"

function mapping_render_type(container, content, data, entry, depth, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback)
{
	switch(entry.type)
	{
		case "bool":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let bool = createBool(content, content.id + "_b_" + entry.map_to, data, entry, change_callback);
			bool.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "value":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let value = createValue(content, content.id + "_v_" + entry.map_to, data, entry, change_callback);
			value.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "text":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let text = createText(content, content.id + "_t_" + entry.map_to, data, entry, change_callback);
			text.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "enum":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let e = createEnum(content, content.id + "_e_" + entry.map_to, data, entry, change_callback);
			e.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "list":
		{
			let l = createList(content, content.id + "_l_" + entry.map_to, data, entry, entry.item_name, entry.item_valid, entry.item_enum, change_callback);
			l.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "bool_array":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let ba = createBoolArray(content, content.id + "_ba_" + entry.map_to, data, entry, change_callback);
			ba.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "value_array":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let va = createValueArray(content, content.id + "_va_" + entry.map_to, data, entry, change_callback);
			va.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "text_array":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
		}
		break;

		case "enum_array":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let ea = createEnumArray(content, content.id + "_ea_" + entry.map_to, data, entry, change_callback);
			ea.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "bool_list":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}', value: '${data[entry.map_to].toString()}'`);
			let bl = createBoolList(content, content.id + "_bl_" + entry.map_to, data, entry, change_callback);
			bl.then((element) => {
				content.appendChild(element);
			});
		}
		break;

		case "child":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}'`);
			mapping_render_recursive(container, content, data[entry.map_to], depth+1, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback);
		}
		break;

		case "child_array":
		{
			//console.log(i18n`Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}'`);
			for(let i = 0; i < data[entry.map_to].length; i++)
			{
				mapping_render_recursive(container, content, data[entry.map_to][i], depth+1, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback);
			}
		}
		break;

		default:
		{
			console.log(i18n`UNKNOWN TYPE!!!! -> Category: '${entry.category}', Group: '${entry.group}', name: '${entry.name}', type: '${entry.type}'`);
		}
		break
	}
}

function mapping_render_recursive(container, content, data, depth, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback)
{
	return new Promise((resolve, reject) => {
		if(data && data.getInfo)
		{
			let data_info = data.getInfo();
			let data_info_mapping = data_info.mapping;
			let callback_data = {};

			if(enter_callback)
			{
				[container,content] = enter_callback(callback_data, container, content, data, depth);
			}

			for(let category in data_info_mapping)
			{
				let cdata = data_info_mapping[category];
				let category_container = container;
				let category_content = content;
				if(category_callback)
				{
					[category_container,category_content] = category_callback(callback_data, category_container, category_content, data, depth, category);
				}
				let group_count = 0;
				for(let group in cdata)
				{
					let gdata = cdata[group];

					let group_container = category_container;
					let group_content = category_content;
					if(group_callback)
					{
						[group_container, group_content] = group_callback(callback_data, category_container, category_content, data, depth, category, group);
					}
					if(group != "")
					{
						let [gelement, gcontent] = createGroup(group_content,content.id + "_g" + group_count, group);
						group_content.appendChild(gelement);
						group_content = gcontent;
						group_count++;
					}

					for(let i = 0; i < gdata.length; i++)
					{
						if(value_callback)
						{
							group_container = value_callback(callback_data, group_container, group_content, data, depth, category, group, i);
						}

						mapping_render_type(group_container, group_content, data,gdata[i], depth, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback);
					}
				}
			}

			if(exit_callback)
			{
				exit_callback(callback_data, container, content, data, depth);
			}
		}
	});
}

export function mapping_render(container, content, data, index, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback)
{
	return new Promise((resolve, reject) => {
		if(Array.isArray(data))
		{
			if(typeof index == "number")
			{
				data = data[index];
				mapping_render_recursive(container, content, data, 0, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback);
			}
			else
			{
				for(let i = 0; i < data.length; i++)
				{
					mapping_render_recursive(container, content, data, 0, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback);
				}
			}
		}
		else
		{
			mapping_render_recursive(container, content, data, 0, enter_callback, exit_callback, category_callback, group_callback, value_callback, change_callback);
		}
		resolve([container,content]);
	});
}