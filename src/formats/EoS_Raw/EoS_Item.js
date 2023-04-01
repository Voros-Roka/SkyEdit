import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Item extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Item`);

		console.log(i18n`flags is '${this.flags}'`);
		console.log(i18n`quantity is '${this.quantity.toString(16)}'`);
		console.log(i18n`id is '${this.id.toString(16)}'`);
		console.log(i18n`heldby is '${this.heldby.toString(16)}'`);*/

		this.addBool(null, "", null, "Exists", "exists", null, []);
		this.addBoolArray(null, "", null, "Flags", ["In Shop","Unpaid", "Sticky", "Set", "Unknown0", "Unknown1", "Unknown2"], 7, "flags", null, []);
		this.addEnum(null, "", null, "Item", 0, 2047, "id", EoS_GetEnum("eos_item"), null, [{display: "dec"}]);
		this.addValue(null,"", null, "Quantity", 0, 2047, 1, "quantity", null, [{display: "dec"}]);
		this.addEnum(null,"", null, "Held By", 0, 7, "heldby", EoS_GetEnum("eos_held_by"), null, [{display: "dec"}]);
	}

	get exists()
	{
		return this.#view.getBool(0x00000000);
	}

	set exists(value)
	{
		this.#view.setBool(0x00000000,value);
	}

	get flags()
	{
		return this.#view.getBoolArray(0x00000001,0x00000007);
	}

	set flags(value)
	{
		this.#view.setBoolArray(0x00000001,value,0x00000007);
	}

	get quantity()
	{
		return this.#view.getUint16(0x00000008,true,0x0000000B);
	}

	set quantity(value)
	{
		this.#view.setUint16(0x00000008,value,true,0x0000000B);
	}

	get id()
	{
		return this.#view.getUint16(0x00000013,true,0x0000000B);
	}

	set id(value)
	{
		this.#view.setUint16(0x00000013,value,true,0x0000000B);
	}

	get heldby()
	{
		return this.#view.getUint8(0x0000001E,0x00000003);
	}

	set heldby(value)
	{
		this.#view.setUint8(0x0000001E,value,0x00000003);
	}
}