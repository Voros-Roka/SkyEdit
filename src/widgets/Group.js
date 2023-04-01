export function createGroup(container, id, text)
{
	if(typeof container == "string")
	{
		container = document.getElementById(container);
	}

	let fieldset = document.createElement("fieldset");
	fieldset.id = id;
	fieldset.setAttribute("role","group");
	fieldset.classList.add("group");

	let legend = document.createElement("legend");
	legend.classList.add("group_legend");
	legend.classList.add("label_text");
	legend.append(text);

	let layoutdiv = document.createElement("div");
	layoutdiv.classList.add("group_layout");

	fieldset.appendChild(legend);
	fieldset.appendChild(layoutdiv);

	return [fieldset, layoutdiv];
}