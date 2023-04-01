import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

export class EoS_NameRankPerf extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Name Rank Performance`);

		console.log(i18n`teamname is '${this.teamname.toString()}'`);
		console.log(i18n`rank is '${this.rank.toString(16)}'`);
		console.log(i18n`performance is '${this.performance.toString()}'`);*/

		this.addText(null, "", null, "Teamname", 10, "teamname", null, [])
		this.addValue(null,"", null, "Rank", 0, 0xFFFFFFFF, 1, "rank", null, [{display: "dec"}]);
		this.addBool(null, "", null, "Performance", "performance", null, []);
	}

	get teamname()
	{
		return this.#view.getString("windows-1252",0x00000000,10);
	}

	set teamname(value)
	{
		this.#view.setString("windows-1252",0x00000000,value,10,true);
	}

	get rank()
	{
		return this.#view.getUint32(0x00000050,true,0x00000020);
	}

	set rank(value)
	{
		this.#view.setUint32(0x00000050,value,true,0x00000020);
	}

	get performance()
	{
		return this.#view.getBool(0x00000070);
	}

	set performance(value)
	{
		this.#view.setBool(0x00000070,value);
	}
}