import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

export class EoS_Options extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();
		this.#view = view;

		/*console.log(i18n`Parsing EoS Savefile Slot Options`);

		console.log(i18n`touchscreen is '${this.touchscreen.toString(16)}'`);
		console.log(i18n`topscreen is '${this.topscreen.toString(16)}'`);
		console.log(i18n`botscreen is '${this.botscreen.toString(16)}'`);
		console.log(i18n`grids is '${this.grids.toString()}'`);
		console.log(i18n`speed is '${this.speed.toString()}'`);
		console.log(i18n`farpals is '${this.farpals.toString()}'`);
		console.log(i18n`damageturn is '${this.damageturn.toString()}'`);
		console.log(i18n`dirattack is '${this.dirattack.toString()}'`);
		console.log(i18n`checkdir is '${this.checkdir.toString()}'`);
		console.log(i18n`winframe is '${this.winframe.toString(16)}'`);*/

		this.addEnum(null, "", null, "Touch Screen", 0, 2, "touchscreen", { "Off": 0, "Menu Only": 1, "Use anywhere": 2} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Top Screen", 0, 4, "topscreen", { "Controls": 0, "Team stats": 1, "Text log": 2, "Map and team": 3, "Job": 4} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Bottom Screen", 0, 2, "botscreen", { "No map": 0, "Clear map": 1, "Shaded map": 2} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Grids", 0, 1, "grids", { "Off": 0, "On": 1} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Speed", 0, 1, "speed", { "Regular": 0, "Fast": 1} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Far-off pals", 0, 1, "farpals", { "Self": 0, "Look": 1} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Damage turn", 0, 1, "damageturn", { "No": 0, "Yes": 1} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Directional attack", 0, 1, "dirattack", { "Off": 0, "On": 1} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Check direction", 0, 1, "checkdir", { "Off": 0, "On": 1} , null, [{display: "dec"}]);
		this.addEnum(null, "", null, "Frametype", 0, 1, "winframe", { "1": 0, "2": 1, "3": 2, "4": 3, "5": 4} , null, [{display: "dec"}]);
	}

	get touchscreen()
	{
		return this.#view.getUint8(0x00000000,0x00000002);
	}

	set touchscreen(value)
	{
		this.#view.setUint8(0x00000000,value,0x00000002);
	}

	get topscreen()
	{
		return this.#view.getUint8(0x00000002,0x00000003);
	}

	set topscreen(value)
	{
		this.#view.setUint8(0x00000002,value,0x00000003);
	}

	get botscreen()
	{
		return this.#view.getUint8(0x00000005,0x00000002);
	}

	set botscreen(value)
	{
		this.#view.setUint8(0x00000005,value,0x00000002);
	}

	get grids()
	{
		return this.#view.getUint8(0x00000007,0x00000001);
	}

	set grids(value)
	{
		this.#view.setUint8(0x00000007,value,0x00000001);
	}

	get speed()
	{
		return this.#view.getUint8(0x00000008,0x00000001);
	}

	set speed(value)
	{
		this.#view.setUint8(0x00000008,value,0x00000001);
	}

	get farpals()
	{
		return this.#view.getUint8(0x00000009,0x00000001);
	}

	set farpals(value)
	{
		this.#view.setUint8(0x00000009,value,0x00000001);
	}

	get damageturn()
	{
		return this.#view.getUint8(0x0000000A,0x00000001);
	}

	set damageturn(value)
	{
		this.#view.setUint8(0x0000000A,value,0x00000001);
	}

	get dirattack()
	{
		return this.#view.getUint8(0x0000000B,0x00000001);
	}

	set dirattack(value)
	{
		this.#view.setUint8(0x0000000B,value,0x00000001);
	}

	get checkdir()
	{
		return this.#view.getUint8(0x0000000C,0x00000001);
	}

	set checkdir(value)
	{
		this.#view.setUint8(0x0000000C,value,0x00000001);
	}

	get winframe()
	{
		return this.#view.getUint8(0x0000000D,0x00000003);
	}

	set winframe(value)
	{
		this.#view.setUint8(0x0000000D,value,0x00000003);
	}
}