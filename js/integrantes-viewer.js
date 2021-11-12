/**
 * Runs at document-end
 */

//todo: don't render your own courses
//todo: fix where number superscript is placed


/**
 * Next to every hyperlink-username, adds the superscript number of shared courses.
 * The superscript number has a tooltip which shows the specific courses shared.
 */

chrome.storage.local.get("settings", function (data) {
    const settings = data["settings"] ?? {};

    // Break if currently not set to display this
    if (!settings["cc-show-counter"]) {
        return
    }

    chrome.storage.local.get("users", function (data) {
        const users = data["users"] ?? {};
        const userLinks = document.querySelectorAll('a[href *= "usuario"]');

        for (const user of userLinks) {
            const splitUser = user["href"].split("/");

            if (splitUser.length === 6) {
                const thisID = splitUser[4];
                if (users[thisID] !== undefined && thisID !== settings["my-user"]) {

                    const tooltip = document.createElement("div");
                    tooltip.classList.add("tutooltiptext");

                    const thisUser = users[thisID];

                    for (const [key, value] of Object.entries(thisUser)) {
                        if (key !== "name") {
                            const thisCourse = document.createElement("a");
                            //todo: maybe switch to icon instead of text?
                            //https://www.u-cursos.cl/d/images/cargos/profesor_auxiliar.svg lower case

                            thisCourse.classList.add("tucompartido");
                            thisCourse.href = value["URL"];
                            thisCourse.textContent = value["code"] + "-" + value["section"] + " ";
                            thisCourse.textContent += "(" + value["year"] + "-" + value["semester"] + ")";
                            thisCourse.textContent += "  |  " + value["theirType"];
                            //listItem.appendChild(thisCourse);
                            tooltip.appendChild(thisCourse);
                        }
                    }

                    const courseCount = Object.keys(users[thisID]).length - 1;
                    const text = document.createElement("sup");
                    text.textContent = courseCount.toString();
                    text.classList.add("tutooltip");
                    text.appendChild(tooltip);

                    //text.appendChild(div);
                    user.parentElement.appendChild(text);

                }
            }
        }
    });
});

