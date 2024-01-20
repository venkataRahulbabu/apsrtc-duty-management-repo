document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
  const mobileMenu = document.getElementById('navbar-default');

  toggleButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
  });
});

$(document).ready(function () {
  // Sample data: Andhra Pradesh districts and mandals
  const districtMandals = {
    "Anantapur": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Chittoor": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "East Godavari": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Guntur": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Krishna": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Kurnool": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Nellore": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Prakasam": ["Ongole", "Chirala", "Podili", "Addanki", "Markapuram"],
    "Srikakulam": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Visakhapatnam": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "Vizianagaram": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "West Godavari": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
    "YSR Kadapa": ["Mandal1", "Mandal2", "Mandal3", "Mandal4", "Mandal5"],
  };

  function updateMandals(district) {
    const mandals = districtMandals[district];
    const depoSelect = $("#depoSelect");

    // Clear existing options
    depoSelect.empty();

    // Add default option
    depoSelect.append(new Option("Select a Depo", ""));

    if (mandals && mandals.length > 0) {
      mandals.forEach(function (mandal) {
        depoSelect.append(new Option(mandal, mandal));
      });
    } else {
      // Add the selected district as an option if no mandals found
      depoSelect.append(new Option(district, district));
    }
  }

  // Initial setup on page load
  $(document).ready(function () {
    updateMandals("Select your Depo");
  });

  // Handle district selection change
  $("#districtSelect").on("change", function () {
    const selectedDistrict = $(this).val();
    updateMandals(selectedDistrict);
  });
});
