(function (FoEproxy) {
  if (
    window.getContentFromSelectedTab &&
    !window.forceRefreshGetContentFromSelectedTab
  ) {
    console.log("Already installed");
    return;
  }

  if (window.themouetteFoeUninstallPreviousVersion) {
    // Uninstall previous version should remove handlers to avoid duplicates
    window.themouetteFoeUninstallPreviousVersion();
  }
  /** singleton with all attached FoeProxyHandler */
  const allFoeProxyHandler = [];
  /** Attach an handler to FoEproxy and store it to ba able to remove it later */
  function attachFoeProxyHandler(service, method, callback) {
    if (!FoEproxy) return;
    console.log("attach handler");
    allFoeProxyHandler.push([service, method, callback]);
    FoEproxy.addHandler(service, method, callback);
  }
  const onNewVersionCallbacks = [];
  function onNewVersion(callback) {
    onNewVersionCallbacks.push(callback);
  }

  function uninstallPreviousVersion() {
    // Remove all FoEproxy attached handlers
    let handler;
    while ((handler = allFoeProxyHandler.pop())) {
      FoEproxy?.removeHandler(...handler);
    }
    while ((handler = onNewVersionCallbacks.pop())) {
      handler();
    }
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
  const mapGoodIdToFr = {
    cloth: "Tissu",
    ebony: "Bois d'ébène",
    gems: "Bijou",
    lead: "Fer",
    limestone: "Calcaire",
    bronze: "Cuivre",
    gold: "Or",
    granite: "Granite",
    honey: "Miel",
    marble: "Albâtre",
    brick: "Brique",
    glass: "Verre",
    herbs: "Herbes séchées",
    ropes: "Corde",
    salt: "Sel",
    basalt: "Basalte",
    brass: "Laiton",
    gunpowder: "Poudre à canon",
    silk: "Soie",
    talc: "Poudre à talquer",
    coffee: "Café",
    paper: "Papier",
    porcelain: "Porcelaine",
    tar: "Goudron",
    wire: "Fil",
    coke: "Coke",
    fertilizer: "Engrais",
    rubber: "Caoutchouc",
    textiles: "Textiles",
    whaleoil: "Huile de baleine",
    asbestos: "Amiante",
    explosives: "Explosifs",
    machineparts: "Pièces détachées",
    petroleum: "Essence",
    tinplate: "Fer-blanc",
    convenience_food: "Plat cuisiné",
    ferroconcrete: "Béton armé",
    flavorants: "Arômes",
    luxury_materials: "Produits de luxe",
    packaging: "Emballage",
    dna_data: "Donnée génétique",
    filters: "Filtres industriels",
    renewable_resources: "Ressources renouvelables",
    semiconductors: "Semi-conducteurs",
    steel: "Acier",
    bionics: "Donnée bionique",
    electromagnets: "Électro-aimants",
    gas: "Gaz",
    plastics: "Plastique",
    robots: "Robots",
    nutrition_research: "Recherche en nutrition",
    papercrete: "Liant papier",
    preservatives: "Conservateurs",
    smart_materials: "Matériaux intelligents",
    translucent_concrete: "Béton translucide",
    algae: "Algue",
    biogeochemical_data: "Donnée biogéochimique",
    nanoparticles: "Nanoparticules",
    purified_water: "Eau purifiée",
    superconductors: "Supraconducteurs",
    ai_data: "Donnée d'I.A.",
    bioplastics: "Bioplastiques",
    nanowire: "Nanocâble",
    paper_batteries: "Piles en papier",
    transester_gas: "Gaz transester",
    artificial_scales: "Écailles artificielles",
    biolight: "Substance bioluminescente",
    corals: "Coraux",
    pearls: "Perles",
    plankton: "Plancton",
    cryptocash: "Crypto-monnaie",
    data_crystals: "Cristaux de données",
    golden_rice: "Riz doré",
    nanites: "Nanorobots",
    tea_silk: "Soie de thé",
    biotech_crops: "Cultures biotechnologiques",
    fusion_reactors: "Réacteurs de fusion",
    lubricants: "Huiles de graissage",
    mars_microbes: "Microbes martiens",
    superalloys: "Superalliages",
    bromine: "Brome",
    compound_fluid: "Fluide composé",
    nickel: "Nickel",
    platinum_crystals: "Cristal de platine",
    processed_material: "Matériau transformé",
    glowing_seaweed: "Algue lumineuse",
    herbal_snack: "En-cas d'herbe",
    microgreen_supplement: "Suppléments de micropousse",
    soy_proteins: "Protéines de soja",
    sugar_crystals: "Cristaux de sucre",
    advanced_dna_data: "Données ADN avancées",
    bio_creatures: "Créatures biologiques",
    enhanced_porifera: "Porifère avancé",
    red_algae: "Algues rouges",
    topological_records: "Dossiers topologiques",
    compressed_matter_capsule: "Capsule de matière comprimée",
    experimental_data: "Donnée expérimentale",
    isolated_molecules: "Molécule isolée",
    liquid_binder: "Liant liquide",
    upcycled_hydrocarbons: "Hydrocarbure upcyclé",
  };
  const mapResourceToEra = {
    Tissu: "Âge de Fer",
    "Bois d'ébène": "Âge de Fer",
    Bijou: "Âge de Fer",
    Fer: "Âge de Fer",
    Calcaire: "Âge de Fer",
    Cuivre: "Haut Moyen Âge",
    Or: "Haut Moyen Âge",
    Granite: "Haut Moyen Âge",
    Miel: "Haut Moyen Âge",
    Albâtre: "Haut Moyen Âge",
    Brique: "Moyen Âge Classique",
    Verre: "Moyen Âge Classique",
    "Herbes séchées": "Moyen Âge Classique",
    Corde: "Moyen Âge Classique",
    Sel: "Moyen Âge Classique",
    Basalte: "Renaissance",
    Laiton: "Renaissance",
    "Poudre à canon": "Renaissance",
    Soie: "Renaissance",
    "Poudre à talquer": "Renaissance",
    Café: "Âge Colonial",
    Papier: "Âge Colonial",
    Porcelaine: "Âge Colonial",
    Goudron: "Âge Colonial",
    Fil: "Âge Colonial",
    Coke: "Âge Industriel",
    Engrais: "Âge Industriel",
    Caoutchouc: "Âge Industriel",
    Textiles: "Âge Industriel",
    "Huile de baleine": "Âge Industriel",
    Amiante: "Ère Progressiste",
    Explosifs: "Ère Progressiste",
    "Pièces détachées": "Ère Progressiste",
    Essence: "Ère Progressiste",
    "Fer-blanc": "Ère Progressiste",
    "Plat cuisiné": "Ère Moderne",
    "Béton armé": "Ère Moderne",
    Arômes: "Ère Moderne",
    "Produits de luxe": "Ère Moderne",
    Emballage: "Ère Moderne",
    "Donnée génétique": "Ère Postmoderne",
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
  /**
   * Parse time string in format `hh:mm`
   * const [hour, minutes] = parseTime('11:45');
   */
  const parseTime = (str) => str.split(":").map(toNumber);
  /**
   * Parse date string in format `hh:mm`
   * const date = parseDate('2023/10/22');
   * const date = parseDate('22/9/2023');
   * const date = parseDate('22-09-2023');
   */
  const parseDate = (str) => {
    const parts = str.split(/-|\//g).map(toNumber);
    // Determine the order, expect year to be over 2000
    if (parts[0] > 2000) {
      return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
    }
    return new Date(parts[2], parts[1] - 1, parts[0], 0, 0, 0, 0);
  };
  const daysOfWeek = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  /**
   * Returns a timestamp guessed from file and cell content.
   *
   * Accepts formats like:
   * - `hier à 11:48`
   * - `aujourd'hui à 14:12`
   * - `Mardi à 12:12`
   * - `le 11/12/2013 à 15:23`
   *
   * Alway round timestamp to minute as there is no information about
   * seconds in datasource.
   */
  function guessTimeFromString(cellContent) {
    const date = new Date();

    const cellTxt = cellContent.toLowerCase();

    if (cellTxt.startsWith("aujourd'hui à ")) {
      const [hours, minutes] = parseTime(cellTxt.replace("aujourd'hui à ", ""));
      date.setHours(hours);
      date.setMinutes(minutes);
      return date.getTime();
    } else if (cellTxt.startsWith("hier à ")) {
      const [hours, minutes] = parseTime(cellTxt.replace("hier à ", ""));
      date.setDate(date.getDate() - 1);
      date.setHours(hours);
      date.setMinutes(minutes);
      return date.getTime();
    } else if (cellTxt.startsWith("le ")) {
      const [dateStr, timeStr] = cellTxt.replace("le ", "").split(" à ");
      const [hours, minutes] = parseTime(timeStr);
      const date = parseDate(dateStr);
      date.setHours(hours);
      date.setMinutes(minutes);
      return date.getTime();
    } else if (cellTxt.includes(" à ")) {
      // Starts with day of week
      const [dayOfWeek, dayTime] = cellTxt.split(" à ");
      const fileDateDayOfWeek = date.getDay();
      // Hacky way to get the number of days to remove to file date.
      const rowDayModifier =
        (daysOfWeek.indexOf(dayOfWeek) - fileDateDayOfWeek - 7) % 7;
      const [hours, minutes] = parseTime(dayTime);
      date.setDate(date.getDate() + rowDayModifier);
      date.setHours(hours);
      date.setMinutes(minutes);
      return date.getTime();
    } else {
      return cellTxt;
    }
  }

  /** get contribution data without duplicates */
  let oldCount;
  let toSkip = 0;
  let allRows = [];
  const updateExportStats = () => {
    const exportStats = document.querySelector(
      "#treasury .groland-export-content .stats"
    );
    if (!exportStats) return;
    exportStats.innerHTML = `
<p>Lignes récupérés: ${allRows.length}</p>
<p>${
      allRows.length
        ? `De <b>${allRows[0][6]}</b> à <b>${
            allRows[allRows.length - 1][6]
          }</b>`
        : ""
    }</p>
    `;
  };
  attachFoeProxyHandler("ClanService", "getTreasuryLogs", (data) => {
    if (data?.responseData?.count !== oldCount) {
      console.log(
        `new count discovered! from ${oldCount} to ${data?.responseData?.count}`
      );
      // When count changes, we have to skip newCount - oldCount entries in log
      toSkip = !oldCount
        ? /* this is the begining, nothing to skip */ 0
        : data?.responseData?.count - oldCount;
      oldCount = data?.responseData?.count;
    }
    if (toSkip > data?.responseData?.logs?.length) {
      toSkip -= data?.responseData?.logs?.length;
    } else {
      allRows.push(
        ...data?.responseData?.logs
          .slice(toSkip)
          .map((row) => [
            row.player.player_id,
            row.player.name,
            mapResourceToEra[mapGoodIdToFr[row.resource]],
            mapGoodIdToFr[row.resource],
            row.amount,
            row.action,
            row.createdAt,
            guessTimeFromString(row.createdAt),
          ])
      );
      toSkip = 0;
    }
    updateExportStats();
    console.log(allRows.length);
  });
  const resetCsvExport = () => {
    try {
      allRows = [];
      updateExportStats();
    } catch (error) {
      console.log(error);
    }
  };
  const exportAllRowsToCsv = () => {
    const date = new Date(allRows[0][7]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      "Player ID;Player name;Era;Good;Amount;Message;Date/Time;timestamp\n" +
      allRows.map((e) => e.join(";")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}_CDB.csv`
    );
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
    document.body.removeChild(link);
  };

  const formatDateTime = (t) => new Date(t).toLocaleString("fr-FR");
  const formatTime = (t) =>
    new Date(t).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const formatDate = (t) =>
    new Date(t).toLocaleString("fr-FR", {
      month: "long",
      day: "numeric",
      dayOfWeek: "short",
    });
  let CdBJournalData = {};
  attachFoeProxyHandler("GuildBattlegroundService", "getActions", (data) => {
    CdBJournalData = {
      totalBuildings: 0,
      buildings: {},
      buildingCount: {},
      otherActions: {},
      startTs: undefined,
      endTs: undefined,
    };

    data.responseData.forEach((entry) => {
      const timestamp = guessTimeFromString(entry.date);
      if (!CdBJournalData.startTs || timestamp < CdBJournalData.startTs) {
        CdBJournalData.startTs = timestamp;
      }
      if (!CdBJournalData.endTs || timestamp > CdBJournalData.endTs) {
        CdBJournalData.endTs = timestamp;
      }

      if (entry.action === "building_placed") {
        const dateStr = formatDate(timestamp);
        const building = entry.buildingId;

        CdBJournalData.totalBuildings++;

        // By date and building type
        CdBJournalData.buildings[dateStr] = CdBJournalData.buildings[
          dateStr
        ] || {
          total: 0,
          byType: {},
          entries: [],
        };
        CdBJournalData.buildings[dateStr].entries.push(
          `${formatTime(timestamp)} ${entry.actors[0].name}: ${building}`
        );
        CdBJournalData.buildings[dateStr].total += 1;
        CdBJournalData.buildings[dateStr].byType[building] =
          CdBJournalData.buildings[dateStr].byType[building] || 0;
        CdBJournalData.buildings[dateStr].byType[building] += 1;
      } else {
        CdBJournalData.otherActions[entry.action] =
          (CdBJournalData.otherActions[entry.action] || 0) + 1;
      }
    });
    console.log(CdBJournalData);

    // Now copy to clipboard
    const text = `Du ${formatDateTime(
      CdBJournalData.startTs
    )} au ${formatDateTime(CdBJournalData.endTs)}
Batiments (total: ${CdBJournalData.totalBuildings})
${Object.entries(CdBJournalData.buildings)
  .map(
    ([date, { total, byType }]) =>
      `${date}: (total: ${total})\n${Object.entries(byType)
        .map(([building, count]) => `  - ${count} ${building}`)
        .join("\n")}`
  )
  .join("\n")}

Autres evénements:
${Object.entries(CdBJournalData.otherActions)
  .map(([name, count]) => `  - ${count} ${name}`)
  .join("\n")}

Détail des poses de batiment:
${Object.entries(CdBJournalData.buildings)
  .map(
    ([date, { total, entries }]) =>
      `${date}: (total: ${total})\n${entries
        .map((entry) => `  - ${entry}`)
        .join("\n")}`
  )
  .join("\n")}
`;
    copyContent(text);
    displayMessage("Journal de CdB copié dans le presse papier");
  });

  const getContentFromSelectedTab = () => {
    try {
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
            .map(({ resources: r }) =>
              r.map(({ name }) => `"${name}"`).join(";")
            )
            .join(";");

          content += "\n";
          content += resources
            .map(({ resources: r }) =>
              r.map(({ count }) => `${count}`).join(";")
            )
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
                .filter(({ count }) => count <= EXPECTED_LEVEL)
                .map(({ name, count }) =>
                  count < CRITICAL_LEVEL
                    ? ` - 🚨 🚨 ${name} (${count}) CRITIQUE manque ${
                        EXPECTED_LEVEL - count
                      } 🚨 🚨 🚨`
                    : count < ALERT_LEVEL
                    ? ` - 🚑 ${name} (${count}) manque ${
                        EXPECTED_LEVEL - count
                      } ‼️ ‼️ `
                    : ` - ⚠️  ${name} (${count}) manque ${
                        EXPECTED_LEVEL - count
                      }`
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
          fragment
            .querySelector("#production")
            .addEventListener("click", (e) => {
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
          fragment
            .querySelector("#donations")
            .addEventListener("click", (e) => {
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
              currentMemberName =
                tr.querySelector("td[data-text]").dataset.text;
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

        const getGuildGreatBuildingsPerMembers = () => {
          const greatBuildingRegExp = /\d x (.+) \((\d+)\)/;
          let currentMemberName;
          const buildingsByMember = {};
          // Read table line by line
          $$("tbody.gms-group > tr").map((tr) => {
            if (tr.classList.contains("open")) {
              // this is a member name
              currentMemberName =
                tr.querySelector("td[data-text]").dataset.text;
              buildingsByMember[currentMemberName] =
                buildingsByMember[currentMemberName] || [];
            } else {
              // This is the table for this member
              // select all lines for building table
              $$(
                ".detail-item.buildings .detail-item.guildgoods:nth-of-type(1) tbody tr",
                tr
              ).forEach((row) => {
                const desc = row.querySelector("td:nth-of-type(1)").textContent;
                const matches = greatBuildingRegExp.exec(desc);
                if (!matches) {
                  // This is not a GB
                  return null;
                }

                const [, name, level] = matches;
                const contribution =
                  row.querySelector("td:nth-of-type(3)").textContent;
                buildingsByMember[currentMemberName].push(
                  `${name} lvl ${level} (${contribution})`
                );
              });
            }
          });

          content += `GB de guilde par membre:\n${Object.entries(
            buildingsByMember
          )
            .map(
              ([name, gbs]) =>
                `${name}:\n${gbs.map((gb) => `  - ${gb}`).join("\n")}`
            )
            .join("\n")}`;
          copyContent(content);
        };

        displayMessage((closePopup) => {
          const message = `
        <div>
          Il y a plusieurs types d'informations à récupérer sur cette page.<br>
          Que voulez vous faire?
        </div>
        <div>
          <button id="per-member">Production totale par membre</button>
          <button id="per-age-member">Production par membre et par age</button>
          <button id="gbs-per-member">Grands batiments de guilde par membre</button>
        </div>
      `;
          const fragment = document.createDocumentFragment();
          const div = document.createElement("div");
          div.innerHTML = message;
          fragment.appendChild(div);
          fragment
            .querySelector("#per-member")
            .addEventListener("click", (e) => {
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
          fragment
            .querySelector("#gbs-per-member")
            .addEventListener("click", (e) => {
              try {
                getGuildGreatBuildingsPerMembers();
                e.preventDefault();
                closePopup();
              } catch (error) {
                console.log(error);
              }
            });

          return fragment;
        }, 10_000);
      } else if ($$("#treasury").length) {
        if (!$$("#treasury .groland-export-content").length) {
          const exportWindow = document.createElement("div");
          exportWindow.setAttribute("class", "groland-export-content");
          exportWindow.innerHTML = `
<b>Export Groland</b>
<div class="stats"></div>
<button class="btn-default button-reset-groland">Reset</button>
<button class="btn-default button-export-groland">Export</button>`;
          document.querySelector("#treasury").appendChild(exportWindow);

          // This is the contribution, replace reset and export buttons with ours
          const resetButton = document.querySelector(".button-reset-groland");
          resetButton.addEventListener("click", () => resetCsvExport());
          const exportButton = document.querySelector(".button-export-groland");
          exportButton.addEventListener("click", () => exportAllRowsToCsv());
          updateExportStats();
          onNewVersion(() => {
            console.log("remove content");
            document
              .querySelector("#treasury")
              .removeChild(
                document.querySelector("#treasury .groland-export-content")
              );
          });
        }
        /*
        document
          .querySelector("#treasury .button-reset")
          .replaceWith(resetButton);
        document
          .querySelector("#treasury .button-export")
          .replaceWith(exportButton);
          */
      } else {
        displayMessage('Vous devez ouvrir le tableau "Guild Member Overview"');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  window.themouetteFoeUninstallPreviousVersion = uninstallPreviousVersion;
  window.getContentFromSelectedTab = getContentFromSelectedTab;
  // and execute it
  getContentFromSelectedTab();
})(FoEproxy);
