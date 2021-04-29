const router = require("express").Router();
const viewTaskCtrl = require("../controller/viewTaskCtrl");
const viewAssingedTask = require("../controller/viewAssignedTask");
const deleteTaskCtrl = require("../controller/deleteTaskCtrl");
const editTaskCtrl = require("../controller/editTaskCtrl");
const getTaskByIdCtrl = require("../controller/getTaskByIdCtrl");
const addTaskCtrl = require("../controller/addTaskCtrl");
const viewMemberCtrl = require("../controller/viewMemberCtrl");
const deleteMemberCtrl = require("../controller/deleteMemberCtrl");
const editMemberCtrl = require("../controller/editMemberCtrl");
const getMemberByIdCtrl = require("../controller/getMemberByIdCtrl");
const addMemberCtrl = require("../controller/addMemberCtrl");
const auth = require("./auth");
const isLoggedin = require("../controller/isLoggedin");
const login = require("../controller/login");
const logout = require("../controller/logout");

const addTeam = require("../controller/addTeam");
const viewTeam = require("../controller/viewTeam");
const editOneTeam = require("../controller/editOneTeam");
const editTeam = require("../controller/editTeam");
const deleteTeam = require("../controller/deleteTeam");
const assignTask = require("../controller/assignTask");
const updateTaskStatus = require("../controller/updateTaskStatus");

router.post("/login", login);

router.get("/isloggedin", isLoggedin);

router.get("/logout", logout);

router.post("/addteam", auth, addTeam);
router.get("/viewteam", auth, viewTeam);
router.get("/editteam/:id", auth, editOneTeam);
router.put("/editteam/:id", auth, editTeam);
router.delete("/deleteteam/:id", auth, deleteTeam);

router.post("/addmember", auth, addMemberCtrl);
router.get("/editmember/:id", auth, getMemberByIdCtrl);
router.put("/editmember/:id", auth, editMemberCtrl);
router.delete("/deletemember/:id", auth, deleteMemberCtrl);
router.get("/viewmember", auth, viewMemberCtrl);
router.post("/addtask", auth, addTaskCtrl);
router.get("/edittask/:id", auth, getTaskByIdCtrl);
router.put("/edittask/:id", auth, editTaskCtrl);
router.put("/assigntask/:id", auth, assignTask);
router.put("/updatetaskstatus/:id", auth, updateTaskStatus);
router.delete("/deletetask/:id", auth, deleteTaskCtrl);
router.get("/viewtask", auth, viewTaskCtrl);
router.get("/viewassignedtask", auth, viewAssingedTask);
module.exports = router;
