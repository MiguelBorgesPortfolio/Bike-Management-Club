"use strict"
const query = require("../scripts/query");

module.exports = async function createEvent(request, response) {
    try {
        let id_type = Number(request.body.id_type);
        let description = request.body.description;
        let date = new Date(request.body.date);

        if (id_type && description && date) {
            await query("INSERT INTO `Event` (e_id_type, e_description, e_date) VALUES (?, ?, ?)", [id_type, description, date]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}