import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_AssemblyMember } from "./EoS_AssemblyMember.js";

export class EoS_Assembly extends DataMapping
{
	#view = null;
	#members = [];
	#othermembers = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Assembly`);*/

		let bit_offset = 0;

		for(let i = 0; i < 555;i++)
		{
			this.#members[i] = new EoS_AssemblyMember(new EoS_DataBitView(this.#view,bit_offset,0x0000016A));
			bit_offset += 0x0000016A;
		}

		/*console.log(i18n`unknown310CE is '${this.unknown310CE}'`);
		console.log(i18n`unknown3110E is '${this.unknown3110E.toString(16)}'`);
		console.log(i18n`unknown31112 is '${this.unknown31112.toString(16)}'`);
		console.log(i18n`unknown31116 is '${this.unknown31116}'`);*/

		bit_offset = 0x00031166
		for(let i = 0; i < 4;i++)
		{
			this.#othermembers[i] = new EoS_AssemblyMember(new EoS_DataBitView(this.#view,bit_offset,0x0000016A));
			bit_offset += 0x0000016A;
		}

		//this.addChildArray("Members", "", null, "Members", null, 555, "members", [{access: "readonly"}]);
		//this.addChildArray("Other Members", "", null, "Other Members", null, 4, "othermembers", [{access: "readonly"}]);
		this.addList("Members", "", null, "Members", 555, "name", "isvalid", null, "members", null, [])
		this.addList("Other Members", "", null, "Other Members", 4, "name", "isvalid", null, "othermembers", null, [])

		this.addValueArray("Unknown","", null, "Unknown 310CE", null, 0, 0xFF, 1, 8, "unknown310CE", null, [{display: "hex"}]);
		this.addValue("Unknown","", null, "Unknown 3110E", 0, 0xFF, 1, "unknown3110E", null, [{display: "hex"}]);
		this.addValue("Unknown","", null, "Unknown 31112", 0, 0xFF, 1, "unknown31112", null, [{display: "hex"}]);
		this.addValueArray("Unknown","", null, "Unknown 31116", null, 0, 0xFF, 1, 8, "unknown31116", null, [{display: "hex"}]);

	}

	get members()
	{
		return this.#members;
	}

	get unknown310CE()
	{
		return this.#view.getUint8Array(0x000310CE,8,8);
	}

	set unknown310CE(value)
	{
		this.#view.setUint8Array(0x000310CE,value,8,8);
	}

	get unknown3110E()
	{
		return this.#view.getUint8(0x0003110E,4);
	}

	set unknown3110E(value)
	{
		this.#view.setUint8(0x0003110E,value,4);
	}

	get unknown31112()
	{
		return this.#view.getUint8(0x00031112,4);
	}

	set unknown31112(value)
	{
		this.#view.setUint8(0x00031112,value,4);
	}

	get unknown31116()
	{
		return this.#view.getUint8Array(0x00031116,8,10);
	}

	set unknown31116(value)
	{
		this.#view.setUint8Array(0x00031116,value,8,10);
	}

	get othermembers()
	{
		return this.#othermembers;
	}

}