const userForm = document.getElementById('userForm');
console.log(userForm);
const ul = document.getElementById('ul');
const container = document.querySelector('.col');
console.log(ul)

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
		const formData = new FormData(userForm);
		const data = Object.fromEntries(formData);
  
		const response = await fetch('/userForm', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const result = await response.json();
			console.log(result)
			ul.insertAdjacentHTML('beforeend', 
      `<li id="li-${result.id} class="list-group-item">
      <a href="/user:id/album:id">${result.title}</a>
      <button data-change=${result.id} class="change-button" type="click">change</button>
      <button data-delete=${result.id} class="delete-button" type="click">delete</button>
    </li>`)
		}
	});

container.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    const li = document.getElementById(`li-${id}`);
    const response = await fetch(`/album/${id}`, {
       method: 'delete',
    });
    if (response.ok) {
      li.remove();
    }
  }})
