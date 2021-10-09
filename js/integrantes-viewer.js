// SHADOW DOM (epic name lol)
const shadowWrapper = document.createElement('div');
shadowWrapper.setAttribute('style', `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`);

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
                        const thisCourse = document.createElement("h4");
                        thisCourse.textContent = value["theirType"] + " en ";
                        thisCourse.textContent += value["code"] + "-" + value["section"] + " ";
                        thisCourse.textContent += "(" + value["year"] + "-" + value["semester"] +")";
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