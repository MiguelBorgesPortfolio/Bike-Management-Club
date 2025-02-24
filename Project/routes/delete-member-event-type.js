"use strict"
const query = require("../scripts/query");

module.exports = async function deleteMemberEventType(request, response) {
    try {
        let id = Number(request.params.id);

        if(id) {
            let rows = await query("SELECT `met_id`, `met_id_member`, `met_id_event_type` FROM `MemberEventType` WHERE `met_id` = ?", [id]);
            await query("DELETE FROM `MemberEventType` WHERE `met_id` = ?", [id]);
            response.json({rows});
        }else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}