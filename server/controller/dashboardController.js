const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');

const activePage = '/';

exports.viewDashboard = async (req, res) => {
    res.render('pages/dashboard/dashboard', {activePage});
}