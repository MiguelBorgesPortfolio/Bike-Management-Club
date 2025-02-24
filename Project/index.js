"use strict";
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");

const getEventType = require("./routes/get-event-type");
const deleteEventType = require("./routes/delete-event-type");
const updateEventType = require("./routes/put-event-type");
const createEventType = require("./routes/post-event-type");

const getEvent = require("./routes/get-event");
const deleteEvent = require("./routes/delete-event");
const updateEvent = require("./routes/put-event");
const createEvent = require("./routes/post-event");

const getMember = require("./routes/get-member");
const deleteMember = require("./routes/delete-member");
const updateMember = require("./routes/put-member");
const createMember = require("./routes/post-member");

const getMemberEventType = require("./routes/get-member-event-type");
const deleteMemberEventType = require("./routes/delete-member-event-type");
const updateMemberEventType = require("./routes/put-member-event-type");
const createMemberEventType = require("./routes/post-member-event-type");

const getMemberEvent = require("./routes/get-member-event");
const deleteMemberEvent = require("./routes/delete-member-event");
const updateMemberEvent = require("./routes/put-member-event");
const createMemberEvent = require("./routes/post-member-event");


const app = express();

app.use(express.static("www", { "index": "index.html" }));
app.use(express.json());


app.get("/event-types/:id?", getEventType);
app.delete("/event-types/:id", deleteEventType);
app.put("/event-types/:id", updateEventType);
app.post("/event-types/", createEventType);

app.get("/event/:id?", getEvent);
app.delete("/event/:id", deleteEvent);
app.put("/event/:id", updateEvent);
app.post("/event/", createEvent);

app.get("/member/:id?", getMember);
app.delete("/member/:id", deleteMember);
app.put("/member/:id", updateMember);
app.post("/member/", createMember);

app.get("/member-event-type/:id?", getMemberEventType);
app.delete("/member-event-type/:id", deleteMemberEventType);
app.put("/member-event-type/:id", updateMemberEventType);
app.post("/member-event-type/", createMemberEventType);

app.get("/member-event/:id?", getMemberEvent);
app.delete("/member-event/:id", deleteMemberEvent);
app.put("/member-event/:id", updateMemberEvent);
app.post("/member-event/", createMemberEvent);



app.listen(5502, function () {
    console.log("Server running at http://localhost:5502");
});