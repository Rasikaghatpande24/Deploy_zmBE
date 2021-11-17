const Admin = require('../Models/Admin');

exports.getAdmindata = (req, res, next) => {
    Admin.save.then(result => {
        res.status(200).json({ message: "Admin Restaurant Data fetched sucessfully ", Admin: result })
    })
}