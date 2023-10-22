const charactersContainer = document.querySelector(".chars-container");
const searchCharacterByName = document.getElementById("searchCharacter");
const searchCharacters = document.getElementById("searchCharacter");
const characterModal = document.getElementById("characterModal");
let currentPage = 1;

async function getCharacters(page, name = "") {
  try {
    const params = { page, name };
    const response = await api.get(`/character`, { params });

    const characters = response.data.results;
    const info = response.data.info;
    

    charactersRickMorty(characters);
    updatePaginationText(info.pages);
  } catch (error) {
    console.log("Erro ao buscar", error);
  }
}
function openModal(character) {
  document.getElementById("character-name").innerText = character.name
  document.getElementById("image-modal").src = character.image
  document.getElementById("status-modal").innerText = `Status: ${character.status}`
  document.getElementById("type-modal").innerText = `Type: ${character.type}`
  document.getElementById("location-modal").innerText = `Location: ${character.location.name}`
  console.log(character.location)

  
  $("#exampleModal").modal("show");
  
}

// função para buscar as informações da API e lançar no HTML com CSS
function charactersRickMorty(characters) {
  charactersContainer.innerHTML = "";

  characters.forEach((character) => {
    const cardCharacters = document.createElement("div");
    cardCharacters.classList.add("col-md-4", "mb-4", "card-custom");
    const mainContainer = document.createElement('div')
    mainContainer.classList.add('card')

    // image
    
    const image = document.createElement("img")
    image.classList.add("card-img-top")
    image.src = character.image

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body")

    const cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    cardTitle.innerText = character.name

    const cardSpecies = document.createElement("p")
    cardSpecies.classList.add("card-text")
    cardSpecies.innerText = `Species: ${character.species}`

    const cardGender = document.createElement("p")
    cardGender.classList.add("card-text")
    cardGender.innerText = `Gender: ${character.gender}`

    const button = document.createElement("button");
    button.onclick = () => {
      openModal(character);
    
    };
    button.innerText = "Ver detalhes";
    button.classList.add("btn", "btn-primary", "btn-sm", "detail-button");

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardSpecies)
    cardBody.appendChild(cardGender)
    cardBody.appendChild(button)
    mainContainer.appendChild(image)
    mainContainer.appendChild(cardBody)
    cardCharacters.appendChild(mainContainer)
    

    // cardCharacters.innerHTML = `
    // <div class="card">
    //       <img src="${character.image}" class="card-img-top" alt="${
    //   character.name
    // }" />
    //       <div class="card-body">
    //         <h5 class="card-title">${character.name}</h5>
    //         <p class="card-text">Species: ${character.species}</p>
    //         <p class="card-text">Gender: ${character.gender}</p>
    //         <button onclick="openModal()" class="btn btn-primary btn-sm detail-button" data-id="${
    //           character.id
    //         }">Ver detalhes</button>

    //       </div>
    //     </div>
    //       <div class="mt-3" id='status'>
    //         <span id="spanStatus" >Status: ${character.status}</span>
    //         <div class='statusColor ${
    //           character.status == "Dead"
    //             ? "dead"
    //             : character.status == "Alive"
    //             ? "alive"
    //             : "unknown"
    //         }'>
    //         </div>

    //     </div>
    //       `;

    charactersContainer.appendChild(cardCharacters);
    
  });
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
  totalPagesElement.textContent = totalPages;
}

// Pesquisar personagem
searchCharacters.addEventListener("input", () => {
  currentPage = 1;
  getCharacters(currentPage, searchCharacters.value);
});

getCharacters();
