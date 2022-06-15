const { petForm } = document.forms;

petForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/photos', {
    method: 'post',
    body: new FormData(petForm),
  });

  console.log(response);
});
