"use strict";

const chuckQuotesForm = document.querySelector("#chuckQuotesForm");

chuckQuotesForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const categoryValue = chuckQuotesForm.querySelector('select').value;
    updateChuckSays(categoryValue);
});
// Create a function to update the quote text in the DOM
function updateChuckSays(category) {
    const chuckSays = document.getElementById('chuckSays');

    get(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then(function(response) {
        chuckSays.innerHTML = response.value;
    }
    );
}

function getCategories() {
    const selectWrapper = document.querySelector('#selectWrapper');
    const categoryList = document.createElement('select');
    get(`https://api.chucknorris.io/jokes/categories`).then(function(response) {
        response.forEach(function(category) {
            const categoryOption = document.createElement('option');
            categoryOption.text = category;
            categoryOption.value = category;
            categoryList.append(categoryOption);
        });
    });
    selectWrapper.append(categoryList);
}
// create an immediately invoked function expression,an iife. iife is an anonymous function, not named
(function() {  // this is an iife
    const defaultCategory = 'dev';
    getCategories();
    updateChuckSays(defaultCategory);
})();

