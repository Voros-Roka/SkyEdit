import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_ScriptVars } from "./EoS_ScriptVars.js";
import { EoS_Assembly } from "./EoS_Assembly.js";
import { EoS_Teams } from "./EoS_Teams.js";
import { EoS_Progress } from "./EoS_Progress.js";
import { EoS_Items } from "./EoS_Items.js";
import { EoS_NameRankPerf } from "./EoS_NameRankPerf.js";
import { EoS_Options } from "./EoS_Options.js";
import { EoS_Adventure } from "./EoS_Adventure.js";
import { EoS_SOSMails } from "./EoS_SOSMails.js";
import { EoS_Missions } from "./EoS_Missions.js";
import { EoS_Groagunk } from "./EoS_Groagunk.js";
import { EoS_Unknown } from "./EoS_Unknown.js";

export class EoS_Saveslot extends DataMapping
{
	#view = null;
	#script_vars = null;
	#assembly = null;
	#teams = null;
	#progress = null;
	#items = null;
	#namerankperf = null;
	#options = null;
	#adventure = null;
	#sosmails = null;
	#missions = null;
	#groagunk = null;
	#unknown = null;

	apply()
	{
		super.apply();
		let checksum = new Uint32Array(1);
		checksum[0] = 0;
		for(let i = 0; i < 0xB658; i+=4)
		{
			checksum[0] += this.#view.getUint32(0x00000004+i,true);
			checksum[0] = checksum[0] & 0xFFFFFFFF;
		}
		this.checksum = checksum[0];
	}

