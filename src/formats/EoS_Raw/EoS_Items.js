import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_Bag } from "./EoS_Bag.js";
import { EoS_StoredItem } from "./EoS_StoredItem.js";
import { EoS_Shop } from "./EoS_Shop.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_Items extends DataMapping
{
	#view = null;
	#storeditems = [];
	#mainbag = null;
	#specialbag = null;
	#rescuebag = null;
	#mainshops = null;
	#specialshops = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Items`);

		console.log(i18n`storeditems is '${this.storeditems}'`);
		console.log(i18n`storedquantity is '${this.storedquantity}'`);
		console.log(i18n`moneycarried is '${this.moneycarried}'`);
		console.log(i18n`moneystored is '${this.moneystored}'`);
		console.log(i18n`unknown6BB6 is '${this.unknown6BB6.toString(16)}'`);
		console.log(i18n`unknown6BC2 is '${this.unknown6BC2.toString(16)}'`);
		console.log(i18n`unknown6BCE is '${this.unknown6BCE.toString(16)}'`);
		console.log(i18n`unknown6BD6 is '${this.unknown6BD6.toString(16)}'`);
		console.log(i18n`unknown6BDE is '${this.unknown6BDE.toString(16)}'`);
		console.log(i18n`unknown6BEE is '${this.unknown6BEE.toString(16)}'`);
		console.log(i18n`unknown6BFE is '${this.unknown6BFE.toString(16)}'`);*/

		let bit_offset = 0;
		this.#mainbag = new EoS_Bag(new EoS_DataBitView(this.#view,bit_offset,0x00000672));
		bit_offset += 0x00000672;
		this.#specialbag = new EoS_Bag(new EoS_DataBitView(this.#view,bit_offset,0x00000672));
		bit_offset += 0x00000672;
		this.#rescuebag = new EoS_Bag(new EoS_DataBitView(this.#view,bit_offset,0x00000672));
		bit_offset += 0x00000672;

		bit_offset = 0x00001356;
		for(let i = 0; i < 1000;i++)
		{
			this.#storeditems[i] = new EoS_StoredItem(new EoS_DataBitView(this.#view,bit_offset,0x00002B03));
			bit_offset += 0x0000000B;
		}

		bit_offset = 0x00006946;
		this.#mainshops = new EoS_Shop(new EoS_DataBitView(this.#view,bit_offset,0x00000108));
		bit_offset += 0x00000108;
		this.#specialshops = new EoS_Shop(new EoS_DataBitView(this.#view,bit_offset,0x00000108));
		bit_offset += 0x00000108;


		this.addValueArray("Money","", null, "Money Carried", ["Main Story", "Special Episode" , "Friend Rescue" ], 0, 0x00FFFFFF, 1, 3, "moneycarried", null, [{display: "dec"}]);
		this.addValue("Money","", null, "Money Stored", 0, 0x00FFFFFF, 1, "moneystored", null, [{display: "dec"}]);

		this.addList("Storage", "", null, "Stored Items", 1000, "id", null, EoS_GetEnum("eos_item"), "storeditems", null, [])

		this.addChild("Main Story Bag", "", null, "Main Story Bag", "mainbag", [{access: "readonly"}]);
		this.addChild("Special Episode Bag", "", null, "Special Episode Bag", "specialbag", [{access: "readonly"}]);
		this.addChild("Friend Rescue Bag", "", null, "Friend Rescue Bag", "rescuebag", [{access: "readonly"}]);

		this.addChild("Main Story Shops", "", null, "Main Story Shops", "mainshops", [{access: "readonly"}]);
		this.addChild("Special Episode Shops", "", null, "Special Episode Shops", "specialshops", [{access: "readonly"}]);


		this.addValue("Unknown","", null, "Unknown6BB6", 0, 4095, 1, "unknown6BB6", null, [{display: "hex"}]);
		this.addValue("Unknown","", null, "Unknown6BC2", 0, 4095, 1, "unknown6BC2", null, [{display: "hex"}]);

		this.addValue("Unknown","", null, "Unknown6BCE", 0, 0xFF, 1, "unknown6BCE", null, [{display: "hex"}]);
		this.addValue("Unknown","", null, "Unknown6BD6", 0, 0xFF, 1, "unknown6BD6", null, [{display: "hex"}]);

		this.addValue("Unknown","", null, "Unknown6BDE", 0, 0xFFFF, 1, "unknown6BDE", null, [{display: "hex"}]);
		this.addValue("Unknown","", null, "Unknown6BEE", 0, 0xFFFF, 1, "unknown6BEE", null, [{display: "hex"}]);
		this.addValue("Unknown","", null, "Unknown6BFE", 0, 0xFFFF, 1, "unknown6BFE", null, [{display: "hex"}]);

	}

	get mainbag()
	{
		return this.#mainbag;
	}

	get specialbag()
	{
		return this.#specialbag;
	}

	get rescuebag()
	{
		return this.#rescuebag;
	}

	get storeditems()
	{
		return this.#storeditems;
	}

	get mainshops()
	{
		return this.#mainshops;
	}

	get specialshops()
	{
		return this.#specialshops;
	}

	get moneycarried()
	{
		return this.#view.getUint32Array(0x00006B56,0x00000003,true,0x00000018);
	}

	set moneycarried(value)
	{
		this.#view.setUint32Array(0x00006B56,0x00000003,value,true,0x00000018);
	}

	get moneystored()
	{
		return this.#view.getUint32(0x00006B9E,true,0x00000018);
	}

	set moneystored(value)
	{
		this.#view.setUint32(0x00006B9E,value,true,0x00000018);
	}

	get unknown6BB6()
	{
		return this.#view.getUint16(0x00006BB6,true,0x0000000C);
	}

	set unknown6BB6(value)
	{
		this.#view.setUint16(0x00006BB6,value,true,0x0000000C);
	}

	get unknown6BC2()
	{
		return this.#view.getUint16(0x00006BC2,true,0x0000000C);
	}

	set unknown6BC2(value)
	{
		this.#view.setUint16(0x00006BC2,value,true,0x0000000C);
	}

	get unknown6BCE()
	{
		return this.#view.getUint8(0x00006BCE,0x00000008);
	}

	set unknown6BCE(value)
	{
		this.#view.setUint8(0x00006BCE,value,0x00000008);
	}

	get unknown6BD6()
	{
		return this.#view.getUint8(0x00006BD6,0x00000008);
	}

	set unknown6BD6(value)
	{
		this.#view.setUint8(0x00006BD6,value,0x00000008);
	}

	get unknown6BDE()
	{
		return this.#view.getUint16(0x00006BDE,true,0x00000010);
	}

	set unknown6BDE(value)
	{
		this.#view.setUint16(0x00006BDE,value,true,0x00000010);
	}

	get unknown6BEE()
	{
		return this.#view.getUint16(0x00006BEE,true,0x00000010);
	}

	set unknown6BEE(value)
	{
		this.#view.setUint16(0x00006BEE,value,true,0x00000010);
	}

	get unknown6BFE()
	{
		return this.#view.getUint16(0x00006BFE,true,0x00000010);
	}

	set unknown6BFE(value)
	{
		this.#view.setUint16(0x00006BFE,value,true,0x00000010);
	}
}

