"use strict"
const query = require("../scripts/query");

module.exports = async function createMemberEvent(request, response) {
    try {
        let id_member = Number(request.body.member);
        let id_event = Number(request.body.event);
        
        if(id_member && id_event) {
            await query("INSERT INTO `MemberEvent` (me_id_member, me_id_event) VALUES (?, ?)", [id_member, id_event]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }    
}