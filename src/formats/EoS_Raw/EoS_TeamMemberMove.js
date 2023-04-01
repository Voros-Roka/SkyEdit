import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_TeamMemberMove extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Team Member Move`);

		console.log(i18n`flags is '${this.flags}'`);
		console.log(i18n`id is '${this.id.toString(16)}'`);
		console.log(i18n`pp is '${this.pp.toString(16)}'`);
		console.log(i18n`ginseng is '${this.ginseng.toString(16)}'`);*/

		this.addBoolArray(null, "", "Move", "Flags", ["Exists","Linked","Allow AI", "Set", "Sealed"], 5, "flags", null, []);
		this.addEnum(null, "", "Move", "Move", 0, 1023, "id", EoS_GetEnum("eos_move"), null, [{display: "dec"}]);
		this.addValue(null,"", "Move", "PP", 0, 127, 1, "pp", null, [{display: "dec"}]);
		this.addValue(null,"", "Move", "Ginseng", 0, 127, 1, "ginseng", null, [{display: "dec"}]);
	}

	get flags()
	{
		return this.#view.getBoolArray(0x00000000,0x00000005);
	}

	set flags(value)
	{
		this.#view.setBoolArray(0x00000000,value,0x00000005);
	}

	get id()
	{
		return this.#view.getUint16(0x00000005,true,0x0000000A);
	}

	set id(value)
	{
		this.#view.setUint16(0x00000005,value,true,0x0000000A);
	}

	get pp()
	{
		return this.#view.getUint8(0x0000000F,0x00000007);
	}

	set pp(value)
	{
		this.#view.setUint8(0x0000000F,value,0x00000007);
	}

	get ginseng()
	{
		return this.#view.getUint8(0x00000016,0x00000007);
	}

	set ginseng(value)
	{
		this.#view.setUint8(0x00000016,value,0x00000007);
	}
}