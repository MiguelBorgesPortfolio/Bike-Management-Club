"use strict";
const query = require("../scripts/query");

module.exports = async function readMemberEventType(request, response) {
    try {
        let rows;
        let id = Number(request.params.id);

        if(id) {
            rows = await query("SELECT `met_id`, `met_id_member`, `met_id_event_type` FROM `MemberEventType` WHERE `met_id` = ?", [id]);
        } else {
            rows = await query("SELECT `met_id`, `met_id_member`, `met_id_event_type` FROM `MemberEventType`");
        }
        response.json({rows});
    } catch (error) { 
        query.sendError(error, response);
    }
}