	constructor(view)
	{
		super();
		this.#view = view;

		let checksum = new Uint32Array(2);

		console.log(i18n`Parsing EoS Savefile Slot`);

		let ident = this.ident;
		if(ident != "POKE_DUN_SORA")
		{
			throw new Error(i18n`Expected cookie to be 'POKE_DUN_SORA' but got '${ident}'`);
		}

		let ident2 = this.ident2;
		if(ident2 != 0x09011416)
		{
			throw new Error(i18n`Expected ident2 to be '0x9011416' but got '0x${ident2.toString(16)}'`);
		}

		checksum[0] = this.checksum;
		checksum[1] = 0;
		for(let i = 0; i < 0xB658; i+=4)
		{
			checksum[1] += this.#view.getUint32(0x00000004+i,true);
			checksum[1] = checksum[1] & 0xFFFFFFFF;
		}

		if(checksum[1] != checksum[0])
		{
			throw new Error(i18n`Expected checksum to be '0x${checksum[0].toString(16)}' but got '0x${checksum[1].toString(16)}'`);
		}

		/*console.log(i18n`Ident is '${ident}'`);
		console.log(i18n`Ident2 is '${ident2.toString(16)}'`);
		console.log(i18n`RNG32 is '${this.rng32.toString(16)}'`);
		console.log(i18n`HeaderMode is '${this.headermode.toString(16)}'`);
		console.log(i18n`RNG16 is '${this.rng16.toString(16)}'`);
		console.log(i18n`Language is '${this.language.toString(16)}'`);
		console.log(i18n`assemblycount is '${this.assemblycount.toString(16)}'`);
		console.log(i18n`teamcount is '${this.teamcount.toString(16)}'`);
		console.log(i18n`progresscount is '${this.progresscount.toString(16)}'`);
		console.log(i18n`itemcount is '${this.itemcount.toString(16)}'`);
		console.log(i18n`namerankperfcount is '${this.namerankperfcount.toString(16)}'`);
		console.log(i18n`unknown044C is '${this.unknown044C.toString(16)}'`);
		console.log(i18n`optionstimeadventurecount is '${this.optionstimeadventurecount.toString(16)}'`);
		console.log(i18n`sosmailcount is '${this.sosmailcount.toString(16)}'`);
		console.log(i18n`missioncount is '${this.missioncount.toString(16)}'`);
		console.log(i18n`groagunkcount is '${this.groagunkcount.toString(16)}'`);
		console.log(i18n`unknowndatacount is '${this.unknowndatacount.toString(16)}'`);*/

		this.#script_vars = new EoS_ScriptVars(new EoS_DataView(this.#view,0x00000038,1024));
		this.#assembly = new EoS_Assembly(new EoS_DataBitView(this.#view,0x00000464*8,0x00007F6B*8));
		this.#teams = new EoS_Teams(new EoS_DataBitView(this.#view,0x000083CF*8,0x000005DC*8));
		this.#progress = new EoS_Progress(new EoS_DataBitView(this.#view,0x000089AB*8,0x00001F7*8));
		this.#items = new EoS_Items(new EoS_DataBitView(this.#view,0x00008BA2*8,0x0000DAC*8));
		this.#namerankperf = new EoS_NameRankPerf(new EoS_DataBitView(this.#view,0x0000994E*8,0x0000010*8));
		this.#options = new EoS_Options(new EoS_DataBitView(this.#view,0x0000995E*8,0x00000002*8));
		this.#adventure = new EoS_Adventure(new EoS_DataBitView(this.#view,0x00009960*8,0x0000033E*8));
		this.#sosmails = new EoS_SOSMails(new EoS_DataBitView(this.#view,0x00009C9E*8,0x000015A0*8));
		this.#missions = new EoS_Missions(new EoS_DataBitView(this.#view,0x0000B23E*8,0x00000237*8));
		this.#groagunk = new EoS_Groagunk(new EoS_DataBitView(this.#view,0x0000B475*8,0x0000000B*8));
		this.#unknown = new EoS_Unknown(new EoS_DataBitView(this.#view,0x0000B480*8,0x000001DC*8));


		this.addValue("Saveslot","The savefile checksum", null, "Checksum", 0, 0xFFFFFFFF, 1, "checksum", null, [{access: "readonly"},{display: "hex"}]);
		this.addText("Saveslot","The first identifier of the safegame, should be 'POKE_DUN_SORA'", null, "Identifier 1", 13, "ident", null, [{access: "readonly"}]);
		this.addValue("Saveslot","The (presumed) second identifier of the safegame, should be '0x09011416'", null, "Identifier 2", 0, 0xFFFFFFFF, 1, "ident2", null, [{access: "readonly"},{display: "hex"}]);
		this.addValue("Saveslot","The (presumed) seed for the 32Bit random generator", null, "Random32", 0, 0xFFFFFFFF, 1, "rng32", null, [{display: "hex"}]);
		this.addValue("Saveslot","The (presumed) seed for the 16Bit random generator", null, "Random16", 0, 0xFFFF, 1, "rng16", null, [{display: "hex"}]);
		this.addValue("Saveslot","The (presumed) game mode or what the game calls header mode", null, "Game mode", 0, 0xFFFFFFFF, 1, "headermode", null, [{display: "dec"}]);
		this.addValue("Saveslot","The (presumed) Language of the game the savegame was made with", null, "Language", 0, 0xFF, 1, "language", null, [{display: "dec"}]);

		this.addChild("Script Variables","Script Variables and other information for the ground engine", null, "Script Variables", "scriptvars", [{access: "readonly"}]);
		this.addChild("Assembly","List and member data that is displayed in the Chimeco assembly", null, "Assembly", "assembly", [{access: "readonly"}]);
		this.addChild("Teams","The actual teams for that go into dungeons", null, "Teams", "teams", [{access: "readonly"}]);
		this.addChild("Progress","Data that shows the progress in the game", null, "Progress", "progress", [{access: "readonly"}]);
		this.addChild("Items","Items that are stored, in the bags are here. This includes money and items avaliable in the shops.", null, "Items", "items", [{access: "readonly"}]);
		this.addChild("Info","Info about the player team", null, "Info", "namerankperf", [{access: "readonly"}]);
		this.addChild("Options","Ingame options like what the screens show, the frame style and so on.", null, "Options", "options", [{access: "readonly"}]);
		this.addChild("Adventure","Information about the adventure, like playtime and other counters.", null, "Adventure", "adventure", [{access: "readonly"}]);
		this.addChild("SOS Mail","Has data about the helper and other information about sos mails.", null, "SOS Mail", "sosmails", [{access: "readonly"}]);
		this.addChild("Missions","Has data about the Missions.", null, "Missions", "missions", [{access: "readonly"}]);
		this.addChild("Groagunk","Information about the Groagunk shop", null, "Groagunk", "groagunk", [{access: "readonly"}]);
		this.addChild("Unknown","Unknown data that is here in case someone wants to view or change it", null, "Unknown", "unknown", [{access: "readonly"}]);
	}

