(function () {
  if (
    window.getContentFromSelectedTab &&
    !window.forceRefreshGetContentFromSelectedTab
  ) {
    console.log("Already installed");
    return;
  }

  const ages = [
    "Âge de Fer",
    "Haut Moyen Âge",
    "Moyen Âge Classique",
    "Renaissance",
    "Âge Colonial",
    "Âge Industriel",
    "Ère Progressiste",
    "Ère Moderne",
    "Ère Postmoderne",
    "Ère Contemporaine",
    "Ère de Demain",
    "Ère du Futur",
    "Futur Arctique",
    "Futur Océanique",
    "Futur Virtuel",
    "Ère Spatiale - Mars",
    "Ère Spatiale - Ceinture d'Astéroïdes",
    "Ère Spatiale - Vénus",
    "Ère Spatiale - Lune de Jupiter",
    "Ère Spatiale - Titan",
  ];
  const INDEX_FUTUR_ERA = 11;

  const $$ = (selector, $node = document) =>
    Array.from($node.querySelectorAll(selector));
  const array_chunks = (array, chunk_size) =>
    Array(Math.ceil(array.length / chunk_size))
      .fill()
      .map((_, index) => index * chunk_size)
      .map((begin) => array.slice(begin, begin + chunk_size));
  const toNumber = (x) => Number(x.replaceAll(/\D/g, ""));
  const displayMessage = (message, closeDelay = 3000) => {
    const div = document.createElement("div");
    const closePopup = () => {
      div.parentElement.removeChild(div);
    };
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
    if (typeof message === "string") {
      div.innerHTML = message;
    } else {
      // Assume this is a fragment
      div.appendChild(message(closePopup));
    }
    document.body.appendChild(div);
    setTimeout(() => closePopup(), closeDelay);
  };
  const copyContent = (text) => {
    // Copy to clipboard
    navigator.clipboard.writeText(text);
    console.log(text);
    displayMessage("Résultat copié dans le presse papier!");
  };

  const getContentFromSelectedTab = () => {
    let content = "";

    if ($$("#TreasuryGoodsTable").length) {
      // Guild members overview: Treasury Goods
      // There is 3 king of information we want to extract:
      // - Daily goods production, per resource
      // - Current state of invetory
      // - Call for donation
      // A message is displayed with the 3 possible actions
      const getMemberProduction = () => {
        let total = 0;
        content += "Production quotidienne par âge\n";
        content += array_chunks(
          $$(".goods-image").map((cell) => {
            const nbResource = toNumber(
              cell.parentNode.children[2].textContent
            );
            total += nbResource;
            return `${cell.parentNode.children[1].textContent}-${nbResource}`;
          }),
          5
        )
          .map((chunk) => chunk.join(" - "))
          .join("\n");
        content += `\nTotal: ${total}`;
        copyContent(content);
      };
      const getResourceState = () => {
        const $resourceGroupByAge = $$(
          "#TreasuryGoodsTable td:nth-child(3).detail"
        );
        const content = $resourceGroupByAge
          .map(($block, index) => {
            if (index < INDEX_FUTUR_ERA) return;
            const title = ages[index];
            const resources = $$("tr", $block)
              .map(
                ($row) =>
                  `- ${$row.children[1].textContent}: ${toNumber(
                    $row.children[2].textContent
                  )}`
              )
              .join("\n");

            return `${title}\n${resources}`;
          })
          .filter(Boolean)
          .join("\n");
        copyContent(content);
      };

      const getCallForDonations = () => {
        const EXPECTED_LEVEL = 60_000;
        const ALERT_LEVEL = 50_000;
        const CRITICAL_LEVEL = 25_000;
        const $resourceGroupByAge = $$(
          "#TreasuryGoodsTable td:nth-child(3).detail"
        );
        const content = $resourceGroupByAge
          .map(($block, index) => {
            if (index < INDEX_FUTUR_ERA) return;
            const title = ages[index];
            const resources = $$("tr", $block)
              .map(($row) => {
                const resourceName = $row.children[1].textContent;
                const count = toNumber($row.children[2].textContent);
                if (count > ALERT_LEVEL) return false;
                if (count > CRITICAL_LEVEL)
                  return `⚠️  ${resourceName} (${count}) manque ${
                    EXPECTED_LEVEL - count
                  }`;
                return `🚑 ${resourceName} (${count}) manque ${
                  EXPECTED_LEVEL - count
                } ‼️ ‼️ `;
              })
              .filter(Boolean)
              .join("\n");

            return resources ? `${title}\n${resources}` : false;
          })
          .filter(Boolean)
          .join("\n");

        if (content) {
          copyContent(content);
        } else {
          displayMessage("Tout va bien, aucune resource manque");
        }
      };
      displayMessage((closePopup) => {
        const message = `
        <div>
          Il y a plusieurs types d'informations à récupérer sur cette page.<br>
          Que voulez vous faire?
        </div>
        <div>
          <button id="production">Production par ressource</button>
          <button id="resource-state">État de la trésorerie</button>
          <button id="donations">Appel aux dons!</button>
        </div>
      `;
        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        div.innerHTML = message;
        fragment.appendChild(div);
        fragment.querySelector("#production").addEventListener("click", (e) => {
          getMemberProduction();
          e.preventDefault();
          closePopup();
        });
        fragment
          .querySelector("#resource-state")
          .addEventListener("click", (e) => {
            getResourceState();
            e.preventDefault();
            closePopup();
          });
        fragment.querySelector("#donations").addEventListener("click", (e) => {
          getCallForDonations();
          e.preventDefault();
          closePopup();
        });

        return fragment;
      }, 10_000);
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
      copyContent(content);
    } else {
      displayMessage('Vous devez ouvrir le tableau "Guild Member Overview"');
      return;
    }
  };

  window.getContentFromSelectedTab = getContentFromSelectedTab;
  // and execute it
  getContentFromSelectedTab();
})();
