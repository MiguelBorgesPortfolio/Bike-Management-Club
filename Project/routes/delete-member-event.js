"use strict"
const query = require("../scripts/query");

module.exports = async function deleteMemberEvent(request, response) {
    try {
        let id = Number(request.params.id);

        if(id) {
            let rows = await query("SELECT `me_id`, `me_id_member`, `me_id_event` FROM `MemberEvent` WHERE `me_id` = ?", [id]);
            await query("DELETE FROM `MemberEvent` WHERE `me_id` = ?", [id]);
            response.json({rows});
        }else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}