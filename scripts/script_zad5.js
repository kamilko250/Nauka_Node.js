document.querySelector('#leftform').addEventListener('submit', event => {
  axios.post('/zad5', {
    leftmin: document.querySelector('#leftmin').value,
    leftmax: document.querySelector('#leftmax').value,  
  })
  event.preventDefault()
  return false
})

