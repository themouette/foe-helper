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

/** A global object to store application state */
let globalState = {
  // Rows read from CSV files
  rows: [],
  sort: "key-age",
  // Date object used to filter results on given period
  filterStart: undefined,
  // Date object used to filter results on given period
  filterEnd: undefined,
};

document.addEventListener("DOMContentLoaded", () => {
  initFileSelection();
  initToolbox();
});

function initToolbox() {
  document.querySelector("#resource-detail").addEventListener("change", () => {
    refreshDisplay();
  });
  Array.from(document.querySelectorAll("[name=resource-sort]")).map((input) => {
    input.addEventListener("change", (event) => {
      globalState.sort = event.target.value;
      refreshDisplay();
    });
    if (globalState.sort === input.value) {
      input.checked = true;
    }
  });
  document.querySelector("#start-date").addEventListener("change", (event) => {
    globalState.filterStart = event.target.value
      ? new Date(event.target.value)
      : undefined;
    refreshDisplay();
  });
  document.querySelector("#end-date").addEventListener("change", () => {
    globalState.filterEnd = event.target.value
      ? new Date(event.target.value)
      : undefined;
    refreshDisplay();
  });
}

function initFileSelection() {
  const fileSelector = document.getElementById("file-selector");
  fileSelector.addEventListener("change", (event) => {
    const fileList = event.target.files;
    readCsvFiles(fileList);
  });

  const dropArea = document.getElementById("drop-area");
  dropArea.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = "copy";
  });

  dropArea.addEventListener("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    readCsvFiles(fileList);
  });
}

/**
 * Convert a map of resource counts to a map of era counts:
 *
 * ```
 * groupResourceCountByEra({ algues: 120, neuroparticules: 130 });
 * // returns { futur: 250 }
 * ```
 */
function groupResourceCountByEra(countsByResource) {
  const countsByAge = {};
  Object.keys(countsByResource).forEach((resourceName) => {
    const age = mapResourceToEra[resourceName] || "Sans Age";
    if (!mapResourceToEra[resourceName]) {
      console.log(`Resource sans age: ${resourceName}`);
    }
    const shortAgeName = mapEraToShortName[age] || age;
    countsByAge[shortAgeName] =
      (countsByAge[shortAgeName] || 0) + countsByResource[resourceName];
  });

  return countsByAge;
}

/**
 * UTF-8 files, when decoded with `atob` only generate weird characters.
 * This function decodes UTF-8 from base 64.
 */
function decodeBase64(base64) {
  const text = atob(base64);
  const length = text.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  const decoder = new TextDecoder(); // default is utf-8
  return decoder.decode(bytes);
}
/** converts a string to a number, replaces illegal characters */
const toNumber = (x) => Number(x.replaceAll(/[^-\d]/g, ""));
/** Checks if a string is a valid number */
const isNumeric = (x) => !isNaN(Number(x));
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
/** transforms a map into an array of strings */
const formatGoods = (goods, { sort }) => {
  return getSortedKeys(goods, { sort }).map(
    (name) => `${name} (${goods[name]})`
  );
};

/** Reads the content of a file from `input type="file"` format */
function readSingleFile(file) {
  // Check if the file is CSV
  if (
    file.type &&
    !(
      (
        file.type.startsWith("text/csv") || // standard
        file.type.startsWith("application/vnd.ms-excel")
      ) // Windows...
    )
  ) {
    console.log("File is not a CSV file", file.type, file);
    return "";
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      let fileContent = event.target.result.replace(/data:[^;]*;base64,/, "");
      fileContent = decodeBase64(fileContent).replace(
        // FR => EN
        "ID Joueur;Nom du joueur;Ère;Ressource;Montant;Message;Date/Heure",
        "Player ID;Player name;Era;Good;Amount;Message;Date/Time"
      );
      resolve({ file, fileContent });
    });
    reader.readAsDataURL(file);
  });
}

const daysOfWeek = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];
const filenameRegEx = /^\d{4}-\d{1,2}-\d{1,2}/;
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
 *
 * Expects the filename to match `YYYY-MM-DDxxxxxx` to convert relative dates
 * correctly.
 */
