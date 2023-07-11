const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) +10
        const camp = new Campground({
            author:'622270ead35a801ee282aea8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            description: "Hello Buddy , this is project",
            price:price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dt33chdxn/image/upload/v1647167520/YelpCamp/w0rmujpmzkdgnkb2uthb.jpg',
                  filename: 'YelpCamp/w0rmujpmzkdgnkb2uthb',      
                 
                },
                {
                  url: 'https://res.cloudinary.com/dt33chdxn/image/upload/v1647167519/YelpCamp/thai1ekgxbpohpm3weru.jpg',
                  filename: 'YelpCamp/thai1ekgxbpohpm3weru',      
              
                }
              ]
         })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
}) 