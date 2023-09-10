(function () {
  if (
    window.getContentFromSelectedTab &&
    !window.forceRefreshGetContentFromSelectedTab
  ) {
    console.log("Already installed");
    return;
  }

  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const array_chunks = (array, chunk_size) =>
    Array(Math.ceil(array.length / chunk_size))
      .fill()
      .map((_, index) => index * chunk_size)
      .map((begin) => array.slice(begin, begin + chunk_size));
  const toNumber = (x) => Number(x.replaceAll(/\D/g, ""));
  const displayMessage = (message) => {
    const div = document.createElement("div");
    Object.entries({
      position: "absolute",
      top: 0,
      right: 0,
      width: "500px",
      background: "#fff",
      color: "#000",
      zIndex: 1000,
      padding: "30px",
      minHeight: "100px",
    }).forEach(([key, value]) => (div.style[key] = value));
    div.innerHTML = message;
    document.body.appendChild(div);
    setTimeout(() => document.body.removeChild(div), 3000);
  };

  const getContentFromSelectedTab = () => {
    let content = "";

    if ($$("#TreasuryGoodsTable").length) {
      // Guild members overview: Treasury Goods
      let total = 0;
      content += "Production quotidienne par âge\n";
      content += array_chunks(
        $$(".goods-image").map((cell) => {
          const nbResource = toNumber(cell.parentNode.children[2].textContent);
          total += nbResource;
          return `${cell.parentNode.children[1].textContent}-${nbResource}`;
        }),
        5
      )
        .map((chunk) => chunk.join(" - "))
        .join("\n");
      content += `\nTotal: ${total}`;
    } else if ($$("#GuildMemberTable").length) {
      // Guild Members panel
      let total = 0;
      const $memberOpenDetailRows = $$(
        ".gms-group > tr.detailview .guildgoods"
      );
      if (!$memberOpenDetailRows.length) {
        displayMessage("Ouvrez le détail des membres que vous voulez voir");
        return;
      }
      content += "Resources quotidiennes par membre\n";
      // Only copy the total for now
      $$("tbody.gms-group > tr").map((tr) => {
        if (tr.classList.contains("open")) {
          // this is a member name
          content += tr.querySelector("td[data-text]").dataset.text;
        } else if (tr.querySelector(".guildgoods")) {
          // this is the detail
          const nbResources = toNumber(
            tr.querySelector(".guildgoods tr:last-child td:last-child")
              .textContent
          );
          total += nbResources;
          content += `: ${nbResources}\n`;
        }
      });
      content += `Total: ${total}`;
    } else {
      displayMessage('Vous devez ouvrir le tableau "Guild Member Overview"');
      return;
    }

    // Copy to clipboard
    navigator.clipboard.writeText(content);
    console.log(content);
    displayMessage("Résultat copié dans le presse papier!");
  };

  window.getContentFromSelectedTab = getContentFromSelectedTab;
  // and execute it
  getContentFromSelectedTab();
})();
