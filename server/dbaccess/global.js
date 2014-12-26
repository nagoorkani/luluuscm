/**
 * Created by z062281 on 6/17/14.
 */

var customersList =  [{"name": "Nagoor"}];

exports.customers = function(req, res) {
    res.send(customersList);
}