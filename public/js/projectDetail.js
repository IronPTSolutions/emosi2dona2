const button = document.getElementById("favorite")

button.onclick = () => {
  button.classList.add("disabled")

  const icon = button.querySelector('i')
  const text = button.querySelector('span')

  icon.classList.toggle("bi-arrow-repeat")
  icon.classList.toggle("bi-bookmark-heart-fill")

  text.textContent = "Loading"

  const projectId = button.value;

  axios.post(`http://localhost:3000/projects/${projectId}/like`)
    .then((response) => {
      button.classList.toggle("btn-danger")
      button.classList.toggle("btn-outline-danger")

      text.textContent = !response.data.deleted ? "Remove from saved" : "Save"
    })
    .catch(e => console.error(e))
    .finally(() => {
      button.classList.remove("disabled")
      icon.classList.toggle("bi-arrow-repeat")
      icon.classList.toggle("bi-bookmark-heart-fill")
    })
}
