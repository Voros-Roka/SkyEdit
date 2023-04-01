import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_ShopItem } from "./EoS_ShopItem.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Shop extends DataMapping
{
	#view = null;
	#kec_green = [];
	#kec_purple = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Items Shop`);*/

		let bit_offset = 0;
		for(let i = 0; i < 8;i++)
		{
			this.#kec_green[i] = new EoS_ShopItem(new EoS_DataBitView(this.#view,bit_offset,0x00000016));
			bit_offset += 0x00000016;
		}

		bit_offset = 0x000000B0;
		for(let i = 0; i < 4;i++)
		{
			this.#kec_purple[i] = new EoS_ShopItem(new EoS_DataBitView(this.#view,bit_offset,0x00000016));
			bit_offset += 0x00000016;
		}

		this.addList("Green", "", null, "Kecleon Green", 8, "id", null, EoS_GetEnum("eos_item"), "shop_green", null, [])
		this.addList("Purple", "", null, "Kecleon Purple", 4, "id", null, EoS_GetEnum("eos_item"), "shop_purple", null, [])
	}

	get shop_green()
	{
		return this.#kec_green;
	}

	get shop_purple()
	{
		return this.#kec_purple;
	}
}