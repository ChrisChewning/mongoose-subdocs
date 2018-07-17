const mongoose = require('mongoose');

//connect to database
require('./db')


//you have 2 schemas. you want to be able to put one schema into the other.

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
});


const authorSchema = new mongoose.Schema({
  name: String,
  //this connects articleSchema into the article below.
  articles: [articleSchema]
})


//instatiate our models.
const Article = mongoose.model('Article', articleSchema);
const Author = mongoose.model('Author', authorSchema);


//we can instatiate an author or article to create a document.
// old way: Author.create({name: 'Billy'})
// new way: const billy = new Author({name: 'Billy'});

const billy = new Author({name: 'Billy'});
const article1 = new Article({title: 'Hey Everybody', author: billy.name})
//^ mongodb automatically gave an id to this.

//Billy is an object with the schema properties. We just access those properties and push the other object into it.
billy.articles.push(article1);

//save both
billy.save();
article1.save();
// console.log(billy, ' this is billy');

//Use the subdocuments.

//Update properties
billy.articles.id(article1.id).title = 'Some New Title';
billy.save(); // Will update the subdocument, but NOT the original. Note: the original is article1.


// LOG IT
// console.log(billy.articles.id(article1.id), ' this is subdocuments'); //this should be updated.
// console.log(article1, ' this should not be updated'); //this is the original.

//DELETE PROPERITES FROM A SCHEMA 

//go into the articles array. get the id method of one fo the articles in the array. this would evaluate like {_id: 109302942, name: 'blah' etc.}. Then you remove it. Or you do like .title = 'some new title'
billy.articles.id(article1.id).remove();
billy.save(); //this will now remove the subdocument but not the original.
console.log(billy, ' this is billy') //articles [] is now empty.

// Create articles on the fly

//subdocs are docs that are inside other docs.

const subdocArticle = billy.articles.create({title: 'On the fly', author: billy.name})

billy.articles.push(subdocArticle);

//save puts data into mongodb
billy.save(); //saving an article to its subdocs, but not to the original article collection.

//create the article in the articles collection.
Article.create(subdocArticle);

//if you modify a regular article in the collection it'll only modify the article in the collection.
//if you modify an article in the subdoc it'll only modify the article in the subdoc.

console.log(billy, ' this is billy');

Article.find({} , (err, articles) => {
  console.log(articles, ' this is articles');
});
