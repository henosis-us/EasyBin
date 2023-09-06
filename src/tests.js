const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const BASE_URL = 'http://localhost:7755'; // Adjust this to match your server's URL & port

// Test the creation of a new paste
describe('Paste API', () => {
  let pasteUrl;

  it('should create a new paste', (done) => {
    const content = "This is a test paste content.".repeat(1000);
    chai.request(BASE_URL)
      .post('/api/paste')
      .send({ content: content })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('url');
        pasteUrl = res.body.url;
        done();
      });
  });

  it('should retrieve a specific paste by ID', (done) => {
    const pasteId = pasteUrl.split('/').pop();
    chai.request(BASE_URL)
      .get(`/api/paste/${pasteId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('content');
        done();
      });
  });

  it('should retrieve all pastes', (done) => {
    chai.request(BASE_URL)
      .get('/api/pastes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should exceed the word count limit for paste creation', (done) => {
    const content = "This is a test paste content.".repeat(10000);
    chai.request(BASE_URL)
      .post('/api/paste')
      .send({ content: content })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
