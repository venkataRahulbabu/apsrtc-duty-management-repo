const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");


const app = express();

// Exported Models from models folder...
const UserModel = require("./models/User");
const DutyModel = require("./models/duty");
const LeaveModel = require("./models/Leave");
const previousDutyModel = require("./models/previousDuty");
const loginHistory = require("./models/loginHistory");


// Middlewares//
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// const mongoURI = 'mongodb://localhost:27017/userDB';
const mongoURI = 'mongodb://127.0.0.1:27017/userDB';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((res) => {
        console.log("MongoDB Connected");
    });

//  Creating session store...
const store = new MongoDBSession({
    uri: mongoURI,
    collection: "mySessions",
});

// Session middleware setup
app.use(
    session({
        secret: 'key that will assign cookie',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 2 * 24 * 60 * 60 * 1000,
            // maxAge: 60 * 1000
        },
        store: store
    })
);
// Session middleware...
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("/");
    }
};

// Retrieving the user details to show the details wherever there is need....
var userDetails;
var randomDutyDetails;
var dutyDetails;

// for storing session variables data....
var userPassingData = {};
var dutyDetailsData = {};
var previousDutyData;

var getPreviousDuty;

function todayDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isDateBeforeToday(dateString) {
    const currentDate = new Date();
    const givenDate = new Date(dateString);
    return givenDate < currentDate;
}

// Email Transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    // service: 'gmail',
    auth: {
        user: 'projectmailid7@gmail.com',
        pass: 'fpef gytz nvhe inei',
    },
});

