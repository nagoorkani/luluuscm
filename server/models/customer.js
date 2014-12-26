/**
 * Created by z062281 on 6/17/14.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var CustomerSchema = new Schema({
    customerId: { type: Number, required: true, unique: true },
    name:       { type: String, required: true, trim: true },
    business:   { type: String, required: true, trim: true },
    email:      { type: String, required: true, trim: true },
    address:    { type: String, required: true, trim: true },
    city:       { type: String, required: true, trim: true },
    zip:        { type: Number, required: true },
    state:      { type: String, required: true, trim: true }
});

CustomerSchema.plugin(autoIncrement.plugin, {model: 'Customer', field: 'customerId', startAt: 1000, incrementBy: 1});
module.exports = mongoose.model('Customer', CustomerSchema);

//var SettingsSchema = new Schema({
//    collectionName : {
//        type : String, required: true, trim: true, default: 'customers'
//    },
//    nextSeqNumber: {
//        type: Number, default: 1
//    }
//});
//
//// I make sure this is the last pre-save middleware (just in case)
//var Settings = mongoose.model('settings', SettingsSchema);
//
//CustomerSchema.pre('save', function(next) {
//    var doc = this;
//    // Calculate the next id on new Customers only.
//    if (this.isNew) {
//        Settings.findOneAndUpdate( {"collectionName": "customers"}, { $inc: { nextSeqNumber: 1 } }, function (err, settings) {
//            if (err) next(err);
//            doc.id = settings.nextSeqNumber - 1; // substract 1 because I need the 'current' sequence number, not the next
//            next();
//        });
//    } else {
//        next();
//    }
//});


//{
//    "firstName": "John",
//    "lastName": "Smith",
//    "age": 25,
//    "address":
//    {
//        "streetAddress": "21 2nd Street",
//        "city": "New York",
//        "state": "NY",
//        "postalCode": "10021"
//    },
//    "phoneNumber":
//    [
//        {
//            "type": "home",
//            "number": "212 555-1234"
//        },
//        {
//            "type": "fax",
//            "number": "646 555-4567"
//        }
//    ]
//}