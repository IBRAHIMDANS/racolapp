const faker = require("faker/locale/fr");
// import Events from "./Events";
faker.locale = "fr";
var randomName = faker.address.latitude((min = 0), (max = 200));
var randomEmail = faker.address.longitude();
var randomCard = faker.helpers.createCard();
console.log(randomName, randomEmail);

// for (let i=0 , i<=100 , i++){
//     Events.create(
// 				{
// 					name: faker.name.firstName(),
// 					long: req.body.long,
// 					lat: req.body.lat,
// 					capacity: req.body.capacity,
// 					date: req.body.date,
// 					description: req.body.description,
// 					duration: req.body.description,
// 					counterViews: req.body.counterViews,
// 					Users_ID: req.body.Users_ID,
// 					TypeEvents_ID: req.body.TypeEvents_ID,
// 					created_at: createdAt
// 				},
// 				{ returning: true, plain: true }
// 			)
// 				.then(function(data) {
// 					console.log("success")
// 				})
// 				.catch(function(err) {
//                     console.log("error "+err.message)
//                 });
// }