function generateOTP() {
    const otpLength = 6;
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

async function sendOTP(email, otp) {
    try {
        const mailOptions = {
            from: 'projectmailid7@gmail.com',
            to: email,
            subject: 'Forgot Password OTP',
            text: 'Your OTP for password reset is: ' + otp,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function sendLeaveMail(email, fromDate, toDate) {
    try {
        const mailOptions = {
            from: 'projectmailid7@gmail.com',
            to: email,
            subject: 'Leave Request',
            text: 'Your request for leave dated from ' + fromDate + ' to ' + toDate + ' has accepted. Further Details will be communicated later.\n \n Thanks and Regards...',
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

function randomDuty(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// GET Request Routes here...

/* Admin related routes */
app.get("/", function (req, res) {
    return res.render("home", { boolFlag: true, userFlag: false, passwordFlag: false });
});

app.get("/signup", function (req, res) {
    return res.render("signup", { isExist: false });
});

app.post("/signup", async function (req, res) {
    const { username, id, email, category, district, depo, phone, password } = req.body;
    const lowerCaseId = id.toLowerCase();
    const findById = await UserModel.findOne({ id: lowerCaseId });
    const findByEmail = await UserModel.findOne({ email });
    if ((findByEmail || findById) || (findByEmail && findById)) {
        return res.render("signup", { isExist: true });
    }
    const hashPass = await bcrypt.hash(password, 12);
    user = new UserModel({
        username,
        id: lowerCaseId,
        email,
        category,
        district,
        depo,
        phone,
        password: hashPass,
        createddate: todayDate()
    });
    if (user.category === "admin") {
        await user.save();
        req.session.isAuth = true;
        req.session.userData = user;
        return res.redirect(`/admin/${user.username}/dashboard`);
    }
    await user.save();
    userDetails = user;
    req.session.userData = userDetails;
    req.session.dutyData = {
        dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
        starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
    };
    req.session.previousDuty = {
        dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
        starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
    };
    req.session.isAuth = true;
    return res.redirect(`/${userDetails.username}/index`);
});

app.post("/login", async function (req, res) {
    const { id, password } = req.body;
    const lowerCaseId = id.toLowerCase();
    const finduser = await UserModel.findOne({ id: lowerCaseId });
    if (!finduser) {
        return res.render("home", { userFlag: true, boolFlag: true, passwordFlag: false });
    }
    const isMatch = await bcrypt.compare(password, finduser.password);
    if (!isMatch) {
        return res.render("home", { passwordFlag: true, boolFlag: true, userFlag: false });
    }
    if (finduser.category === "admin" && isMatch) {
        req.session.isAuth = true;
        req.session.userData = finduser;
        return res.redirect(`/admin/${finduser.username}/dashboard`);
    }
    if (finduser.createddate === todayDate()) {
        userDetails = finduser;
        req.session.userData = userDetails;
        req.session.dutyData = {
            dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
            starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
        };
        req.session.previousDuty = req.session.dutyData;
        req.session.isAuth = true;
        return res.redirect(`/${userDetails.username}/index`);
    }
    dutyDetails = await DutyModel.find({ district: finduser.district, depo: finduser.depo });

    if (finduser.createddate !== todayDate()) {
        const now = Date.now();
        userDetails = finduser;
        const findTimeStamp = await loginHistory.findOne({ id: userDetails.id });
        var findPreviousDuty = await previousDutyModel.findOne({ id: userDetails.id });
        const findLeavedUser = await LeaveModel.findOne({ id: userDetails.id });
        // No timestamp and No previous duty before..
        if (!findTimeStamp && !findPreviousDuty) {
            // Applied for leave, not done any duty yet...
            if (findLeavedUser && (findLeavedUser.from === todayDate() || findLeavedUser.to === todayDate())) {
                console.log("User is in Leave");
                req.session.userData = userDetails;
                req.session.dutyData = {
                    dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
                    starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
                };
                logHistory = new loginHistory({
                    id: userDetails.id,
                    timestamp: now,
                    data: {
                        district: "Not Available",
                        depo: "Not Available",
                        dutyname: "Not Available",
                        startdate: "Not Available",
                        enddate: "Not Availale",
                        starttime: "Not Available",
                        endtime: "Not Available",
                        bustype: "Not Available"
                    }
                });
                await logHistory.save();
                req.session.previousDuty = req.session.dutyData;
                req.session.isAuth = true;
                return res.redirect(`/${userDetails.username}/index`)

                // No timestamps in the database, no leaves in the database...
            } else {
                console.log("This is first timestamp saved case...");
                randomDutyDetails = randomDuty(dutyDetails);
                logHistory = new loginHistory({
                    id: userDetails.id,
                    timestamp: now,
                    data: randomDutyDetails
                });
                await logHistory.save();
                await DutyModel.deleteOne({ dutyname: randomDutyDetails.dutyname });
                req.session.loginTimestamp = now;
                req.session.userData = userDetails;
                req.session.dutyData = randomDutyDetails;
                req.session.previousDuty = {
                    dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
                    starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
                };
                req.session.isAuth = true;
                return res.redirect(`/${userDetails.username}/index`);
            }
        }

        // If within the 2-day window, display the data
        if (now - findTimeStamp.timestamp <= 2 * 24 * 60 * 60 * 1000 && findTimeStamp) {
            req.session.userData = userDetails;
            const alreadyData = await loginHistory.findOne({ id: userDetails.id });
            const prevDuty = await previousDutyModel.findOne({ id: userDetails.id });
            if (!prevDuty) {
                req.session.previousDuty = {
                    dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
                    starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
                };
            } else {
                req.session.previousDuty = {
                    dutyname: prevDuty.dutyname, startdate: prevDuty.startdate, enddate: prevDuty.enddate,
                    starttime: prevDuty.starttime, endtime: prevDuty.endtime, bustype: prevDuty.bustype
                };
            }
            req.session.dutyData = alreadyData;
            req.session.isAuth = true;
            return res.redirect(`/${userDetails.username}/index`);

            // If more than 2 days have passed, reset the login timestamp
        } else {
            const findLeavedUser = await LeaveModel.findOne({ id: userDetails.id });
            if (findLeavedUser && (findLeavedUser.from === todayDate() || findLeavedUser.to === todayDate())) {
                const getOldDuty = await loginHistory.findOne({ id: userDetails.id });
                if (getOldDuty) {
                    await loginHistory.updateOne({ id: userDetails.id }, { $set: { data: { district: "Not Available", depo: "Not Available", dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale", starttime: "Not Available", endtime: "Not Available", bustype: "Not Available" } } });
                    await previousDutyModel.updateOne({ id: userDetails.id }, { $set: { timestamp: now, depo: getOldDuty.data.depo, dutyname: getOldDuty.data.dutyname, startdate: getOldDuty.data.startdate, enddate: getOldDuty.data.enddate, starttime: getOldDuty.data.starttime, endtime: getOldDuty.data.endtime, bustype: getOldDuty.data.bustype } });
                }
                req.session.userData = userDetails;
                req.session.dutyData = {
                    dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
                    starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
                }
                req.session.isAuth = true;
                return res.redirect(`/${userDetails.username}/index`);
            }
            else {
                console.log("This is second timestamp saved case...");
                req.session.loginTimestamp = now;
                randomDutyDetails = randomDuty(dutyDetails);
                console.log(randomDutyDetails);
                await DutyModel.deleteOne({ dutyname: randomDutyDetails.dutyname });
                const getOldDuty = await loginHistory.findOne({ id: userDetails.id });
                const pastDuty = await previousDutyModel.findOne({ id: userDetails.id });
                getPreviousDuty = getOldDuty.data;
                if (!pastDuty) {
                    prevDuty = new previousDutyModel({
                        id: userDetails.id,
                        district: getPreviousDuty.district,
                        depo: getPreviousDuty.depo,
                        dutyname: getPreviousDuty.dutyname,
                        startdate: getPreviousDuty.startdate,
                        enddate: getPreviousDuty.enddate,
                        starttime: getPreviousDuty.starttime,
                        endtime: getPreviousDuty.endtime,
                        bustype: getPreviousDuty.bustype
                    });
                    await prevDuty.save();
                } else {
                    await previousDutyModel.updateOne({ id: userDetails.id }, { $set: { timestamp: now, depo: getPreviousDuty.depo, dutyname: getPreviousDuty.dutyname, startdate: getPreviousDuty.startdate, enddate: getPreviousDuty.enddate, starttime: getPreviousDuty.starttime, endtime: getPreviousDuty.endtime, bustype: getPreviousDuty.bustype } });
                    console.log("The previous duty model updated...");
                }
                await loginHistory.updateOne({ id: userDetails.id }, { $set: { timestamp: now, data: randomDutyDetails } });
                req.session.userData = userDetails;
                req.session.dutyData = randomDutyDetails;
                req.session.isAuth = true;
                return res.redirect(`/${userDetails.username}/index`);
            }
        }
    }
});

app.get("/admin/:username/dashboard", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const { username } = req.params;
    const targetRoles = ['conductor', 'driver'];
    const getUser = await UserModel.findOne({ username: username, id: userPassingData.id });
    const getUsers = await UserModel.find({ depo: getUser.depo, category: { $in: targetRoles } });
    return res.render("admin-dashboard", { userPassingData, getUsers });
});

app.get("/delete/:id", isAuth, async function (req, res) {
    const { id } = req.params;
    const currentUser = await UserModel.findOne({ id });
    await UserModel.deleteOne({ id });
    const getAdmin = await UserModel.findOne({ category: "admin", depo: currentUser.depo });
    return res.redirect(`/admin/${getAdmin.username}/dashboard`);
});

app.get("/:username/edit/:id", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const { username, id } = req.params;
    return res.redirect(`/admin/${username}/edit/${id}`);
});

app.get("/admin/:username/edit/:id", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const { id } = req.params;
    const currentUser = await UserModel.findOne({ id });
    console.log(currentUser);
    return res.render("editUser", { userPassingData, currentUser, isSaved: false, phone: false });
});

app.post("/admin/:username/edit/:id", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const { id } = req.params;
    const currentUser = await UserModel.findOne({ id });
    const findAdmin = await UserModel.findOne({ category: "admin", depo: currentUser.depo });
    const { username, email, phone } = req.body;
    if (phone.length == 10) {
        await UserModel.updateOne({ id }, { $set: { username, email, phone } });
        return res.redirect(`/admin/${findAdmin.username}/edit/${currentUser.id}`);
    }
    return res.render("editUser", { userPassingData, currentUser, isSaved: false, phone: true });
});

app.get("/admin/:username/add-duty", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    return res.render("addDuty", { userPassingData, alreadySaved: false, initialStatus: false, hasAccess: true });
});

app.post("/admin/:username/add-duty", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const username = req.params.username;
    const getUser = await UserModel.findOne({ username: username, id: userPassingData.id });
    console.log(getUser);
    const { district, depo, dutyname, startdate, enddate, starttime, endtime, bustype } = req.body;
    duty = new DutyModel({
        district, depo, dutyname, startdate, enddate, starttime, endtime, bustype
    });
    const dutySearch = await DutyModel.findOne({ depo: duty.depo, dutyname: duty.dutyname, startdate: duty.startdate, enddate: duty.enddate, starttime: duty.starttime, endtime: duty.endtime });
    if (!dutySearch && getUser.depo === duty.depo) {  /* no duty in duties table, same depo */
        await duty.save();
        return res.render("addDuty", { initialStatus: true, alreadySaved: false, hasAccess: true, userPassingData });
    } else if (!dutySearch && getUser.depo !== duty.depo) {  /* no duty in duties table, not the same depo */
        return res.render("addDuty", { initialStatus: false, alreadySaved: false, hasAccess: false, userPassingData });
    } else { /* duty in the table */
        return res.render("addDuty", { initialStatus: false, alreadySaved: true, hasAccess: true, userPassingData });
    }
});

app.get("/admin/:username/add-user", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    return res.render("addUser", { userPassingData, isSaved: false, isExist: false, hasAccess: true });
});

app.post("/admin/:username/add-user", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const name = req.params.username;
    const getAdmin = await UserModel.findOne({ username: name, id: userPassingData.id });
    const { username, id, email, phone, category, district, depo, password } = req.body;
    const hashPass = await bcrypt.hash(password, 12);
    const lowerCaseId = id.toLowerCase();
    user = new UserModel({
        username, id: lowerCaseId, email, phone, category, district, depo, password: hashPass, createddate: todayDate()
    });
    const findUser = await UserModel.findOne({ id: lowerCaseId });
    console.log(findUser);
    if (!findUser && user.depo === getAdmin.depo) {
        await user.save();
        return res.render("addUser", { isSaved: true, isExist: false, hasAccess: true, userPassingData });
    } else {
        return res.render("addUser", { isSaved: false, isExist: true, hasAccess: true, userPassingData });
    }
});

app.get("/admin/:username/dashboard/find-user", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const searchItem = req.query.search;
    const searchResults = await UserModel.find({
        $and: [
            {
                $or: [
                    { username: { $regex: searchItem, $options: 'i' } },
                    { id: { $regex: searchItem, $options: 'i' } },
                    { email: { $regex: searchItem, $options: 'i' } },
                    { category: { $regex: searchItem, $options: 'i' } },
                    { phone: { $regex: searchItem, $options: 'i' } }
                ]
            },
            { category: { $ne: "admin" } }
        ]
    });
    return res.render('searchResults', { userPassingData, results: searchResults, searchItem });
});

app.get("/admin/:username/settings", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    return res.render("adminSettings", { userPassingData, isMatching: true, newAndConfirm: true });
});

app.post("/admin/:username/settings", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const { currentpass } = req.body;
    const newpass = req.body.newpass;
    const confirmpass = req.body.confirmpass;
    if (newpass !== confirmpass) {
        return res.render("adminSettings", { newAndConfirm: false, isMatching: true, userPassingData });
    }
    const newPassword = await bcrypt.hash(confirmpass, 12);
    const isMatched = await bcrypt.compare(currentpass, userPassingData.password);
    const settingUser = await UserModel.findOne({ password: req.session.userData.password, id: userPassingData.id });
    if (!isMatched) {
        return res.render("adminSettings", { newAndConfirm: true, isMatching: false, userPassingData });
    }
    else {
        settingUser.password = newPassword;
        await settingUser.save();
        console.log("Password Saved...");
        return res.redirect(`/admin/${settingUser.username}/dashboard`);
    }
});

/* Normal user related routes... */

app.get("/forgot-password", function (req, res) {
    return res.render("forgotPassword");
});

app.get("/validate-otp", function (req, res) {
    return res.render("validateOTP", { ans: false });
});

app.get("/create-password", function (req, res) {
    return res.render("createPassword", { isSame: false });
});

app.get("/:username/index", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    return res.render("index", { userPassingData });
});

