"use strict"
const query = require("../scripts/query");

module.exports = async function updateMemberEventType(request, response) {
    try {
        let id = Number(request.params.id);
        let id_member = Number(request.body.id_member);
        let id_event_type = Number(request.body.id_event_type);

        if(id && id_member && id_event_type) {
            await query("UPDATE `MemberEventType` SET `met_id_member` = ?, `met_id_event_type` = ? WHERE `met_id` = ?", [id_member, id_event_type, id]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}