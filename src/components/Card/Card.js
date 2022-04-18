import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment} from "react";
import {Card as BootstrapCard, Row, Col,Button } from "react-bootstrap"
import { faAngleDown, faAngleUp,faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";


function Change({ el }) {


    if (parseFloat(el.price_info.change) >= 0) {
        return (
            <b><small className="text-success">{el.price_info.change} <FontAwesomeIcon icon={faAngleUp} /> </small></b>
        )
    } else {
        return (
            <b><small className="text-danger">{el.price_info.change} <FontAwesomeIcon icon={faAngleDown} /></small></b>
        )
    }
}

export default function Card({ el, fevrateCards }) {


    return (
        <Fragment>
            <BootstrapCard className="m-2" >
                <BootstrapCard.Header style={{
                    background: `#${el.currency1.color}`,
                }}>
                    <div className="text-center">
                        <img src={el.currency1.image} width={100} height={"auto"} />
                    </div>
                    <div className="text-center">
                        <img src={el.currency2.image} width={40} height={"auto"} />
                    </div>
                </BootstrapCard.Header>
                <BootstrapCard.Body>
                    <header className="text-center">
                        <div>
                            <p className="lead">
                                <small><b>{el.title_fa}</b></small>
                            </p>
                        </div>
                        <div>
                            <p className="lead">
                                <small>{el.title}</small>
                            </p>
                        </div>
                        <div>
                            <p>
                                <Button variant="link" size="sm" onClick={() => {
                                    fevrateCards(el)
                                    el.faverate = true
                                }} className="btn-faverate">
                                    {!el.faverate ? (
                                        <b className="text-faverate" ><FontAwesomeIcon icon={faStar} /></b>
                                    ) : (<b className="text-danger" ><FontAwesomeIcon icon={faStar} /></b>)}
                                </Button>
                            </p>
                        </div>
                        <Row>
                            <Col>
                                <div className="text-center" dir="ltr">
                                    <Change el={el} />
                                </div>
                            </Col>
                            <Col>
                                <div className="text-center" dir="rtl">
                                    <p>
                                        <small><b>{el.currency2.decimal_irt === 0 ? `${el.price_info.price} دلار` : `${el.price_info.price} تومان`} </b></small>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center ">
                            <Link to="/" className="btn btn-primary btn-sm">معامله</Link>
                        </div>
                    </header>
                </BootstrapCard.Body>
            </BootstrapCard>
        </Fragment>
    )
}