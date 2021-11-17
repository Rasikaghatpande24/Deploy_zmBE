const Restaurant = require('../Models/Restaurant'); // importing the Restaurant Model
const Item = require('../Models/Item');

// filter function to filter the data based on multiple params
exports.filterSearch = (req, res, next) => {
    const queryParams = req.body; // capturing all the params from request body

    const location_id = queryParams.location_id;
    const cuisine_id = queryParams.cuisine_id;
    const mealtype_id = queryParams.mealtype_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1; // 1 is default value for page
    const sort = queryParams.sort ? queryParams.sort : 1; // 1 means ascending order & -1 means descending order
    const perPageCount = queryParams.perPageCount ? queryParams.perPageCount : 5; // number of items per page 

    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount; // setting the values for start and end params for pagination
    end = Number(page * perPageCount);
    let payload = {};
    let aggregatePayload = {}; // Initializing the payload to request

    // Initializing the payload object for quering the DB
    if (mealtype_id) {
        payload = {
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && hcost && lcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (mealtype_id && location_id) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && cuisine_id) {
        payload = {
            mealtype_id: Number(mealtype_id),
            cuisine: { $in: cuisine_id }
        }
    }
    if (location_id && cuisine_id && mealtype_id) {
        payload = {
            location_id: Number(location_id),
            cuisine: { $in: cuisine_id },
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            cuisine: { $in: cuisine_id },
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (location_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    Restaurant.find(payload).sort({ min_price: sort }).then(result => {
        const count = Math.ceil(result.length / 5);
        const pageCountArr = [];
        const resultValues = result.slice(start, end); // to return paginated items
        for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
        }
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: resultValues, pageCount: pageCountArr, totalCount: result.length });
    }).catch(err => {
        res.status(500).json({ message: err })
    });
}

// getRestaurantByCity function to get restaurants by city name
exports.getRestaurantByCity = (req, res) => {
    const cityId = req.params.cityId;
    Restaurant.find({ location_id: cityId }).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurantList: result })
    }).catch(err => console.log(err));
}

// getItemsByRestaurant function to get Items by rest name
exports.getItemsByRestaurant = (req, res) => {
    const resId = req.params.resId;
    Item.find({ restaurantId: resId }).then(result => {
        res.status(200).json({ message: "Restaurant Items Fetched Sucessfully", itemsList: result })
    }).catch(err => console.log(err));
}

// getRestaurantById function to get restaurants by Id
exports.getRestaurantById = (req, res, next) => {
    const resId = req.params.resId;
    Restaurant.findById(resId).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: result })
    }).catch(err => console.log(err));
}

// addRestaurantList function to add restaurants to DB
exports.addRestaurantList = (req, res, next) => {
    const name = req.body.name;
    const address = req.body.address;
    const logo = req.body.logo;
    const Rest = new Restaurant({ name: name, address: address, logo: logo });
    Rest.save().then(result => {
        res.status(200).json({ message: "Restaurant Added Sucessfully", restaurant: result })
    }).catch(err => {
        console.log(err)
    })
}

exports.getRestaurant = (req, res, next) => {
    // const restId = req.params.restId;
    Restaurant.find().then(result => {
        res.status(200).json({ message: "restaurant for admin Fetched Sucessfully", restaurant: result })
    })
}

exports.putRestaurant = (req, res, next) => {
    //const restId = req.params.restId;
    Restaurant.find().then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", putrestaurant: result })
    }).catch(err => console.log(err));

}









// exports.putRestaurant = (req, res, next) => {
//     if (!req.body) {
//         return
//         res.status(400).send({
//             message: "Please fill the details"
//         });
//         Item.findByIdAndUpdate(req.params.resId, {
//                 name: req.body.name,
//                 city: req.body.city,
//                 locality: req.body.locality,
//                 mealtype_id: req.body.mealtype_id,
//                 location_id: req.body.location_id,
//                 city_id: req.body.city_id,
//                 min_price: req.body.min_price,
//                 contact_number: req.body.contact_number,
//                 aggregate_rating: req.body.aggregate_rating,
//                 rating_text: req.body.rating_text
//             }, { new: true })
//             .then(restaurant => {
//                 if (!Item) {
//                     return
//                     res.status(404).send({
//                         message: "restaurant not found" + req.params.resId
//                     });
//                 }
//                 res.send(restaurant);
//             }).catch(err => {
//                 if (err.kind === 'ObjectId') {
//                     return
//                     res.status(404).send({
//                         message: "restaurant not found" + req.params.resId
//                     });
//                 }
//                 return res.status(500).send({
//                     message: "Error updating details" + req.params.resId
//                 });
//             });

//     };
// }

exports.addRestaurantadminlist = (req, res, next) => {
    const name = req.body.name;
    const city = req.body.city;
    const locality = req.body.locality;
    const min_price = req.body.min_price;
    const aggregate_rating = req.body.aggregate_rating;
    const rating_text = req.body.rating_text;
    const contact_number = req.body.contact_number;
    const city_id = req.body.city_id;
    const location_id = req.body.location_id;

    const Restadd = new Restaurant({ name: name, city: city, locality: locality, min_price: min_price, aggregate_rating: aggregate_rating, rating_text: rating_text, contact_number: contact_number, city_id: city_id, location_id: location_id });
    Restadd.save().then(result => {
        res.status(200).json({ message: "Restaurant Added Sucessfully", restaurant: result })
    }).catch(err => {
        console.log(err)
    })
}