import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_TeamMemberMove } from "./EoS_TeamMemberMove.js";
import { EoS_Item } from "./EoS_Item.js";

import { EoS_GetEnum } from "./EoS_Enums.js";
import { EoS_GetArrayNames } from "./EoS_ArrayNames.js";

export class EoS_TeamMember extends DataMapping
{
	#view = null;
	#moves = [];
	#item = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Team Member`);
		console.log(i18n`flags is '${this.flags}'`);
		console.log(i18n`level is '${this.level.toString(16)}'`);
		console.log(i18n`joineddungeon is '${this.joineddungeon.toString(16)}'`);
		console.log(i18n`joinedfloor is '${this.joinedfloor.toString(16)}'`);
		console.log(i18n`iq is '${this.iq.toString(16)}'`);
		console.log(i18n`memberindex is '${this.memberindex.toString(16)}'`);
		console.log(i18n`teamindex is '${this.teamindex.toString(16)}'`);
		console.log(i18n`id is '${this.id.toString(16)}'`);
		console.log(i18n`currenthp is '${this.currenthp.toString(16)}'`);
		console.log(i18n`maxhp is '${this.maxhp.toString(16)}'`);
		console.log(i18n`atk is '${this.atk.toString(16)}'`);
		console.log(i18n`spatk is '${this.spatk.toString(16)}'`);
		console.log(i18n`def is '${this.def.toString(16)}'`);
		console.log(i18n`spdef is '${this.spdef.toString(16)}'`);
		console.log(i18n`exp is '${this.exp.toString(16)}'`);
		console.log(i18n`unknown111 is '${this.unknown111.toString(16)}'`);
		console.log(i18n`curbellyint is '${this.curbellyint.toString(16)}'`);
		console.log(i18n`curbellyfrac is '${this.curbellyfrac.toString(16)}'`);
		console.log(i18n`maxbellyint is '${this.maxbellyint.toString(16)}'`);
		console.log(i18n`maxbellyfrac is '${this.maxbellyfrac.toString(16)}'`);
		console.log(i18n`iqflags is '${this.iqflags}'`);
		console.log(i18n`tactic is '${this.tactic.toString(16)}'`);
		console.log(i18n`unknown1C3 is '${this.unknown1C3.toString(16)}'`);
		console.log(i18n`unknown1CD is '${this.unknown1CD.toString(16)}'`);
		console.log(i18n`name is '${this.name.toString()}'`);*/

		let bit_offset = 0x0000009D;
		for(let i = 0; i < 4;i++)
		{
			this.#moves[i] = new EoS_TeamMemberMove(new EoS_DataBitView(this.#view,bit_offset,0x0000001D));
			bit_offset += 0x0000001D;
		}

		this.#item = new EoS_Item(new EoS_DataBitView(this.#view,0x00000119,0x00000021));

		this.addBool(null, "", "Info", "Is Valid", "isvalid", null, []);
		this.addBoolArray(null, "", "Info", "Flags", ["0","1","2","Is Leader"], 4, "flags", null, []);
		this.addEnum(null, "", "Info", "Id", 0, 2047, "id", EoS_GetEnum("eos_monster_id"), null, [{display: "dec"}]);
		this.addText(null, "", "Info", "Name", 10, "name", null, [])
		this.addEnum(null, "", "Info", "Joined at Dungeon", 0, 255, "joineddungeon", EoS_GetEnum("eos_dungeon"), null, [{display: "dec"}]);
		this.addValue(null,"", "Info", "Joined at Floor", 0, 255, 1, "joinedfloor", null, [{display: "dec"}]);
		this.addValue(null,"", "Info", "Assembly Index", 0, 0xFFFF, 1, "assemblyindex", null, [{display: "dec"}]);
		this.addValue(null,"", "Info", "Team Index", 0, 0xFFFF, 1, "teamindex", null, [{display: "dec"}]);


