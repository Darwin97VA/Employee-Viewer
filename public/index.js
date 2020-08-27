const ready = (fn) => {
  if (document.readyState != 'loading'){
    fn()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn)
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn()
    })
  }
}

const store = new Store()

ready(async () => {
  // SET STORE 
  const employees = await fetch('data.json').then(res => res.json())
  store.initData(employees)

  // RENDER ELEMENTS
  insertAllEmployees(store.data)
  insertCategory()
})