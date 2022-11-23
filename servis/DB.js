const mongoose = require('mongoose');
const Meetyou = require('./models/meetyous');
const User = require('./models/users');
const Post = require('./models/posts');
const Thread = require('./models/threads');
const Category = require('./models/categori')

const data = require('./data.js');
const config = require('./config/dev');

class DB {
  constructor() {
    this.meetyous = data.meetyous;
    this.users = data.users;
    this.threads = data.threads;
    this.posts = data.posts;
    this.categori = data.categori;
    this.models = [Meetyou, User, Post, Thread, Category];
  }

  async cleanDb() {
     for ( let model of this.models ) {
      await model.deleteMany({}, () => {})
      console.log(`Data ${model.collection.collectionName} Deleted!`)
    }
  }

  async pushDataToDb() {
    await this.categori.forEach(async (category) => {
       const newCategory = new Category(category);
       await newCategory.save(() => {});
    })

    await this.users.forEach(async user => {
      await (new User(user)).save(() => {})
    })

    await this.meetyous.forEach(async meetyou => {
      await (new Meetyou(meetyou)).save(() => {})
    })

    await this.threads.forEach(async thread => {
      await (new Thread(thread)).save(() => {})
    })

    await this.posts.forEach(async post => {
      await (new Post(post)).save(() => {})
    })

    console.log('Database Populated!');
  }

  async seedDb() {
    await this.cleanDb();
    await this.pushDataToDb();
  }
}

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(async () => {
    const db = new DB();
    await db.seedDb();
    console.log('You can close connection now!')
  })
  .catch(err => console.log(err));