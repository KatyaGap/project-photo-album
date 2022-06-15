const userForm = document.getElementById('userForm');
const ul = document.getElementById('ul');
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
			ul.insertAdjacentHTML('beforeend', `<li id="li-${result.id}" class="list-group-item"><a href="/user:id/album:id">${result.title}</a></li>`)
		}
	});

