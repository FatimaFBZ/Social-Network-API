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
  
  const thought = await Thought.collection.insertOne(
   
    {
        thoughtText: 'I want to swim with the dolphins',
        createdAt: Date.now,
        username: "Yasmin",
        reactions:[]
    });
 

//users
const user = await User.collection.insertOne(
  
  {
    username: 'Yasmin',
    email: 'yasmin@hotmail.com',
    thoughts:[],
    friends:[]

  })

 

 
  

  // Log out the seed data to indicate what should appear in the database
  console.table(thought._id);
  console.table(user);
  console.log('seeded')
  process.exit(0);

})