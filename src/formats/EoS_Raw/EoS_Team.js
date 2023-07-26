import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_TeamMember } from "./EoS_TeamMember.js";

export class EoS_Team extends DataMapping
{
	#view = null;
	#members = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Teams Team`);

		console.log(i18n`unknown000 is '${this.unknown000.toString()}'`);
		console.log(i18n`unknown001 is '${this.unknown001.toString(16)}'`);
		console.log(i18n`index is '${this.index}'`);*/

		let bit_offset = 0x00000051;
		for(let i = 0; i < 4;i++)
		{
			this.#members[i] = new EoS_TeamMember(new EoS_DataBitView(this.#view,bit_offset,0x00000222));
			bit_offset += 0x00000222;
		}


		this.addValueArray("Team Info","", null, "Assembly Index", null, 0, 0xFFFF, 1, 4, "index", null, [{display: "dec"}]);
		this.addBool("Team Info", "", null, "Unknown000", "unknown000", null, []);
		this.addValue("Team Info","", null, "Unknown001", 0, 0xFFFF, 1, "unknown001", null, [{display: "hex"}]);

		this.addList("Team Members", "", null, "Team Members", 4, "name", "isvalid", null, "members", null, [])

	}

	get unknown000()
	{
		return this.#view.getBool(0x0000000);
	}

	set unknown000(value)
	{
		this.#view.setBool(0x0000000,value);
	}

	get unknown001()
	{
		return this.#view.getUint16(0x0000001,true,0x00000010);
	}

	set unknown001(value)
	{
		this.#view.setUint16(0x00000001,value,true,0x00000010);
	}

	get index()
	{
		return this.#view.getUint16Array(0x0000011,4,true,0x00000010);
	}

	set index(value)
	{
		this.#view.setUint16Array(0x00000011,4,value,true,0x00000010);
	}

	get members()
	{
		return this.#members;
	}
}
