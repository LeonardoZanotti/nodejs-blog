module.exports = {
    isAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.admin) {
            return next();
        } else {
            req.flash('error_msg', 'You should be an admin to view this page!');
            res.redirect('/api/auth/login');
        }
    }
}