app.get("/:username/departments", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    return res.render("departments", { userPassingData });
});

app.get("/:username/settings", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    return res.render("settings", { userPassingData, isMatching: true, newAndConfirm: true });
});

app.get("/:username/leaveform", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    return res.render("leaveform", { userPassingData, value: true, isAppliedAlready: false });
});

// User logout route
app.post("/logout", isAuth, function (req, res) {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
});


app.get("/:username/dashboard", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const findingUser = await UserModel.findOne({ id: userPassingData.id, createddate: todayDate() });
    const searchUser = await LeaveModel.findOne({ id: userPassingData.id });
    const searchTimeStamp = await loginHistory.findOne({ id: userPassingData.id });
    // Created today
    if (findingUser) {
        dutyDetailsData = req.session.dutyData;
        previousDutyData = req.session.previousDuty;
        return res.render("dashboard", { userPassingData, dutyDetailsData, previousDutyData, signupToday: true, leave: false, leaveApplied: false });
    }
    /* created today and leave applied for tomorrow and day after tomorrow...
    if (findingUser && searchUser.from===tomorrowDate() && searchUser.to===dayAfterTomorrowDate()){
        console.log("This is created today and leave applied for tomorrow and next day...");
        dutyDetailsData = req.session.dutyData;
        previousDutyData=req.session.previousDuty;
        return res.render("dashboard", { userPassingData, dutyDetailsData, previousDutyData,signupToday: true, leave: false, leaveApplied: true });
    }
    */
    // Simulating the timestamp retrieved from the database as a string
    const timestampFromDatabase = searchTimeStamp.timestamp;
    const now = Date.now();
    const timeDifference = now - timestampFromDatabase;

    //  Not created today and not applied leave for tomorrow and day after tomorrow...
    if (!findingUser && (!searchUser || searchUser.from !== todayDate()) && timeDifference <= 2 * 24 * 60 * 60 * 1000) {
        console.log("This is first one...");
        dutyDetailsData = await loginHistory.findOne({ id: userPassingData.id });
        previousDutyData = await previousDutyModel.findOne({ id: userPassingData.id });
        if (!previousDutyData) {
            previousDutyData = {
                dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
                starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
            }
        }
        return res.render("dashboard", { userPassingData, dutyDetailsData, previousDutyData, signupToday: false, leave: false, leaveApplied: false });
    }
    // Not created today and not in leave today OR Not created today and leave.length=0
    else if ((!findingUser && searchUser.from !== todayDate() || !findingUser && searchUser.length === 0) && timeDifference <= 2 * 24 * 60 * 60 * 1000) {
        dutyDetailsData = await loginHistory.findOne({ id: userPassingData.id });
        console.log("This is second one...");
        previousDutyData = await previousDutyModel.findOne({ id: userPassingData.id });
        // console.log(dutyDetailsData);
        return res.render("dashboard", { userPassingData, dutyDetailsData, previousDutyData, signupToday: false, leave: false, leaveApplied: false });
    }

    else if (!findingUser && searchUser.from === todayDate() || (!findingUser && searchUser.to === todayDate())) {
        dutyDetailsData = {
            dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
            starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
        };
        previousDutyData = await previousDutyModel.findOne({ id: userPassingData.id });
        if (!previousDutyData) {
            previousDutyData = {
                dutyname: "Not Available", startdate: "Not Available", enddate: "Not Availale",
                starttime: "Not Available", endtime: "Not Available", bustype: "Not Available"
            };
        }
        return res.render("dashboard", { userPassingData, dutyDetailsData, previousDutyData, signupToday: false, leave: true, leaveApplied: false });
    }

});

