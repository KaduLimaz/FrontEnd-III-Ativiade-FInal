const charactersContainer = document.querySelector(".chars-container");
const searchCharacterByName = document.getElementById("searchCharacter");
const searchCharacters = document.getElementById("searchCharacter");
const characterModal = (document.getElementById("characterModal"));
let currentPage = 1;

async function getCharacters(page, name = "") {
  try {
    const params = { page, name };
    const response = await api.get(`/character`, { params });

    const characters = response.data.results;    
    const info = response.data.info;
    const totalPagesApi = response.data.info.pages;

    charactersRickMorty(characters);
    updatePaginationText(info.pages);
  } catch (error) {
    console.log("Erro ao buscar", error);
  }
}

// função para buscar as informações da API e lançar no HTML com CSS
function charactersRickMorty(characters) {
  charactersContainer.innerHTML = "";

  characters.forEach((character) => {
    const cardCharacters = document.createElement("div");
    cardCharacters.classList.add("col-md-4", "mb-4", "card-custom", );

    cardCharacters.innerHTML = `
    <div class="card">
          <img src="${character.image}" class="card-img-top" alt="${
      character.name
    }" />
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text">Species: ${character.species}</p>
            <p class="card-text">Gender: ${character.gender}</p>
            <button class="btn btn-primary btn-sm detail-button" data-id="${character.id}">Ver detalhes</button>
            
          </div>
        </div>         
          <div class="mt-3" id='status'>
            <span id="spanStatus" >Status: ${character.status}</span>
            <div class='statusColor ${
              character.status == "Dead"
                ? "dead"
                : character.status == "Alive"
                ? "alive"
                : "unknown"
            }'>
            </div>
            
        </div>
          `;
    charactersContainer.appendChild(cardCharacters);
  });
}

// botao para detalhar
const detailButtons = document.querySelectorAll(".detail-button");
detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const characterId = button.getAttribute("data-id");
    showCharacterDetails(characterId);
  });
});


// modal
function showCharacterDetails(characterId) {
    const character = getCharacters.find((char) => char.id == characterId);
    const modalBody = document.getElementById("characterModalBody");
    modalBody.innerHTML = `
    <img src="${character.image}" alt="${character.name}" class="modal-img" />
    <p>Name: ${character.name}</p>
    <p>Species: ${character.species}</p>
    <p>Gender: ${character.gender}</p>
    <p>Status: ${character.status}</p>
    <p>Type: ${character.type}</p>
    <p>Location: ${character.location}</p>`;

    characterModal();
  }
    



// botao para proxima pagina - linkado pelo onclick no HTML
function PaginationNext() {
  if (currentPage < 42) {
    currentPage++; // Incrementar para a próxima página
    getCharacters(currentPage, searchCharacters.value);
    updatePaginationText(info.pages);
  }
}

// botao para voltar pagina - linkado pelo onclick no HTML
function PaginationPrev() {
  if (currentPage > 1) {
    currentPage--;
    getCharacters(currentPage, searchCharacters.value);
  }
}

//contador de paginas
function updatePaginationText(totalPages) {
  const currentPageElement = document.getElementById("currentPage");
  const totalPagesElement = document.getElementById("totalPages");

  currentPageElement.textContent = currentPage;
  totalPagesElement.textContent = 42;


}

// Pesquisar personagem
searchCharacters.addEventListener("input", () => {
  currentPage = 1;
  getCharacters(currentPage, searchCharacters.value);
});

getCharacters();
