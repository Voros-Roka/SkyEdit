
export function i18n(string, ...args)
{
	let i18n_id = ""
	for(let i = 0; i < string.length; i++)
	{
		i18n_id += string[i];
		if(args[i] != undefined)
		{
			i18n_id += "[]";
		}
	}

	//console.log("i18n_id: " + i18n_id);
	let i18n_string = ""
	let translated_string = i18n_id.split("[]");
	for(let i = 0; i < string.length; i++)
	{
		if(translated_string[i] != undefined)
		{
			i18n_string += translated_string[i]
		}
		if(args[i] != undefined)
		{
			i18n_string += args[i].toString();
		}
	}


	return i18n_string;
}
