import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Groagunk extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Groagunk`);

		console.log(i18n`items is '${this.items}'`);*/

		this.addEnumArray(null, "", null, "Items", null, 0, 2047, EoS_GetEnum("eos_item"), 8, "items", null, [{display: "dec"}]);
	}

	get items()
	{
		return this.#view.getUint16Array(0x00000000,0x00000008,true,0x0000000B);
	}

	set items(value)
	{
		this.#view.setUint16Array(0x00000000,0x00000008,value,true,0x0000000B);
	}
}