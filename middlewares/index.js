exports.userAuth = (req, res, next) => {
    console.log('userAuth middleware')
    next()
}

exports.userSecondAuth = (req, res, next) => {
    console.log('userSecondAuth middleware')
    next()
}