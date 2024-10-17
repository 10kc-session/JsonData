const dataList = document.getElementById('dataList');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const addressInput = document.getElementById('addressInput');
const passwordInput = document.getElementById('passwordInput');
const addButton = document.getElementById('addButton');

const fetchData = async () => {
    const response = await fetch('http://localhost:3000/data');
    const data = await response.json();
    renderData(data);
};

const renderData = (data) => {
    dataList.innerHTML = '';
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Name: ${item.name}, Email: ${item.email}, Address: ${item.address}`;
        li.className = 'list-group-item list-group-item-action';
        dataList.appendChild(li);
    });
};

addButton.onclick = async () => {
    if (!nameInput.value || !emailInput.value || !addressInput.value || !passwordInput.value) {
        alert("Please fill in all fields.");
        return;
    }

    const newData = {
        name: nameInput.value,
        email: emailInput.value,
        address: addressInput.value,
        password: passwordInput.value
    };
    await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    nameInput.value = '';
    emailInput.value = '';
    addressInput.value = '';
    passwordInput.value = '';
    fetchData();
};

fetchData();