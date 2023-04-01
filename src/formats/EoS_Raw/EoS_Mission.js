import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Mission extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Mission`);

		console.log(i18n`status is '${this.status.toString(16)}'`);
		console.log(i18n`type is '${this.type.toString(16)}'`);
		console.log(i18n`subtype is '${this.subtype.toString(16)}'`);
		console.log(i18n`client is '${this.client.toString(16)}'`);
		console.log(i18n`target is '${this.target.toString(16)}'`);
		console.log(i18n`unknown22 is '${this.unknown22.toString(16)}'`);
		console.log(i18n`unknown2D is '${this.unknown2D.toString(16)}'`);
		console.log(i18n`rewardtype is '${this.rewardtype.toString(16)}'`);
		console.log(i18n`itemreward is '${this.itemreward.toString(16)}'`);
		console.log(i18n`restrictiontype is '${this.restrictiontype.toString()}'`);
		console.log(i18n`restriction is '${this.restriction.toString(16)}'`);
		console.log(i18n`seed is '${this.seed.toString(16)}'`);
		console.log(i18n`dungeon is '${this.dungeon.toString(16)}'`);
		console.log(i18n`floor is '${this.floor.toString(16)}'`);
		console.log(i18n`unknown7D is '${this.unknown7D.toString(16)}'`);*/

		this.addEnum(null, "", null, "Status", 0, 15, "status", EoS_GetEnum("eos_mission_status"), null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Type", 0, 15, "type", EoS_GetEnum("eos_mission_type"), null, [{display: "dec"}]);
		this.addValue(null,"", null, "Subtype", 0, 15, 1, "subtype", null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Client", 0, 2047, "client", EoS_GetEnum("eos_monster_id"), null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Target", 0, 2047, "target", EoS_GetEnum("eos_monster_id"), null, [{display: "dec"}]);

		this.addValue(null,"", null, "Unknown22", 0, 2047, 1, "unknown22", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Unknown2D", 0, 1023, 1, "unknown2D", null, [{display: "dec"}]);

		this.addEnum(null, "", null, "Reward Type", 0, 15, "rewardtype", EoS_GetEnum("eos_mission_reward_type"), null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Item Reward", 0, 2047, "itemreward", EoS_GetEnum("eos_item"), null, [{display: "dec"}]);


		this.addValue(null,"", null, "Restriction Type", 0, 1, 1, "restrictiontype", null, [{display: "dec"}]);
		this.addValue(null,"", null, "Restriction", 0, 2047, 1, "restriction", null, [{display: "dec"}]);

		this.addValue(null,"", null, "Seed", 0, 0xFFFFFF, 1, "seed", null, [{display: "hex"}]);

		this.addEnum(null, "", null, "Dungeon", 0, 255, "dungeon", EoS_GetEnum("eos_dungeon"), null, [{display: "dec"}]);
		this.addValue(null,"", null, "Floor", 0, 255, 1, "floor", null, [{display: "dec"}]);


		this.addValue(null,"", null, "Unknown7D", 0, 0xFF, 1, "unknown7D", null, [{display: "hex"}]);

	}

	get status()
	{
		return this.#view.getUint8(0x00000000,0x00000004);
	}

	set status(value)
	{
		this.#view.setUint8(0x00000000,value,0x00000004);
	}

	get type()
	{
		return this.#view.getUint8(0x00000004,0x00000004);
	}

	set type(value)
	{
		this.#view.setUint8(0x00000004,value,0x00000004);
	}

	get subtype()
	{
		return this.#view.getUint8(0x00000008,0x00000004);
	}

	set subtype(value)
	{
		this.#view.setUint8(0x00000008,value,0x00000004);
	}

	get client()
	{
		return this.#view.getUint16(0x0000000C,true,0x0000000B);
	}

	set client(value)
	{
		this.#view.setUint16(0x0000000C,value,true,0x0000000B);
	}

	get target()
	{
		return this.#view.getUint16(0x00000017,true,0x0000000B);
	}

	set target(value)
	{
		this.#view.setUint16(0x00000017,value,true,0x0000000B);
	}

	get unknown22()
	{
		return this.#view.getUint16(0x00000022,true,0x0000000B);
	}

	set unknown22(value)
	{
		this.#view.setUint16(0x00000022,value,true,0x0000000B);
	}

	get unknown2D()
	{
		return this.#view.getUint16(0x0000002D,true,0x0000000A);
	}

	set unknown2D(value)
	{
		this.#view.setUint16(0x0000002D,value,true,0x0000000A);
	}

	get rewardtype()
	{
		return this.#view.getUint8(0x00000037,0x00000004);
	}

	set rewardtype(value)
	{
		this.#view.setUint8(0x00000037,value,0x00000004);
	}

	get itemreward()
	{
		return this.#view.getUint16(0x0000003B,true,0x0000000B);
	}

	set itemreward(value)
	{
		this.#view.setUint16(0x0000003B,value,true,0x0000000B);
	}

	get restrictiontype()
	{
		return this.#view.getUint8(0x00000046,0x00000001);
	}

	set restrictiontype(value)
	{
		this.#view.setUint8(0x00000046,value,0x00000001);
	}

	get restriction()
	{
		return this.#view.getUint16(0x00000047,true,0x0000000B);
	}

	set restriction(value)
	{
		this.#view.setUint16(0x00000047,value,true,0x0000000B);
	}

	get seed()
	{
		return this.#view.getUint32(0x00000052,true,0x00000018);
	}

	set seed(value)
	{
		this.#view.setUint32(0x00000052,value,true,0x00000018);
	}

	get dungeon()
	{
		return this.#view.getUint8(0x0000006A,0x00000008);
	}

	set dungeon(value)
	{
		this.#view.setUint8(0x0000006A,value,0x00000008);
	}

	get floor()
	{
		return this.#view.getUint8(0x00000072,0x00000008);
	}

	set floor(value)
	{
		this.#view.setUint8(0x00000072,value,0x00000008);
	}

	get unknown7D()
	{
		return this.#view.getUint8(0x0000007A,0x00000008);
	}

	set unknown7D(value)
	{
		this.#view.setUint8(0x0000007A,value,0x00000008);
	}
}