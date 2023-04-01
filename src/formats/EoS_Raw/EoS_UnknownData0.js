import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

export class EoS_UnknownData0 extends DataMapping
{
	#view = null;


	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Unknown Data0`);

		console.log(i18n`unknown000 is '${this.unknown000}'`);*/

		this.addValueArray(null, "", null, "Unknown000", null, 0, 0xFFFF, 1, 0x0000005, "unknown000", null, [{display: "hex"}]);
	}

	get unknown000()
	{
		return this.#view.getUint16Array(0x00000000,0x0000005,0x00000010);
	}

	set unknown000(value)
	{
		this.#view.setUint16Array(0x00000000,value,0x0000005,0x00000010);
	}
}