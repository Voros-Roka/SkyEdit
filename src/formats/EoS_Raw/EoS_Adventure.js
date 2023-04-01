import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Adventure extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Adventure`);

		console.log(i18n`playtimeframes is '${this.playtimeframes.toString(16)}'`);
		console.log(i18n`playtimeseconds is '${this.playtimeseconds.toString(16)}'`);
		console.log(i18n`dungeonscleared is '${this.dungeonscleared.toString(16)}'`);
		console.log(i18n`friendsrescued is '${this.friendsrescued.toString(16)}'`);
		console.log(i18n`evolutions is '${this.evolutions.toString(16)}'`);
		console.log(i18n`completionflags is '${this.completionflags}'`);
		console.log(i18n`joinedcount is '${this.joinedcount.toString(16)}'`);
		console.log(i18n`battledcount is '${this.battledcount.toString(16)}'`);
		console.log(i18n`moveslearned is '${this.moveslearned.toString(16)}'`);
		console.log(i18n`victorysonfloor is '${this.victorysonfloor.toString(16)}'`);
		console.log(i18n`faintcount is '${this.faintcount.toString(16)}'`);
		console.log(i18n`eggshatched is '${this.eggshatched.toString(16)}'`);
		console.log(i18n`bigtresurewins is '${this.bigtresurewins.toString(16)}'`);
		console.log(i18n`recycled is '${this.recycled.toString(16)}'`);
		console.log(i18n`giftssend is '${this.giftssend.toString(16)}'`);
		console.log(i18n`joinedflags is '${this.joinedflags}'`);
		console.log(i18n`battledflags is '${this.battledflags}'`);
		console.log(i18n`moveslearnedflags is '${this.moveslearnedflags}'`);
		console.log(i18n`itemsaquiredflags is '${this.itemsaquiredflags}'`);
		console.log(i18n`specialchallengeflags is '${this.specialchallengeflags}'`);
		console.log(i18n`sentrydutypoints is '${this.sentrydutypoints}'`);
		console.log(i18n`currentdungeon is '${this.currentdungeon.toString(16)}'`);
		console.log(i18n`currentfloor is '${this.currentfloor.toString(16)}'`);*/

		this.addValue(null,"", "Playtime", "Seconds", 0, 0xFFFFFFFF, 1, "playtimeseconds", null, [{display: "dec"}]);
		this.addValue(null,"", "Playtime", "Frames", 0, 0x3F, 1, "playtimeframes", null, [{display: "dec"}]);


		this.addValueArray(null, "", null, "Sentry Duty Points", null, 0, 0xFFFFFFFF, 1, 5, "sentrydutypoints", null, [{display: "dec"}]);

		this.addValue(null,"", null, "Dungeons Cleared", 0, 0xFFFFF, 1, "dungeonscleared", null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Dungeon", 0, 255, "currentdungeon", EoS_GetEnum("eos_dungeon"), null, [{display: "dec"}]);
		this.addValue(null,"", null, "Floor", 0, 255, 1, "currentfloor", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Friends Rescued", 0, 0xFFFFF, 1, "friendsrescued", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Evolutions", 0, 0xFFFFF, 1, "evolutions", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Victories on Floors", 0, 0xFFFFF, 1, "victorysonfloor", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Fainted", 0, 0xFFFFF, 1, "faintcount", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Eggs Hatched", 0, 0xFFFFF, 1, "eggshatched", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Big Tresure Wins", 0, 0xFFFFF, 1, "bigtresurewins", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Recycled", 0, 0xFFFFF, 1, "recycled", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Gifts Send", 0, 0xFFFFF, 1, "giftssend", null, [{display: "dec"}]);
		this.addBoolArray(null, "", null, "Special Challanges", null, 0x00000020, "specialchallengeflags", null, []);
		this.addBoolArray(null, "", null, "Completion", null, 0x00000080, "completionflags", null, []);
		this.addValue(null,"", null, "Moves Learned", 0, 0x1FF, 1, "moveslearned", null, [{display: "dec"}]);
		this.addBoolArray(null, "", null, "Moves Learned", EoS_GetEnum("eos_move"), 0x00000220, "moveslearnedflags", null, []);
		this.addValue(null,"", null, "Pokemon Joined", 0, 0x3FFF, 1, "joinedcount", null, [{display: "dec"}]);
		this.addBoolArray(null, "", null, "Pokemon Joined", null, 0x000004A0, "joinedflags", null, []);
		this.addValue(null,"", null, "Pokemon Battled", 0, 0x3FFF, 1, "battledcount", null, [{display: "dec"}]);
		this.addBoolArray(null, "", null, "Pokemon Battled", null, 0x000004A0, "battledflags", null, []);
		this.addBoolArray(null, "", null, "Items Aquired", EoS_GetEnum("eos_item"), 0x00000580, "itemsaquiredflags", null, []);

	}

	get playtimeframes()
	{
		return this.#view.getUint8(0x00000000,0x00000006);
	}

	set playtimeframes(value)
	{
		this.#view.setUint8(0x00000000,value,0x00000006);
	}

	get playtimeseconds()
	{
		return this.#view.getUint32(0x00000006,true,0x00000020);
	}

	set playtimeseconds(value)
	{
		this.#view.setUint32(0x00000006,value,true,0x00000020);
	}

	get dungeonscleared()
	{
		return this.#view.getUint32(0x00000026,true,0x00000014);
	}

	set dungeonscleared(value)
	{
		this.#view.setUint32(0x00000026,value,true,0x00000014);
	}

	get friendsrescued()
	{
		return this.#view.getUint32(0x0000003A,true,0x00000014);
	}

	set friendsrescued(value)
	{
		this.#view.setUint32(0x0000003A,value,true,0x00000014);
	}

	get evolutions()
	{
		return this.#view.getUint32(0x0000004E,true,0x00000014);
	}

	set evolutions(value)
	{
		this.#view.setUint32(0x0000004E,value,true,0x00000014);
	}

	get completionflags()
	{
		return this.#view.getBoolArray(0x00000062,0x00000080);
	}

	set completionflags(value)
	{
		this.#view.setBoolArray(0x00000062,value,0x00000080);
	}

	get joinedcount()
	{
		return this.#view.getUint16(0x000000E2,true,0x0000000E);
	}

	set joinedcount(value)
	{
		this.#view.setUint16(0x000000E2,value,true,0x0000000E);
	}

	get battledcount()
	{
		return this.#view.getUint16(0x000000F0,true,0x0000000E);
	}

	set battledcount(value)
	{
		this.#view.setUint16(0x000000F0,value,true,0x0000000E);
	}

	get moveslearned()
	{
		return this.#view.getUint16(0x000000FE,true,0x00000009);
	}

	set moveslearned(value)
	{
		this.#view.setUint16(0x000000FE,value,true,0x00000009);
	}

	get victorysonfloor()
	{
		return this.#view.getUint32(0x00000107,true,0x00000014);
	}

	set victorysonfloor(value)
	{
		this.#view.setUint32(0x00000107,value,true,0x00000014);
	}

	get faintcount()
	{
		return this.#view.getUint32(0x0000011B,true,0x00000014);
	}

	set faintcount(value)
	{
		this.#view.setUint32(0x0000011B,value,true,0x00000014);
	}

	get eggshatched()
	{
		return this.#view.getUint32(0x0000012F,true,0x00000014);
	}

	set eggshatched(value)
	{
		this.#view.setUint32(0x0000012F,value,true,0x00000014);
	}

	get bigtresurewins()
	{
		return this.#view.getUint32(0x00000143,true,0x00000014);
	}

	set bigtresurewins(value)
	{
		this.#view.setUint32(0x00000143,value,true,0x00000014);
	}

	get recycled()
	{
		return this.#view.getUint32(0x00000157,true,0x00000014);
	}

	set recycled(value)
	{
		this.#view.setUint32(0x00000157,value,true,0x00000014);
	}

	get giftssend()
	{
		return this.#view.getUint32(0x0000016B,true,0x00000014);
	}

	set giftssend(value)
	{
		this.#view.setUint32(0x0000016B,value,true,0x00000014);
	}

	get joinedflags()
	{
		return this.#view.getBoolArray(0x0000017F,0x000004A0);
	}

	set joinedflags(value)
	{
		this.#view.setBoolArray(0x0000017F,value,0x000004A0);
	}

	get battledflags()
	{
		return this.#view.getBoolArray(0x0000061F,0x000004A0);
	}

	set battledflags(value)
	{
		this.#view.setBoolArray(0x0000061F,value,0x000004A0);
	}

	get moveslearnedflags()
	{
		return this.#view.getBoolArray(0x00000ABF,0x00000220);
	}

	set moveslearnedflags(value)
	{
		this.#view.setBoolArray(0x00000ABF,value,0x00000220);
	}

	get itemsaquiredflags()
	{
		return this.#view.getBoolArray(0x00000CDF,0x00000580);
	}

	set itemsaquiredflags(value)
	{
		this.#view.setBoolArray(0x00000CDF,value,0x00000580);
	}

	get specialchallengeflags()
	{
		return this.#view.getBoolArray(0x0000125F,0x00000020);
	}

	set specialchallengeflags(value)
	{
		this.#view.setBoolArray(0x0000125F,value,0x00000020);
	}

	get sentrydutypoints()
	{
		return this.#view.getUint32Array(0x0000127F,0x00000005,true,0x00000020);
	}

	set sentrydutypoints(value)
	{
		this.#view.setUint32Array(0x0000127F,0x00000005,value,true,0x00000020);
	}

	get currentdungeon()
	{
		return this.#view.getUint8(0x0000131F,0x00000008);
	}

	set currentdungeon(value)
	{
		this.#view.setUint8(0x0000131F,value,0x00000008);
	}

	get currentfloor()
	{
		return this.#view.getUint8(0x00001327,0x00000008);
	}

	set currentfloor(value)
	{
		this.#view.setUint8(0x00001327,value,0x00000008);
	}

}