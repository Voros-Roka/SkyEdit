import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_AssemblyMemberMove extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		//console.log(i18n`Parsing EoS Savefile Slot Assembly Member Move`);

		//console.log(i18n`flags is '${this.flags}'`); //(EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
		//console.log(i18n`id is '${this.id.toString(16)}'`);
		//console.log(i18n`ginseng is '${this.ginseng.toString(16)}'`);

		this.addBoolArray(null, "", "Move", "Flags", ["Exists","Linked","Allow AI", "Set"], 4, "flags", null, []);
		this.addEnum(null, "", "Move", "Move", 0, 1023, "id", EoS_GetEnum("eos_move"), null, [{display: "dec"}]);
		this.addValue(null,"", "Move", "Ginseng", 0, 127, 1, "ginseng", null, [{display: "dec"}]);
	}

	get flags()
	{
		return this.#view.getBoolArray(0x00000000,0x00000004);
	}

	set flags(value)
	{
		this.#view.setBoolArray(0x00000000,0x00000004,value);
	}

	get id()
	{
		return this.#view.getUint16(0x00000004,true,0x0000000A);
	}

	set id(value)
	{
		this.#view.setUint16(0x00000004,value,true,0x0000000A);
	}

	get ginseng()
	{
		return this.#view.getUint8(0x000000E,0x00000007);
	}

	set ginseng(value)
	{
		this.#view.setUint8(0x000000E,value,0x00000007);
	}
}