		this.addValue(null,"", "Evolution", "Level", 0, 127, 1, "level", null, [{display: "dec"}]);
		this.addValue(null,"", "Evolution", "Experince", 0, 0x3FFFF, 1, "exp", null, [{display: "dec"}]);

		this.addValue(null,"", "Stats", "Current HP", 0, 1023, 1, "currenthp", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Max HP", 0, 1023, 1, "maxhp", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Attack", 0, 255, 1, "atk", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Special Attack", 0, 255, 1, "spatk", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Defence", 0, 255, 1, "def", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Special Defence", 0, 255, 1, "spdef", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Current Belly integer", 0, 0xFFFF, 1, "curbellyint", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Current Belly fraction", 0, 0xFFFF, 1, "curbellyfrac", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Max Belly integer", 0, 0xFFFF, 1, "maxbellyint", null, [{display: "dec"}]);
		this.addValue(null,"", "Stats", "Max Belly fraction", 0, 0xFFFF, 1, "maxbellyfrac", null, [{display: "dec"}]);


		this.addValue(null,"", "Abilities", "IQ", 0, 1023, 1, "iq", null, [{display: "dec"}]);
		this.addBoolArray(null, "", "Abilities", "IQ Flags", EoS_GetArrayNames("eos_iq_skills"), 45, "iqflags", null, []);
		this.addEnum(null, "", "Abilities", "Tactic", 0, 255, "tactic", EoS_GetEnum("eos_tactic"), null, [{display: "dec"}]);

		this.addChildArray(null, "", "Moves", "Moves", null, 4, "moves", [{access: "readonly"}]);
		this.addChild(null, "", "Held Item", "Held Item", "item", [{access: "readonly"}]);


