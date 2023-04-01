import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_MissionUnknown } from "./EoS_MissionUnknown.js";
import { EoS_MissionSet } from "./EoS_MissionSet.js";
import { EoS_Mission } from "./EoS_Mission.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Missions extends DataMapping
{
	#view = null;
	#normalmissions = null;
	#acceptedmissions = null;
	#outlawmissions = null;
	#cafemission = null;
	#bottlemission = null;
	#unknown = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Missions`);*/

		let bit_offset = 0x00000000;
		/*for(let i = 0; i < 3;i++)
		{
			this.#sets[i] = new EoS_MissionSet(new EoS_DataBitView(this.#view,bit_offset,0x00000410));
			bit_offset += 0x00000410;
		}*/

		this.#normalmissions = new EoS_MissionSet(new EoS_DataBitView(this.#view,bit_offset,0x00000410));
		bit_offset += 0x00000410;
		this.#acceptedmissions = new EoS_MissionSet(new EoS_DataBitView(this.#view,bit_offset,0x00000410));
		bit_offset += 0x00000410;
		this.#outlawmissions = new EoS_MissionSet(new EoS_DataBitView(this.#view,bit_offset,0x00000410));
		bit_offset += 0x00000410;

		this.#cafemission = new EoS_Mission(new EoS_DataBitView(this.#view,0x00000C30,0x00000082));
		this.#bottlemission = new EoS_Mission(new EoS_DataBitView(this.#view,0x00000CB2,0x00000082));

		bit_offset = 0x00000D34;
		for(let i = 0; i < 16;i++)
		{
			this.#unknown[i] = new EoS_MissionUnknown(new EoS_DataBitView(this.#view,bit_offset,0x00000048));
			bit_offset += 0x00000048;
		}


		this.addChild("Job Bulletin Board", "", null, "Job Bulletin Board", "normalmissions", [{access: "readonly"}]);
		this.addChild("Accepted Jobs", "", null, "Accepted Jobs", "acceptedmissions", [{access: "readonly"}]);
		this.addChild("Outlaw Notice Board", "", null, "Outlaw Notice Board", "outlawmissions", [{access: "readonly"}]);

		this.addChild("Cafe job", "", null, "Cafe Mission", "cafemission", [{access: "readonly"}]);
		this.addChild("Message in a Bottle", "", null, "Message in a Bottle", "bottlemission", [{access: "readonly"}]);

		this.addList("Unknown", "", null, "Unknown", 16, "dungeon", "status", EoS_GetEnum("eos_dungeon"), "unknown", [{access: "readonly"}]);

	}

	get normalmissions()
	{
		return this.#normalmissions;
	}

	get acceptedmissions()
	{
		return this.#acceptedmissions;
	}

	get outlawmissions()
	{
		return this.#outlawmissions;
	}

	get cafemission()
	{
		return this.#cafemission;
	}

	get bottlemission()
	{
		return this.#bottlemission;
	}

	get unknown()
	{
		return this.#unknown;
	}
}