document.querySelector('#leftform').addEventListener('submit', event => {
  axios.post('/zad5', {
    leftmin: document.querySelector('#leftmin').value,
    leftmax: document.querySelector('#leftmax').value,  
  }).then(res => {
    document.querySelector('#leftpostResultDiv').innerText = res.data.result
  })
  event.preventDefault()
  return false
})
document.querySelector('#rightform').addEventListener('submit', event => {
  axios.post('/zad5', {
    leftmin: document.querySelector('#rightmin').value,
    leftmax: document.querySelector('#rightmax').value,  
  }).then(res => {
    document.querySelector('#rightpostResultDiv').innerText = res.data.result
  })
  event.preventDefault()
  return false
})

