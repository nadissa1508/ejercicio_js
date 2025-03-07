
document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';

    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Consultar información';
    fetchButton.onclick = fetchCharacters;

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';

    container.appendChild(fetchButton);
    container.appendChild(resultsContainer);
    document.body.appendChild(container);
});

function fetchCharacters() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Cargando personajes...';

    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=100')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.style.width = '80%';
            resultsContainer.style.height = '100vh';
            resultsContainer.style.margin = '0 auto';
            resultsContainer.style.overflow = 'auto';

            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'grid';
            resultsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            resultsContainer.style.gap = '10px';
           
            dataFiltred = data.sort(() => Math.random() - 0.5).slice(0, 10);
            dataFiltred.forEach(character => {
                const characterElement = document.createElement('div');
                characterElement.innerHTML = `
                    <p>Personaje: ${character.character}</p>
                    <p>Linea: ${character.quote}</p>
                    <img src="${character.image}" alt="${character.character}" width="100px" />
                `;

                characterElement.style.border = '1px solid #ccc';
                characterElement.style.padding = '10px';
                characterElement.style.borderRadius = '16px';
                resultsContainer.appendChild(characterElement);
            });
            document.querySelector('button:nth-of-type(2)').style.display = 'block';
        })
        .catch(error => console.error('Error fetching characters:', error));
}

