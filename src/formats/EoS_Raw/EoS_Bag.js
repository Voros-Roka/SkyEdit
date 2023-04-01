import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_Item } from "./EoS_Item.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Bag extends DataMapping
{
	#view = null;
	#items = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Items Bag`);*/

		let bit_offset = 0;
		for(let i = 0; i < 50;i++)
		{
			this.#items[i] = new EoS_Item(new EoS_DataBitView(this.#view,bit_offset,0x00000021));
			bit_offset += 0x00000021;
		}


		//this.addChildArray(null, "", null, "Items", null, 50, "items", [{access: "readonly"}]);


		this.addList(null, "", null, "Items", 50, "id", "exists", EoS_GetEnum("eos_item"), "items", null, [])
	}

	get items()
	{
		return this.#items;
	}
}