if (process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 'mongodb+srv://LeonardoZanotti:eshXT4WnIELNWUvs@cluster0.crw4y.mongodb.net/blogapp?retryWrites=true&w=majority'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}