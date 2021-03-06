import React from 'react';
import {Form, Container, Col} from "react-bootstrap";
import { Button } from "react-bootstrap"

export default function Search (props) {
    const [search, setSearch] = React.useState("");

    function handleSubmit(event) {
        props.getPokemon(search);
        event.preventDefault();
        setSearch('');
    }
    
    return(

        <Container>
            <Form className="mt-2" onSubmit = {handleSubmit}>
                <Form.Row className="align-items-center">
                    <Col sm={10} className="my-1">
                        <Form.Control 
                        placeholder="enter pokemon's name"
                        onChange={(g) => {setSearch(g.target.value.toLowerCase())}} 
                        autoFocus
                        value={search}
                         />
                    </Col>
                    <Col sm={2} className="my-1">
                        <Button block type='submit'>Search</Button>
                    </Col>
                </Form.Row>
            </Form>
        </Container>
    )
}