import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_AssemblyMemberMove } from "./EoS_AssemblyMemberMove.js";

import { EoS_GetEnum } from "./EoS_Enums.js";
import { EoS_GetArrayNames } from "./EoS_ArrayNames.js";

export class EoS_SOSMailHelper extends DataMapping
{
	#view = null;
	#moves = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Sos Mail Helper`);
		console.log(i18n`flags is '${this.flags.toString()}'`);
		console.log(i18n`level is '${this.level.toString(16)}'`);
		console.log(i18n`joineddungeon is '${this.joineddungeon.toString(16)}'`);
		console.log(i18n`joinedfloor is '${this.joinedfloor.toString(16)}'`);
		console.log(i18n`id is '${this.id.toString(16)}'`);
		console.log(i18n`lvlat1stevo is '${this.lvlat1stevo.toString(16)}'`);
		console.log(i18n`lvlat2ndevo is '${this.lvlat2ndevo.toString(16)}'`);
		console.log(i18n`iq is '${this.iq.toString(16)}'`);
		console.log(i18n`hp is '${this.hp.toString(16)}'`);
		console.log(i18n`atk is '${this.atk.toString(16)}'`);
		console.log(i18n`spatk is '${this.spatk.toString(16)}'`);
		console.log(i18n`def is '${this.def.toString(16)}'`);
		console.log(i18n`spdef is '${this.spdef.toString(16)}'`);
		console.log(i18n`exp is '${this.exp.toString(16)}'`);
		console.log(i18n`iqflags is '${this.iqflags}'`);
		console.log(i18n`tactic is '${this.tactic.toString(16)}'`);
		console.log(i18n`name is '${this.name.toString()}'`);
		console.log(i18n`itemquantity is '${this.itemquantity.toString(16)}'`);
		console.log(i18n`itemid is '${this.itemid.toString(16)}'`);*/

		let bit_offset = 0x000000C9;
		for(let i = 0; i < 4;i++)
		{
			this.#moves[i] = new EoS_AssemblyMemberMove(new EoS_DataBitView(this.#view,bit_offset,0x00000015));
			bit_offset += 0x00000015;
		}

		this.addBoolArray(null, "", "Info", "Flags", null, 4, "flags", null, []); //
		this.addEnum(null, "", "Info", "Id", 0, 2047, "id", EoS_GetEnum("eos_monster_id"), null, [{display: "dec"}]); //
		this.addText(null, "", "Info", "Name", 10, "name", null, []) //
		this.addEnum(null, "", "Info", "Joined at Dungeon", 0, 255, "joineddungeon", EoS_GetEnum("eos_dungeon"), null, [{display: "dec"}]); //
		this.addValue(null,"", "Info", "Joined at Floor", 0, 255, 1, "joinedfloor", null, [{display: "dec"}]); //


		this.addValue(null,"", "Evolution", "Level", 0, 127, 1, "level", null, [{display: "dec"}]); //
		this.addValue(null,"", "Evolution", "Experince", 0, 0x3FFFF, 1, "exp", null, [{display: "dec"}]); //
		this.addValue(null,"", "Evolution", "Level at first evolution", 0, 127, 1, "lvlat1stevo", null, [{display: "dec"}]); //
		this.addValue(null,"", "Evolution", "Level at second evolution", 0, 127, 1, "lvlat2ndevo", null, [{display: "dec"}]); //

		this.addValue(null,"", "Stats", "HP", 0, 1023, 1, "hp", null, [{display: "dec"}]); //
		this.addValue(null,"", "Stats", "Attack", 0, 255, 1, "atk", null, [{display: "dec"}]); //
		this.addValue(null,"", "Stats", "Special Attack", 0, 255, 1, "spatk", null, [{display: "dec"}]); //
		this.addValue(null,"", "Stats", "Defence", 0, 255, 1, "def", null, [{display: "dec"}]); //
		this.addValue(null,"", "Stats", "Special Defence", 0, 255, 1, "spdef", null, [{display: "dec"}]); //

		this.addEnum(null, "", "Held Item", "Item", 0, 2047, "itemid", EoS_GetEnum("eos_item"), null, [{display: "dec"}]);
		this.addValue(null,"", "Held Item", "Quantity", 0, 2047, 1, "itemquantity", null, [{display: "dec"}]);


