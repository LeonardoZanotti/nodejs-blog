exports.adminHome = (req, res) => {
    res.render('dashboard/index');
}

exports.userHome = (req, res) => {
    res.redirect('/api/posts');
}