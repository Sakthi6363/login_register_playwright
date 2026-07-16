const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("./db");

// =======================
// REGISTER
// =======================
router.post("/register", async (req, res) => {

    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check Email
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length > 0) {
                return res.json({
                    message: "Email Already Exists"
                });
            }

            // Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users(fullname,email,password) VALUES(?,?,?)",
                [fullname, email, hashedPassword],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Registration Failed"
                        });
                    }

                    res.json({
                        message: "Registered Successfully"
                    });

                }
            );

        }
    );

});


// =======================
// LOGIN
// =======================
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length === 0) {
                return res.json({
                    message: "Invalid Email"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.json({
                    message: "Invalid Password"
                });
            }

            res.json({
                message: "Login Success",
                name: user.fullname
            });

        }
    );

});

module.exports = router;