import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_Mission } from "./EoS_Mission.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_MissionSet extends DataMapping
{
	#view = null;
	#missions = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Mission Set`);*/

		let bit_offset = 0x00000000;
		for(let i = 0; i < 8;i++)
		{
			this.#missions[i] = new EoS_Mission(new EoS_DataBitView(this.#view,bit_offset,0x00000082));
			bit_offset += 0x00000082;
		}

		this.addList(null, "", null, "Missions", 8, "dungeon", "status", EoS_GetEnum("eos_dungeon"), "missions", [{access: "readonly"}]);

	}

	get missions()
	{
		return this.#missions;
	}
}