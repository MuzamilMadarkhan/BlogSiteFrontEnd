import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import FileUploaded from "./FileUploader";
import {Navbar, Nav, Container, Button} from 'react-bootstrap';


function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = () => {
    const formData = new FormData();
    formData.append("file_uploaded", selectedFile);
    axios
      .post("http://localhost:8000/api/acceptfile/", formData)
      .then((res) => {
        const response = res.data;
        if(response.status === 200){
          alert(response.message);
          window.location.reload();
      }else{
        alert(response.message);
      }
        
      })
      .catch((err) => alert("File Upload Error"));
  };

  const clearLocalStorage = () => {
    console.log("Clear local storage")
    localStorage.removeItem('access');
    window.location.reload();
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/blogs/`).then((res) => {
      const response = res.data;
      console.log(response);
      setData(response);
    });
  }, []);

  return (
    <div >
      <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#home"><h2><i>Explore Your Knowledge - ARTICLES</i></h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#Profile"><b>Profile</b></Nav.Link>
                {/* <Nav.Link href="#Logout" onClick={localStorage.removeItem('acess')}><b>Logout</b></Nav.Link> */}
                
                <Button variant="outline-primary" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                onClick={clearLocalStorage}
                >
                Logout
              </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br/>
      <form>
        <FileUploaded 
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
        <span>&nbsp;</span>
        <div className="d-grid gap-2">
        <Button variant="primary" size="lg" active onClick={submitForm}>Submit</Button>
        </div>
        </form>
      
      {data.map((card) => (
        <Card
          key={card.id}
          user_id={card.user_id}
          title={card.title}
          body={card.body}
        />
      ))}
    </div>
  );
}
export default Home;
