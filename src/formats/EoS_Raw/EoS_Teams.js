import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_Team } from "./EoS_Team.js";

export class EoS_Teams extends DataMapping
{
	#view = null;
	#mainteam = null;
	#specialteam = null;
	#rescueteam = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Teams`);*/


		let bit_offset = 0;

		this.#mainteam = new EoS_Team(new EoS_DataBitView(this.#view,bit_offset,0x000008D9));
		bit_offset += 0x000008D9;

		this.#specialteam = new EoS_Team(new EoS_DataBitView(this.#view,bit_offset,0x000008D9));
		bit_offset += 0x000008D9;

		this.#rescueteam = new EoS_Team(new EoS_DataBitView(this.#view,bit_offset,0x000008D9));
		bit_offset += 0x000008D9;

		this.addChild("Main Story Team", "", null, "Main Story Team", "mainteam", [{access: "readonly"}]);
		this.addChild("Special Episode Team", "", null, "Special Episode Team", "specialteam", [{access: "readonly"}]);
		this.addChild("Friend Rescue Tream", "", null, "Friend Rescue Tream", "rescueteam", [{access: "readonly"}]);
	}

	get mainteam()
	{
		return this.#mainteam;
	}

	get specialteam()
	{
		return this.#specialteam;
	}

	get rescueteam()
	{
		return this.#rescueteam;
	}
}

