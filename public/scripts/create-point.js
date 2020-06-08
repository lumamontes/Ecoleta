function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(const state of states ) {
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
    citySelect.disabled = true

    
    
    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document.querySelector("select[name=uf]").addEventListener("change", getCities)


//Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")


let selectedItems = []
function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    //verificar se existem itens selecionados se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item) {
        const itemFound = item == itemId // isso será True ou False
        return itemFound
    })

    //se já estiver selecionado, 
        if(alreadySelected >= 0){
            //tirar da seleção
            const filteredItems = selectedItems.filter( item => {
                const ItemIsDifferent = item!= itemId // false
                return ItemIsDifferent

            })

            selectedItems = filteredItems
        } else {

            //se não estiver selecionado, adicionar a seleção
            selectedItems.push(itemId)
        }
    //atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}