		this.addValue(null,"", "Unknown", "Unknown111", 0, 1023, 1, "unknown111", null, [{display: "dec"}]);
		this.addValue(null,"", "Unknown", "Unknown1C3", 0, 1023, 1, "unknown1C3", null, [{display: "dec"}]);
		this.addValue(null,"", "Unknown", "Unknown1CD", 0, 1023, 1, "unknown1CD", null, [{display: "dec"}]);
	}

	get isvalid()
	{
		return this.#view.getBool(0x00000000);
	}

	set isvalid(value)
	{
		this.#view.setBool(0x00000000,value);
	}

	get flags()
	{
		return this.#view.getBoolArray(0x00000001,0x00000004);
	}

	set flags(value)
	{
		this.#view.setBoolArray(0x00000001,0x00000004,value);
	}

	get level()
	{
		return this.#view.getUint8(0x00000005,0x00000007);
	}

	set level(value)
	{
		this.#view.setUint8(0x00000005,value,0x00000007);
	}

	get joineddungeon()
	{
		return this.#view.getUint8(0x0000000C,0x00000008);
	}

	set joineddungeon(value)
	{
		this.#view.setUint8(0x0000000C,value,0x00000008);
	}

	get joinedfloor()
	{
		return this.#view.getUint8(0x00000014,0x00000008);
	}

	set joinedfloor(value)
	{
		this.#view.setUint8(0x00000014,value,0x00000008);
	}

	get iq()
	{
		return this.#view.getUint16(0x0000001C,true,0x0000000A);
	}

	set iq(value)
	{
		this.#view.setUint16(0x0000001C,value,true,0x0000000A);
	}

	get assemblyindex()
	{
		return this.#view.getUint16(0x00000026,true,0x00000010);
	}

	set assemblyindex(value)
	{
		this.#view.setUint16(0x00000026,value,true,0x00000010);
	}

	get teamindex()
	{
		return this.#view.getUint16(0x00000036,true,0x00000010);
	}

	set teamindex(value)
	{
		this.#view.setUint16(0x00000036,value,true,0x00000010);
	}

	get id()
	{
		return this.#view.getUint16(0x00000046,true,0x0000000B);
	}

	set id(value)
	{
		this.#view.setUint16(0x00000046,value,true,0x0000000B);
	}

	get currenthp()
	{
		return this.#view.getUint16(0x00000051,true,0x0000000A);
	}

	set currenthp(value)
	{
		this.#view.setUint16(0x00000051,value,true,0x0000000A);
	}

	get maxhp()
	{
		return this.#view.getUint16(0x0000005B,true,0x0000000A);
	}

	set maxhp(value)
	{
		this.#view.setUint16(0x0000005B,value,true,0x00000000A);
	}

	get atk()
	{
		return this.#view.getUint8(0x00000065,0x00000008);
	}

	set atk(value)
	{
		this.#view.setUint8(0x00000065,value,0x00000008);
	}

	get spatk()
	{
		return this.#view.getUint8(0x0000006D,0x00000008);
	}

	set spatk(value)
	{
		this.#view.setUint8(0x0000006D,value,0x00000008);
	}

	get def()
	{
		return this.#view.getUint8(0x00000075,0x00000008);
	}

	set def(value)
	{
		this.#view.setUint8(0x00000075,value,0x00000008);
	}

	get spdef()
	{
		return this.#view.getUint8(0x0000007D,0x00000008);
	}

	set spdef(value)
	{
		this.#view.setUint8(0x0000007D,value,0x00000008);
	}

	get exp()
	{
		return this.#view.getUint32(0x00000085,true,0x00000018);
	}

	set exp(value)
	{
		this.#view.setUint32(0x00000085,value,true,0x00000018);
	}

	get moves()
	{
		return this.#moves;
	}

	get unknown111()
	{
		return this.#view.getUint8(0x00000111,0x00000008);
	}

	set unknown111(value)
	{
		this.#view.setUint8(0x00000111,value,0x00000008);
	}

	get item()
	{
		return this.#item;
	}

	get curbellyint()
	{
		return this.#view.getUint16(0x0000013A,true,0x00000010);
	}

	set curbellyint(value)
	{
		this.#view.setUint16(0x0000013A,value,true,0x00000010);
	}

	get curbellyfrac()
	{
		return this.#view.getUint16(0x0000014A,true,0x00000010);
	}

	set curbellyfrac(value)
	{
		this.#view.setUint16(0x0000014A,value,true,0x00000010);
	}

	get maxbellyint()
	{
		return this.#view.getUint16(0x0000015A,true,0x00000010);
	}

	set maxbellyint(value)
	{
		this.#view.setUint16(0x0000015A,value,true,0x00000010);
	}

	get maxbellyfrac()
	{
		return this.#view.getUint16(0x0000016A,true,0x00000010);
	}

	set maxbellyfrac(value)
	{
		this.#view.setUint16(0x0000016A,value,true,0x00000010);
	}

	get iqflags()
	{
		return this.#view.getBoolArray(0x0000017A,0x00000045);
	}

	set iqflags(value)
	{
		this.#view.setBoolArray(0x0000017A,0x00000045,value);
	}

	get tactic()
	{
		return this.#view.getUint8(0x000001BF,0x00000004);
	}

	set tactic(value)
	{
		this.#view.setUint8(0x000001BF,value,0x00000004);
	}

	get unknown1C3()
	{
		return this.#view.getUint16(0x000001C3,true,0x0000000A);
	}

	set unknown1C3(value)
	{
		this.#view.setUint16(0x000001C3,value,true,0x0000000A);
	}

	get unknown1CD()
	{
		return this.#view.getUint8(0x000001CD,0x00000005);
	}

	set unknown1CD(value)
	{
		this.#view.setUint8(0x000001CD,value,0x00000005);
	}

	get name()
	{
		return this.#view.getString("windows-1252",0x000001D2,10);
	}

	set name(value)
	{
		this.#view.setString("windows-1252",0x000001D2,value,10,true);
	}
}
