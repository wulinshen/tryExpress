var mongoose =require('mongoose');
var Schema = mongoose.Schema;


var ItemsSchema = new Schema({
  itemName: String,
  category: String,
  description: String,
  itemImageUrl: String,
  isAdded: {type: Boolean, default: false},
  upload_Date: {type: Date, default: Date.now}
});


var MyOrdersSchema = new Schema({
  itemId: Number,
  itemName: String,
  description: String,
  itemImageUrl: String,
  order_Date: Date
});

var Friends_OrdersSchema = new Schema({
  itemId: Number,
  itemName: String,
  description: String,
  itemImageUrl: String,
  order_Date: Date
});


var UserSchema = new Schema({
  userName : String,
  profileUrl : String,
  stars: Number,
  items:[ItemsSchema],
  myOrders:[MyOrdersSchema],
  friends_Orders:[Friends_OrdersSchema]
}, { collection: 'User_models' });

var User = mongoose.model('User_Model', UserSchema);
var Items = mongoose.model('Items_Model', ItemsSchema);
var MyOrders = mongoose.model('MyOrders_Model', MyOrdersSchema);
var Friends_Orders = mongoose.model('Friends_Orders_Model', Friends_OrdersSchema);

module.exports = {User, Items, MyOrders, Friends_Orders};
