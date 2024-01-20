/* $(document).ready(function () {
    // Sample data: Andhra Pradesh districts, mandals, and villages
    const districtMandalsVillages = {
        "Anantapur": {
            "Kalyandurg": ["Village1", "Village2", "Village3", "Village4", "Village5", "Village6"],
            "Dharmavaram": ["Village7", "Village8", "Village9", "Village10", "Village11", "Village12"],
            "Hindupur": ["Village13", "Village14", "Village15", "Village16", "Village17", "Village18"],
            "Kadiri": ["Village19", "Village20", "Village21", "Village22", "Village23", "Village24"],
            "Rayadurg": ["Village25", "Village26", "Village27", "Village28", "Village29", "Village30"],
        },
        "Chittoor": {
            "Tirupati": ["Village31", "Village32", "Village33", "Village34", "Village35", "Village36"],
            "Madanapalle": ["Village37", "Village38", "Village39", "Village40", "Village41", "Village42"],
            "Chittoor": ["Village43", "Village44", "Village45", "Village46", "Village47", "Village48"],
            "Srikalahasti": ["Village49", "Village50", "Village51", "Village52", "Village53", "Village54"],
            "Puttur": ["Village55", "Village56", "Village57", "Village58", "Village59", "Village60"],
        },
        "East Godavari": {
            "Rajahmundry": ["Village61", "Village62", "Village63", "Village64", "Village65", "Village66"],
            "Kakinada": ["Village67", "Village68", "Village69", "Village70", "Village71", "Village72"],
            "Amalapuram": ["Village73", "Village74", "Village75", "Village76", "Village77", "Village78"],
            "Mandapeta": ["Village79", "Village80", "Village81", "Village82", "Village83", "Village84"],
            "Peddapuram": ["Village85", "Village86", "Village87", "Village88", "Village89", "Village90"],
        },
        "Guntur": {
            "Guntur": ["Village91", "Village92", "Village93", "Village94", "Village95", "Village96"],
            "Tenali": ["Village97", "Village98", "Village99", "Village100", "Village101", "Village102"],
            "Narasaraopet": ["Village103", "Village104", "Village105", "Village106", "Village107", "Village108"],
            "Bapatla": ["Village109", "Village110", "Village111", "Village112", "Village113", "Village114"],
            "Chilakaluripet": ["Village115", "Village116", "Village117", "Village118", "Village119", "Village120"],
        },
        "Krishna": {
            "Vijayawada": ["Village121", "Village122", "Village123", "Village124", "Village125", "Village126"],
            "Machilipatnam": ["Village127", "Village128", "Village129", "Village130", "Village131", "Village132"],
            "Gannavaram": ["Village133", "Village134", "Village135", "Village136", "Village137", "Village138"],
            "Nuzvid": ["Village139", "Village140", "Village141", "Village142", "Village143", "Village144"],
            "Jaggayyapeta": ["Village145", "Village146", "Village147", "Village148", "Village149", "Village150"],
        },
        "Kurnool": {
            "Kurnool": ["Village151", "Village152", "Village153", "Village154", "Village155", "Village156"],
            "Adoni": ["Village157", "Village158", "Village159", "Village160", "Village161", "Village162"],
            "Nandyal": ["Village163", "Village164", "Village165", "Village166", "Village167", "Village168"],
            "Yemmiganur": ["Village169", "Village170", "Village171", "Village172", "Village173", "Village174"],
            "Dhone": ["Village175", "Village176", "Village177", "Village178", "Village179", "Village180"],
        },
        "Nellore": {
            "Nellore": ["Village181", "Village182", "Village183", "Village184", "Village185", "Village186"],
            "Kavali": ["Village187", "Village188", "Village189", "Village190", "Village191", "Village192"],
            "Gudur": ["Village193", "Village194", "Village195", "Village196", "Village197", "Village198"],
            "Sullurpeta": ["Village199", "Village200", "Village201", "Village202", "Village203", "Village204"],
            "Venkatagiri": ["Village205", "Village206", "Village207", "Village208", "Village209", "Village210"],
        },
        "Prakasam": {
            "Ongole": ["Village211", "Village212", "Village213", "Village214", "Village215", "Village216"],
            "Chirala": ["Village217", "Village218", "Village219", "Village220", "Village221", "Village222"],
            "Kandukur": ["Village223", "Village224", "Village225", "Village226", "Village227", "Village228"],
            "Markapur": ["Village229", "Village230", "Village231", "Village232", "Village233", "Village234"],
            "Addanki": ["Village235", "Village236", "Village237", "Village238", "Village239", "Village240"],
        },
        "Srikakulam": {
            "Srikakulam": ["Village241", "Village242", "Village243", "Village244", "Village245", "Village246"],
            "Tekkali": ["Village247", "Village248", "Village249", "Village250", "Village251", "Village252"],
            "Palasa": ["Village253", "Village254", "Village255", "Village256", "Village257", "Village258"],
            "Ichchapuram": ["Village259", "Village260", "Village261", "Village262", "Village263", "Village264"],
            "Rajam": ["Village265", "Village266", "Village267", "Village268", "Village269", "Village270"],
        },
        "Visakhapatnam": {
            "Visakhapatnam": ["Village271", "Village272", "Village273", "Village274", "Village275", "Village276"],
            "Gajuwaka": ["Village277", "Village278", "Village279", "Village280", "Village281", "Village282"],
            "Anakapalle": ["Village283", "Village284", "Village285", "Village286", "Village287", "Village288"],
            "Pendurthi": ["Village289", "Village290", "Village291", "Village292", "Village293", "Village294"],
            "Narsipatnam": ["Village295", "Village296", "Village297", "Village298", "Village299", "Village300"],
        },
        "Vizianagaram": {
            "Vizianagaram": ["Village301", "Village302", "Village303", "Village304", "Village305", "Village306"],
            "Bobbili": ["Village307", "Village308", "Village309", "Village310", "Village311", "Village312"],
            "Mandal53": ["Village417", "Village418", "Village419", "Village420", "Village421", "Village422"],
            "Mandal54": ["Village425", "Village426", "Village427", "Village428", "Village429", "Village430"],
            "Mandal55": ["Village433", "Village434", "Village435", "Village436", "Village437", "Village438"],
        },
        "West Godavari": {
            "Mandal56": ["Village441", "Village442", "Village443", "Village444", "Village445", "Village446"],
            "Mandal57": ["Village449", "Village450", "Village451", "Village452", "Village453", "Village454"],
            "Mandal58": ["Village457", "Village458", "Village459", "Village460", "Village461", "Village462"],
            "Mandal59": ["Village465", "Village466", "Village467", "Village468", "Village469", "Village470"],
            "Mandal60": ["Village473", "Village474", "Village475", "Village476", "Village477", "Village478"],
        },
        "YSR Kadapa": {
            "Mandal61": ["Village481", "Village482", "Village483", "Village484", "Village485", "Village486"],
            "Mandal62": ["Village489", "Village490", "Village491", "Village492", "Village493", "Village494"],
            "Mandal63": ["Village497", "Village498", "Village499", "Village500", "Village501", "Village502"],
            "Mandal64": ["Village505", "Village506", "Village507", "Village508", "Village509", "Village510"],
            "Mandal65": ["Village513", "Village514", "Village515", "Village516", "Village517", "Village518"],
        },

    };

    // Initialize the first select2 plugin for districts
    $("#districtSelect").select2({
        data: Object.keys(districtMandalsVillages), // Populate options from the districts in the districtMandalsVillages object
        placeholder: "Select a district",
        allowClear: true,
        minimumResultsForSearch: Infinity,
    });

    // Function to update the mandals select options based on the selected district
    function updateMandals(district) {
        const mandals = Object.keys(districtMandalsVillages[district]);
        const mandalSelect = $("#mandalSelect");
        const villageSelect = $("#villageSelect");
        mandalSelect.empty();
        villageSelect.empty();
        if (mandals && mandals.length > 0) {
            mandals.forEach(function (mandal) {
                mandalSelect.append(new Option(mandal, mandal));
            });
            // Set placeholder for mandal select box
            mandalSelect.attr("data-placeholder", "Select a mandal");
        } else {
            // If no mandals available for the selected district, show a placeholder
            mandalSelect.attr("data-placeholder", "No mandals available");
        }
        // Trigger change event on mandal select box to update villages
        mandalSelect.trigger("change");
    }

    // Function to update the villages select options based on the selected mandal
    function updateVillages(district, mandal) {
        const villages = districtMandalsVillages[district][mandal];
        const villageSelect = $("#villageSelect");
        villageSelect.empty();
        if (villages && villages.length > 0) {
            villages.forEach(function (village) {
                villageSelect.append(new Option(village, village));
            });
            // Set placeholder for village select box
            villageSelect.attr("data-placeholder", "Select a village");
        } else {
            // If no villages available for the selected mandal, show a placeholder
            villageSelect.attr("data-placeholder", "No villages available");
        }
    }

    // Call the updateMandals function when the district select option changes
    $("#districtSelect").on("change", function () {
        const selectedDistrict = $(this).val();
        updateMandals(selectedDistrict);
    });

    // Call the updateVillages function when the mandal select option changes
    $("#mandalSelect").on("change", function () {
        const selectedDistrict = $("#districtSelect").val();
        const selectedMandal = $(this).val();
        updateVillages(selectedDistrict, selectedMandal);
    });

    // Call the updateMandals and updateVillages functions on page load to set the initial options
    const initialDistrict = $("#districtSelect").val();
    updateMandals(initialDistrict);
    const initialMandal = $("#mandalSelect").val();
    updateVillages(initialDistrict, initialMandal);
});
 */



