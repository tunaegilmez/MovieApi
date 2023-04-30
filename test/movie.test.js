import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import { describe } from "mocha";
const should = chai.should();

chai.use(chaiHttp);

let token;

describe("/api/movies tests", () => {
  before(done => {
    chai
      .request(server)
      .post("/authenticate")
      .send({ username: "tuna", password: "tuna123" })
      .end((err, res) => {
        token = res.body.token;
        // console.log(token);
        done();
      });
  });

  describe("/GET movies", () => {
    it("it should get all the movies", done => {
      done();
    });
  });
});

// describe("/GET movies", () => {
//   it("it should GET all the movies", done => {
//     chai
//       .request(server)
//       .get("/api/movies")
//       .set("x-access-token", token)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         done();
//       });
//   });
// });
