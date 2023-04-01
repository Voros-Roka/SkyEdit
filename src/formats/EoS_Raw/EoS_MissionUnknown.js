import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_MissionUnknown extends DataMapping
{
	#view = null;
	#moves = [];
	#item = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Mission Unknown`);

		console.log(i18n`unknown00 is '${this.unknown00.toString(16)}'`);
		console.log(i18n`unknown20 is '${this.unknown20.toString(16)}'`);
		console.log(i18n`dungeon is '${this.dungeon.toString(16)}'`);
		console.log(i18n`floor is '${this.floor.toString(16)}'`);*/


		this.addValue(null,"", null, "Unknown00", 0, 0xFFFFFFFF, 1, "unknown00", null, [{display: "hex"}]);
		this.addValue(null,"", null, "Unknown20", 0, 0xFFFFFF, 1, "unknown20", null, [{display: "hex"}]);
		this.addEnum(null, "", null, "Dungeon", 0, 255, "dungeon", EoS_GetEnum("eos_dungeon"), null, [{display: "dec"}]);
		this.addValue(null,"", null, "Floor", 0, 0xFFFFFF, 1, "floor", null, [{display: "hex"}]);

	}

	get unknown00()
	{
		return this.#view.getUint32(0x00000000,true,0x00000020);
	}

	set unknown00(value)
	{
		this.#view.setUint32(0x00000000,value,true,0x00000020);
	}

	get unknown20()
	{
		return this.#view.getUint32(0x00000020,true,0x00000018);
	}

	set unknown20(value)
	{
		this.#view.setUint32(0x00000020,value,true,0x00000018);
	}

	get dungeon()
	{
		return this.#view.getUint8(0x00000038,0x00000008);
	}

	set dungeon(value)
	{
		this.#view.setUint8(0x00000038,value,0x00000008);
	}

	get floor()
	{
		return this.#view.getUint8(0x00000040,0x00000008);
	}

	set floor(value)
	{
		this.#view.setUint8(0x00000040,value,0x00000008);
	}
}