$(document).ready(function () {
    // Sample data: Andhra Pradesh districts, mandals, and villages
    const districtMandalsVillages = {
        "Anantapur": {
            "Kalyandurg": ["Village1", "Village2", "Village3", "Village4", "Village5", "Village6"],
            "Dharmavaram": ["Village7", "Village8", "Village9", "Village10", "Village11", "Village12"],
            "Hindupur": ["Village13", "Village14", "Village15", "Village16", "Village17", "Village18"],
            "Kadiri": ["Village19", "Village20", "Village21", "Village22", "Village23", "Village24"],
            "Rayadurg": ["Village25", "Village26", "Village27", "Village28", "Village29", "Village30"],
        },
        "Chittoor": {
            "Tirupati": ["Village31", "Village32", "Village33", "Village34", "Village35", "Village36"],
            "Madanapalle": ["Village37", "Village38", "Village39", "Village40", "Village41", "Village42"],
            "Chittoor": ["Village43", "Village44", "Village45", "Village46", "Village47", "Village48"],
            "Srikalahasti": ["Village49", "Village50", "Village51", "Village52", "Village53", "Village54"],
            "Puttur": ["Village55", "Village56", "Village57", "Village58", "Village59", "Village60"],
        },
        "East Godavari": {
            "Rajahmundry": ["Village61", "Village62", "Village63", "Village64", "Village65", "Village66"],
            "Kakinada": ["Village67", "Village68", "Village69", "Village70", "Village71", "Village72"],
            "Amalapuram": ["Village73", "Village74", "Village75", "Village76", "Village77", "Village78"],
            "Mandapeta": ["Village79", "Village80", "Village81", "Village82", "Village83", "Village84"],
            "Peddapuram": ["Village85", "Village86", "Village87", "Village88", "Village89", "Village90"],
        },
        "Guntur": {
            "Guntur": ["Village91", "Village92", "Village93", "Village94", "Village95", "Village96"],
            "Tenali": ["Village97", "Village98", "Village99", "Village100", "Village101", "Village102"],
            "Narasaraopet": ["Village103", "Village104", "Village105", "Village106", "Village107", "Village108"],
            "Bapatla": ["Village109", "Village110", "Village111", "Village112", "Village113", "Village114"],
            "Chilakaluripet": ["Village115", "Village116", "Village117", "Village118", "Village119", "Village120"],
        },
        "Krishna": {
            "Vijayawada": ["Village121", "Village122", "Village123", "Village124", "Village125", "Village126"],
            "Machilipatnam": ["Village127", "Village128", "Village129", "Village130", "Village131", "Village132"],
            "Gannavaram": ["Village133", "Village134", "Village135", "Village136", "Village137", "Village138"],
            "Nuzvid": ["Village139", "Village140", "Village141", "Village142", "Village143", "Village144"],
            "Jaggayyapeta": ["Village145", "Village146", "Village147", "Village148", "Village149", "Village150"],
        },
        "Kurnool": {
            "Kurnool": ["Village151", "Village152", "Village153", "Village154", "Village155", "Village156"],
            "Adoni": ["Village157", "Village158", "Village159", "Village160", "Village161", "Village162"],
            "Nandyal": ["Village163", "Village164", "Village165", "Village166", "Village167", "Village168"],
            "Yemmiganur": ["Village169", "Village170", "Village171", "Village172", "Village173", "Village174"],
            "Dhone": ["Village175", "Village176", "Village177", "Village178", "Village179", "Village180"],
        },
        "Nellore": {
            "Nellore": ["Village181", "Village182", "Village183", "Village184", "Village185", "Village186"],
            "Kavali": ["Village187", "Village188", "Village189", "Village190", "Village191", "Village192"],
            "Gudur": ["Village193", "Village194", "Village195", "Village196", "Village197", "Village198"],
            "Sullurpeta": ["Village199", "Village200", "Village201", "Village202", "Village203", "Village204"],
            "Venkatagiri": ["Village205", "Village206", "Village207", "Village208", "Village209", "Village210"],
        },
        "Prakasam": {
            "Ongole": ["Village211", "Village212", "Village213", "Village214", "Village215", "Village216"],
            "Chirala": ["Village217", "Village218", "Village219", "Village220", "Village221", "Village222"],
            "Kandukur": ["Village223", "Village224", "Village225", "Village226", "Village227", "Village228"],
            "Markapur": ["Village229", "Village230", "Village231", "Village232", "Village233", "Village234"],
            "Addanki": ["Village235", "Village236", "Village237", "Village238", "Village239", "Village240"],
        },
        "Srikakulam": {
            "Srikakulam": ["Village241", "Village242", "Village243", "Village244", "Village245", "Village246"],
            "Tekkali": ["Village247", "Village248", "Village249", "Village250", "Village251", "Village252"],
            "Palasa": ["Village253", "Village254", "Village255", "Village256", "Village257", "Village258"],
            "Ichchapuram": ["Village259", "Village260", "Village261", "Village262", "Village263", "Village264"],
            "Rajam": ["Village265", "Village266", "Village267", "Village268", "Village269", "Village270"],
        },
        "Visakhapatnam": {
            "Visakhapatnam": ["Village271", "Village272", "Village273", "Village274", "Village275", "Village276"],
            "Gajuwaka": ["Village277", "Village278", "Village279", "Village280", "Village281", "Village282"],
            "Anakapalle": ["Village283", "Village284", "Village285", "Village286", "Village287", "Village288"],
            "Pendurthi": ["Village289", "Village290", "Village291", "Village292", "Village293", "Village294"],
            "Narsipatnam": ["Village295", "Village296", "Village297", "Village298", "Village299", "Village300"],
        },
        "Vizianagaram": {
            "Vizianagaram": ["Village301", "Village302", "Village303", "Village304", "Village305", "Village306"],
            "Bobbili": ["Village307", "Village308", "Village309", "Village310", "Village311", "Village312"],
            "Mandal53": ["Village417", "Village418", "Village419", "Village420", "Village421", "Village422"],
            "Mandal54": ["Village425", "Village426", "Village427", "Village428", "Village429", "Village430"],
            "Mandal55": ["Village433", "Village434", "Village435", "Village436", "Village437", "Village438"],
        },
        "West Godavari": {
            "Mandal56": ["Village441", "Village442", "Village443", "Village444", "Village445", "Village446"],
            "Mandal57": ["Village449", "Village450", "Village451", "Village452", "Village453", "Village454"],
            "Mandal58": ["Village457", "Village458", "Village459", "Village460", "Village461", "Village462"],
            "Mandal59": ["Village465", "Village466", "Village467", "Village468", "Village469", "Village470"],
            "Mandal60": ["Village473", "Village474", "Village475", "Village476", "Village477", "Village478"],
        },
        "YSR Kadapa": {
            "Mandal61": ["Village481", "Village482", "Village483", "Village484", "Village485", "Village486"],
            "Mandal62": ["Village489", "Village490", "Village491", "Village492", "Village493", "Village494"],
            "Mandal63": ["Village497", "Village498", "Village499", "Village500", "Village501", "Village502"],
            "Mandal64": ["Village505", "Village506", "Village507", "Village508", "Village509", "Village510"],
            "Mandal65": ["Village513", "Village514", "Village515", "Village516", "Village517", "Village518"],
        },

    };

    // Initialize the first select2 plugin for districts
    $("#districtSelect").select2({
        data: Object.keys(districtMandalsVillages).map(district => ({ id: district, text: district })),
        placeholder: "Select a district",
        allowClear: true,
        minimumResultsForSearch: Infinity,
    });

    // Function to update the mandals select options based on the selected district
    function updateMandals(district) {
        const mandals = Object.keys(districtMandalsVillages[district]);
        const mandalSelect = $("#mandalSelect");
        const villageSelect = $("#villageSelect");
        mandalSelect.empty();
        villageSelect.empty();
        if (mandals && mandals.length > 0) {
            mandals.forEach(function (mandal) {
                mandalSelect.append(new Option(mandal, mandal));
            });
            mandalSelect.attr("data-placeholder", "Select a mandal");
        } else {
            mandalSelect.attr("data-placeholder", "No mandals available");
        }
        mandalSelect.trigger("change");
    }

    // Function to update the villages select options based on the selected mandal
    function updateVillages(district, mandal) {
        const villages = districtMandalsVillages[district][mandal];
        const villageSelect = $("#villageSelect");
        villageSelect.empty();
        if (villages && villages.length > 0) {
            villages.forEach(function (village) {
                villageSelect.append(new Option(village, village));
            });
            villageSelect.attr("data-placeholder", "Select a village");
        } else {
            villageSelect.attr("data-placeholder", "No villages available");
        }
    }

    // Call the updateMandals function when the district select option changes
    $("#districtSelect").on("change", function () {
        const selectedDistrict = $(this).val();
        updateMandals(selectedDistrict);
    });

    // Call the updateVillages function when the mandal select option changes
    $("#mandalSelect").on("change", function () {
        const selectedDistrict = $("#districtSelect").val();
        const selectedMandal = $(this).val();
        updateVillages(selectedDistrict, selectedMandal);
    });

    // Initial load to set up the dropdowns
    const initialDistrict = $("#districtSelect").val();
    updateMandals(initialDistrict);
    const initialMandal = $("#mandalSelect").val();
    updateVillages(initialDistrict, initialMandal);
});


