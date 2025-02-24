"use strict"
const query = require("../scripts/query");

module.exports = async function updateMemberEvent(request, response) {
    try {
            let id = Number(request.params.id);
            let id_member = request.body.member;
            let id_event = request.body.event;
    
            if(id) {
                await query("UPDATE `MemberEvent` SET `me_id_member` = ?, `me_id_event` = ? WHERE `me_id` = ?", [id_member, id_event, id]);
                response.json({});
            } else {
                query.sendError("Invalid ID", response);
            }
        } catch (error) {
            query.sendError(error, response);
        }
}