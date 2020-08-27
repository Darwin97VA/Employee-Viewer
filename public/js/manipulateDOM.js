// Elements
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')
const categories = [...thead.querySelectorAll('th')]

//#region Headers of Table and Filters Interface

const insertCategory = () => {
  categories.map(cell => {
    const category = cell.innerText
    const onlyFilterSelecteds = store.filtersSelected[category]
    
    if(onlyFilterSelecteds) {
      const span = cell.firstElementChild
      span.dataset.showFilter = 'false'
      span.setAttribute('style', `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5em;
        position: relative;
        cursor: pointer;
      `)

      const ul = getSelect(category)
      const toogle = () => {
        const isShowFilter = span.dataset.showFilter
        if(isShowFilter === 'false') {
          span.appendChild(ul)
          span.dataset.showFilter = 'true'
        }
        else {
          span.removeChild(ul)
          span.dataset.showFilter = 'false'
        }
      }

      const iconFilter = document.createElement('i')
      iconFilter.classList.add('fas', 'fa-filter')
      span.appendChild(iconFilter)

      span.addEventListener('click', toogle)
    }
  })
}

const getCheckBox = (value, category) => {
  // Input
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.style.cursor = 'pointer'
  input.checked = true

  input.addEventListener('click', e => {
    if(input.checked) {
      li.style.color = 'var(--colorSelected)'
    } else {
      li.style.color = 'black'
    }
    e.stopPropagation()
    store.editSelecteds(category, value)
    updateRows()
  })

  // Span
  const span = document.createElement('span')
  span.textContent = value

  // Li
  const li = document.createElement('li')
  li.setAttribute('style', `
    listStyle: none;
    cursor: pointer;
    display: flex;
    gap: .5em;
    color: var(--colorSelected);
  `)
  li.addEventListener('click', e => {
    e.stopPropagation()
    input.click()
  })
  li.appendChild(input)
  li.appendChild(span)

  return li
}

const getSelect = category => {
  const values = Object.keys(store.filtersSelected[category])
  // Ul Element 
  const ul = document.createElement('ul')
  ul.setAttribute('style', `
    background: white;
    padding: 5px;
    position: absolute;
    z-index: 99999;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: .5em;
    overflow-y: scroll;
    max-height: 45vh;
    box-shadow: 0 6px 10px grey;
  `)

  // Li Element
  const insertLi = valueLi => ul.appendChild(getCheckBox(valueLi, category))
  values.sort().map(insertLi)

  return ul
}

//#endregion



//#region Rows of Employees
const getCell = data => {
  const td = document.createElement('td')
  const text = document.createTextNode(data)
  td.appendChild(text)
  return td
}

const getCells = ({...object}) => {
  for(let key in object) {
    object[key] = getCell(object[key])
  }
  return object
} 

const rowEmployee = data => {
  const tr = document.createElement('tr')

  const { 
    Nombre, 
    Cargo, 
    Supervisor, 
    Clase, 
    Subsidiaria, 
    Departamento 
  } = getCells(data)

  tr.appendChild(Nombre)
  tr.appendChild(Cargo)
  tr.appendChild(Supervisor)
  tr.appendChild(Clase)
  tr.appendChild(Subsidiaria)
  tr.appendChild(Departamento)

  return tr
}

const updateRows = () => {
  tbody.innerHTML = ''
  const employeesFiltered = store.getDataFiltered()
  insertAllEmployees(employeesFiltered)
}

const insertEmployee = employee => {
  return tbody.appendChild(rowEmployee(employee))
}

const insertAllEmployees = data => {
  return data.forEach(insertEmployee)
}
//#endregion

