
async function fetchDisciplines() {
    try {
        const response = await fetch('https://apis.codante.io/olympic-games/disciplines');
        const data = await response.json();
        const sportsList = document.getElementById('sports-list');
    
        data.data.forEach(discipline => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center'; // Center items vertically

            const img = document.createElement('img');
            img.src = discipline.pictogram_url;
            img.alt = discipline.name;
    
            const text = document.createTextNode(discipline.name);
    
            listItem.appendChild(text);
            listItem.appendChild(img);
            sportsList.appendChild(listItem);
        });
    } catch (error) {
    console.error('Error fetching disciplines:', error);
    }
}
    
fetchDisciplines();