function guessTimeFromString(cellContent, file) {
  // Assume file is named `YYYY-MM-DD.*`
  if (!filenameRegEx.test(file.name)) {
    return cellContent;
  }
  const fileDate = parseDate(file.name.slice(0, 10));

  const cellTxt = cellContent.toLowerCase();

  if (cellTxt.startsWith("aujourd'hui à ")) {
    const [hours, minutes] = parseTime(cellTxt.replace("aujourd'hui à ", ""));
    fileDate.setHours(hours);
    fileDate.setMinutes(minutes);
    return fileDate.getTime();
  } else if (cellTxt.startsWith("hier à ")) {
    const [hours, minutes] = parseTime(cellTxt.replace("hier à ", ""));
    fileDate.setDate(fileDate.getDate() - 1);
    fileDate.setHours(hours);
    fileDate.setMinutes(minutes);
    return fileDate.getTime();
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
    const fileDateDayOfWeek = fileDate.getDay();
    // Hacky way to get the number of days to remove to file date.
    const rowDayModifier =
      (daysOfWeek.indexOf(dayOfWeek) - fileDateDayOfWeek - 7) % 7;
    const [hours, minutes] = parseTime(dayTime);
    fileDate.setDate(fileDate.getDate() + rowDayModifier);
    fileDate.setHours(hours);
    fileDate.setMinutes(minutes);
    return fileDate.getTime();
  } else {
    return cellTxt;
  }
}

