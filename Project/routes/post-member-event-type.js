"use strict"
const query = require("../scripts/query");

module.exports = async function createMemberEventType(request, response) {
    try {
        let id_member = Number(request.body.id_member);
        let id_event_type = Number(request.body.id_event_type);

        if(id_member && id_event_type) {
            await query("INSERT INTO `MemberEventType` (met_id_member, met_id_event_type) VALUES (?, ?)", [id_member, id_event_type]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}