import React from 'react'
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'

export default function PokemonData(props) {

    const typeColors = {
        bug: 'B1C12E',
        dark: '4F3A2D',
        dragon: '6F35FC',
        electric: "FCBC17",
        fairy: 'F4B1F4',
        fighting: 'C22E28',
        fire: 'E73B0C',
        flying: 'A98FF3',
        ghost:'735797',
        grass:'74C236',
        ground:'D3B357',
        ice:'96D9D6',
        normal:'A8A77A',
        poison:'934594',
        psychic:'ED4882',
        rock:'B9A156',
        steel:'B5B5C3',
        water:'6390F0',
    };

    let pokemonDescriptionArr = [...new Set(props.desc)];

    const femaleRate = props.genderRate;
    const femalePercentage = femaleRate * 12.5;
    const malePercentage = (8 - femaleRate) * 12.5;

    return(
        <Container className = "mt-2"> 
            <Row>
                <Col xs={12} md={6}>
                <Card>
                    <Card.Header>
                        <h5> {props.name.toUpperCase()} </h5>
                        {props.genus.map((x, key) => <h6 key={key}><i>{x.genus}</i></h6>)}
                        <img src= {props.sprite} alt= {props.name}></img>
                    </Card.Header>
                    <Card.Body>
                        <h5>Abilities</h5>
                        <ul>
                        {props.abilities.map((ability, key) => (
                            <li key={key}>
                                {ability.ability.name}
                            </li>
                        ))}
                        </ul>
                        <h5>Types</h5>
                        <h5>
                        {props.types.map((type, key) => (
                            <span key={key}
                            className="badge badge-primary badge-pill mr-1"
                            style={{
                                backgroundColor: `#${typeColors[type.type.name]}`,
                                color: 'white'
                            }}
                            >
                                {type.type.name}
                            </span>
                        ))}
                        </h5>
                    </Card.Body>
                </Card>
                </Col>
                <Col xs={12} md={6}>
                <Card>
                    <Card.Header>
                        <h5>Base Stats</h5>
                        {props.stats.map((stat, key) => (
                            <div key={key}>
                                <strong>{stat.stat.name}</strong>
                                <ProgressBar now={stat.base_stat} max={255} label={stat.base_stat}/> 
                                {/* from react bootstrap */}
                            </div>
                        ))}
                    </Card.Header>
                    <Card.Body>
                    <strong>Egg Groups: </strong> {props.eggGroups.map((x) => x.name).join(', ')}
                            
                    </Card.Body>
                </Card>
                </Col>
            <Col xs={12} md={6}>
                <Card>
                    <Card.Body>
                        <h5> Description </h5>
                        
                         <p>{pokemonDescriptionArr[0]}</p>
                         <p>{pokemonDescriptionArr[pokemonDescriptionArr.length-1]}</p>

                    </Card.Body>
                </Card>
                </Col>
                <Col xs={12} md={6}>
                <Card>
                    <Card.Header>
                        {props.habitat ?<div>
                            <strong>Habitat</strong>: {props.habitat.name}
                        </div> :
                        <div>
                            <strong>Habitat</strong>: unknown  
                        </div>}
                        <strong>Catch Rate: </strong>
                        <ProgressBar now={Math.round((100/255) * props.captureRate)} max={100} label={Math.round((100/255) * props.captureRate) + '%'}></ProgressBar>
                    </Card.Header>
                    <Card.Body>
                    <strong>Gender Ratio: </strong>
                            {props.genderRate !== -1 ? 
                                <ProgressBar>
                                <ProgressBar now={femalePercentage} max={100} variant="danger" label="♀"/>
                                <ProgressBar now={malePercentage} max={100} variant="warning" label="♂"/>
                                </ProgressBar>
                        : <ProgressBar now={100} max={100} variant="danger" label="genderless pokemon"/>}
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}