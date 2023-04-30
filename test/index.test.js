import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
const should = chai.should();

chai.use(chaiHttp);

describe("Node Server", () => {
  it("(GET /) return homepage", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
