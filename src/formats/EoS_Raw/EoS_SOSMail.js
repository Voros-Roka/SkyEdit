import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_SOSMail extends DataMapping
{
	#view = null;
	#moves = [];
	#item = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot SOS Mails Mail`);

		console.log(i18n`type is '${this.type.toString(16)}'`);
		console.log(i18n`dungeon is '${this.dungeon.toString(16)}'`);
		console.log(i18n`floor is '${this.floor.toString(16)}'`);
		console.log(i18n`seed is '${this.seed.toString(16)}'`);
		console.log(i18n`unknown02C is '${this.unknown02C}'`);
		console.log(i18n`unknown06C is '${this.unknown06C}'`);
		console.log(i18n`language is '${this.language.toString(16)}'`);
		console.log(i18n`teamname is '${this.teamname.toString()}'`);
		console.log(i18n`unknown100 is '${this.unknown100}'`);
		console.log(i18n`unknown220 is '${this.unknown220}'`);
		console.log(i18n`unknown460 is '${this.unknown460.toString(16)}'`);
		console.log(i18n`unknown46B is '${this.unknown46B.toString(16)}'`);
		console.log(i18n`unknown476 is '${this.unknown476}'`);
		console.log(i18n`unknown4B6 is '${this.unknown4B6.toString(16)}'`);
		console.log(i18n`unknown4BE is '${this.unknown4BE.toString(16)}'`);
		console.log(i18n`unknown4BF is '${this.unknown4BF.toString()}'`);*/


		this.addEnum(null, "", null, "Type", 0, 15, "type", EoS_GetEnum("eos_sos_type"), null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Dungeon", 0, 255, "dungeon", EoS_GetEnum("eos_dungeon"), null, [{display: "dec"}]);
		this.addValue(null,"", null, "Floor", 0, 255, 1, "floor", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Seed", 0, 0xFFFFFF, 1, "seed", null, [{display: "hex"}]);

		this.addValue(null,"", null, "Language", 0, 15, 1, "language", null, [{display: "dec"}]);
		this.addText(null, "", null, "Team Name", 10, "teamname", null, [])

		this.addValueArray(null, "", null, "Unknown02C", null, 0, 0xFF, 1, 8, "unknown02C", null, [{display: "hex"}]);
		this.addValueArray(null, "", null, "Unknown06C", null, 0, 0xFF, 1, 8, "unknown06C", null, [{display: "hex"}]);

		this.addValueArray(null, "", null, "Unknown100", null, 0, 0xFFFFFFFF, 1, 9, "unknown100", null, [{display: "hex"}]);
		this.addValueArray(null, "", null, "Unknown220", null, 0, 0xFFFFFFFF, 1, 18, "unknown220", null, [{display: "hex"}]);

		this.addValue(null,"", null, "Unknown460", 0, 2047, 1, "unknown460", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Unknown46B", 0, 2047, 1, "unknown46B", null, [{display: "dec"}]);
		this.addValueArray(null, "", null, "Unknown476", null, 0, 0xFF, 1, 8, "unknown476", null, [{display: "hex"}]);

		this.addValue(null,"", null, "Unknown4B6", 0, 0xFF, 1, "unknown4B6", null, [{display: "hex"}]);
		this.addValue(null,"", null, "Unknown4BE", 0, 3, 1, "unknown4BE", null, [{display: "hex"}]);

		this.addBool(null, "", null, "Unknown4BF", "unknown4BF", null, []);

	}

	get type()
	{
		return this.#view.getUint8(0x00000000,0x00000004);
	}

	set type(value)
	{
		this.#view.setUint8(0x00000000,value,0x00000004);
	}

	get dungeon()
	{
		return this.#view.getUint8(0x00000004,0x00000008);
	}

	set dungeon(value)
	{
		this.#view.setUint8(0x00000004,value,0x00000008);
	}

	get floor()
	{
		return this.#view.getUint8(0x0000000C,0x00000008);
	}

	set floor(value)
	{
		this.#view.setUint8(0x0000000C,value,0x00000008);
	}

	get seed()
	{
		return this.#view.getUint32(0x00000014,true,0x00000018);
	}

	set seed(value)
	{
		this.#view.setUint32(0x00000014,value,true,0x00000018);
	}

	get unknown02C()
	{
		return this.#view.getUint8Array(0x0000002C,8,8);
	}

	set unknown02C(value)
	{
		this.#view.setUint8Array(0x0000002C,value,8,8);
	}

	get unknown06C()
	{
		return this.#view.getUint8Array(0x0000006C,8,8);
	}

	set unknown06C(value)
	{
		this.#view.setUint8Array(0x0000006C,value,8,8);
	}

	get language()
	{
		return this.#view.getUint8(0x000000AC,0x00000004);
	}

	set language(value)
	{
		this.#view.setUint8(0x000000AC,value,0x00000004);
	}

	get teamname()
	{
		return this.#view.getString("windows-1252",0x000000B0,10);
	}

	set teamname(value)
	{
		this.#view.setString("windows-1252",0x000000B0,value,10,true);
	}

	get unknown100()
	{
		return this.#view.getUint32Array(0x0000006C,9,32);
	}

	set unknown100(value)
	{
		this.#view.setUint32Array(0x0000006C,value,9,32);
	}

	get unknown220()
	{
		return this.#view.getUint32Array(0x00000220,18,32);
	}

	set unknown220(value)
	{
		this.#view.setUint32Array(0x00000220,value,18,32);
	}

	get unknown460()
	{
		return this.#view.getUint16(0x00000460,true,0x0000000B);
	}

	set unknown460(value)
	{
		this.#view.setUint16(0x00000460,value,true,0x0000000B);
	}

	get unknown46B()
	{
		return this.#view.getUint16(0x00000460,true,0x0000000B);
	}

	set unknown46B(value)
	{
		this.#view.setUint16(0x00000460,value,true,0x0000000B);
	}

	get unknown476()
	{
		return this.#view.getUint8Array(0x00000476,8,8);
	}

	set unknown476(value)
	{
		this.#view.setUint8Array(0x00000476,value,8,8);
	}

	get unknown4B6()
	{
		return this.#view.getUint8(0x000004B6,0x00000008);
	}

	set unknown4B6(value)
	{
		this.#view.setUint8(0x000004B6,value,0x00000008);
	}

	get unknown4BE()
	{
		return this.#view.getUint8(0x000004BE,0x00000002);
	}

	set unknown4BE(value)
	{
		this.#view.setUint8(0x000004BE,value,0x00000002);
	}

	get unknown4BF()
	{
		return this.#view.getBool(0x000004BF);
	}

	set unknown4BF(value)
	{
		this.#view.setBool(0x000004BF,value);
	}


}