		this.addValue(null,"", "Abilities", "IQ", 0, 1023, 1, "iq", null, [{display: "dec"}]); //
		this.addBoolArray(null, "", "Abilities", "IQ Flags", EoS_GetArrayNames("eos_iq_skills"), 45, "iqflags", null, []); //
		this.addEnum(null, "", "Abilities", "Tactic", 0, 255, "tactic", EoS_GetEnum("eos_tactic"), null, [{display: "dec"}]); //

		this.addChildArray(null, "", "Moves", "Moves", null, 4, "moves", [{access: "readonly"}]); //
	}

	get flags()
	{
		return this.#view.getBoolArray(0x00000000,0x00000004);
	}

	set flags(value)
	{
		this.#view.setBoolArray(0x00000000,0x00000004,value);
	}

	get level()
	{
		return this.#view.getUint8(0x00000004,0x00000007);
	}

	set level(value)
	{
		this.#view.setUint8(0x00000004,value,0x00000007);
	}

	get joineddungeon()
	{
		return this.#view.getUint8(0x0000000B,0x00000008);
	}

	set joineddungeon(value)
	{
		this.#view.setUint8(0x0000000B,value,0x00000008);
	}

	get joinedfloor()
	{
		return this.#view.getUint8(0x00000013,0x00000008);
	}

	set joinedfloor(value)
	{
		this.#view.setUint8(0x00000013,value,0x00000008);
	}

	get id()
	{
		return this.#view.getUint16(0x0000001B,true,0x0000000B);
	}

	set id(value)
	{
		this.#view.setUint16(0x0000001B,value,true,0x0000000B);
	}

	get lvlat1stevo()
	{
		return this.#view.getUint8(0x00000026,0x00000007);
	}

	set lvlat1stevo(value)
	{
		this.#view.setUint8(0x00000026,value,0x00000007);
	}

	get lvlat2ndevo()
	{
		return this.#view.getUint8(0x0000002D,0x00000007);
	}

	set lvlat2ndevo(value)
	{
		this.#view.setUint8(0x0000002D,value,0x00000007);
	}

	get iq()
	{
		return this.#view.getUint16(0x00000034,true,0x0000000A);
	}

	set iq(value)
	{
		this.#view.setUint16(0x00000034,value,true,0x0000000A);
	}

	get hp()
	{
		return this.#view.getUint16(0x0000003E,true,0x0000000A);
	}

	set hp(value)
	{
		this.#view.setUint16(0x0000003E,value,true,0x0000000A);
	}

	get atk()
	{
		return this.#view.getUint8(0x00000048,0x00000008);
	}

	set atk(value)
	{
		this.#view.setUint8(0x00000048,value,0x00000008);
	}

	get spatk()
	{
		return this.#view.getUint8(0x00000050,0x00000008);
	}

	set spatk(value)
	{
		this.#view.setUint8(0x00000050,value,0x00000008);
	}

	get def()
	{
		return this.#view.getUint8(0x00000058,0x00000008);
	}

	set def(value)
	{
		this.#view.setUint8(0x00000058,value,0x00000008);
	}

	get spdef()
	{
		return this.#view.getUint8(0x00000060,0x00000008);
	}

	set spdef(value)
	{
		this.#view.setUint8(0x00000060,value,0x00000008);
	}

	get exp()
	{
		return this.#view.getUint32(0x00000078,true,0x00000018);
	}

	set exp(value)
	{
		this.#view.setUint32(0x00000078,value,true,0x00000018);
	}

	get iqflags()
	{
		return this.#view.getBoolArray(0x00000080,0x00000045);
	}

	set iqflags(value)
	{
		this.#view.setBoolArray(0x00000080,0x00000045,value);
	}

	get tactic()
	{
		return this.#view.getUint8(0x000000C5,0x00000004);
	}

	set tactic(value)
	{
		this.#view.setUint8(0x000000C5,value,0x00000004);
	}

	get moves()
	{
		return this.#moves;
	}

	get name()
	{
		return this.#view.getString("windows-1252",0x0000011D,10);
	}

	set name(value)
	{
		this.#view.setString("windows-1252",0x0000011D,value,10,true);
	}

	get itemquantity()
	{
		return this.#view.getUint16(0x0000016D,true,0x0000000B);
	}

	set itemquantity(value)
	{
		this.#view.setUint16(0x0000016D,value,true,0x0000000B);
	}

	get itemid()
	{
		return this.#view.getUint16(0x00000178,true,0x0000000B);
	}

	set itemid(value)
	{
		this.#view.setUint16(0x00000178,value,true,0x0000000B);
	}
}