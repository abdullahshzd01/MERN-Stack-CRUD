let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Student Model
let studentSchema = require('../Models/Student');

// CREATE Student
router.route('/create-student').post((req, res, next) => {
    console.log("============================");
    console.log("Create Student initiated!");
    console.log("req.body: ", req.body);
    console.log("============================");

    // studentSchema.create(req.body, (error, data) => {
    //     if (error) {
    //         return next(error)
    //     } else {
    //         console.log(data)
    //         res.json(data)
    //     }
    // })


    const newStudent = new studentSchema(req.body);

    // // Save the student object using async/await
    // try {
    //     const createdStudent = await newStudent.save();
    //     console.log('Student created:', createdStudent);
    //     res.json(data)
    // } catch (error) {
    //     console.error('Error creating student:', error);
    // }

    // Save the student object using promises
    newStudent.save()
        .then(createdStudent => {
            console.log('Student created:', createdStudent);
            res.json(createdStudent)
        })
        .catch(error => {
            console.error('Error creating student:', error);
        });
});

// READ Students
// router.route('/').get((req, res) => {
//     studentSchema.find((error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })
router.route('/').get(async (req, res) => {
    try {
        const students = await studentSchema.find();
        res.json(students);
    } catch (error) {
        console.log(error);
    }
});

// // Get Single Student
// router.route('/edit-student/:id').get((req, res) => {
//     studentSchema.findById(req.params.id, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })
router.route('/edit-student/:id').get(async (req, res) => {
    try {
        const students = await studentSchema.findById(req.params.id);

        console.log("student => ", students);
        res.json(students);
    } catch (error) {
        console.log(error);
    }
});
router.route('/get-student-by-rollno/:rollno').get(async (req, res) => {
    try {
        const students = await studentSchema.find({
            "rollno": req.params.rollno
        });

        console.log("Student with rollno", req.params.rollno, "found!");
        res.json(students);
    } catch (error) {
        console.log(error);
    }
});

// // Update Student
// router.route('/update-student/:id').put((req, res, next) => {
//     studentSchema.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, (error, data) => {
//         if (error) {
//             return next(error);
//             console.log(error)
//         } else {
//             res.json(data)
//             console.log('Student updated successfully !')
//         }
//     })
// });
router.route('/update-student/:id').put(async (req, res, next) => {
    try {
        const students = await studentSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        
        console.log('Student with id', req.params.id, 'updated successfully !');
        res.json(students);
    } catch (error) {
        // console.log(error);
        return next(error);
    }
});
router.route('/update-student-by-rollno/:rollno').put(async (req, res, next) => {
    try {
        const students = await studentSchema.findOneAndUpdate({"rollno": req.params.rollno}, {
            $set: req.body
        });
        
        console.log('Student with rollno', req.params.rollno, 'updated successfully !');
        res.json(students);
    } catch (error) {
        // console.log(error);
        return next(error);
    }
});

// Delete Student
// router.route('/delete-student/:id').delete((req, res, next) => {
//     studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: data
//             })
//         }
//     })
// });
router.route('/delete-student/:id').delete(async (req, res, next) => {
    try {
        const students = await studentSchema.findByIdAndDelete(req.params.id);
        
        console.log('Student with id', req.params.id, 'deleted successfully!');
        res.json(students);
    } catch (error) {
        // console.log(error);
        return next(error);
    }
});
router.route('/delete-student-by-rollno/:rollno').delete(async (req, res, next) => {
    try {
        const students = await studentSchema.findByIdAndDelete({
            "rollno": req.params.rollno
        });
        
        console.log('Student with rollno', req.params.rollno, 'deleted successfully!');
        res.json(students);
    } catch (error) {
        // console.log(error);
        return next(error);
    }
});

module.exports = router;
