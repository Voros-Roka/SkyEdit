import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_UnknownData0 } from "./EoS_UnknownData0.js";
import { EoS_UnknownData1 } from "./EoS_UnknownData1.js";

export class EoS_Unknown extends DataMapping
{
	#view = null;
	#unknown200 = [];
	#unknown700 = [];


	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Unknown`);
		console.log(i18n`unknown000 is '${this.unknown000}'`);*/

		let bit_offset = 0x00000200;
		for(let i = 0; i < 16;i++)
		{
			this.#unknown200[i] = new EoS_UnknownData0(new EoS_DataBitView(this.#view,bit_offset,0x00000050));
			bit_offset += 0x00000050;
		}

		bit_offset = 0x00000700;
		for(let i = 0; i < 16;i++)
		{
			this.#unknown700[i] = new EoS_UnknownData1(new EoS_DataBitView(this.#view,bit_offset,0x00000060));
			bit_offset += 0x00000060;
		}

		/*console.log(i18n`unknownD00 is '${this.unknownD00}'`);
		console.log(i18n`unknownD10 is '${this.unknownD10}'`);
		console.log(i18n`unknownEC0 is '${this.unknownEC0.toString(16)}'`);
		console.log(i18n`unknownECE is '${this.unknownECE.toString(16)}'`);
		console.log(i18n`unknownEDC is '${this.unknownEDC.toString()}'`);
		console.log(i18n`unknownEDD is '${this.unknownEDD.toString()}'`);
		console.log(i18n`unknownEDE is '${this.unknownEDE.toString()}'`);
		console.log(i18n`unknownEDF is '${this.unknownEDF.toString()}'`);*/

		this.addValueArray(null, "", null, "Unknown000", null, 0, 0xFFFFFFFF, 1, 0x00000010, "unknown000", null, [{display: "hex"}]);
		this.addChildArray(null, "", "Unknown200", "Unknown200", null, 16, "unknown200", [{access: "readonly"}]);
		this.addChildArray(null, "", "Unknown700", "Unknown700", null, 16, "unknown700", [{access: "readonly"}]);

		this.addBoolArray(null, "", null, "UnknownD00", null, 0x00000010, "unknownD00", null, []);
		this.addValueArray(null, "", null, "UnknownD10", null, 0, 0xFFFF, 1, 0x0000001B, "unknownD10", null, [{display: "hex"}]);

		this.addValue(null,"", null, "UnknownEC0", 0, 0x3FFF, 1, "unknownEC0", null, [{display: "hex"}]);
		this.addValue(null,"", null, "UnknownECE", 0, 0x3FFF, 1, "unknownECE", null, [{display: "hex"}]);

		this.addBool(null, "", null, "UnknownEDC", "unknownEDC", null, []);
		this.addBool(null, "", null, "UnknownEDD", "unknownEDD", null, []);
		this.addBool(null, "", null, "UnknownEDE", "unknownEDE", null, []);
		this.addBool(null, "", null, "UnknownEDF", "unknownEDF", null, []);
	}

	get unknown000()
	{
		return this.#view.getUint32Array(0x00000000,0x00000010,0x00000020);
	}

	set unknown000(value)
	{
		this.#view.setUint32Array(0x00000000,value,0x00000010,0x00000020);
	}

	get unknown200()
	{
		return this.#unknown200;
	}

	get unknown700()
	{
		return this.#unknown700;
	}

	get unknownD00()
	{
		return this.#view.getBoolArray(0x00000D00,0x00000010,0x00000001);
	}

	set unknownD00(value)
	{
		this.#view.setBoolArray(0x00000D00,value,0x00000010,0x00000001);
	}

	get unknownD10()
	{
		return this.#view.getUint16Array(0x00000D10,0x0000001B,0x00000010);
	}

	set unknownD10(value)
	{
		this.#view.setUint16Array(0x00000D10,value,0x0000001B,0x00000010);
	}

	get unknownEC0()
	{
		return this.#view.getUint16(0x00000EC0,true,0x0000000E);
	}

	set unknownEC0(value)
	{
		this.#view.setUint16(0x00000EC0,value,true,0x0000000E);
	}

	get unknownECE()
	{
		return this.#view.getUint16(0x00000ECE,true,0x0000000E);
	}

	set unknownECE(value)
	{
		this.#view.setUint16(0x00000ECE,value,true,0x0000000E);
	}

	get unknownEDC()
	{
		return this.#view.getBool(0x00000EDC);
	}

	set unknownEDC(value)
	{
		this.#view.setBool(0x00000EDC,value);
	}

	get unknownEDD()
	{
		return this.#view.getBool(0x00000EDD);
	}

	set unknownEDD(value)
	{
		this.#view.setBool(0x00000EDD,value);
	}

	get unknownEDE()
	{
		return this.#view.getBool(0x00000EDE);
	}

	set unknownEDE(value)
	{
		this.#view.setBool(0x00000EDE,value);
	}

	get unknownEDF()
	{
		return this.#view.getBool(0x00000EDF);
	}

	set unknownEDF(value)
	{
		this.#view.setBool(0x00000EDF,value);
	}
}
