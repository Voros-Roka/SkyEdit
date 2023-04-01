import { i18n } from "./utils.js";
import { SaveEditor } from "./editor.js"
import { EoS_Savefile } from "./formats/EoS_Raw/EoS_Savefile.js"

let save_editor = null;

function run_editor()
{
	console.log(i18n`Run Editor`);

	save_editor = new SaveEditor("editor_container","editor","visually_hidden");

	//save_editor.register_file_type(JsonSavefile);
	//save_editor.register_file_type(XmlSavefile);
	save_editor.register_file_type(EoS_Savefile);

	save_editor.update_file_dropzones();

}

document.addEventListener("DOMContentLoaded", run_editor);