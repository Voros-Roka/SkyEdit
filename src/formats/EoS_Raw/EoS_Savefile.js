import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";
import { EoS_Saveslot } from "./EoS_Saveslot.js";

export class EoS_Savefile extends DataMapping
{
	#slot0 = null;
	#slot1 = null;
	#file_size = 0;
	#buffer = null;
	#isdesmume = false;

	constructor()
	{
		super();
	}

	get name()
	{
		return "Raw EoS Savefile";
	}

	get datatype()
	{
		return "binary";
	}

	getBlob()
	{
		return new Blob([this.#buffer.dataview], {type: "application/octet-stream"});
	}

	validate(data)
	{
		//console.log(i18n`Checking if valid Raw EoS Savefile`);

		this.#buffer = new EoS_DataView(data);

		this.#file_size = data.byteLength;

		if(data.byteLength < 262144)
		{
			throw Error(i18n`File is too small, expected at least 262144 bytes but file is ${data.byteLength}`);
		}
		else if(this.#file_size > 262144)
		{
			//console.log(i18n`File coult be a desmume save file`);
			/*let desmume_string1 = buffer.getString("utf-8",0x00040000,82);
			if(desmume_string1 != "|<--Snip above here to create a raw sav by excluding this DeSmuME savedata footer:")
			{
				throw Error(i18n`Expected '|<--Snip above here to create a raw sav by excluding this DeSmuME savedata footer:' but got '${desmume_string1}'`);
			}*/

			let desmume_cookie = this.desmumecookie;
			if(desmume_cookie != "|-DESMUME SAVE-|")
			{
				throw Error(i18n`Expected desmume cookie '|-DESMUME SAVE-|' but got '${desmume_cookie}'`);
			}

			let desmume_version = this.desmumeversion;
			if(desmume_version != 0)
			{
				throw Error(i18n`Expected desmume version '0' but got '${desmume_version}'`);
			}

			let desmume_type = this.desmumetype;
			if(desmume_type != 5)
			{
				throw Error(i18n`We have a valid desmume save but we expected type '5' but got type '${desmume_type}'`);
			}

			/*console.log(i18n`Desmume version: ${desmume_version}`);
			console.log(i18n`Desmume cookie: ${desmume_cookie}`);
			console.log(i18n`Desmume size: ${desmume_size}`);
			console.log(i18n`Desmume padding size: ${desmume_padsize}`);
			console.log(i18n`Desmume type: ${desmume_type}`);
			console.log(i18n`Desmume address size: ${desmume_addrsize}`);
			console.log(i18n`Desmume memory size: ${desmume_memsize}`);*/

			this.#isdesmume = true;
		}

		let ident = this.#buffer.getString("windows-1252",0x00000004,13);
		if(ident != "POKE_DUN_SORA")
		{
			throw Error(i18n`Expected slot1 cookie to be 'POKE_DUN_SORA' but got ${ident}`);
		}

		let ident2 = this.#buffer.getUint32(0x00000024,true);
		if(ident2 != 0x09011416)
		{
			throw Error(i18n`Expected slot1 ident2 to be '0x9011416' but got '0x${ident2.toString(16)}'`);
		}

		ident = this.#buffer.getString("windows-1252",0x0000C804,13);
		if(ident != "POKE_DUN_SORA")
		{
			throw Error(i18n`Expected slot2 cookie to be 'POKE_DUN_SORA' but got ${ident}`);
		}

		ident2 = this.#buffer.getUint32(0x0000C824,true);
		if(ident2 != 0x09011416)
		{
			throw Error(i18n`Expected slot2 ident2 to be '0x9011416' but got '0x${ident2.toString(16)}'`);
		}
	}

	parse(data)
	{
		return new Promise((resolve, reject) => {

			this.#slot0 = new EoS_Saveslot(new EoS_DataView(data,0x00000000,0x0000B65C))

			this.#slot1 = new EoS_Saveslot(new EoS_DataView(data,0x0000C800,0x0000B65C))

			this.addChild("Main Slot", "Main slot of the savegame", null, "Main Slot", "slot0", [{access: "readonly"}]);
			this.addChild("Backup Slot", "Backup slot of the savegame", null, "Backup Slot", "slot1", [{access: "readonly"}]);

			/*setTimeout(() => {
				resolve(this);
			}, 5000);*/

			if(this.#isdesmume)
			{
				this.addValue("Desmume","Desmume savefile version", null, "Version", 0, 0xFFFFFFFF, 1, "desmumeversion", null, [{access: "readonly"}, {display: "dec"}]);
				this.addText("Desmume","Desmume identification cookie", null, "Cookie", 16, "desmumecookie", null, [{access: "readonly"}]);
				this.addValue("Desmume","Desmume size", null, "Size", 0, 0xFFFFFFFF, 1, "desmumesize", null, [{access: "readonly"}, {display: "hex"}]);
				this.addValue("Desmume","Desmume padding size", null, "Padding Size", 0, 0xFFFFFFFF, 1, "desmumepadsize", null, [{access: "readonly"}, {display: "hex"}]);
				this.addValue("Desmume","Desmume type", null, "Type", 0, 0xFFFFFFFF, 1, "desmumetype", null, [{access: "readonly"}, {display: "dec"}]);
				this.addValue("Desmume","Desmume address size", null, "Address Size", 0, 0xFFFFFFFF, 1, "desmumeaddrsize", null, [{access: "readonly"}, {display: "hex"}]);
				this.addValue("Desmume","Desmume memory size", null, "Memory Size", 0, 0xFFFFFFFF, 1, "desmumememsize", null, [{access: "readonly"}, {display: "hex"}]);
			}

			resolve(this);
		});
	}

	get slot0()
	{
		return this.#slot0;
	}

	get slot1()
	{
		return this.#slot1;
	}

	get desmumeversion()
	{
		return this.#buffer.getUint32(this.#file_size-20,true);
	}

	get desmumecookie()
	{
		return this.#buffer.getString("utf-8",this.#file_size-16,16)
	}

	get desmumesize()
	{
		return this.#buffer.getUint32(this.#file_size-40,true);
	}

	get desmumepadsize()
	{
		return this.#buffer.getUint32(this.#file_size-36,true);
	}

	get desmumetype()
	{
		return this.#buffer.getUint32(this.#file_size-32,true);
	}

	get desmumeaddrsize()
	{
		return this.#buffer.getUint32(this.#file_size-28,true);
	}

	get desmumememsize()
	{
		return this.#buffer.getUint32(this.#file_size-24,true);
	}

}

//Save: (start @0x00000000 and 0x0000C800)
//	Size: 0x0000B65C
//	Checksum @ 0x00000000  over 0x00000004 to 0x0000B65A (or 0x0000B65C?)  size 0x0000B658
//	Ident: (String) "POKE_DUN_SORA" @ 0x00000004 size 14 (13 + 0-Byte)
//		if string not found load goes into mode 5
//	Ident2: (uint32_t) @ 0x00000024 (Seems a fixed value of 0x09011416)
//		if not 0x09011416 then load goes into mode 4
//	RNG32-Seed?: (uint32_t) @ 0x00000028
//	HeaderMode: (undefined) @ 0x0000002C
//	RNG16-Seed?: (uint16_t) @ 0x00000030
//	Language: (uint8_t) @ 0x00000034
//		if @0x0000002C is 0
//			then this gets set to 0xff
//		else if @0x00000028 is not -1
//			it will be fed into a function
//
//	ScriptVars: (struct script_var_value_table) @ 0x00000038 size 1024 (look at RestoreScriptValriableValues)
//		Version							(uint32_t)		@ 0x00000000
//		Condition						(uint32_t)		@ 0x00000004
//		PositionX						(uint32_t[3])	@ 0x00000008
//		PositionY						(uint32_t[3])	@ 0x00000014
//		PositionZ						(uint32_t[3])	@ 0x00000020
//		RecycleCount					(uint32_t)		@ 0x0000002C
//		GroundEnter						(uint16_t)		@ 0x00000030
//		GroundGetOut					(uint16_t)		@ 0x00000032
//		GroundMap						(uint16_t)		@ 0x00000034
//		GroundPlace						(uint16_t)		@ 0x00000036
//		GroundEnterBackup				(uint16_t[5])	@ 0x00000038
//		GroundGetOutBackup				(uint16_t[5])	@ 0x00000042
//		GroundMapBackup					(uint16_t[5])	@ 0x0000004C
//		GroundPlaceBackup				(uint16_t[5])	@ 0x00000056
//		DungeonSelect					(uint16_t)		@ 0x00000060
//		DungeonEnter					(uint16_t)		@ 0x00000062
//		DungeonEnterMode				(uint16_t)		@ 0x00000064
//		DungeonEnterIndex				(uint16_t)		@ 0x00000066
//		DungeonEnterBackup				(uint16_t[5])	@ 0x00000068
//		DungeonEnterModeBackup			(uint16_t[5])	@ 0x00000072
//		DungeonEnterIndexBackup			(uint16_t[5])	@ 0x0000007C
//		HeroFirstKind					(monster_id_16)	@ 0x00000086
//		PartnerFirstKind				(monster_id_16)	@ 0x00000088
//		RandomRequestNPC3				(monster_id_16)	@ 0x0000008A
//		EventLocal						(uint16_t)		@ 0x0000008C
//		DungeonEventLocal				(uint16_t)		@ 0x0000008E
//		ItemBackup						(uint16_t[2])	@ 0x00000090
//		ItemBackupKureKure				(uint16_t[2])	@ 0x00000094
//		ItemBackupTake					(uint16_t[2])	@ 0x00000098
//		ItemBackupGet					(uint16_t[2])	@ 0x0000009C
//		RequestThanksResultKind			(uint16_t)		@ 0x000000A0
//		RequestThanksResultVariation	(uint16_t)		@ 0x000000A2
//		DungeonEnterFrequency			(uint16_t)		@ 0x000000A4
//		DungeonEnterFrequencyBackup		(uint16_t[5])	@ 0x000000A6
//		ScenarioBalanceFlag				(uint8_t)		@ 0x000000B0
//		ScenarioBalanceFlagDebug		(uint8_t)		@ 0x000000B1
//		HeroTalkKind					(talk_kind_8)	@ 0x000000B2
//		PartnerTalkKind					(talk_kind_8)	@ 0x000000B3
//		ConfigColorKind					(uint8_t)		@ 0x000000B4 (Maybe the border color male/female?)
//		RomVariation					(uint8_t)		@ 0x000000B5
//		SpecialEpisodeType				(uint8_t)		@ 0x000000B6
//		PostitionDirection				(uint8_t[3])	@ 0x000000B7
//		ScenarioSelect					(uint8_t[2])	@ 0x000000BA
//		ScenarioMain					(uint8_t[2])	@ 0x000000BC
//		ScenarioSide					(uint8_t[2])	@ 0x000000BE
//		ScenarioSub1					(uint8_t[2])	@ 0x000000C0
//		ScenarioSub2					(uint8_t[2])	@ 0x000000C2
//		ScenarioSub3					(uint8_t[2])	@ 0x000000C4
//		ScenarioSub4					(uint8_t[2])	@ 0x000000C6
//		ScenarioSub5					(uint8_t[2])	@ 0x000000C8
//		ScenarioSub6					(uint8_t[2])	@ 0x000000CA
//		ScenarioSub7					(uint8_t[2])	@ 0x000000CC
//		ScenarioSub8					(uint8_t[2])	@ 0x000000CE
//		CrystalColor1					(uint8_t)		@ 0x000000D0
//		CrystalColor2					(uint8_t)		@ 0x000000D1
//		CrystalColor3					(uint8_t)		@ 0x000000D2
//		CompulsorySavepoint				(uint8_t)		@ 0x000000D3
//		CompulsorySavepointSide			(uint8_t)		@ 0x000000D4
//		ScenarioSelectBackup			(uint8_t[8])	@ 0x000000D5
//		GroundEnterLink					(uint8_t)		@ 0x000000DD
//		GroundEnterLinkBackup			(uint8_t[5])	@ 0x000000DE
//		DungeonResult					(uint8_t)		@ 0x000000E3
//		GroundStartMode					(uint8_t)		@ 0x000000E4
//		DungeonResultBackup				(uint8_t[5])	@ 0x000000E5
//		GroundStartModeBackup			(uint8_t[5])	@ 0x000000EA
//		RequestClearCount				(uint8_t)		@ 0x000000F0
//		PlayerKind						(uint8_t)		@ 0x000000F1
//		Attendant1Kind					(uint8_t)		@ 0x000000F2
//		Attendant2Kind					(uint8_t)		@ 0x000000F3
//		PlayerKindBackup				(uint8_t[5])	@ 0x000000F4
//		Attendant1KindBackup			(uint8_t[5])	@ 0x000000F8
//		Attendant2KindBackup			(uint8_t[5])	@ 0x000000FD
//		WorldMapLevel					(uint8_t)		@ 0x00000102
//		LotteryResult					(uint8_t)		@ 0x00000103
//		Sub30SpotResult					(uint8_t)		@ 0x00000104
//		TeamRankEventLevel				(uint8_t)		@ 0x00000105
//		PlayOldGame						(uint8_t)		@ 0x00000106 (The Flag that the player played EoT/EoD)
//		HeroFirstName					(char[10])		@ 0x00000107
//		PartnerFirstName				(char[10])		@ 0x00000111
//		Flags							(uint8_t)		@ 0x0000011b (Side03Talk:3,Side06Room:3,Side08Boss2nd:1,Side01Boss2nd:1)
//		ScenarioMainFlags				(uint8_t[16])	@ 0x0000011c (Bit Flags)
//		ScenarioTalkFlags				(uint8_t[32])	@ 0x0000012c (Bit Flags)
//		ScenarioMainFlagsBackup			(uint8_t[64])	@ 0x0000014c (Bit Flags)
//		SpecialEpisodeOpen				(uint8_t[1])	@ 0x0000018c (Bit Flags)
//		SpecialEpisodeOpenOld			(uint8_t[1])	@ 0x0000018D (Bit Flags)
//		SpecialEpisodeOpenConquest		(uint8_t[1])	@ 0x0000018E (Bit Flags)
//		PerformanceProgress				(uint8_t[8])	@ 0x0000018F (Bit Flags)
//		DungeonOpenList					(uint8_t[32])	@ 0x00000197 (Bit Flags)
//		DungeonEnterList				(uint8_t[32])	@ 0x000001B7 (Bit Flags)
//		DungeonArriveList				(uint8_t[32])	@ 0x000001D7 (Bit Flags)
//		DungeonConquestList				(uint8_t[32])	@ 0x000001F7 (Bit Flags)
//		DungeonPresentList				(uint8_t[32])	@ 0x00000217 (Bit Flags)
//		DungeonRequestList				(uint8_t[32])	@ 0x00000237 (Bit Flags)
//		WorldMapMarkNormalList			(uint8_t[40])	@ 0x00000257 (Bit Flags)
//		WorldMapMarkSpecialList			(uint8_t[40])	@ 0x0000027F (Bit Flags)
//		StaionItemStatic				(uint8_t[4])	@ 0x000002A7 (Bit Flags)
//		StaionItemTemp					(uint8_t[4])	@ 0x000002AB (Bit Flags)
//		DeliverItemStatic				(uint8_t[2])	@ 0x000002AF (Bit Flags)
//		DeliverItemTemp					(uint8_t[2])	@ 0x000002B1 (Bit Flags)
//		OtherFlags						(uint8_t)		@ 0x000002B3 (FuwaranteLocal:5,Sub30TresureDiscover:1,Sub30SpotDiscover:1,Sub30ProjectP:1)
//		Unused							(uint8_t[332])	@ 0x000002B4
//
//	MonsterCount: (uint32_t) @ 0x00000438 (Max: 555 (0x22B))
//	DungeonTeamsCount: (uint32_t) @ 0x0000043C
//	ProgressCount: (uint32_t) @ 0x00000440
//	ItemCount: (uint32_t) @ 0x00000444
//	NameRankPerfCount: (uint32_t) @ 0x00000448
//	Unknown: (uint32_t) @ 0x0000044C (always zero?)
//	OptionsTimeAdventureCount: (uint32_t) @ 0x00000450
//	SOSMailCount: (uint32_t) @ 0x00000454
//	MissionCount: (uint32_t) @ 0x00000458
//	GroagunkCount: (uint32_t) @ 0x0000045C
//	UnknownDataCount: (uint32_t) @ 0x00000460
//
//	Assembly: @ 0x00000464 size 0x00007F6B
//		Member:
//			Field:			Offset in Bits:		Size in Bits
//			IsValid 		0x00000000			0x00000001
//			Level			0x00000001			0x00000007
//			ID				0x00000008			0x0000000B
//			JoinedDungeon	0x00000013			0x00000008
//			JoinedFloor		0x0000001B			0x00000008
//			LvlAt1stEvo		0x00000023			0x00000007
//			LvlAt2ndEvo		0x0000002A			0x00000007
//			IQ				0x00000031			0x0000000A
//			HP				0x0000003B			0x0000000A
//			ATK				0x00000045			0x00000008
//			SPATK			0x0000004D			0x00000008
//			DEF				0x00000055			0x00000008
//			SPDEF			0x0000005D			0x00000008
//			EXP				0x00000065			0x00000018
//			IQ_FLAGS		0x0000007D			0x00000045
//			TACTIC			0x000000C2			0x00000004
//			MOVES			0x000000C6			0x00000054
//				M0_FLAGS	0x000000C6			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M0_ID		0x000000CA			0x0000000A
//				M0_GINSENG	0x000000D4			0x00000007
//				M1_FLAGS	0x000000DB			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M1_ID		0x000000DF			0x0000000A
//				M1_GINSENG	0x000000E9			0x00000007
//				M2_FLAGS	0x000000F0			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M2_ID		0x000000F4			0x0000000A
//				M2_GINSENG	0x000000FE			0x00000007
//				M3_FLAGS	0x00000105			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M3_ID		0x00000109			0x0000000A
//				M3_GINSENG	0x00000113			0x00000007
//			NAME			0x0000011A			0x00000050
//		(Repeat until 555 Monster)
//		Unknown:
//			Field:			Offset in Bits:		Size in Bits
//			Unknown 		0x000310CE			0x00000040 (Seems to be always 0)
//			Unknown			0x0003110E			0x00000004 (Seems to be always 0)
//			Unknown			0x00031112			0x00000004 (Seems to be always 0)
//			Unknown			0x00031116			0x00000050 (Seems to be always 0, a name?)
//		Other Members: (Eggs?)
//			(Same as Roster entry)
//		(Repeat until 4 Monster)
//
//	DungeonTeams: @ 0x000083CF size 0x000005DC
//		Team: @ 0x000083CF size 0x000001F4
//			Unknown:
//				Field:			Offset in Bits:		Size in Bits
//				TeamValid 		0x00000000			0x00000001
//				Unknown			0x00000001			0x00000010
//			Unknown:
//				Field:			Offset in Bits:		Size in Bits
//				IndexPokemon0	0x00000011			0x00000010
//				IndexPokemon1	0x00000021			0x00000010
//				IndexPokemon2	0x00000031			0x00000010
//				IndexPokemon3	0x00000041			0x00000010
//			Members: @ 0x00000051 size 0x00000222
//				Field:			Offset in Bits:		Size in Bits
//				Flags			0x00000000			0x00000005
//				Level			0x00000005			0x00000007
//				JoinedDungeon	0x0000000C			0x00000008
//				JoinedFloor		0x00000014			0x00000008
//				Iq				0x0000001C			0x0000000A
//				MemberIndex		0x00000026			0x00000010
//				TeamIndex		0x00000036			0x00000010
//				ID				0x00000046			0x0000000B
//				CurrentHP		0x00000051			0x0000000A
//				MaxHP			0x0000005B			0x0000000A
//				ATK				0x00000065			0x00000008
//				SPATK			0x0000006D			0x00000008
//				DEF				0x00000075			0x00000008
//				SPDEF			0x0000007D			0x00000008
//				EXP				0x00000085			0x00000018
//				MOVES			0x0000009D			0x00000074
//					M0_FLAGS	0x00000000			0x00000005 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1,SEALED:1)
//					M0_ID		0x00000005			0x0000000A
//					M0_PP		0x0000000F			0x00000007
//					M0_GINSENG	0x00000016			0x00000007
//					M1_FLAGS	0x0000001D			0x00000005 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1,SEALED:1)
//					M1_ID		0x00000022			0x0000000A
//					M1_PP		0x0000002C			0x00000007
//					M1_GINSENG	0x00000033			0x00000007
//					M2_FLAGS	0x0000003A			0x00000005 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1,SEALED:1)
//					M2_ID		0x0000003F			0x0000000A
//					M2_PP		0x00000048			0x00000007
//					M2_GINSENG	0x0000004F			0x00000007
//					M3_FLAGS	0x00000056			0x00000005 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1,SEALED:1)
//					M3_ID		0x0000005B			0x0000000A
//					M3_PP		0x00000065			0x00000007
//					M3_GINSENG	0x0000006C			0x00000007
//				Unknown			0x00000111			0x00000008
//				HeldItem		0x00000119			0x00000021
//					Flags		0x00000000			0x00000008 (EXISTS:1,IN_SHOP:1,UNPAID:1,STICKY:1,SET:1,UNK:3)
//					Quantity	0x00000008			0x0000000B
//					ID			0x00000013			0x0000000B
//					HeldBy		0x0000001E			0x00000003 (0:None,1:Leader,2:Partner,3:Mon3,4:Mon4)
//				CurBellyInt		0x0000013A			0x00000010
//				CurBellyFrac	0x0000014A			0x00000010
//				MaxBellyInt		0x0000015A			0x00000010
//				MaxBellyFrac	0x0000016A			0x00000010
//				IqFlags			0x0000017A			0x00000045
//				Tactic			0x000001BF			0x00000004
//				Unknown			0x000001C3			0x0000000A
//				Unknown			0x000001CD			0x00000005
//				Name			0x000001D2			0x00000050
//			(Repeat 4 times)
//		(Repeat 3 Times)
//
//	Progress: @ 0x000089AB size 0x00001F7
//		Field:				Offset in Bits:		Size in Bits
//		Unknown				0x00000000			0x00000483 (unused)
//		DungeonTips			0x00000483			0x0000001F
//		PokemonAttacked		0x000004A2			0x00000483
//		ExclusivPokemon		0x00000925			0x00000017 (not really used)
//		DungeonMaxFloor		0x0000093C			0x00000007 * 0xb4
//		AdventureCount		0x00000E28			0x00000020
//		Unknown				0x00000E48			0x00000008 * 0x10
//
//	Items: @ 0x00008BA2	size 0x00000DAC
//		Bag: size 0x00000A50
//			Items: size 0x00000021
//				Field:		Offset in Bits:		Size in Bits
//				Flags		0x00000000			0x00000008 (EXISTS:1,IN_SHOP:1,UNPAID:1,STICKY:1,SET:1,UNK:3)
//				Quantity	0x00000008			0x0000000B
//				ID			0x00000013			0x0000000B
//				HeldBy		0x0000001E			0x00000003 (0:None,1:Leader,2:Partner,3:Mon3,4:Mon4)
//			(Repeat 50 times)
//		(Repeat 3 times) (For each team?)
//		Storage Items:
//			Field:			Offset in Bits:		Size in Bits
//			ItemId			0x00001356			0x0000000B
//		(Repeat 1000 times)
//		Storage Quantity:
//			Field:			Offset in Bits:		Size in Bits
//			Quantity		0x00003E4E			0x0000000B
//		(Repeat 1000 times)
//		Kecleon Shops: size 0x00000108
//			Kecleon Green:
//				Items: (if less then 8, zero terminate)
//					Field:			Offset in Bits:		Size in Bits
//					Item0Id			0x00006946			0x0000000B
//					Item0Quantity	0x00006951			0x0000000B
//					Item1Id			0x0000695C			0x0000000B
//					Item1Quantity	0x00006967			0x0000000B
//					Item2Id			0x00006972			0x0000000B
//					Item2Quantity	0x0000697D			0x0000000B
//					Item3Id			0x00006988			0x0000000B
//					Item3Quantity	0x00006993			0x0000000B
//					Item4Id			0x0000699E			0x0000000B
//					Item4Quantity	0x000069A9			0x0000000B
//					Item5Id			0x000069B4			0x0000000B
//					Item5Quantity	0x000069BF			0x0000000B
//					Item6Id			0x000069CA			0x0000000B
//					Item6Quantity	0x000069D5			0x0000000B
//					Item7Id			0x000069E0			0x0000000B
//					Item7Quantity	0x000069EB			0x0000000B
//			Kecleon Purple:
//				Items: (if less then 4, zero terminate)
//					Field:			Offset in Bits:		Size in Bits
//					Item0Id			0x000069F6			0x0000000B
//					Item0Quantity	0x00006A01			0x0000000B
//					Item1Id			0x00006A0C			0x0000000B
//					Item1Quantity	0x00006A17			0x0000000B
//					Item2Id			0x00006A22			0x0000000B
//					Item2Quantity	0x00006A2D			0x0000000B
//					Item3Id			0x00006A38			0x0000000B
//					Item3Quantity	0x00006A43			0x0000000B
//		(Repeat 2 times)
//		Money Carried:
//			Field:			Offset in Bits:		Size in Bits
//			Quantity		0x00006B56			0x00000018
//		(Repeat 3 times) (For each team?)
//		Money Stored:
//			Field:			Offset in Bits:		Size in Bits
//			Quantity		0x00006B9E			0x00000018
//		Field:			Offset in Bits:		Size in Bits
//		Unknown			0x00006BB6			0x0000000C
//		Unknown			0x00006BC2			0x0000000C
//		Unknown			0x00006BCE			0x00000008
//		Unknown			0x00006BD6			0x00000008
//		Unknown			0x00006BDE			0x00000010
//		Unknown			0x00006BEE			0x00000010
//		Unknown			0x00006BFE			0x00000010
//
//	NameRankPerf: @ 0x0000994E size 0x00000010
//		Field:		Offset in Bits:		Size in Bits
//		Team Name	0x00000000			0x00000050
//		RankPoints	0x00000050			0x00000020
//		PerfFlag?	0x00000070			0x00000001
//
//	OptionsPlaytimeAdventure: @ 0x0000995E size 0x00000340
//		Other Config: (needs to be tested ... just a guess which options are which)
//			Field:		Offset in Bits:		Size in Bits
//			TouchScreen	0x00000000			0x00000002
//			TopScreen	0x00000002			0x00000003
//			BotScreen	0x00000005			0x00000002
//			Grids		0x00000007			0x00000001
//			Speed		0x00000008			0x00000001
//			FarPals		0x00000009			0x00000001
//			DamageTurn	0x0000000A			0x00000001
//			DirAttack	0x0000000B			0x00000001
//			CheckDir	0x0000000C			0x00000001
//			WinFrame	0x0000000D			0x00000003
//		Playtime:
//			Field:		Offset in Bits:		Size in Bits
//			Frametime	0x00000010			0x00000006
//			Seconds		0x00000016			0x00000020
//		AdventureLog:
//			Field:				Offset in Bits:		Size in Bits
//			DungeonsCleared		0x00000036			0x00000014
//			FriendsRescued		0x0000004A			0x00000014
//			Evolutions			0x0000005E			0x00000014
//			CompletionFlags		0x00000072			0x00000080
//			JoinedCount			0x000000F2			0x0000000E
//			BattledCount		0x00000100			0x0000000E
//			MovesLearned		0x0000010E			0x00000009
//			VictoriesOnFloor	0x00000117			0x00000014
//			FaintCount			0x0000012B			0x00000014
//			EggsHatched			0x0000013F			0x00000014
//			BigTresureWin		0x00000153			0x00000014
//			Recycled			0x00000167			0x00000014
//			GiftsSend			0x0000017B			0x00000014
//			JoinedFlags			0x0000018F			0x000004A0
//			BattledFlags		0x0000062F			0x000004A0
//			MovesLearnedFlags	0x00000ACF			0x00000220
//			ItemsAcquiredFlags	0x00000CEF			0x00000580
//			SpecChallengeFlags	0x0000126F			0x00000020
//			SentryDutyPoints	0x0000128F			0x00000020 * 0x05
//			CurrentDungeon		0x0000132F			0x00000008
//			CurrentFloor		0x00001337			0x00000008
//
//	SosMailData: @ 0x00009C9E size 0x000015A0
//		Unknown:
//			Field:				Offset in Bits:		Size in Bits
//			Unknown				0x00000000			0x00000020 (seems to be 0xBF123456 when there never was a a sosmail in the save ... maybe flags if mails are valid?)
//		SosMails: @ 0x00000020 size 0x000004C1
//			Field:				Offset in Bits:		Size in Bits
//			Type				0x00000000			0x00000004 (Type? 1=SOS Mail, 4=A-OK Mail, 5=Thank You Mail ...)
//			Dungeon				0x00000004			0x00000008
//			Floor				0x0000000C			0x00000008
//			Seed?				0x00000014			0x00000018
//			Unknown				0x0000002C			0x00000040
//			Unknown				0x0000006C			0x00000040
//			Language			0x000000AC			0x00000004
//			TeamName			0x000000B0			0x00000050
//			Unknown				0x00000100			0x00000120
//			Unknown				0x00000220			0x00000240
//			Unknown				0x00000460			0x0000000B (Client?) (Reward?)
//			Unknown				0x0000046B			0x0000000B (Client?) (Reward?)
//			Unknown				0x00000476			0x00000040
//			Unknown				0x000004B6			0x00000008 (Rescue Chances?)
//			Unknown				0x000004BE			0x00000001
//			Unknown				0x000004BF			0x00000002 (Some random number ... don't know what it does ...)
//		(Repeat 32 times)
//		Helper: @ 0x00009840 size 0x00000183
//			Field:			Offset in Bits:		Size in Bits
//			Flags 			0x00000000			0x00000004
//			Level			0x00000004			0x00000007
//			JoinedDungeon	0x0000000B			0x00000008
//			JoinedFloor		0x00000013			0x00000008
//			ID				0x0000001B			0x0000000B
//			LvlAt1stEvo		0x00000026			0x00000007
//			LvlAt2ndEvo		0x0000002D			0x00000007
//			IQ				0x00000034			0x0000000A
//			HP				0x0000003E			0x0000000A
//			ATK				0x00000048			0x00000008
//			SPATK			0x00000050			0x00000008
//			DEF				0x00000058			0x00000008
//			SPDEF			0x00000060			0x00000008
//			EXP				0x00000078			0x00000018
//			IQ_FLAGS		0x00000080			0x00000045
//			TACTIC			0x000000C5			0x00000004
//			MOVES			0x000000C9			0x00000054
//				M0_FLAGS	0x000000C9			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M0_ID		0x000000CD			0x0000000A
//				M0_GINSENG	0x000000D7			0x00000007
//				M1_FLAGS	0x000000DE			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M1_ID		0x000000E2			0x0000000A
//				M1_GINSENG	0x000000EC			0x00000007
//				M2_FLAGS	0x000000F3			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M2_ID		0x000000F7			0x0000000A
//				M2_GINSENG	0x00000101			0x00000007
//				M3_FLAGS	0x00000108			0x00000004 (EXISTS:1,LINK_CHAIN:1,AI_EN:1,SET:1)
//				M3_ID		0x0000010C			0x0000000A
//				M3_GINSENG	0x00000116			0x00000007
//			NAME			0x0000011D			0x00000050
//			ItemQuantity	0x0000016D			0x0000000B
//			ItemID			0x00000178			0x0000000B
//		Field:			Offset in Bits:		Size in Bits
//		Unknown			0x000099C3			0x00000020 (Might be flags if the following entrys are valid)
//		Unknown: @ 0x000099E3 size 0x00000040
//			Field:			Offset in Bits:		Size in Bits
//			Unknown			0x00000000			0x00000040
//		(Repeat 32 times)
//
//	Missions: @ 0x0000B23E size 0x00000237
//		Missions:
//			Mission:
//				Field:			Offset in Bits:		Size in Bits
//				Status			0x00000000			0x00000004
//				Type			0x00000004			0x00000004
//				SubType			0x00000008			0x00000004
//				Client			0x0000000C			0x0000000B
//				Target			0x00000017			0x0000000B
//				Unknown			0x00000022			0x0000000B
//				Unknown			0x0000002D			0x0000000A
//				RewardType		0x00000037			0x00000004
//				ItemReward		0x0000003B			0x0000000B
//				RestrictionType	0x00000046			0x00000001
//				Restriction		0x00000047			0x0000000B
//				Seed?			0x00000052			0x00000018
//				Dungeon			0x0000006A			0x00000008
//				Floor			0x00000072			0x00000008
//				Unknown			0x0000007A			0x00000008 (Maybe Rank?)
//			(Repeat 8 times)
//		(Repeat 3 times)
//		Field:			Offset in Bits:		Size in Bits
//		Mission_A		0x00000C30			0x00000082 (same as above)
//		Mission_B		0x00000CB2			0x00000082 (same as above)
//		Unknown: (Could be Wondermail?)
//			Field:			Offset in Bits:		Size in Bits
//			Unknown			0x00000D34			0x00000020
//			Unknown			0x00000D54			0x00000018
//			Dungeon?		0x00000D6C			0x00000008
//			Floor?			0x00000D74			0x00000008
//		(Repeat 16 times)
//
//	GroagunkShop: @ 0x0000B475 size 0x0000000B
//		Field:			Offset in Bits:		Size in Bits
//		Item0Id			0x00000000			0x0000000B
//		Item1Id			0x0000000B			0x0000000B
//		Item2Id			0x00000016			0x0000000B
//		Item3Id			0x00000021			0x0000000B
//		Item4Id			0x0000002C			0x0000000B
//		Item5Id			0x00000037			0x0000000B
//		Item6Id			0x00000042			0x0000000B
//		Item7Id			0x0000004D			0x0000000B
//
//	UnknownData: @ 0x0000B480 size 0x000001DC
//		Field:			Offset in Bits:		Size in Bits
//		Unknown			0x00000000			0x00000200
//		Unknown			0x00000200			0x00000050 * 0x10
//		Unknown			0x00000700			0x00000060 * 0x10
//		Unknown			0x00000D00			0x00000001 * 0x10
//		Unknown			0x00000D10			0x000001B0
//		Unknown			0x00000EC0			0x0000000E
//		Unknown			0x00000ECE			0x0000000E
//		Unknown			0x00000EDC			0x00000001
//		Unknown			0x00000EDD			0x00000001
//		Unknown			0x00000EDE			0x00000001
//		Unknown			0x00000EDF			0x00000001
//
//	Padding @ 0x0000B65C size 0x000011A4 (all 0xFF)
//
//Qicksave:
//	Size: 0x00005800
//	Checksum @ 0x00019000 over 0x00019004 to 0x0001E7FF size 0x00005800-0x04