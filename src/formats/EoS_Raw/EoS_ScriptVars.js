import { DataMapping } from "../../DataMapping.js";
import { i18n } from "../../utils.js";
import { EoS_DataView , EoS_DataBitView } from "./EoS_Common.js";

import { EoS_GetEnum } from "./EoS_Enums.js";

export class EoS_ScriptVars extends DataMapping
{
	#view = null;

	constructor(view)
	{
		super();

		this.#view = view;

		let version = this.version;
		if(version != 1)
		{
			throw new Error(i18n`Expected the script var version to be '1' but got '${version}'`);
		}

		/*console.log(i18n`Parsing EoS Savefile Slot ScriptVars`);

		console.log(i18n`version is '${version}'`);
		console.log(i18n`condition is '${this.condition.toString(16)}'`);
		console.log(i18n`positionx is '${this.positionx}'`);
		console.log(i18n`positiony is '${this.positiony}'`);
		console.log(i18n`positionz is '${this.positionz}'`);
		console.log(i18n`recyclecount is '${this.recyclecount.toString(16)}'`);
		console.log(i18n`groundenter is '${this.groundenter.toString(16)}'`);
		console.log(i18n`groundgetout is '${this.groundgetout.toString(16)}'`);
		console.log(i18n`groundmap is '${this.groundmap.toString(16)}'`);
		console.log(i18n`groundplace is '${this.groundplace.toString(16)}'`);
		console.log(i18n`groundenterbackup is '${this.groundenterbackup}'`);
		console.log(i18n`groundgetoutbackup is '${this.groundgetoutbackup}'`);
		console.log(i18n`groundmapbackup is '${this.groundmapbackup}'`);
		console.log(i18n`groundplacebackup is '${this.groundplacebackup}'`);
		console.log(i18n`dungeonselect is '${this.dungeonselect.toString(16)}'`);
		console.log(i18n`dungeonenter is '${this.dungeonenter.toString(16)}'`);
		console.log(i18n`dungeonentermode is '${this.dungeonentermode.toString(16)}'`);
		console.log(i18n`dungeonenterindex is '${this.dungeonenterindex.toString(16)}'`);
		console.log(i18n`dungeonenterbackup is '${this.dungeonenterbackup}'`);
		console.log(i18n`dungeonentermodebackup is '${this.dungeonentermodebackup}'`);
		console.log(i18n`dungeonenterindexbackup is '${this.dungeonenterindexbackup}'`);
		console.log(i18n`herofirstkind is '${this.herofirstkind}'`);
		console.log(i18n`partnerfirstkind is '${this.partnerfirstkind}'`);
		console.log(i18n`randomrequestnpc3kind is '${this.randomrequestnpc3kind.toString(16)}'`);
		console.log(i18n`eventlocal is '${this.eventlocal.toString(16)}'`);
		console.log(i18n`dungeoneventlocal is '${this.dungeoneventlocal.toString(16)}'`);
		console.log(i18n`itembackup is '${this.itembackup}'`);
		console.log(i18n`itembackupkurekure is '${this.itembackupkurekure}'`);
		console.log(i18n`itembackuptake is '${this.itembackuptake}'`);
		console.log(i18n`itembackupget is '${this.itembackupget}'`);
		console.log(i18n`requestthanksresultkind is '${this.requestthanksresultkind.toString(16)}'`);
		console.log(i18n`requestthanksresultvariation is '${this.requestthanksresultvariation.toString(16)}'`);
		console.log(i18n`dungeonenterfrequency is '${this.dungeonenterfrequency.toString(16)}'`);
		console.log(i18n`dungeonenterfrequencybackup is '${this.dungeonenterfrequencybackup}'`);
		console.log(i18n`scenarioBalanceflag is '${this.scenarioBalanceflag.toString(16)}'`);
		console.log(i18n`scenarioBalanceflagdebug is '${this.scenarioBalanceflagdebug.toString(16)}'`);
		console.log(i18n`herotalkkind is '${this.herotalkkind.toString(16)}'`);
		console.log(i18n`partnertalkkind is '${this.partnertalkkind.toString(16)}'`);
		console.log(i18n`configcolorkind is '${this.configcolorkind.toString(16)}'`);
		console.log(i18n`romvariation is '${this.romvariation.toString(16)}'`);
		console.log(i18n`specialepisodetype is '${this.specialepisodetype.toString(16)}'`);
		console.log(i18n`positiondirection is '${this.positiondirection}'`);
		console.log(i18n`scenarioselect is '${this.scenarioselect}'`);
		console.log(i18n`scenariomain is '${this.scenariomain}'`);
		console.log(i18n`scenarioside is '${this.scenarioside}'`);
		console.log(i18n`scenariosub1 is '${this.scenariosub1}'`);
		console.log(i18n`scenariosub2 is '${this.scenariosub2}'`);
		console.log(i18n`scenariosub3 is '${this.scenariosub3}'`);
		console.log(i18n`scenariosub4 is '${this.scenariosub4}'`);
		console.log(i18n`scenariosub5 is '${this.scenariosub5}'`);
		console.log(i18n`scenariosub6 is '${this.scenariosub6}'`);
		console.log(i18n`scenariosub7 is '${this.scenariosub7}'`);
		console.log(i18n`scenariosub8 is '${this.scenariosub8}'`);
		console.log(i18n`crystalcolor1 is '${this.crystalcolor1.toString(16)}'`);
		console.log(i18n`crystalcolor2 is '${this.crystalcolor2.toString(16)}'`);
		console.log(i18n`crystalcolor3 is '${this.crystalcolor3.toString(16)}'`);
		console.log(i18n`compulsorysavepoint is '${this.compulsorysavepoint.toString(16)}'`);
		console.log(i18n`compulsorysavepointside is '${this.compulsorysavepointside.toString(16)}'`);
		console.log(i18n`scenarioselectbackup is '${this.scenarioselectbackup}'`);
		console.log(i18n`groundenterlink is '${this.groundenterlink.toString(16)}'`);
		console.log(i18n`groundenterlinkbackup is '${this.groundenterlinkbackup}'`);
		console.log(i18n`dungeonresult is '${this.dungeonresult.toString(16)}'`);
		console.log(i18n`groundstartmode is '${this.groundstartmode.toString(16)}'`);
		console.log(i18n`dungeonresultbackup is '${this.dungeonresultbackup}'`);
		console.log(i18n`groundstartmodebackup is '${this.groundstartmodebackup}'`);
		console.log(i18n`requestclearcount is '${this.requestclearcount.toString(16)}'`);
		console.log(i18n`playerkind is '${this.playerkind.toString(16)}'`);
		console.log(i18n`attendant1kind is '${this.attendant1kind.toString(16)}'`);
		console.log(i18n`attendant2kind is '${this.attendant2kind.toString(16)}'`);
		console.log(i18n`playerkindbackup is '${this.playerkindbackup}'`);
		console.log(i18n`attendant1kindbackup is '${this.attendant1kindbackup}'`);
		console.log(i18n`attendant2kindbackup is '${this.attendant2kindbackup}'`);
		console.log(i18n`worldmaplevel is '${this.worldmaplevel.toString(16)}'`);
		console.log(i18n`lotteryresult is '${this.lotteryresult.toString(16)}'`);
		console.log(i18n`sub30spotlevel is '${this.sub30spotlevel.toString(16)}'`);
		console.log(i18n`teamrankeventlevel is '${this.teamrankeventlevel.toString(16)}'`);
		console.log(i18n`playoldgame is '${this.playoldgame.toString(16)}'`);
		console.log(i18n`herofirstname is '${this.herofirstname.toString()}'`);
		console.log(i18n`partnerfirstname is '${this.partnerfirstname.toString()}'`);
		// everything is flags from here
		console.log(i18n`sideflags is '${this.sideflags}'`);
		console.log(i18n`scenariomainflags is '${this.scenariomainflags}'`);
		console.log(i18n`scenariotalkflags is '${this.scenariotalkflags}'`);
		console.log(i18n`scenariomainflagsbackup is '${this.scenariomainflagsbackup}'`);
		console.log(i18n`specialepisodeopen is '${this.specialepisodeopen}'`);
		console.log(i18n`specialepisodeopenold is '${this.specialepisodeopenold}'`);
		console.log(i18n`specialepisodeconquest is '${this.specialepisodeconquest}'`);
		console.log(i18n`performanceprogress is '${this.performanceprogress}'`);
		console.log(i18n`dungeonopenlist is '${this.dungeonopenlist}'`);
		console.log(i18n`dungeonenterlist is '${this.dungeonenterlist}'`);
		console.log(i18n`dungeonarrivelist is '${this.dungeonarrivelist}'`);
		console.log(i18n`dungeonconquestlist is '${this.dungeonconquestlist}'`);
		console.log(i18n`dungeonpresentlist is '${this.dungeonpresentlist}'`);
		console.log(i18n`dungeonrequestlist is '${this.dungeonrequestlist}'`);
		console.log(i18n`worldmapmarknormallist is '${this.worldmapmarknormallist}'`);
		console.log(i18n`worldmapmarkspeciallist is '${this.worldmapmarkspeciallist}'`);
		console.log(i18n`stationitemstatic is '${this.stationitemstatic}'`);
		console.log(i18n`stationitemtemp is '${this.stationitemtemp}'`);
		console.log(i18n`deliveritemstatic is '${this.deliveritemstatic}'`);
		console.log(i18n`deliveritemtemp is '${this.deliveritemtemp}'`);
		console.log(i18n`otherflags is '${this.otherflags}'`);*/

		// MISC
		this.addValue("Misc", "Script var version, always '1'", null, "Version", 0, 0xFFFFFFFF, 1, "version", null, [{access: "readonly"}, {display: "dec"}]);
		this.addValue("Misc", "", null, "CONDITION", 0, 0xFFFFFFFF, 1, "condition", null, [{display: "dec"}]);
		this.addValueArray("Misc", "", null, "POSITION_X", null, 0, 0xFFFFFFFF, 1, 3, "positionx", null, [{display: "dec"}]);
		this.addValueArray("Misc", "", null, "POSITION_Y", null, 0, 0xFFFFFFFF, 1, 3, "positiony", null, [{display: "dec"}]);
		this.addValueArray("Misc", "", null, "POSITION_HEIGHT", null, 0, 0xFFFFFFFF, 1, 3, "positionz", null, [{display: "dec"}]);
		this.addValue("Misc", "", null, "RECYCLE_COUNT", 0, 0xFFFFFFFF, 1, "recyclecount", null, [{display: "dec"}]);
		this.addValue("Misc", "", null, "REQUEST_THANKS_RESULT_KIND", 0, 0xFFFF, 1, "requestthanksresultkind", null, [{display: "dec"}]);
		this.addValue("Misc", "", null, "REQUEST_THANKS_RESULT_VARIATION", 0, 0xFFFF, 1, "requestthanksresultvariation", null, [{display: "dec"}]);
		this.addValue("Misc", "", null, "ROM_VARIATION", 0, 0xFF, 1, "romvariation", null, [{display: "dec"}]);
		this.addValueArray("Misc", "", null, "POSITION_DIRECTION", null, 0, 0xFF, 1, 2, "positiondirection", null, [{display: "dec"}]);
		this.addValue("Misc", "", null, "REQUEST_CLEAR_COUNT", 0, 0xFF, 1, "requestclearcount", null, [{display: "dec"}]);
		this.addValue("Misc", "", null, "TEAM_RANK_EVENT_LEVEL", 0, 0xFF, 1, "teamrankeventlevel", null, [{display: "dec"}]);
		this.addValue("Misc", "If the player played EoT/EoD", null, "PLAY_OLD_GAME", 0, 0xFF, 1, "playoldgame", null, [{display: "dec"}]);
		this.addBoolArray("Misc", "", null, "STATION_ITEM_STATIC", null, 32, "stationitemstatic", null, []);
		this.addBoolArray("Misc", "", null, "STATION_ITEM_TEMP", null, 32, "stationitemtemp", null, []);
		this.addBoolArray("Misc", "", null, "DELIVER_ITEM_STATIC", null, 32, "deliveritemstatic", null, []);
		this.addBoolArray("Misc", "", null, "DELIVER_ITEM_TEMP", null, 32, "deliveritemtemp", null, []);

		//INIT
		this.addValue("Init", "", null, "GROUND_ENTER", 0, 0xFFFF, 1, "groundenter", null, [{display: "dec"}]);
		this.addValue("Init", "", null, "GROUND_GETOUT", 0, 0xFFFF, 1, "groundgetout", null, [{display: "dec"}]);
		this.addValue("Init", "", null, "GROUND_MAP", 0, 0xFFFF, 1, "groundmap", null, [{display: "dec"}]);
		this.addValue("Init", "", null, "GROUND_PLACE", 0, 0xFFFF, 1, "groundplace", null, [{display: "dec"}]);
		this.addValueArray("Init", "", null, "SCENARIO_SELECT", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenarioselect", null, [{display: "dec"}]);
		this.addValue("Init", "", null, "GROUND_ENTER_LINK", 0, 0xFF, 1, "groundenterlink", null, [{display: "dec"}]);
		this.addValueArray("Init", "", null, "GROUND_ENTER_LINK_BACKUP", null, 0, 0xFF, 1, 2, "groundenterlinkbackup", null, [{display: "dec"}]);
		this.addValue("Init", "", null, "GROUND_START_MODE", 0, 0xFF, 1, "groundstartmode", null, [{display: "dec"}]);

		//BACKUP
		this.addValueArray("Backup", "", null, "GROUND_ENTER_BACKUP", null, 0, 0xFFFF, 1, 5, "groundenterbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "GROUND_GETOUT_BACKUP", null, 0, 0xFFFF, 1, 5, "groundgetoutbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "GROUND_MAP_BACKUP", null, 0, 0xFFFF, 1, 5, "groundmapbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "GROUND_PLACE_BACKUP", null, 0, 0xFFFF, 1, 5, "groundplacebackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "DUNGEON_ENTER_BACKUP", null, 0, 0xFFFF, 1, 5, "dungeonenterbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "DUNGEON_ENTER_MODE_BACKUP", null, 0, 0xFFFF, 1, 5, "dungeonentermodebackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "DUNGEON_ENTER_INDEX_BACKUP", null, 0, 0xFFFF, 1, 5, "dungeonenterindexbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "ITEM_BACKUP", null, 0, 0xFFFF, 1, 2, "itembackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "ITEM_BACKUP_KUREKURE", null, 0, 0xFFFF, 1, 2, "itembackupkurekure", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "ITEM_BACKUP_TAKE", null, 0, 0xFFFF, 1, 2, "itembackuptake", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "ITEM_BACKUP_GET", null, 0, 0xFFFF, 1, 2, "itembackupget", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "DUNGEON_ENTER_FREQUENCY_BACKUP", null, 0, 0xFFFF, 1, 5, "dungeonenterfrequencybackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "SCENARIO_SELECT_BACKUP", null, 0, 0xFF, 1, 8, "scenarioselectbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "DUNGEON_RESULT_BACKUP", null, 0, 0xFF, 1, 5, "dungeonresultbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "GROUND_START_MODE_BACKUP", null, 0, 0xFF, 1, 5, "groundstartmodebackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "PLAYER_KIND_BACKUP", null, 0, 0xFF, 1, 5, "playerkindbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "ATTENDANT1_KIND_BACKUP", null, 0, 0xFF, 1, 5, "attendant1kindbackup", null, [{display: "dec"}]);
		this.addValueArray("Backup", "", null, "ATTENDANT2_KIND_BACKUP", null, 0, 0xFF, 1, 5, "attendant2kindbackup", null, [{display: "dec"}]);
		this.addBoolArray("Backup", "", null, "SCENARIO_MAIN_BIT_FLAG_BACKUP", null, 512, "scenariomainflagsbackup", null, []);

		//DUNGEON INIT
		this.addValue("Dungeon Init", "", null, "DUNGEON_SELECT", 0, 0xFFFF, 1, "dungeonselect", null, [{display: "dec"}]);
		this.addValue("Dungeon Init", "", null, "DUNGEON_ENTER", 0, 0xFFFF, 1, "dungeonenter", null, [{display: "dec"}]);
		this.addValue("Dungeon Init", "", null, "DUNGEON_ENTER_MODE", 0, 0xFFFF, 1, "dungeonentermode", null, [{display: "dec"}]);
		this.addValue("Dungeon Init", "", null, "DUNGEON_ENTER_INDEX", 0, 0xFFFF, 1, "dungeonenterindex", null, [{display: "dec"}]);
		this.addValue("Dungeon Init", "", null, "DUNGEON_ENTER_FREQUENCY", 0, 0xFFFF, 1, "dungeonenterfrequency", null, [{display: "dec"}]);
		this.addValue("Dungeon Init", "", null, "DUNGEON_RESULT", 0, 0xFF, 1, "dungeonresult", null, [{display: "dec"}]);

		//PLAYER
		this.addEnum("Player", "", null, "HERO_FIRST_KIND", 0, 0xFFFF, "herofirstkind", EoS_GetEnum("eos_monster_id"), null, [{display: "dec"}]);
		this.addEnum("Player", "", null, "PARTNER_FIRST_KIND", 0, 0xFFFF, "partnerfirstkind", EoS_GetEnum("eos_monster_id"), null, [{display: "dec"}]);
		this.addEnum("Player", "", null, "RANDOM_REQUEST_NPC03_ID", 0, 0xFFFF, "randomrequestnpc3kind", EoS_GetEnum("eos_monster_id"), null, [{display: "dec"}]);
		this.addValue("Player", "", null, "HERO_TALK_KIND", 0, 0xFF, 1, "herotalkkind", null, [{display: "dec"}]);
		this.addValue("Player", "", null, "PARTNER_TALK_KIND", 0, 0xFF, 1, "partnertalkkind", null, [{display: "dec"}]);
		this.addValue("Player", "", null, "CONFIG_COLOR_KIND", 0, 0xFF, 1, "configcolorkind", null, [{display: "dec"}]);
		this.addValue("Player", "", null, "PLAYER_KIND", 0, 0xFF, 1, "playerkind", null, [{display: "dec"}]);
		this.addValue("Player", "", null, "ATTENDANT1_KIND", 0, 0xFF, 1, "attendant1kind", null, [{display: "dec"}]);
		this.addValue("Player", "", null, "ATTENDANT2_KIND", 0, 0xFF, 1, "attendant2kind", null, [{display: "dec"}]);
		this.addText("Player", "", null, "HERO_FIRST_NAME", 10, "herofirstname", null, []);
		this.addText("Player", "", null, "PARTNER_FIRST_NAME", 10, "partnerfirstname", null, []);


		//SPECIFIC
		this.addValue("Specific", "", null, "EVENT_LOCAL", 0, 0xFFFF, 1, "eventlocal", null, [{display: "dec"}]);
		this.addValue("Specific", "", null, "DUNGEON_EVENT_LOCAL", 0, 0xFFFF, 1, "dungeoneventlocal", null, [{display: "dec"}]);
		this.addValue("Specific", "", null, "CRYSTAL_COLOR_1", 0, 0xFF, 1, "crystalcolor1", null, [{display: "dec"}]);
		this.addValue("Specific", "", null, "CRYSTAL_COLOR_2", 0, 0xFF, 1, "crystalcolor2", null, [{display: "dec"}]);
		this.addValue("Specific", "", null, "CRYSTAL_COLOR_3", 0, 0xFF, 1, "crystalcolor3", null, [{display: "dec"}]);
		this.addValue("Specific", "", null, "LOTTERY_RESULT", 0, 0xFF, 1, "lotteryresult", null, [{display: "dec"}]);
		this.addValue("Specific", "", null, "SUB30_SPOT_LEVEL", 0, 0xFF, 1, "sub30spotlevel", null, [{display: "dec"}]);
		this.addBoolArray("Specific", "", null, "SIDE_FLAGS", ["SIDE02_TALK_0", "SIDE02_TALK_1", "SIDE02_TALK_2", "SIDE06_ROOM_0", "SIDE06_ROOM_1", "SIDE06_ROOM_2", "SIDE08_BOSS2ND", "SIDE01_BOSS2ND"], 8, "sideflags", null, []);
		this.addBoolArray("Specific", "", null, "MISC_FLAGS", ["BIT_FUWARANTE_LOCAL_0", "BIT_FUWARANTE_LOCAL_1", "BIT_FUWARANTE_LOCAL_2", "BIT_FUWARANTE_LOCAL_3", "BIT_FUWARANTE_LOCAL_4", "SUB30_TRESURE_DISCOVER", "SUB30_SPOT_DISCOVER", "SUB30_PROJECTP"], 8, "otherflags", null, []);


		//SCENARIO
		this.addValue("Scenario", "", null, "SCENARIO_BALANCE_FLAG", 0, 0xFF, 1, "scenarioBalanceflag", null, [{display: "dec"}]);
		this.addValue("Scenario", "", null, "SCENARIO_BALANCE_FLAG_DEBUG", 0, 0xFF, 1, "scenarioBalanceflagdebug", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_MAIN", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariomain", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SIDE", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenarioside", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB1", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub1", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB2", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub2", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB3", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub3", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB4", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub4", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB5", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub5", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB6", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub6", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB7", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub7", null, [{display: "dec"}]);
		this.addValueArray("Scenario", "", null, "SCENARIO_SUB8", ["Scenario", "Level"], 0, 0xFF, 1, 2, "scenariosub8", null, [{display: "dec"}]);
		this.addValue("Scenario", "", null, "COMPULSORY_SAVE_POINT", 0, 0xFF, 1, "compulsorysavepoint", null, [{display: "dec"}]);
		this.addValue("Scenario", "", null, "COMPULSORY_SAVE_POINT_SIDE", 0, 0xFF, 1, "compulsorysavepointside", null, [{display: "dec"}]);
		this.addBoolArray("Scenario", "", null, "SCENARIO_MAIN_BIT_FLAG", null, 128, "scenariomainflags", null, []);
		this.addBoolArray("Scenario", "", null, "SCENARIO_TALK_BIT_FLAG", null, 256, "scenariotalkflags", null, []);
		this.addBoolArray("Scenario", "", null, "PERFORMANCE_PROGRESS_LIST", null, 64, "performanceprogress", null, []);


		//MODE
		this.addValue("Mode", "", null, "SPECIAL_EPISODE_TYPE", 0, 0xFF, 1, "specialepisodetype", null, [{display: "dec"}]);
		this.addBoolArray("Mode", "", null, "SPECIAL_EPISODE_OPEN", null, 8, "specialepisodeopen", null, []);
		this.addBoolArray("Mode", "", null, "SPECIAL_EPISODE_OPEN_OLD", null, 8, "specialepisodeopenold", null, []);
		this.addBoolArray("Mode", "", null, "SPECIAL_EPISODE_CONQUEST", null, 8, "specialepisodeconquest", null, []);

		//WORLD MAP
		this.addValue("World Map", "", null, "WORLD_MAP_LEVEL", 0, 0xFF, 1, "worldmaplevel", null, [{display: "dec"}]);
		this.addBoolArray("World Map", "", null, "WORLD_MAP_MARK_LIST_NORMAL", null, 320, "worldmapmarknormallist", null, []);
		this.addBoolArray("World Map", "", null, "WORLD_MAP_MARK_LIST_SPECIAL", null, 320, "worldmapmarkspeciallist", null, []);

		//DUNGEON PROGRESS
		this.addBoolArray("Dungeon Progress", "", null, "DUNGEON_OPEN_LIST", EoS_GetEnum("eos_dungeon"), 256, "dungeonopenlist", null, []);
		this.addBoolArray("Dungeon Progress", "", null, "DUNGEON_ENTER_LIST", EoS_GetEnum("eos_dungeon"), 256, "dungeonenterlist", null, []);
		this.addBoolArray("Dungeon Progress", "", null, "DUNGEON_ARRIVE_LIST", EoS_GetEnum("eos_dungeon"), 256, "dungeonarrivelist", null, []);
		this.addBoolArray("Dungeon Progress", "", null, "DUNGEON_CONQUEST_LIST", EoS_GetEnum("eos_dungeon"), 256, "dungeonconquestlist", null, []);
		this.addBoolArray("Dungeon Progress", "", null, "DUNGEON_PRESENT_LIST", EoS_GetEnum("eos_dungeon"), 256, "dungeonpresentlist", null, []);
		this.addBoolArray("Dungeon Progress", "", null, "DUNGEON_REQUEST_LIST", EoS_GetEnum("eos_dungeon"), 256, "dungeonrequestlist", null, []);
	}

	get version() //
	{
		return this.#view.getUint32(0x00000000,true);
	}

	get condition() //
	{
		return this.#view.getUint32(0x00000004,true);
	}

	set condition(value) //
	{
		this.#view.setUint32(0x00000004,value,true);
	}

	get positionx() //
	{
		return this.#view.getUint32Array(0x00000008,3,true);
	}

	set positionx(value) //
	{
		this.#view.setUint32Array(0x00000008,value,3,true);
	}

	get positiony() //
	{
		return this.#view.getUint32Array(0x00000014,3,true);
	}

	set positiony(value) //
	{
		this.#view.setUint32Array(0x00000014,value,3,true);
	}

	get positionz() //
	{
		return this.#view.getUint32Array(0x00000020,3,true);
	}

	set positionz(value) //
	{
		this.#view.setUint32Array(0x00000020,value,3,true);
	}

	get recyclecount() //
	{
		return this.#view.getUint32(0x0000002C,true);
	}

	set recyclecount(value) //
	{
		this.#view.setUint32(0x0000002C,value,true);
	}

	get groundenter() //
	{
		return this.#view.getUint16(0x00000030,true);
	}

	set groundenter(value) //
	{
		this.#view.setUint16(0x00000030,value,true);
	}

	get groundgetout() //
	{
		return this.#view.getUint16(0x00000032,true);
	}

	set groundgetout(value) //
	{
		this.#view.setUint16(0x00000032,value,true);
	}

	get groundmap() //
	{
		return this.#view.getUint16(0x00000034,true);
	}

	set groundmap(value) //
	{
		this.#view.setUint16(0x00000034,value,true);
	}

	get groundplace() //
	{
		return this.#view.getUint16(0x00000036,true);
	}

	set groundplace(value) //
	{
		this.#view.setUint16(0x00000036,value,true);
	}

	get groundenterbackup() //
	{
		return this.#view.getUint16Array(0x00000038,5,true);
	}

	set groundenterbackup(value) //
	{
		this.#view.setUint16Array(0x00000038,value,5,true);
	}

	get groundgetoutbackup() //
	{
		return this.#view.getUint16Array(0x00000042,5,true);
	}

	set groundgetoutbackup(value) //
	{
		this.#view.setUint16Array(0x00000042,value,5,true);
	}

	get groundmapbackup() //
	{
		return this.#view.getUint16Array(0x0000004C,5,true);
	}

	set groundmapbackup(value) //
	{
		this.#view.setUint16Array(0x0000004C,value,5,true);
	}

	get groundplacebackup() //
	{
		return this.#view.getUint16Array(0x00000056,5,true);
	}

	set groundplacebackup(value) //
	{
		this.#view.setUint16Array(0x00000056,value,5,true);
	}

	get dungeonselect() //
	{
		return this.#view.getUint16(0x00000060,true);
	}

	set dungeonselect(value) //
	{
		this.#view.setUint16(0x00000060,value,true);
	}

	get dungeonenter() //
	{
		return this.#view.getUint16(0x00000062,true);
	}

	set dungeonenter(value) //
	{
		this.#view.setUint16(0x00000062,value,true);
	}

	get dungeonentermode() //
	{
		return this.#view.getUint16(0x00000064,true);
	}

	set dungeonentermode(value) //
	{
		this.#view.setUint16(0x00000064,value,true);
	}

	get dungeonenterindex() //
	{
		return this.#view.getUint16(0x00000066,true);
	}

	set dungeonenterindex(value) //
	{
		this.#view.setUint16(0x00000066,value,true);
	}

	get dungeonenterbackup() //
	{
		return this.#view.getUint16Array(0x00000068,5,true);
	}

	set dungeonenterbackup(value) //
	{
		this.#view.setUint16Array(0x00000068,value,5,true);
	}

	get dungeonentermodebackup() //
	{
		return this.#view.getUint16Array(0x00000072,5,true);
	}

	set dungeonentermodebackup(value) //
	{
		this.#view.setUint16Array(0x00000072,value,5,true);
	}

	get dungeonenterindexbackup() //
	{
		return this.#view.getUint16Array(0x0000007C,5,true);
	}

	set dungeonenterindexbackup(value) //
	{
		this.#view.setUint16Array(0x0000007C,value,5,true);
	}

	get herofirstkind() //
	{
		return this.#view.getUint16(0x00000086,true);
	}

	set herofirstkind(value) //
	{
		this.#view.setUint16(0x00000086,value,true);
	}

	get partnerfirstkind() //
	{
		return this.#view.getUint16(0x00000088,true);
	}

	set partnerfirstkind(value) //
	{
		this.#view.setUint16(0x00000088,value,true);
	}

	get randomrequestnpc3kind() //
	{
		return this.#view.getUint16(0x0000008A,true);
	}

	set randomrequestnpc3kind(value) //
	{
		this.#view.setUint16(0x0000008A,value,true);
	}

	get eventlocal() //
	{
		return this.#view.getUint16(0x0000008C,true);
	}

	set eventlocal(value) //
	{
		this.#view.setUint16(0x0000008C,value,true);
	}

	get dungeoneventlocal() //
	{
		return this.#view.getUint16(0x0000008E,true);
	}

	set dungeoneventlocal(value) //
	{
		this.#view.setUint16(0x0000008E,value,true);
	}

	get itembackup() //
	{
		return this.#view.getUint16Array(0x00000090,2,true);
	}

	set itembackup(value) //
	{
		this.#view.setUint16Array(0x00000090,value,2,true);
	}

	get itembackupkurekure() //
	{
		return this.#view.getUint16Array(0x00000094,2,true);
	}

	set itembackupkurekure(value) //
	{
		this.#view.setUint16Array(0x00000094,value,2,true);
	}

	get itembackuptake() //
	{
		return this.#view.getUint16Array(0x00000098,2,true);
	}

	set itembackuptake(value) //
	{
		this.#view.setUint16Array(0x00000098,value,2,true);
	}

	get itembackupget() //
	{
		return this.#view.getUint16Array(0x0000009C,2,true);
	}

	set itembackupget(value) //
	{
		this.#view.setUint16Array(0x0000009C,value,2,true);
	}

	get requestthanksresultkind() //
	{
		return this.#view.getUint16(0x000000A0,true);
	}

	set requestthanksresultkind(value) //
	{
		this.#view.setUint16(0x000000A0,value,true);
	}

	get requestthanksresultvariation() //
	{
		return this.#view.getUint16(0x000000A2,true);
	}

	set requestthanksresultvariation(value) //
	{
		this.#view.setUint16(0x000000A2,value,true);
	}

	get dungeonenterfrequency() //
	{
		return this.#view.getUint16(0x000000A4,true);
	}

	set dungeonenterfrequency(value) //
	{
		this.#view.setUint16(0x000000A4,value,true);
	}

	get dungeonenterfrequencybackup() //
	{
		return this.#view.getUint16Array(0x000000A6,5,true);
	}

	set dungeonenterfrequencybackup(value) //
	{
		this.#view.setUint16Array(0x000000A6,value,5,true);
	}

	get scenarioBalanceflag() //
	{
		return this.#view.getUint8(0x000000B0);
	}

	set scenariobalanceflag(value) //
	{
		this.#view.setUint8(0x000000B0,value);
	}

	get scenarioBalanceflagdebug() //
	{
		return this.#view.getUint8(0x000000B1);
	}

	set scenarioBalanceflagdebug(value) //
	{
		this.#view.setUint8(0x000000B1,value);
	}

	get herotalkkind() //
	{
		return this.#view.getUint8(0x000000B2);
	}

	set herotalkkind(value) //
	{
		this.#view.setUint8(0x000000B2,value,true);
	}

	get partnertalkkind() //
	{
		return this.#view.getUint8(0x000000B3);
	}

	set partnertalkkind(value) //
	{
		this.#view.setUint8(0x000000B3,value);
	}

	get configcolorkind() //
	{
		return this.#view.getUint8(0x000000B4);
	}

	set configcolorkind(value) //
	{
		this.#view.setUint8(0x000000B4,value);
	}

	get romvariation() //
	{
		return this.#view.getUint8(0x000000B5);
	}

	set romvariation(value) //
	{
		this.#view.setUint8(0x000000B5,value);
	}

	get specialepisodetype() //
	{
		return this.#view.getUint8(0x000000B6);
	}

	set specialepisodetype(value) //
	{
		this.#view.setUint8(0x000000B6,value);
	}

	get positiondirection() //
	{
		return this.#view.getUint8Array(0x000000B7,2);
	}

	set positiondirection(value) //
	{
		this.#view.setUint8Array(0x000000B7,value,2);
	}

	get scenarioselect() //
	{
		return this.#view.getUint8Array(0x000000BA,2);
	}

	set scenarioselect(value) //
	{
		this.#view.setUint8Array(0x000000BA,value,2);
	}

	get scenariomain() //
	{
		return this.#view.getUint8Array(0x000000BC,2);
	}

	set scenariomain(value) //
	{
		this.#view.setUint8Array(0x000000BC,value,2);
	}

	get scenarioside() //
	{
		return this.#view.getUint8Array(0x000000BE,2);
	}

	set scenarioside(value) //
	{
		this.#view.setUint8Array(0x000000BE,value,2);
	}

	get scenariosub1() //
	{
		return this.#view.getUint8Array(0x000000C0,2);
	}

	set scenariosub1(value) //
	{
		this.#view.setUint8Array(0x000000C0,value,2);
	}

	get scenariosub2() //
	{
		return this.#view.getUint8Array(0x000000C2,2);
	}

	set scenariosub2(value) //
	{
		this.#view.setUint8Array(0x000000C2,value,2);
	}

	get scenariosub3() //
	{
		return this.#view.getUint8Array(0x000000C4,2);
	}

	set scenariosub3(value) //
	{
		this.#view.setUint8Array(0x000000C4,value,2);
	}

	get scenariosub4() //
	{
		return this.#view.getUint8Array(0x000000C6,2);
	}

	set scenariosub4(value) //
	{
		this.#view.setUint8Array(0x000000C6,value,2);
	}

	get scenariosub5() //
	{
		return this.#view.getUint8Array(0x000000C8,2);
	}

	set scenariosub5(value) //
	{
		this.#view.setUint8Array(0x000000C8,value,2);
	}

	get scenariosub6() //
	{
		return this.#view.getUint8Array(0x000000CA,2);
	}

	set scenariosub6(value) //
	{
		this.#view.setUint8Array(0x000000CA,value,2);
	}

	get scenariosub7() //
	{
		return this.#view.getUint8Array(0x000000CC,2);
	}

	set scenariosub7(value) //
	{
		this.#view.setUint8Array(0x000000CC,value,2);
	}

	get scenariosub8() //
	{
		return this.#view.getUint8Array(0x000000CE,2);
	}

	set scenariosub8(value) //
	{
		this.#view.setUint8Array(0x000000CE,value,2);
	}

	get crystalcolor1() //
	{
		return this.#view.getUint8(0x000000D0);
	}

	set crystalcolor1(value) //
	{
		this.#view.setUint8(0x000000D0,value);
	}

	get crystalcolor2() //
	{
		return this.#view.getUint8(0x000000D1);
	}

	set crystalcolor2(value) //
	{
		this.#view.setUint8(0x000000D1,value);
	}

	get crystalcolor3() //
	{
		return this.#view.getUint8(0x000000D2);
	}

	set crystalcolor3(value) //
	{
		this.#view.setUint8(0x000000D2,value);
	}

	get compulsorysavepoint() //
	{
		return this.#view.getUint8(0x000000D3);
	}

	set compulsorysavepoint(value) //
	{
		this.#view.setUint8(0x000000D3,value);
	}

	get compulsorysavepointside() //
	{
		return this.#view.getUint8(0x000000D4);
	}

	set compulsorysavepointside(value) //
	{
		this.#view.setUint8(0x000000D4,value);
	}

	get scenarioselectbackup() //
	{
		return this.#view.getUint8Array(0x000000D5,8);
	}

	set scenarioselectbackup(value) //
	{
		this.#view.setUint8Array(0x000000D5,value,8);
	}

	get groundenterlink() //
	{
		return this.#view.getUint8(0x000000DD);
	}

	set groundenterlink(value) //
	{
		this.#view.setUint8(0x000000DD,value);
	}

	get groundenterlinkbackup() //
	{
		return this.#view.getUint8Array(0x000000DE,5);
	}

	set groundenterlinkbackup(value) //
	{
		this.#view.setUint8Array(0x000000DE,value,5);
	}

	get dungeonresult() //
	{
		return this.#view.getUint8(0x000000E3);
	}

	set dungeonresult(value) //
	{
		this.#view.setUint8(0x000000E3,value);
	}

	get groundstartmode() //
	{
		return this.#view.getUint8(0x000000E4);
	}

	set groundstartmode(value) //
	{
		this.#view.setUint8(0x000000E4,value);
	}

	get dungeonresultbackup() //
	{
		return this.#view.getUint8Array(0x000000E5,5);
	}

	set dungeonresultbackup(value) //
	{
		this.#view.setUint8Array(0x000000E5,value,5);
	}

	get groundstartmodebackup() //
	{
		return this.#view.getUint8Array(0x000000EA,5);
	}

	set groundstartmodebackup(value) //
	{
		this.#view.setUint8Array(0x000000EA,value,5);
	}

	get requestclearcount() //
	{
		return this.#view.getUint8(0x000000F0);
	}

	set requestclearcount(value) //
	{
		this.#view.setUint8(0x000000F0,value);
	}

	get playerkind() //
	{
		return this.#view.getUint8(0x000000F1);
	}

	set playerkind(value) //
	{
		this.#view.setUint8(0x000000F1,value);
	}

	get attendant1kind() //
	{
		return this.#view.getUint8(0x000000F2);
	}

	set attendant1kind(value) //
	{
		this.#view.setUint8(0x000000F2,value);
	}

	get attendant2kind() //
	{
		return this.#view.getUint8(0x000000F3);
	}

	set attendant2kind(value) //
	{
		this.#view.setUint8(0x000000F3,value);
	}

	get playerkindbackup() //
	{
		return this.#view.getUint8Array(0x000000F4,5);
	}

	set playerkindbackup(value) //
	{
		this.#view.setUint8Array(0x000000F4,value,5);
	}

	get attendant1kindbackup() //
	{
		return this.#view.getUint8Array(0x000000F8,5);
	}

	set attendant1kindbackup(value) //
	{
		this.#view.setUint8Array(0x000000F8,value,5);
	}

	get attendant2kindbackup() //
	{
		return this.#view.getUint8Array(0x000000FD,5);
	}

	set attendant2kindbackup(value) //
	{
		this.#view.setUint8Array(0x000000FD,value,5);
	}

	get worldmaplevel() //
	{
		return this.#view.getUint8(0x00000102);
	}

	set worldmaplevel(value) //
	{
		this.#view.setUint8(0x00000102,value);
	}

	get lotteryresult() //
	{
		return this.#view.getUint8(0x00000103);
	}

	set lotteryresult(value) //
	{
		this.#view.setUint8(0x00000103,value);
	}

	get sub30spotlevel() //
	{
		return this.#view.getUint8(0x00000104);
	}

	set sub30spotlevel(value) //
	{
		this.#view.setUint8(0x00000104,value);
	}

	get teamrankeventlevel() //
	{
		return this.#view.getUint8(0x00000105);
	}

	set teamrankeventlevel(value) //
	{
		this.#view.setUint8(0x00000105,value);
	}

	get playoldgame() //
	{
		return this.#view.getUint8(0x00000106);
	}

	set playoldgame(value) //
	{
		this.#view.setUint8(0x00000106,value);
	}

	get herofirstname() //
	{
		return this.#view.getString("windows-1252",0x00000107,10);
	}

	set herofirstname(value) //
	{
		this.#view.setString("windows-1252",0x00000107,value,10,true);
	}

	get partnerfirstname() //
	{
		return this.#view.getString("windows-1252",0x00000111,10);
	}

	set partnerfirstname(value) //
	{
		this.#view.setString("windows-1252",0x00000111,value,10,true);
	}

	get sideflags() //
	{
		return this.#view.getBoolArray(0x0000011B,1);
	}

	set sideflags(value) //
	{
		this.#view.setBoolArray(0x0000011B,value,1)
	}

	get scenariomainflags()
	{
		return this.#view.getBoolArray(0x0000011C,16);
	}

	set scenariomainflags(value)
	{
		this.#view.setBoolArray(0x0000011C,value,16)
	}

	get scenariotalkflags()
	{
		return this.#view.getBoolArray(0x0000012C,32);
	}

	set scenariotalkflags(value)
	{
		this.#view.setBoolArray(0x0000012C,value,32)
	}

	get scenariomainflagsbackup()
	{
		return this.#view.getBoolArray(0x0000014C,64);
	}

	set scenariomainflagsbackup(value)
	{
		this.#view.setBoolArray(0x0000014C,value,64)
	}

	get specialepisodeopen()
	{
		return this.#view.getBoolArray(0x0000018C,1);
	}

	set specialepisodeopen(value)
	{
		this.#view.setBoolArray(0x0000018C,value,1)
	}

	get specialepisodeopenold()
	{
		return this.#view.getBoolArray(0x0000018D,1);
	}

	set specialepisodeopenold(value)
	{
		this.#view.setBoolArray(0x0000018D,value,1)
	}

	get specialepisodeconquest()
	{
		return this.#view.getBoolArray(0x0000018E,1);
	}

	set specialepisodeconquest(value)
	{
		this.#view.setBoolArray(0x0000018E,value,1)
	}

	get performanceprogress()
	{
		return this.#view.getBoolArray(0x0000018F,8);
	}

	set performanceprogress(value)
	{
		this.#view.setBoolArray(0x0000018F,value,8)
	}

	get dungeonopenlist()
	{
		return this.#view.getBoolArray(0x00000197,32);
	}

	set dungeonopenlist(value)
	{
		this.#view.setBoolArray(0x00000197,value,32)
	}

	get dungeonenterlist()
	{
		return this.#view.getBoolArray(0x000001B7,32);
	}

	set dungeonenterlist(value)
	{
		this.#view.setBoolArray(0x000001B7,value,32)
	}

	get dungeonarrivelist()
	{
		return this.#view.getBoolArray(0x000001D7,32);
	}

	set dungeonarrivelist(value)
	{
		this.#view.setBoolArray(0x000001D7,value,32)
	}

	get dungeonconquestlist()
	{
		return this.#view.getBoolArray(0x000001F7,32);
	}

	set dungeonconquestlist(value)
	{
		this.#view.setBoolArray(0x000001F7,value,32)
	}

	get dungeonpresentlist()
	{
		return this.#view.getBoolArray(0x00000217,32);
	}

	set dungeonpresentlist(value)
	{
		this.#view.setBoolArray(0x00000217,value,32)
	}

	get dungeonrequestlist()
	{
		return this.#view.getBoolArray(0x00000237,32);
	}

	set dungeonrequestlist(value)
	{
		this.#view.setBoolArray(0x00000237,value,32)
	}

	get worldmapmarknormallist()
	{
		return this.#view.getBoolArray(0x00000257,40);
	}

	set worldmapmarknormallist(value)
	{
		this.#view.setBoolArray(0x00000257,value,40)
	}

	get worldmapmarkspeciallist()
	{
		return this.#view.getBoolArray(0x0000027F,40);
	}

	set worldmapmarkspeciallist(value)
	{
		this.#view.setBoolArray(0x0000027F,value,40)
	}

	get stationitemstatic()
	{
		return this.#view.getBoolArray(0x000002A7,4);
	}

	set stationitemstatic(value)
	{
		this.#view.setBoolArray(0x000002A7,value,4)
	}

	get stationitemtemp()
	{
		return this.#view.getBoolArray(0x000002AB,4);
	}

	set stationitemtemp(value)
	{
		this.#view.setBoolArray(0x000002AB,value,4)
	}

	get deliveritemstatic()
	{
		return this.#view.getBoolArray(0x000002AF,2);
	}

	set deliveritemstatic(value)
	{
		this.#view.setBoolArray(0x000002AF,value,2)
	}

	get deliveritemtemp()
	{
		return this.#view.getBoolArray(0x000002B1,2);
	}

	set deliveritemtemp(value)
	{
		this.#view.setBoolArray(0x000002B1,value,2)
	}

	get otherflags()
	{
		return this.#view.getBoolArray(0x000002B3,1);
	}

	set otherflags(value)
	{
		this.#view.setBoolArray(0x000002B3,value,1)
	}
}