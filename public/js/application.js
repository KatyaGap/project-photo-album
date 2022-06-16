const formFoto  = document.querySelector('#formFoto')
const { photoBut } = document.forms

console.log(formFoto)
formFoto?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/card', {
    method: 'post',
    body: new FormData(formFoto),
  });
    if(response.ok) {
      window.location = 'http://localhost:3000/card'
    }
  
});

photoBut?.addEventListener('submit', async (event) => {
	event.preventDefault();
  console.log(event.target.id)
	if (event.target.dataset.delete) {
		const id = e.target.dataset.delete;
		console.log(id)
		const div = document.getElementById(`div-${id}`);
	console.log(div)
		const response = await fetch(`/${id}`, {
			method: 'delete',
		});
		if (response.ok) {
			console.log(response)
			div.remove();
		}
	}})
