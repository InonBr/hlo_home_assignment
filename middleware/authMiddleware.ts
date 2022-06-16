require("dotenv").config();
import * as jwt from "jsonwebtoken";
import findUserById from "../lib/findUserById";

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.TOKEN,
      (err, decodedToken: { id: string; email: string }) => {
        if (err) {
          res.status(401).send("forbidden request");
        } else {
          findUserById(decodedToken)
            .then((data) => {
              if (!data) {
                return res.status(401).send("forbidden request");
              }

              req.currentUser = { id: data.id, email: data.email };
              next();
            })
            .catch((err) => {
              console.error(err);
              res.status(401).send("forbidden request");
            });
        }
      }
    );
  } else {
    res.status(401).send("forbidden request");
  }
};

export default auth;
