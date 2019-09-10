const db = require('./dbConfig.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(id) {
    return db('steps')
        .innerJoin("schemes", "steps.scheme_id", "=", "schemes.id")
        .select(
            "steps.id",
            "schemes.scheme_name",
            "steps.step_number",
            "steps.instructions"
        )
        .where({ scheme_id: id });
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(ids => {
            return findById(ids[0]);
        });
}

function update(id, changes) {
    return db('schemes')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('caschemesrs')
        .where('id', id)
        .del();
}
