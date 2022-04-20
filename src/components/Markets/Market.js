import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Bar, BarChart, LineChart } from "recharts"

import { useLocation, useParams } from "react-router-dom"
import ChartDiagram from "../Chart/CahrtDiagram";

export default function Market() {

    const { state } = useLocation()
    const { el } = state
    const [chartData, setChartData] = useState({})
    const [url, setUrl] = useState(`https://api.bitpin.ir/v1/mkt/markets/charts/`)

    useEffect(() => {
        axios.get(url).then(response => {
            if (response.status === 200) {
                response.data.results.map(element => {
                    if (el.code === element.code) {
                        setChartData(element)
                    }
                })
            }
        })
    }, [url])



    return (
        <>
            <div dir="rtl">
                <Row>
                    <Col lg={6}>
                        <div className="bg-white exchange-box">
                            <header>
                                <div className="text-center">
                                    <img src={el.currency1.image} width={100} height={"auto"} />
                                </div>
                                <div className="text-center">
                                    <img src={el.currency2.image} width={40} height={"auto"} />
                                </div>
                                <h6>{el.title_fa}</h6>
                            </header>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="bg-white text-center p-5 chart">
                            <ChartDiagram chartData={chartData} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}