import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_SOSMail } from "./EoS_SOSMail.js";
import { EoS_SOSMailHelper } from "./EoS_SOSMailHelper.js";
import { EoS_SOSMailUnknown } from "./EoS_SOSMailUnknown.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_SOSMails extends DataMapping
{
	#view = null;
	#mails = [];
	#helper = null;
	#unknown = [];

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot SOS Mails`);
		console.log(i18n`unknown0000 is '${this.unknown0000.toString(16)}'`);*/

		let bit_offset = 0x00000020;
		for(let i = 0; i < 32;i++)
		{
			this.#mails[i] = new EoS_SOSMail(new EoS_DataBitView(this.#view,bit_offset,0x000004C1));
			bit_offset += 0x000004C1;
		}

		this.#helper = new EoS_SOSMailHelper(new EoS_DataBitView(this.#view,0x00009840,0x00000183));

		/*console.log(i18n`unknown99C3 is '${this.unknown99C3.toString(16)}'`);*/

		bit_offset = 0x000099E3;
		for(let i = 0; i < 32;i++)
		{
			this.#unknown[i] = new EoS_SOSMailUnknown(new EoS_DataBitView(this.#view,bit_offset,0x00000040));
			bit_offset += 0x00000040;
		}


		this.addValue("Info","", null, "Unknown0000", 0, 0xFFFFFFFF, 1, "unknown0000", null, [{display: "hex"}]);
		this.addValue("Info","", null, "Unknown99C3", 0, 0xFFFFFFFF, 1, "unknown99C3", null, [{display: "hex"}]);

		this.addList("Mails", "", null, "Mails", 32, "type", null, EoS_GetEnum("eos_sos_type"), "mails", null, [])
		this.addChild("Helper", "", null, "Helper", "helper", [{access: "readonly"}]);


		this.addChildArray("Unknown", "", null, "Unknown", null, 32, "unknown", [{access: "readonly"}]);
	}

	get unknown0000()
	{
		return this.#view.getUint32(0x00000000,true,0x00000020);
	}

	set unknown0000(value)
	{
		this.#view.setUint32(0x00000000,value,true,0x00000020);
	}

	get unknown99C3()
	{
		return this.#view.getUint32(0x000099C3,true,0x00000020);
	}

	set unknown99C3(value)
	{
		this.#view.setUint32(0x000099C3,value,true,0x00000020);
	}

	get mails()
	{
		return this.#mails;
	}

	get helper()
	{
		return this.#helper;
	}

	get unknown()
	{
		return this.#unknown;
	}
}


