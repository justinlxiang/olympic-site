let showingTop10 = false;
let currentRankingType = 'gold';

async function fetchMedalStandings() {
  const response = await fetch('https://api.olympics.kevle.xyz/medals');
  const data = await response.json();
  const standings = document.getElementById('medal-standings');
  standings.innerHTML = ''; // Clear previous standings
  const topCountries = data.results.sort((a, b) => b.medals[currentRankingType] - a.medals[currentRankingType]).slice(0, showingTop10 ? 10 : 5);
  for (const country of topCountries) {
    const listItem = document.createElement('li');
    listItem.textContent = `${country.country.name} - ${currentRankingType.charAt(0).toUpperCase() + currentRankingType.slice(1)} Medals: ${country.medals[currentRankingType]}`;
    standings.appendChild(listItem);
  }
}

document.querySelectorAll('[data-ranking-type]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-ranking-type]').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      currentRankingType = button.textContent.toLowerCase();
      fetchMedalStandings();
    });
  });

document.addEventListener('DOMContentLoaded', (event) => {
    fetchMedalStandings();
    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = 'Show More';
    showMoreButton.addEventListener('click', () => {
      showingTop10 = !showingTop10;
      showMoreButton.textContent = showingTop10 ? 'Show Less' : 'Show More';
      fetchMedalStandings();
    });
    const searchBox = document.getElementById('search-box');
    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(showMoreButton);
    searchBox.parentNode.insertBefore(buttonContainer, searchBox);

    // Set default selected button
    document.querySelector('[data-ranking-type="gold"]').classList.add('selected');
  });

async function searchCountryMedals() {
  const query = document.getElementById('search-box').value.toLowerCase();
  const results = document.getElementById('search-results');
  results.innerHTML = '';
  if (query.trim() === '') {
    return;
  }
  const response = await fetch('https://api.olympics.kevle.xyz/medals');
  const data = await response.json();
  const filteredCountries = data.results.filter(country => country.country.name.toLowerCase().includes(query));
  for (const country of filteredCountries) {
    const listItem = document.createElement('li');
    listItem.textContent = `${country.country.name} - Gold: ${country.medals.gold}, Silver: ${country.medals.silver}, Bronze: ${country.medals.bronze}, Total: ${country.medals.gold + country.medals.silver + country.medals.bronze}`;
    results.appendChild(listItem);
  }
}

document.getElementById('search-box').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchCountryMedals();
  }
});
document.getElementById('search-box').addEventListener('blur', searchCountryMedals);

