//  TRATAMIENTO DE DATOS VACÍOS:
const KEY_EMPTY = 'No definido'
//  1) En la clase Filters
//  Filters.initData setea en cada categoría
//  la propiedad [KEY_EMPTY] 
//  (el valor actual es "No definido") 
//  si el valor es evaluado como 
//  falso ("", null, undefined, etc.)

//  2) En la clase Store
//  Store.evalMatch usa el valor de KEY_EMPTY
//  para reemplazar el valor evaluable
//  si detecta que el valor que recibiría 
//  del empleado en esa categoría es vacío.
// 


class Filters {
  constructor(data) {
    this.Supervisor = {}
    this.Clase = {}
    this.Subsidiaria = {}
    this.Departamento = {}
    
    this.initData(data)
  }

  initData(data) {
    data.forEach(employee => {
      for(let category in employee) {
        if(this[category]) {
          const value = employee[category]
          if(value) {
            this[category][value] = true
          }
          else {
            this[category][KEY_EMPTY] = true
          }
        }
      }
    })
  }
}

class Store {
  constructor() {
  }

  initData(data) {
    this.data = data
    this.filtersSelected = new Filters(this.data)
  }
  
  // #region Edit 
  editSelecteds(category, option) {
    if(this.filtersSelected[category]) {
      this.filtersSelected[category][option] = !this.filtersSelected[category][option]
    }
  }
  // #endregion

  // #region return data filtered
  filterMatch([category, value]) {
    const categoryObject = this.filtersSelected[category]
    if(categoryObject) {
      const options = Object.entries(this.filtersSelected[category])
      return options.some(([valueOption, boolean]) => {
        return boolean && (valueOption === (value || KEY_EMPTY))
      })
    }
    else {
      return true
    }
  }

  filtered(data) {
    const dataFiltered = data.filter(employee => {
      const dataEmployee = Object.entries(employee)
      return (
        dataEmployee.every(data => this.filterMatch(data))
      )
    })
    return dataFiltered
  }

  getDataFiltered() {
    const isAllSelected = this.evalAllSelecteds()
    const tmpData = [...this.data]
    if(isAllSelected) {
      return tmpData
    }
    else {
      return sortBy(
        this.filtered(tmpData),
        ['Supervisor', 'Nombre']  
      )
    }

  }
  // #endregion


  evalAllSelecteds() {
    const categories = Object.values(this.filtersSelected)
    const allBooleans = categories.map(Object.values).flat()
    return !allBooleans.some(bool => !bool)
  }
}