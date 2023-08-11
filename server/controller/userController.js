const mongoose =require('mongoose');
const User = require('../../models/user');
const catchAsync = require('../../utils/catchAsync');

mongoose.connect('mongodb://127.0.0.1:27017/hrms')
.then(()=>{
    console.log('Connection Open.');
})
.catch((err)=>{
    console.log(`Error: ${err}`);
})

const activePage = '/users';
const roles =  ['admin', 'manager', 'staff'];

exports.viewAllUsers = catchAsync(async (req,res)=>{
  const users = await User.find({})
  res.render('pages/user/users',{users, activePage});
})

exports.userForm = async (req,res)=>{
    res.render('user/addUserForm', {activePage, accountType});
}

exports.addUser = catchAsync(async (req,res)=>{
    const newUser = new User(req.body.user)
    await newUser.save()
    res.redirect('/users');
})

exports.viewUser = async(req,res)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).render('user/user-info',{user, activePage});
}

exports.editUserForm = async (req,res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).render('user/edit',{user, accountType, activePage});
}

exports.editUser = async (req,res)=>{
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate(userId, {...req.body.user});
  res.redirect(`/users/${userId}`);
}

exports.deleteUser = async(req,res) =>{
  const {id} = req.params;
  await User.findByIdAndDelete(id);
  res.redirect('/users');
}

exports.viewLogin = async (req, res) => {
  res.render('pages/login/login', {activePage})
}

exports.userLogin = async (req, res) => {
  req.flash('success', 'Welcome back!');
  res.redirect('/');
}

exports.logout = (req,res,next) =>{
  req.logout(function(err){
          if(err){
              return next(err);
          }

          req.flash('success','You are now logged out')
          res.redirect('/login')
  })
}

