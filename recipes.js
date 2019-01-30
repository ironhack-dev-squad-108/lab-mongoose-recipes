const mongoose = require('mongoose');

const Schema   = mongoose.Schema;
const data = require('./data.js');

// Connection to the database
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

//Iteration 1
const recipesSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  indgrediens: {type: Array},
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
})

//Iteration 2
const Recipe = mongoose.model('Recipe', recipesSchema)


Recipe.deleteMany() // Drop everything
  .then(() => Recipe.insertMany(data)) // Iteration 3
  .then(recipes => {
    console.log("recipes added!")
    //Iteration 4
    return Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(recipe => {
    console.log("recipe updated!")
    return Recipe.deleteOne({title: "Carrot Cake"}) //Iteration 5 & 6
  })
  .then(info => {
    console.log("recipe deleted!", info);
  }) 
  .then(() => mongoose.disconnect())
  .catch(err => {console.log(err)})