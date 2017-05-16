const db = require('./server/db');
const Author = require('./server/db/models/author');
const Message = require('./server/db/models/message');
const Channel = require('./server/db/models/channel');

const channels = [
  { name: 'really_random' },
  { name: 'generally_speaking' },
  { name: 'dogs_of_fullstack' },
  { name: 'lunch_planning' }
];

const authors = [{
  name: 'Cody',
  image: '/images/cody.jpg'
}, {
  name: 'Ben',
  image: '/images/ben.jpg'
}, {
  name: 'Star',
  image: '/images/star.jpg'
}, {
  name: 'Batman',
  image: '/images/batman.jpg'
}, {
  name: 'Elliott',
  image: '/images/elliott.jpg'
}, {
  name: 'Fira',
  image: '/images/fira.jpg'
}, {
  name: 'Henry',
  image: '/images/henry.jpg'
}, {
  name: 'Marcy',
  image: '/images/marcy.jpg'
}, {
  name: 'Milton',
  image: '/images/milton.jpg'
}, {
  name: 'Murphy',
  image: '/images/murphy.jpg'
}, {
  name: 'Raffi',
  image: '/images/raffi.jpg'
}, {
  name: 'Tulsi',
  image: '/images/tulsi.jpg'
}];

const messages = [
  { authorId: 1, content: 'I like React!', channelId: 1 },
  { authorId: 2, content: 'I like Redux!', channelId: 1 },
  { authorId: 3, content: 'I like React-Redux!', channelId: 1 },
  { authorId: 4, content: 'I like writing web apps!', channelId: 2 },
  { authorId: 5, content: 'You should learn JavaScript!', channelId: 2 },
  { authorId: 6, content: 'JavaScript is pretty great!', channelId: 2 },
  { authorId: 7, content: 'Dogs are great!', channelId: 3 },
  { authorId: 8, content: 'Cats are also great!', channelId: 3 },
  { authorId: 9, content: 'Why must we fight so?', channelId: 3 },
  { authorId: 10, content: 'I want to get tacos!', channelId: 4 },
  { authorId: 11, content: 'I want to get salad!', channelId: 4 },
  { authorId: 12, content: 'I want a taco salad!', channelId: 4 }
];

const seed = () =>
  Promise.all(authors.map(author =>
    Author.create(author))
  )
  .then(() =>
  Promise.all(channels.map(channel =>
    Channel.create(channel))
  ))
  .then(() =>
  Promise.all(messages.map(message =>
    Message.create(message))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