	get checksum()
	{
		return this.#view.getUint32(0x00000000,true);
	}

	set checksum(value)
	{
		this.#view.setUint32(0x00000000,value,true);
	}

	get ident()
	{
		return this.#view.getString("windows-1252",0x00000004,13);
	}

	get ident2()
	{
		return this.#view.getUint32(0x00000024,true);
	}

	get rng32()
	{
		return this.#view.getUint32(0x00000028,true)
	}

	set rng32(value)
	{
		this.#view.setUint32(0x00000028,value,true)
	}

	get headermode()
	{
		return this.#view.getUint32(0x0000002C,true)
	}

	set headermode(value)
	{
		this.#view.setUint32(0x0000002C,value,true)
	}

	get rng16()
	{
		return this.#view.getUint16(0x00000030,true)
	}

	set rng16(value)
	{
		this.#view.setUint16(0x00000030,value,true)
	}

	get language()
	{
		return this.#view.getUint8(0x00000034,true)
	}

	set language(value)
	{
		this.#view.setUint8(0x00000034,value,true)
	}

	get scriptvars()
	{
		return this.#script_vars;
	}

	get assemblycount()
	{
		return this.#view.getUint32(0x00000438,true)
	}

	set assemblycount(value)
	{
		this.#view.setUint32(0x00000438,value,true)
	}

	get teamcount()
	{
		return this.#view.getUint32(0x0000043C,true)
	}

	set teamcount(value)
	{
		this.#view.setUint32(0x0000043C,value,true)
	}

	get progresscount()
	{
		return this.#view.getUint32(0x00000440,true)
	}

	set progresscount(value)
	{
		this.#view.setUint32(0x00000440,value,true)
	}

	get itemcount()
	{
		return this.#view.getUint32(0x00000444,true)
	}

	set itemcount(value)
	{
		this.#view.setUint32(0x00000444,value,true)
	}

	get namerankperfcount()
	{
		return this.#view.getUint32(0x00000448,true)
	}

	set namerankperfcount(value)
	{
		this.#view.setUint32(0x00000448,value,true)
	}

	get unknown044C()
	{
		return this.#view.getUint32(0x0000044C,true)
	}

	set unknown044C(value)
	{
		this.#view.setUint32(0x0000044C,value,true)
	}

	get optionstimeadventurecount()
	{
		return this.#view.getUint32(0x00000450,true)
	}

	set optionstimeadventurecount(value)
	{
		this.#view.setUint32(0x00000450,value,true)
	}

	get sosmailcount()
	{
		return this.#view.getUint32(0x00000454,true)
	}

	set sosmailcount(value)
	{
		this.#view.setUint32(0x00000454,value,true)
	}

	get missioncount()
	{
		return this.#view.getUint32(0x00000458,true)
	}

	set missioncount(value)
	{
		this.#view.setUint32(0x00000458,value,true)
	}

	get groagunkcount()
	{
		return this.#view.getUint32(0x0000045C,true)
	}

	set groagunkcount(value)
	{
		this.#view.setUint32(0x0000045C,value,true)
	}

	get unknowndatacount()
	{
		return this.#view.getUint32(0x00000460,true)
	}

	set unknowndatacount(value)
	{
		this.#view.setUint32(0x00000460,value,true)
	}

	get assembly()
	{
		return this.#assembly;
	}

	get teams()
	{
		return this.#teams;
	}

	get progress()
	{
		return this.#progress;
	}

	get items()
	{
		return this.#items;
	}

	get namerankperf()
	{
		return this.#namerankperf;
	}

	get options()
	{
		return this.#options;
	}

	get adventure()
	{
		return this.#adventure;
	}

	get sosmails()
	{
		return this.#sosmails;
	}

	get missions()
	{
		return this.#missions;
	}

	get groagunk()
	{
		return this.#groagunk;
	}

	get unknown()
	{
		return this.#unknown;
	}
}