function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("Отримані дані:", data))
    .catch(error => console.error("Помилка запиту:", error));
}
  
fetchData();  