app.post("/:username/leaveform", isAuth, async function (req, res) {
    userPassingData = req.session.userData;
    const { user } = req.params;
    const getUser = await UserModel.find({ username: user, id: userPassingData.id });
    const { username, id, email, problem, from, to } = req.body;
    const lowerCaseId = id.toLowerCase();
    const findUserId = UserModel.findOne({ id: lowerCaseId, email: email });
    const checkLeaveTable = await LeaveModel.findOne({ id: lowerCaseId, email: email });
    if (!findUserId) {
        console.log("This is the case...");
        return res.redirect(`/${getUser.username}/leaveform`);
    }
    leave = new LeaveModel({
        username,
        id: lowerCaseId,
        email,
        from,
        to,
        problem
    });
    const getDay = todayDate();
    if (getDay === leave.from) {
        return res.redirect(`/${findUserId.username}/leaveform`);
    }
    else {
        if (!checkLeaveTable) {
            console.log("Leave saved for first time...");
            await leave.save();
            const fromDate = leave.from;
            const toDate = leave.to;
            try {
                sendLeaveMail(email, fromDate, toDate);
            } catch (error) {
                console.error("Error sending email:", error);
                res.send("Error sending email. Please try again later...");
            }
            const user = await UserModel.findOne({ id: leave.id });
            return res.redirect(`/${user.username}/dashboard`);
        }
        if (checkLeaveTable && (checkLeaveTable.from === leave.from && checkLeaveTable.to === leave.to)) {
            console.log("Leave applied already for this date...");
            userPassingData = req.session.userData;
            dutyDetailsData = req.session.dutyData;
            return res.render("leaveForm", { userPassingData, dutyDetailsData, value: true, isAppliedAlready: true });
        } else {
            if (isDateBeforeToday(checkLeaveTable.from) && isDateBeforeToday(checkLeaveTable.to)) {
                await LeaveModel.updateOne({ id: id }, { $set: { from: leave.from, to: leave.to, problem: leave.problem } });
                console.log("Leave details updated...");
                const fromDate = leave.from;
                const toDate = leave.to;
                try {
                    sendLeaveMail(email, fromDate, toDate);
                } catch (error) {
                    console.error("Error sending email:", error);
                    res.send("Error sending email. Please try again later...");
                }
                return res.redirect(`/${findUserId.username}/dashboard`);
            }
        }
    }
});

