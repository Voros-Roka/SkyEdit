import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_StoredItem extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Stored Item`);

		console.log(i18n`id is '${this.id.toString(16)}'`);
		console.log(i18n`quantity is '${this.quantity.toString(16)}'`);*/

		this.addEnum(null, "", null, "Item", 0, 2047, "id", EoS_GetEnum("eos_item"), null, [{display: "dec"}]);
		this.addValue(null,"", null, "Quantity", 0, 2047, 1, "quantity", null, [{display: "dec"}]);
	}

	get id()
	{
		return this.#view.getUint16(0x00000000,true,0x0000000B);
	}

	set id(value)
	{
		this.#view.setUint16(0x00000000,value,true,0x0000000B);
	}

	get quantity()
	{
		return this.#view.getUint16(0x00002AF8,true,0x0000000B);
	}

	set quantity(value)
	{
		this.#view.setUint16(0x00002AF8,value,true,0x0000000B);
	}
}