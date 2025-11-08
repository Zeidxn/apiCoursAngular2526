let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
async function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();

    Assignment.aggregatePaginate(
        aggregateQuery,
        { 
            page: req.query.page || 1,
            limit: req.query.limit || 10 
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        }
    );
}

// Récupérer un assignment par son id (GET)
async function getAssignment(req, res){
    try {
        let assignmentId = req.params.id;
        const assignment = await Assignment.findOne({id: assignmentId});
        res.json(assignment);
    } catch(err) {
        res.send(err);
    }
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    try {
        await assignment.save();
        res.json({ message: `${assignment.nom} saved!`});
    } catch(err) {
        res.send('cant post assignment ', err);
    }
}

// Update d'un assignment (PUT)
async function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true});
        res.json({message: 'updated'});
        // console.log('updated ', assignment)
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

// suppression d'un assignment (DELETE)
async function deleteAssignment(req, res) {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        res.json({message: `${assignment.nom} deleted`});
    } catch(err) {
        res.send(err);
    }
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
