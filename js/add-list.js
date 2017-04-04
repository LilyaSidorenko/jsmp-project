let foodList = []
const close = '&times;'

const iterableListFor = (list) => {
    let newFood = ''
    for (let [index, food] of list.entries()) {
        newFood += `<span>${food}<a href='#' onClick='removeFood(${index});'>${close}</a></span>`
    }
    document.getElementById('foods').innerHTML = newFood
}

const addToFood = (e) => {
    const addFood = document.getElementById('addFood').value
    foodList.push(addFood)
    iterableListFor(foodList)
}

const removeFood = (foodIndex) => {
    foodList.splice(foodIndex, 1)
    iterableListFor(foodList)
}