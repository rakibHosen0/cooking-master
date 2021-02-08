    const searchInput = document.getElementById('input');
    const searchBtn = document.getElementById('button-addon2');
    let mealList = document.getElementById('meals-items');
    searchBtn.addEventListener('click', getMeals);
        //get meals  list
        function getMeals() {
        //get input text
        let inputText = searchInput.value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
            
            .then(res => res.json())
            .then(data => {
                //Hide recipe Details from page
                document.getElementById('recipe-details').innerHTML = "";
                let addMainHtml = "";
                if (data.meals) {
                    data.meals.forEach(meals => {
                        //create a card for all meals
                        addMainHtml += `
                                    <div onclick="getMealRecipe(${meals.idMeal})" id="meals-card" class="card custom-radius" style="width: 15rem;">
                                       <img src="${meals.strMealThumb}" class="card-img-top img-custom-radius" alt="${meals.strMeal}">
                                        <div class="card-body">
                                            <h5 class="card-title text-center">${meals.strMeal}</h5>
                                        </div>   
                                    </div>
                                `;
                        document.getElementById('notFound').innerText = "Your search Result :";
                        
                    });
                } else {
                    document.getElementById('notFound').innerText = "Your search "+inputText+" did not match any meals."
                }
                mealList.innerHTML = addMainHtml;
            
            });   
    }


function getMealRecipe(event) {
    const mealId = event;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => mealRecipeModel(data.meals));
}

//create recipe List
function mealRecipeModel(meal) {
    meal = meal[0];
    document.getElementById('recipe-details').innerHTML = "";
    const recipeDetails = document.getElementById('recipe-details');
    const recipeDiv = document.createElement('div');
    let recipeModel = `
    <div class="card" style="width: 25rem;">
    <img src="${meal.strMealThumb}" class="card-img-top recipe-img" alt="${meal.strMeal}">
    <div class="card-body">
        <h3 class="card-title">${meal.strMeal}</h3>
        <h5>Ingredients</h5>
        <p class="ingredient"><i class="fas fa-check-square"></i>${meal.strIngredient1}</p>
        <p class="ingredient"><i class="fas fa-check-square"></i>${meal.strIngredient2}</p>
        <p class="ingredient"><i class="fas fa-check-square"></i>${meal.strIngredient3}</p>
        <p class="ingredient"><i class="fas fa-check-square"></i>${meal.strIngredient4}</p>
        <p class="ingredient"><i class="fas fa-check-square"></i>${meal.strIngredient5}</p>
        <p class="ingredient"><i class="fas fa-check-square"></i>${meal.strIngredient6}</p>
        </div>
</div> 
    `;
    recipeDiv.innerHTML = recipeModel;
    recipeDetails.appendChild(recipeDiv);   
}