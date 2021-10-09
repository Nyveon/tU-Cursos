//todo: don't render your own courses
//todo: fix tooltip bounding box
//todo: fix where number superscript is placed

// Getting storage used
chrome.storage.local.getBytesInUse(null, function(data) {
    console.log(Math.round(data/1024) + "kb");
});

chrome.storage.local.get("users", function (data) {
    const users = data["users"] ?? {};
    const userLinks = document.querySelectorAll('a[href *= "usuario"]');

    for (const user of userLinks) {
        const splitUser = user["href"].split("/");

        if (splitUser.length === 6) {
            const thisID = splitUser[4];
            if (users[thisID] !== undefined) {

                const div = document.createElement("div");
                div.classList.add("tutooltip");

                const thisUser = users[thisID];

                for (const [key, value] of Object.entries(thisUser)) {
                    if (key !== "name") {
                        const thisCourse = document.createElement("a");
                        //todo: maybe switch to icon instead of text?
                        //https://www.u-cursos.cl/d/images/cargos/profesor_auxiliar.svg lower case

                        thisCourse.classList.add("tucompartido");
                        thisCourse.href = value["URL"];
                        thisCourse.textContent = value["code"] + "-" + value["section"] + " ";
                        thisCourse.textContent += "(" + value["year"] + "-" + value["semester"] +")";
                        thisCourse.textContent += "  |  " + value["theirType"];
                        //listItem.appendChild(thisCourse);
                        div.appendChild(thisCourse);
                    }
                }

                const courseCount = Object.keys(users[thisID]).length - 1;
                const text = document.createElement("sup");
                text.textContent = courseCount.toString();
                text.classList.add("tuhover");
                text.appendChild(div);

                //text.appendChild(div);
                user.parentElement.appendChild(text);

            }
        }
    }
});