/** converts file CSV content to an array of rows. */
function csvToJson({ file, fileContent: csvString }) {
  return new Promise((resolve, reject) => {
    csv.parse(csvString, { delimiter: ";", columns: true }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  }).then(
    /* change date/time column to a timestamp guessed from file created time */
    (rows) =>
      rows.map((row) => ({
        ...row,
        timestamp: guessTimeFromString(row["Date/Time"], file),
      }))
  );
}
/** Compiles a series of statistics from global state. */
function compileStatsFromRows(state) {
  const { rows, filterStart, filterEnd } = state;
  console.log(rows);
  // Group by member
  // each member is an object:
  // {
  //   monuments: { algues: 12, ... },
  //   donnation: { algues: 12, ... },
  //   total: 123
  // }
  const byMember = {};
  // Global guild statistics
  // {
  //   donnation: { algues: 12, ... },
  //   monuments: { algues: 12, ... },
  //   cdg: { algues: 12, ... },
  //   gcg: {},
  //   eg: {},
  //   unknownEvents: [],
  //   total_contributions: 123,
  //   total_spent: 110,
  //   balance: {},
  // }
  const stats = {
    all: {},
    monuments: {},
    donnation: {},
    cdg: {},
    eg: {},
    gcg: {},
    unknownEvents: [],
    total_contributions: 0,
    total_spent: 0,
    balance: 0,
    from: new Date(rows[rows.length - 1].timestamp).toLocaleString("fr-FR"),
    to: new Date(rows[0].timestamp).toLocaleString("fr-FR"),
  };

  rows
    .filter(
      ({ timestamp }) =>
        (!filterEnd || timestamp < filterEnd) &&
        (!filterStart || timestamp > filterStart)
    )
    .forEach(({ Message, Good, "Player name": playerName, Amount }) => {
      byMember[playerName] = byMember[playerName] || {
        monuments: {},
        donnation: {},
        total: 0,
      };

      stats.balance += toNumber(Amount);
      stats.all[Good] = (stats.all[Good] || 0) + toNumber(Amount);
      if (toNumber(Amount) < 0) {
        stats.total_spent -= toNumber(Amount);
      } else {
        byMember[playerName].total += toNumber(Amount);
        stats.total_contributions += toNumber(Amount);
      }

      if (Message === "Production de bâtiment") {
        byMember[playerName].monuments[Good] =
          (byMember[playerName].monuments[Good] || 0) + toNumber(Amount);
        stats.monuments[Good] = (stats.monuments[Good] || 0) + toNumber(Amount);
      } else if (Message === "Dons à la trésorerie de la guilde") {
        byMember[playerName].donnation[Good] =
          (byMember[playerName].donnation[Good] || 0) + toNumber(Amount);
        stats.donnation[Good] = (stats.donnation[Good] || 0) + toNumber(Amount);
      } else if (Message.startsWith("Champs de bataille")) {
        stats.cdg[Good] = (stats.cdg[Good] || 0) + toNumber(Amount);
      } else if (Message.startsWith("Déploiement de l'armée de siège")) {
        stats.gcg[Good] = (stats.gcg[Good] || 0) + toNumber(Amount);
      } else if (Message.startsWith("Expédition de guilde")) {
        stats.eg[Good] = (stats.eg[Good] || 0) + toNumber(Amount);
      } else {
        stats.unknownEvents = [...stats.unknownEvents, Message];
      }
    });

  return { byMember, ...stats };
}

/**
 * Sort keys of given map.
 *
 * Possible sorts are:
 * - 'count-asc'
 * - 'key-age'
 */
function getSortedKeys(map, { sort = false }) {
  const eraOrResourceIndex = (eraOrResourceName) => {
    if (mapResourceToEra[eraOrResourceName]) {
      // this is a resource
      return Object.keys(mapResourceToEra).indexOf(eraOrResourceName);
    }
    if (mapEraToShortName[eraOrResourceName]) {
      // This is a long name
      return ages.indexOf(eraOrResourceName);
    }
    // Expect it to be a short name
    return Object.values(mapEraToShortName).indexOf(eraOrResourceName);
  };
  const countOrTotalCount = (countOrObject) => {
    if (isNumeric(countOrObject)) {
      return countOrObject;
    }
    return totalMap(countOrObject);
  };
  const sortFunction =
    sort === "count-asc"
      ? (keyA, keyB) =>
          countOrTotalCount(map[keyA]) - countOrTotalCount(map[keyB])
      : sort === "key-age"
      ? (keyA, keyB) => eraOrResourceIndex(keyA) - eraOrResourceIndex(keyB)
      : undefined;
  return sortFunction ? Object.keys(map).sort(sortFunction) : Object.keys(map);
}

function totalMap(map) {
  return Object.values(map).reduce((sum, value) => sum + value, 0);
}
/**
 * Format a { key: count } object into a readable string.
 */
function formatCountMap(map, { sort = false }) {
  const total = totalMap(map);
  const sortedKeys = getSortedKeys(map, { sort });

  return `${sortedKeys
    .map((name) => ` - ${name} (${map[name]})`)
    .join("\n")}\ntotal: ${total}`;
}

function formatByMemberCountMap(map, { sort }) {
  // total by member is used for sorting
  const totalByMember = {};
  // total by resourceOrAge is used for total
  const totalByResourceOrAge = {};

  Object.keys(map).forEach((memberName) => {
    totalByMember[memberName] = totalMap(map[memberName]);
    Object.keys(map[memberName]).forEach((resourceName) => {
      totalByResourceOrAge[resourceName] =
        (totalByResourceOrAge[resourceName] || 0) +
        map[memberName][resourceName];
    });
  });

  const sortedMembersNames = getSortedKeys(totalByMember, {
    sort: "count-asc",
  }).filter((memberName) => totalByMember[memberName] > 0);

  return `${sortedMembersNames
    .map(
      (memberName) =>
        ` - ${memberName}: ${formatGoods(map[memberName], { sort }).join(", ")}`
    )
    .join("\n")}\ntotal: ${totalMap(totalByResourceOrAge)} = ${formatGoods(
    totalByResourceOrAge,
    { sort }
  ).join(", ")}`;
}

function formatStats({ byMember, ...stats }) {
  const sort = globalState.sort;
  const resourceOrAge = document.querySelector("#resource-detail").checked
    ? (resourceMap) => resourceMap
    : groupResourceCountByEra;

  const resourceStats = resourceOrAge(stats.all);
  const donnations = Object.keys(byMember).reduce(
    (acc, memberName) => ({
      ...acc,
      [memberName]: resourceOrAge(byMember[memberName].donnation),
    }),
    {}
  );
  const monuments = Object.keys(byMember).reduce(
    (acc, memberName) => ({
      ...acc,
      [memberName]: resourceOrAge(byMember[memberName].monuments),
    }),
    {}
  );
  const totalByMember = Object.keys(byMember).reduce(
    (acc, memberName) => ({
      ...acc,
      [memberName]: byMember[memberName].total,
    }),
    {}
  );

  return `
Campagne du ${stats.from} au ${stats.to}

Bilan: ${stats.total_contributions} - ${stats.total_spent} = ${stats.balance}

Detail des variations de resources:
${formatCountMap(resourceStats, { sort })}

Dons:
${formatByMemberCountMap(donnations, { sort })}

batiments:
${formatByMemberCountMap(monuments, { sort })}

Contribution totale par membre:
${formatCountMap(totalByMember, { sort })}

Batiments Champs de bataille:
- ${formatGoods(resourceOrAge(stats.cdg), { sort }).join("\n- ")}

Expédition de guilde:
- ${formatGoods(resourceOrAge(stats.eg), { sort }).join("\n- ")}

Continent Des Guildes:
- ${formatGoods(resourceOrAge(stats.gcg), { sort }).join("\n- ")}

${
  stats.unknownEvents.length
    ? "Evenements inconnus:\n - " +
      Array.from(new Set(stats.unknownEvents)).join("\n - ")
    : ""
}
                          `;
}

function combineAndDedupeFiles(filesAsJson) {
  /* Most recent first */
  const sortFunction = (a, b) => {
    if (isNumeric(b.timestamp) && isNumeric(b.timestamp)) {
      return b.timestamp - a.timestamp;
    }
    if (isNumeric(b.timestamp)) {
      return -1;
    }
    if (isNumeric(a.timestamp)) {
      return 1;
    }
    return b.timestamp.length - a.timestamp.length;
  };
  return filesAsJson
    .map((rows) => rows.sort(sortFunction))
    .sort((a, b) => sortFunction(a[0], b[0]))
    .flatMap((rows, index, sortedFileList) => {
      // given this is sorted, remove all rows with a timestamp after
      // previous file last item.
      if (!index) {
        // this is the first, there were no prior element
        return rows;
      }

      // Attempt to find last timestamp of existing file
      const lastTimestamp = sortedFileList[index - 1].findLast(
        (item) => !isNaN(Number(item.timestamp))
      )?.timestamp;
      // If timestamp was not parsed, do not filter anything
      if (!lastTimestamp || !isNumeric(lastTimestamp)) {
        return rows;
      }

      // There were a timestamp for last file,
      // Exclude all rows happening after lastTimestamp
      return rows.filter((row) => {
        if (isNumeric(row.timestamp) && row.timestamp > lastTimestamp) {
          console.log("exclude row in combineAndDedupeFiles");
          return false;
        }
        return true;
      });
    })
    .sort(sortFunction);
}

function readCsvFiles(files) {
  Promise.all(Array.from(files).map(readSingleFile))
    .then((csvStrings) => Promise.all(csvStrings.map(csvToJson)))
    .then(combineAndDedupeFiles)
    .then((rows) => {
      globalState.rows = rows;
    })
    .then(updateToolbox)
    .then(refreshDisplay)
    .catch((error) => console.log(error));
}

function updateToolbox() {
  const formatDateForInput = (o_date) =>
    `${o_date.getFullYear().toString().padStart(2, "0")}-${(
      o_date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${o_date
      .getDate()
      .toString()
      .padStart(2, "0")} ${o_date
      .getHours()
      .toString()
      .padStart(2, "0")}:${o_date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${o_date.getSeconds().toString().padStart(2, "0")}`;
  const { rows } = globalState;
  const from = formatDateForInput(new Date(rows[rows.length - 1].timestamp));
  const to = formatDateForInput(new Date(rows[0].timestamp));

  document.querySelector("#start-date").setAttribute("value", from);
  document.querySelector("#end-date").setAttribute("value", to);
  /*
      // This seems to work, but UI requires more polish.
      // let's disable it.
        document.querySelector("#start-date").setAttribute("min", from);
        document.querySelector("#start-date").setAttribute("max", to);
        document.querySelector("#end-date").setAttribute("min", from);
        document.querySelector("#end-date").setAttribute("max", to);
        */
}

function refreshDisplay() {
  Promise.resolve(globalState)
    .then(compileStatsFromRows)
    .then(formatStats)
    .then((content) => (document.querySelector("#result").innerText = content))
    .catch((error) => console.log(error));
}
