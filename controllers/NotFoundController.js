exports.dashboard = (req, res) => {
    res.redirect('/api/dashboard');
}

exports.categories = (req, res) => {
    res.redirect('/api/dashboard/categories');
}

exports.posts = (req, res) => {
    res.redirect('/api/dashboard/posts');
}

exports.api = (req, res) => {
    res.redirect('/api');
}

exports.notFound = (req, res) => {
    res.render('user/notFound/notFound');
}