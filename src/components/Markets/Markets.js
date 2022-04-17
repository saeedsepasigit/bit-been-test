import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Card from "../Card/Card";



export default function Markets() {


    const url = `https://api.bitpin.ir/v1/mkt/markets/`


    const [markets, setMarkets] = useState({})

    useEffect(() => {

        axios.get(url).then(response => {
            if (response.status === 200) {
                setMarkets({ ...response.data })
                console.log(response.data)
            } else {
                setMarkets({})
            }
        }).catch(error => {
            console.error("Axios error => ", error.response.data.message)
        })

    }, [])


    const render = (
        <Fragment>
            <Row>
                {Object.keys(markets).length > 0 && markets.results.map((el, index) => {
                    return (
                        <Fragment>
                            <Col>
                                <Card el={el} key={index} />
                            </Col>
                        </Fragment>
                    )
                })}
            </Row>
        </Fragment>
    )

    const spinner = (
        <Fragment>
            <div className="text-center pt-2">
                <Spinner animation="grow" />
            </div>
        </Fragment>
    )


    if (Object.keys(markets).length > 0) {
        return render
    } else {
        return spinner
    }
}