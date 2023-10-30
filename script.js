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
  const mapResourceToEra = {
    "Donnée génétique": "Ère Postmoderne",
    "Filtres industriels": "Ère Postmoderne",
    "Ressources renouvelables": "Ère Postmoderne",
    "Semi-conducteurs": "Ère Postmoderne",
    Acier: "Ère Postmoderne",
    "Donnée bionique": "Ère Contemporaine",
    "Électro-aimants": "Ère Contemporaine",
    Gaz: "Ère Contemporaine",
    Plastique: "Ère Contemporaine",
    Robots: "Ère Contemporaine",
    "Recherche en nutrition": "Ère de Demain",
    "Liant papier": "Ère de Demain",
    Conservateurs: "Ère de Demain",
    "Matériaux intelligents": "Ère de Demain",
    "Béton translucide": "Ère de Demain",
    Algue: "Ère du Futur",
    "Donnée biogéochimique": "Ère du Futur",
    Nanoparticules: "Ère du Futur",
    "Eau purifiée": "Ère du Futur",
    Supraconducteurs: "Ère du Futur",
    "Donnée d'I.A.": "Futur Arctique",
    Bioplastiques: "Futur Arctique",
    Nanocâble: "Futur Arctique",
    "Piles en papier": "Futur Arctique",
    "Gaz transester": "Futur Arctique",
    "Écailles artificielles": "Futur Océanique",
    "Substance bioluminescente": "Futur Océanique",
    Coraux: "Futur Océanique",
    Perles: "Futur Océanique",
    Plancton: "Futur Océanique",
    "Crypto-monnaie": "Futur Virtuel",
    "Cristaux de données": "Futur Virtuel",
    "Riz doré": "Futur Virtuel",
    Nanorobots: "Futur Virtuel",
    "Soie de thé": "Futur Virtuel",
    "Cultures biotechnologiques": "Ère Spatiale - Mars",
    "Réacteurs de fusion": "Ère Spatiale - Mars",
    "Huiles de graissage": "Ère Spatiale - Mars",
    "Microbes martiens": "Ère Spatiale - Mars",
    Superalliages: "Ère Spatiale - Mars",
    Brome: "Ère Spatiale - Ceinture d'Astéroïdes",
    "Fluide composé": "Ère Spatiale - Ceinture d'Astéroïdes",
    Nickel: "Ère Spatiale - Ceinture d'Astéroïdes",
    "Cristal de platine": "Ère Spatiale - Ceinture d'Astéroïdes",
    "Matériau transformé": "Ère Spatiale - Ceinture d'Astéroïdes",
    "Algue lumineuse": "Ère Spatiale - Vénus",
    "En-cas d'herbe": "Ère Spatiale - Vénus",
    "Suppléments de micropousse": "Ère Spatiale - Vénus",
    "Protéines de soja": "Ère Spatiale - Vénus",
    "Cristaux de sucre": "Ère Spatiale - Vénus",
    "Données ADN avancées": "Ère Spatiale - Lune de Jupiter",
    "Créatures biologiques": "Ère Spatiale - Lune de Jupiter",
    "Porifère avancé": "Ère Spatiale - Lune de Jupiter",
    "Algues rouges": "Ère Spatiale - Lune de Jupiter",
    "Dossiers topologiques": "Ère Spatiale - Lune de Jupiter",
    "Capsule de matière comprimée": "Ère Spatiale - Titan",
    "Donnée expérimentale": "Ère Spatiale - Titan",
    "Molécule isolée": "Ère Spatiale - Titan",
    "Liant liquide": "Ère Spatiale - Titan",
    "Hydrocarbure upcyclé": "Ère Spatiale - Titan",
  };
  const mapEraToShortName = {
    "Âge de Fer": "AdF",
    "Haut Moyen Âge": "HMA",
    "Moyen Âge Classique": "MA Classique",
    Renaissance: "Renaissance",
    "Âge Colonial": "Colo",
    "Âge Industriel": "Indus",
    "Ère Progressiste": "Progressiste",
    "Ère Moderne": "Moderne",
    "Ère Postmoderne": "Postmoderne",
    "Ère Contemporaine": "Contemporaine",
    "Ère de Demain": "Demain",
    "Ère du Futur": "Futur",
    "Futur Arctique": "FA",
    "Futur Océanique": "FO",
    "Futur Virtuel": "FV",
    "Ère Spatiale - Mars": "Mars",
    "Ère Spatiale - Ceinture d'Astéroïdes": "Astéroïdes",
    "Ère Spatiale - Vénus": "Vénus",
    "Ère Spatiale - Lune de Jupiter": "Jupiter",
    "Ère Spatiale - Titan": "Titan",
  };
  const INDEX_FUTUR_ERA = 11;

  const getEraNameForResource = (resourceName) => {
    try {
      return mapEraToShortName[mapResourceToEra[resourceName]];
    } catch (error) {
      console.log(error);
      alert(
        `Oups, le script de themouette a planté pour resource ${resourceName}...`
      );
    }
  };

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
      try {
        if (!div || !div.parentElement) return;
        div.parentElement.removeChild(div);
      } catch (error) {
        console.log(error);
      }
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
      // There is 3 kind of information we want to extract:
      // - Daily goods production, per resource
      // - Current state of invetory
      // - Call for donation
      // A message is displayed with the 3 possible actions
      const getMemberProduction = () => {
        let total = 0;
        content += "Production quotidienne par âge\n";
        content += array_chunks(
          // First column of "goods"
          $$("td.detail:nth-child(2) .goods-image").map((cell) => {
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
        const EXPECTED_LEVEL = 80_000;
        const ALERT_LEVEL = 70_000;
        const CRITICAL_LEVEL = 50_000;
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
      /**
       * Generate a string with the total number of resources produced by each
       * guild member.
       */
      function getResourceProductionPerMember() {
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
      }

      /**
       * From guild members table get the total of resources produced daily,
       * grouped by age and member.
       */
      function getResourceProductionPerAgeAndMember() {
        // A map of member and related goods production
        // Each item is an array, each array item being a line in the table:
        // {
        //   "themouette": {
        //     total: 2510,
        //     detail: [
        //       {
        //         goodsCount: 48 /* number of each resource produced by this line */,
        //         era: 'FA', /* Shortname for this era */
        //         building: 'Arche (80)',
        //         buildingCount: '1'
        //         }
        //     ]
        //   }
        // }
        const statsByMember = {};
        let currentMemberName;
        // Read table line by line
        $$("tbody.gms-group > tr").map((tr) => {
          if (tr.classList.contains("open")) {
            // this is a member name
            currentMemberName = tr.querySelector("td[data-text]").dataset.text;
          } else if (tr.querySelector(".guildgoods")) {
            // this is the detail
            statsByMember[currentMemberName] = {};
            statsByMember[currentMemberName].total = toNumber(
              tr.querySelector(".guildgoods tr:last-child td:last-child")
                .textContent
            );
            statsByMember[currentMemberName].detail = $$(
              // Only the first `.guildgoods` contains resources.
              // exclude last line as it is the total
              ".guildgoods:first-child tbody tr:not(:last-child)",
              tr
            ).map((guildGoodRow) => {
              const description =
                guildGoodRow.querySelector("td:first-child").textContent;
              const goodsCount =
                guildGoodRow.querySelector(".goods-count").textContent;
              // Title is cont x good name, eg: `15 x Brome`
              const firstGood =
                guildGoodRow.querySelector(".goods-sprite-50").title;

              return {
                goodsCount: toNumber(goodsCount.replace(/\D/g, "")),
                era: getEraNameForResource(firstGood.split(" x ")[1]), // what is after ` x `
                building: description.split(" x ")[1],
                buildingCount: toNumber(description.split(" x ")[0]),
              };
            });
          }
        });

        const convertAllBuildingsToEraString = (buildingList) => {
          const statsByEra = new Map();
          // Group by era
          buildingList.forEach((stat) => {
            statsByEra.set(stat.era, [
              ...(statsByEra.get(stat.era) || []),
              stat,
            ]);
          });
          const production = Array.from(statsByEra.entries()).map(
            ([era, buildings]) =>
              `${era} (${buildings.reduce(
                (sum, { goodsCount }) => goodsCount + sum,
                0
              )})`
          );
          return production.join(" ");
        };

        content +=
          "Production par membre et par age (de chaque resource, ie: x5)\n";

        // Combine all production per user
        content += Object.keys(statsByMember)
          .map((memberName) => {
            const stats = statsByMember[memberName];
            return `${memberName}: ${
              stats.total
            } - ${convertAllBuildingsToEraString(stats.detail)}`;
          })
          .join("\n");

        // Combine total production
        const total = Object.keys(statsByMember).reduce(
          (sum, memberName) => sum + statsByMember[memberName].total,
          0
        );
        const allBuildings = Object.keys(statsByMember).reduce(
          (all, memberName) => [...all, ...statsByMember[memberName].detail],
          []
        );
        content += `\nTotal: ${total} - ${convertAllBuildingsToEraString(
          allBuildings
        )}`;
        copyContent(content);
      }

      displayMessage((closePopup) => {
        const message = `
        <div>
          Il y a plusieurs types d'informations à récupérer sur cette page.<br>
          Que voulez vous faire?
        </div>
        <div>
          <button id="per-member">Production totale par membre</button>
          <button id="per-age-member">Production par membre et par age</button>
        </div>
      `;
        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        div.innerHTML = message;
        fragment.appendChild(div);
        fragment.querySelector("#per-member").addEventListener("click", (e) => {
          getResourceProductionPerMember();
          e.preventDefault();
          closePopup();
        });
        fragment
          .querySelector("#per-age-member")
          .addEventListener("click", (e) => {
            try {
              getResourceProductionPerAgeAndMember();
              e.preventDefault();
              closePopup();
            } catch (error) {
              console.log(error);
            }
          });

        return fragment;
      }, 10_000);
    } else {
      displayMessage('Vous devez ouvrir le tableau "Guild Member Overview"');
      return;
    }
  };

  window.getContentFromSelectedTab = getContentFromSelectedTab;
  // and execute it
  getContentFromSelectedTab();
})();
