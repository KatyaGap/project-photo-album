const formFoto = document.querySelector('#formFoto')
const deleteFotoButton = document.querySelector('#deleteFotoButton')


formFoto.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/card', {
    method: 'post',
    body: new FormData(formFoto),
  });
    if(response.ok) {
      window.location = 'http://localhost:3000/card'
    }
  
});

// deleteFotoButton.addEventListener('click', async (e) => {
// 	e.preventDefault();
// 	if (e.target.dataset.delete) {
// 		const id = e.target.dataset.delete;
// 		const div = document.getElementById(`div-${id}`);
// 		const response = await fetch(`/delete/${id}`, {
// 			method: 'delete',
// 		});
// 		if (response.ok) {
// 			console.log(response)
// 			div.remove();
// 		}
// 	}})


