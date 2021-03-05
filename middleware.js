const { stockSchema } = require('./schemas.js');//requiring at the top
const ExpressError = require('./utils/ExpressError');


module.exports.validateStock = (req, res, next) => {//This is a middleware function that helps us catch validation
    //errors, (this won't catch async errors, that is for the next middleware), and if there are
    //no validation errors, it calls next() and passes it on, likely to an async function wrapped with a catchAsync() that will handle
    //the async errors.

    const { error } = stockSchema.validate(req.body);//We extract {error} from
    //the campgroundSchema Joi schema's .validate() function to validate that the info passed in fits our schema.

    if (error) {//If there is validation error, we DON'T call next() but instead, straight away throw our validation error
        //for our error handler at the end of the Index.js file to deal with.
        const msg = error.details.map(el => el.message).join(',') /*we extract the message for all of the error details
        and join then via ','*/

        throw new ExpressError(msg, 400)//This is AppError we learnt in the lecure, he just named it a different name. It
        //is required at the top, from utils/ExpressError.js
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}