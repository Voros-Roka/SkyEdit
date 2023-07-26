import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

export class EoS_SOSMailUnknown extends DataMapping
{
	#view = null;
	#moves = [];
	#item = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot SOS Mails Unknown`);

		console.log(i18n`unknown00 is '${this.unknown00}'`);*/

		this.addValueArray(null, "", null, "Unknown00", null, 0, 0xFFFFFFFF, 1, 2, "unknown00", null, [{display: "hex"}]);
	}

	get unknown00()
	{
		return this.#view.getUint32Array(0x00000000,2,32);
	}

	set unknown00(value)
	{
		this.#view.setUint32Array(0x00000000,2,value,true,32);
	}
}