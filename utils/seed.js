const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  
  //add thought to the collection
  
  const thoughts = await Thought.collection.insertMany(
   [
    {
        thoughtText: 'I want to swim with the dolphins',
        username: 'Yasmin',
        createdAt: Date.now,
        reactions:[]
    },
    {
    
        thoughtText: 'I want to go to Hawaii',
        username: 'Naseema',
        createdAt: Date.now,
        reactions:[]
    }
  ]
);

//users
const users = await User.collection.insertMany(
  [
  {
    username: 'Yasmin',
    email: 'yasmin@hotmail.com',
    thoughts:[],
    friends:[]

  },
  {
    username: 'Naseema',
    email: 'Naseema@hotmail.com',
    thoughts:[],
    friends:[]
  }
  ]
)

 

 
  

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.table(users);
  process.exit(0);

})