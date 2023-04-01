import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

export class EoS_UnknownData1 extends DataMapping
{
	#view = null;


	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Unknown Data0`);

		console.log(i18n`unknown000 is '${this.unknown000}'`);*/

		this.addValueArray(null, "", null, "Unknown000", null, 0, 0xFFFFFFFF, 1, 0x0000003, "unknown000", null, [{display: "hex"}]);
	}

	get unknown000()
	{
		return this.#view.getUint32Array(0x00000000,0x0000003,0x00000020);
	}

	set unknown000(value)
	{
		this.#view.setUint32Array(0x00000000,value,0x0000003,0x00000020);
	}
}
