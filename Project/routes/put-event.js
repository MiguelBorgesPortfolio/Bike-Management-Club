"use strict"
const query = require("../scripts/query");

module.exports = async function updateEvent(request, response) {
    try {
        let id = Number(request.params.id);
        let id_type = Number(request.body.id_type);
        let description = request.body.description;
        let date = new Date(request.body.date); // Use `new Date()` to create a Date object

        if(id) {
            await query("UPDATE `Event` SET `e_id_type` = ?, `e_description` = ?, `e_date` = ? WHERE `e_id` = ?", [id_type, description, date, id]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}
