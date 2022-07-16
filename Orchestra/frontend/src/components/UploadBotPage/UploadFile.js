import React, { useState } from 'react';
import { useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap";
import axios from 'axios';


function UploadFile () {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [progress, setProgress] = useState()

    const submitHandler = e => {
        e.preventDefault() //prevent the form from submitting
        let formData = new FormData()
        formData.append("file", selectedFiles[0])
        axios.post("/marketplace/upload", formData, {
        headers: {"Content-Type": "multipart/form-data"},
        onUploadProgress: data => {
            setProgress(Math.round((100 * data.loaded) / data.total))
        }
        }
        )
    }

    const handleSelectFile = (e) => {
        const [f] = e.target.files;
        setSelectedFiles(f);
        console.log(selectedFiles);
    }

    return (
        <Container>
            <Row>
            <Col lg={{ span: 4, offset: 3 }}>
                <Form
                action="http://www.localhost:3006/marketplace/upload"
                method="post"
                encType="multipart/form-data"
                onSubmit={submitHandler}
                >
                <Form.Group>
                    <input onChange={handleSelectFile} type="file" />
                </Form.Group>
                <Form.Group>
                    <Button variant="info" type="submit">
                    Upload executables
                    </Button>
                </Form.Group>
                {progress && <ProgressBar now={progress} label={`${progress}%`} />}
                </Form>
            </Col>
            </Row>
        </Container>
        )
}
export default UploadFile;