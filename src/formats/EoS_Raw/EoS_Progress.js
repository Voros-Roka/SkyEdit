import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";
import { EoS_GetArrayNames } from "./EoS_ArrayNames.js";

export class EoS_Progress extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Progress`);

		console.log(i18n`unknown000 is '${this.unknown000}'`);
		console.log(i18n`dungeontips is '${this.dungeontips}'`);
		console.log(i18n`pokemonattacked is '${this.pokemonattacked}'`);
		console.log(i18n`exclusivpokemon is '${this.exclusivpokemon}'`);
		console.log(i18n`dungeonmaxfloor is '${this.dungeonmaxfloor}'`);
		console.log(i18n`adventurecount is '${this.adventurecount.toString(16)}'`);
		console.log(i18n`unknownE48 is '${this.unknownE48}'`);*/

		this.addBoolArray(null, "", null, "Unknown000", EoS_GetEnum("eos_monster_id"), 0x00000483, "unknown000", null, []);
		this.addBoolArray(null, "", null, "Dungeon Tips", EoS_GetArrayNames("eos_tips"), 0x0000001F, "dungeontips", null, []);
		this.addBoolArray(null, "", null, "Pokemon Attacked", EoS_GetEnum("eos_monster_id"), 0x00000483, "pokemonattacked", null, []);
		this.addBoolArray(null, "", null, "Exclusive Pokemon", null/*EoS_GetArrayNames("eos_member_flags")*/, 0x00000017, "exclusivpokemon", null, []);

		this.addValueArray(null, "", null, "Dungeon Maximum Floor", EoS_GetEnum("eos_dungeon"), 0, 127, 1, 0x000000b4, "dungeonmaxfloor", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Adventure Count", 0, 0xFFFFFFFF, 1, "adventurecount", null, [{display: "dec"}]);
		this.addValueArray(null, "", null, "UnknownE48", null, 0, 0xFF, 1, 0x00000010, "unknownE48", null, [{display: "hex"}]);
	}

	get unknown000()
	{
		return this.#view.getBoolArray(0x00000000,0x00000483);
	}

	set unknown000(value)
	{
		this.#view.setBoolArray(0x00000000,0x00000483,value);
	}

	get dungeontips()
	{
		return this.#view.getBoolArray(0x00000483,0x0000001F);
	}

	set dungeontips(value)
	{
		this.#view.setBoolArray(0x00000483,0x0000001F,value);
	}

	get pokemonattacked()
	{
		return this.#view.getBoolArray(0x000004A2,0x00000483);
	}

	set pokemonattacked(value)
	{
		this.#view.setBoolArray(0x000004A2,0x00000483,value);
	}

	get exclusivpokemon()
	{
		return this.#view.getBoolArray(0x00000925,0x00000017);
	}

	set exclusivpokemon(value)
	{
		this.#view.setBoolArray(0x00000925,0x00000017,value);
	}

	get dungeonmaxfloor()
	{
		return this.#view.getUint8Array(0x0000093C,0x000000b4,0x00000007);
	}

	set dungeonmaxfloor(value)
	{
		this.#view.setUint8Array(0x0000093C,0x000000b4,value,0x00000007);
	}

	get adventurecount()
	{
		return this.#view.getUint32(0x00000E28,true,0x00000020);
	}

	set adventurecount(value)
	{
		this.#view.setUint32(0x00000E28,value,true,0x00000020);
	}

	get unknownE48()
	{
		return this.#view.getUint8Array(0x00000E48,0x00000010,0x00000008);
	}

	set unknownE48(value)
	{
		this.#view.setUint8Array(0x00000E48,0x00000010,value,0x00000008);
	}
}