let otpByFunc = "";
let emailGet = "";

app.post('/forgot-password', async function (req, res) {
    const { email } = req.body;
    const findMail = await UserModel.findOne({ email });
    if (!findMail) {
        return res.redirect("/forgot-password");
    }
    emailGet = findMail.email;
    otpByFunc = generateOTP();
    try {
        sendOTP(email, otpByFunc);
    } catch (error) {
        console.error('Error sending email:', error);
        res.send('Error sending email. Please try again later.');
    }
    return res.redirect('/validate-otp');
});

app.post("/validate-otp", async function (req, res) {
    const enteredOTP = req.body.otp;
    function validation(otpByFunc, otp) {
        if (otpByFunc === otp) {
            return res.redirect("/create-password");
        }
        return res.render("validateOTP", { ans: true });
    }
    validation(otpByFunc, enteredOTP);
});

app.post("/create-password", async function (req, res) {
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    const newuser = await UserModel.findOne({ email: emailGet });
    if (!newuser) {
        return res.render("createPassword");
    }
    if (password1 !== password2) {
        return res.render("createPassword", { isSame: true });
    }
    const newHashedPass = await bcrypt.hash(password1, 12);

    newuser.password = newHashedPass;
    await newuser.save();
    return res.redirect("/");

});

app.post("/:username/settings", isAuth, async function (req, res) {
    const { currentpass } = req.body;
    // const { name } = req.params;
    const newpass = req.body.newpass;
    const confirmpass = req.body.confirmpass;
    userPassingData = req.session.userData;
    if (newpass !== confirmpass) {
        return res.render("settings", { newAndConfirm: false, isMatching: true, userPassingData });
    }
    const newPassword = await bcrypt.hash(confirmpass, 12);
    const isMatched = await bcrypt.compare(currentpass, userPassingData.password);
    const settingUser = await UserModel.findOne({ password: req.session.userData.password });
    if (!isMatched) {
        return res.render("settings", { newAndConfirm: true, isMatching: false, userPassingData });
    }
    else {
        settingUser.password = newPassword;
        await settingUser.save();
        console.log("Password Saved...");
        return res.redirect(`/${settingUser.username}/dashboard`);
    }
});

app.listen(3000, function () {
    console.log("Server is listening on port 3000...");
});