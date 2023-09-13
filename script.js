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
      /**
       * compute a state object with all resources, grouped by age:
       *
       */
      const computeResourceState = () => {
        const resources = [
          /* { name: 'futur', resources: [{ name: 'nanoparticule', count: 123 }] } */
        ];
        const $resourceGroupByAge = $$(
          "#TreasuryGoodsTable td:nth-child(3).detail"
        );
        $resourceGroupByAge.forEach(($block, index) => {
          if (index < INDEX_FUTUR_ERA) return;
          const age = {
            name: ages[index],
            resources: $$("tr", $block).map(($row) => ({
              name: $row.children[1].textContent,
              count: toNumber($row.children[2].textContent),
            })),
          };

          resources.push(age);
        });

        return resources;
      };
      const getResourceState = () => {
        const resources = computeResourceState();
        const content = resources
          .map(
            ({ name: age, resources: r }) =>
              `${age}:\n${r
                .map(({ name, count }) => `${name}: ${count}`)
                .join(" - ")}`
          )
          .join("\n");
        copyContent(content);
      };
      const getResourceStateCsv = () => {
        const resources = computeResourceState();
        let content = resources
          .map(({ resources: r }) => r.map(({ name }) => `"${name}"`).join(";"))
          .join(";");

        content += "\n";
        content += resources
          .map(({ resources: r }) => r.map(({ count }) => `${count}`).join(";"))
          .join(";");
        copyContent(content);
      };

      const getCallForDonations = () => {
        const EXPECTED_LEVEL = 60_000;
        const ALERT_LEVEL = 50_000;
        const CRITICAL_LEVEL = 25_000;
        const resources = computeResourceState();
        const content = resources
          .map(({ name: age, resources: r }) => {
            const callForAge = r
              .filter(({ count }) => count <= ALERT_LEVEL)
              .map(({ name, count }) =>
                count > CRITICAL_LEVEL
                  ? ` - ⚠️  ${name} (${count}) manque ${EXPECTED_LEVEL - count}`
                  : ` - 🚑 ${name} (${count}) manque ${
                      EXPECTED_LEVEL - count
                    } ‼️ ‼️ `
              )
              .join("\n");
            return callForAge.length ? `${age}:\n${callForAge}` : undefined;
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
          <button id="donations">Appel aux dons!</button>
        </div>
        <div>
          <button id="resource-state">État de la trésorerie</button>
          <button id="resource-state-csv">État de la trésorerie (CSV)</button>
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
        fragment
          .querySelector("#resource-state-csv")
          .addEventListener("click", (e) => {
            getResourceStateCsv();
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
