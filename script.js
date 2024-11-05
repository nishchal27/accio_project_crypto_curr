const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let marketData = [];

// Fetch data using .then
function fetchDataWithThen() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            marketData = data;
            renderTable(data);
        })
        .catch(error => console.error('Error fetching data with .then:', error));
}

// Fetch data using async/await
async function fetchDataWithAsync() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        marketData = data;
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data with async/await:', error);
    }
}

// Render data in the table
function renderTable(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';  // Clear previous data

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="30"></td>
            <td>${item.name}</td>
            <td>${item.symbol.toUpperCase()}</td>
            <td>$${item.current_price.toLocaleString()}</td>
            <td>${item.total_volume.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search function
function searchData() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredData = marketData.filter(item => item.name.toLowerCase().includes(searchInput));
    renderTable(filteredData);
}

// Sort function
function sortData(criteria) {
    let sortedData = [...marketData];
    
    if (criteria === 'market_cap') {
        sortedData.sort((a, b) => b.market_cap - a.market_cap);
    } else if (criteria === 'percentage_change') {
        sortedData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }
    
    renderTable(sortedData);
}

// Initial data fetch
fetchDataWithThen(); // or use fetchDataWithAsync();
