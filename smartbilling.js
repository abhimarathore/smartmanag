 // JavaScript for handling navigation and back to top button
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        
        // Show the target section
        document.querySelector(targetId).classList.add('active');

        // Set active class for navigation link
        document.querySelectorAll('.nav-links a').forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// JavaScript for generating charts
const ctxPie = document.getElementById('expensePieChart').getContext('2d');
const ctxBar = document.getElementById('expenseBarChart').getContext('2d');

const expensePieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['Cosmetics', 'Grocery', 'Cold Drinks'],
        datasets: [{
            label: 'Expense Distribution',
            data: [300, 400, 200], // Example data
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    }
});

const expenseBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Monthly Expenses',
            data: [1200, 1900, 3000, 5000, 4000], // Example data
            backgroundColor: '#36a2eb',
            borderColor: '#fff',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Helper function to calculate total prices and taxes
function calculateTotals() {
    const categories = ['cosmetics', 'grocery', 'drinks'];
    let totalCosmeticPrice = 0;
    let totalGroceryPrice = 0;
    let totalColdDrinkPrice = 0;

    categories.forEach(category => {
        document.querySelectorAll(`.${category} input[type="number"]`).forEach(item => {
            const quantity = parseInt(item.value);
            const price = parseInt(item.getAttribute('data-price'));
            if (quantity > 0) {
                switch (category) {
                    case 'cosmetics':
                        totalCosmeticPrice += quantity * price;
                        break;
                    case 'grocery':
                        totalGroceryPrice += quantity * price;
                        break;
                    case 'drinks':
                        totalColdDrinkPrice += quantity * price;
                        break;
                }
            }
        });
    });

    const cosmeticTax = totalCosmeticPrice * 0.1; // Assuming 10% tax
    const groceryTax = totalGroceryPrice * 0.05; // Assuming 5% tax
    const coldDrinkTax = totalColdDrinkPrice * 0.15; // Assuming 15% tax

    document.getElementById('cosmeticPrice').value = totalCosmeticPrice.toFixed(2);
    document.getElementById('groceryPrice').value = totalGroceryPrice.toFixed(2);
    document.getElementById('coldDrinkPrice').value = totalColdDrinkPrice.toFixed(2);
    document.getElementById('cosmeticTax').value = cosmeticTax.toFixed(2);
    document.getElementById('groceryTax').value = groceryTax.toFixed(2);
    document.getElementById('coldDrinkTax').value = coldDrinkTax.toFixed(2);

    return {
        totalCosmeticPrice,
        totalGroceryPrice,
        totalColdDrinkPrice,
        cosmeticTax,
        groceryTax,
        coldDrinkTax
    };
}

document.getElementById('generateBill').addEventListener('click', () => {
    const totals = calculateTotals();
    const totalAmount = (totals.totalCosmeticPrice + totals.totalGroceryPrice + totals.totalColdDrinkPrice +
                         totals.cosmeticTax + totals.groceryTax + totals.coldDrinkTax).toFixed(2);

    const billContent = `
        <h3>Invoice</h3>
        <p>Cosmetic Price: $${totals.totalCosmeticPrice.toFixed(2)}</p>
        <p>Grocery Price: $${totals.totalGroceryPrice.toFixed(2)}</p>
        <p>Cold Drink Price: $${totals.totalColdDrinkPrice.toFixed(2)}</p>
        <p>Cosmetic Tax: $${totals.cosmeticTax.toFixed(2)}</p>
        <p>Grocery Tax: $${totals.groceryTax.toFixed(2)}</p>
        <p>Cold Drink Tax: $${totals.coldDrinkTax.toFixed(2)}</p>
        <p><strong>Total Amount: $${totalAmount}</strong></p>
    `;
    document.getElementById('billContent').innerHTML = billContent;
});

document.getElementById('total').addEventListener('click', calculateTotals);
document.getElementById('clear').addEventListener('click', () => {
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
    document.querySelectorAll('.totals input').forEach(input => input.value = '');
    document.getElementById('billContent').innerHTML = '';
});
