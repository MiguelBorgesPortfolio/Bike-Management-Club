"use strict";
const query = require("../scripts/query");

module.exports = async function readMemberEvent(request, response) {
    try {
        let rows;
        let id = Number(request.params.id);

        if(id) {
            rows = await query("SELECT `me_id`, `me_id_member`, `me_id_event` FROM `MemberEvent` WHERE `me_id` = ?", [id]);
        } else {
            rows = await query("SELECT `me_id`, `me_id_member`, `me_id_event` FROM `MemberEvent`");
        }
        response.json({rows});
    } catch (error) {
        query.sendError(error, response);
    }
}