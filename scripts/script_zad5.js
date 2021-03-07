document.querySelector('#leftform').addEventListener('submit', event => {
  axios.post('/zad5', {
    leftmin: document.querySelector('#leftmin').value,
    leftmax: document.querySelector('#leftmax').value,  
  }).then(res => {
    document.querySelector('#postResultDiv').innerText = res.data.result
  })
  event.preventDefault()
  return false
})

