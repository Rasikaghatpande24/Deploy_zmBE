const express = require('express');

// importing all the controllers to handle requests 
var cityController = require('../Controllers/City');
var mealTypeController = require('../Controllers/MealType');
var restaurantController = require('../Controllers/Restaurant');
var userController = require('../Controllers/User');
var paymentGatewayController = require('../Controllers/PaymentGateway');
var AdminController = require('../Controllers/Admin');


// initializing and resigtering express routers 
const router = express.Router();

// registering all the routes - API endpoints 
router.get('/check', cityController.getCheckDone);
router.get('/cityList', cityController.getCityList);
router.get('/getRestaurantsbycity/:cityId', restaurantController.getRestaurantByCity);
router.get('/mealtype', mealTypeController.getMealType);
router.post('/restaurantfilter', restaurantController.filterSearch);
router.get('/getResById/:resId', restaurantController.getRestaurantById);
router.get('/getItemsbyrestaurant/:resId', restaurantController.getItemsByRestaurant);
router.post('/signup', userController.signUp);
router.get('/login', userController.login);
router.post('/payment', paymentGatewayController.payment);
router.post('/callback', paymentGatewayController.callback);
router.post('/admin', AdminController.getAdmindata);
router.get('/adminrest', restaurantController.getRestaurant);
router.get('/adminrestput', restaurantController.putRestaurant);
//router.post('/submitmodal', restaurantController.submitrest);

router.post('/addcityList', cityController.addCityList);
router.post('/addmealtype', mealTypeController.addMealType);
router.post('/addRestaurantList', restaurantController.addRestaurantList);
router.post('/addRestaurantadminlist', restaurantController.addRestaurantadminlist)

module.exports = router;