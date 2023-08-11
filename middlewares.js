const {leaveSchemaValidation} = require('./schemas');

module.exports.isLoggedIn = (req, res, next) =>{
    req.session.returnTo = req.originalUrl;
    if(!req.isAuthenticated()) {
        req.flash('error','You must be logged in');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.leaveValidate = (req, res, next) => {
    const {error} = leaveSchemaValidation.validate(req.body);
    if(error){
       const msg = error.details.map(el=> el.message).join(',');
    //    throw new ExpressError(msg,400);
         req.flash('error', `${msg}`);

         res.redirect(`${req.originalUrl}/new-leave-request`);
    }else{
      next();
    }
}

// Authorization
module.exports.isAccessible = async (req, res, next) => {
    const {id} = req.params;
    const currentUserAccess = req.user;
    const accessibleBy = currentUserAccess.role === 'admin' || 'manager';
    if(currentUserAccess.role != accessibleBy) {
      req.flash('error', 'You do not have permission to perform this action!');
      res.redirect(`/employees/${id}`)
    } else {
      next();
    }
  }

  module.exports.isAccessibleByAdminOnly = async (req, res, next) => {
   
    const currentUserAccess = req.user;
    const accessibleBy = currentUserAccess.role === 'admin';
    if(currentUserAccess.role != accessibleBy) {
      req.flash('error', 'Admin actions only!');
      res.redirect(`/register`)
    } else {
      next();
    }
  }