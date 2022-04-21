import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom"
import ChartDiagram from "../Chart/CahrtDiagram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"



function Change({ param }) {
    return (
        <>
            <small> آهنگ تغیرات قیمت </small>
            <small dir="ltr" className={param.price_info.change >= 0 ? 'text-success' : 'text-danger'}>
                {param.price_info.change > 0 ? (
                    <>
                        {param.price_info.change} <FontAwesomeIcon icon={faAngleUp} />
                    </>
                ) :
                    (
                        <>
                            {param.price_info.change} <FontAwesomeIcon icon={faAngleDown} />
                        </>
                    )
                }
            </small>
        </>
    )
}

function Price({ param }) {

    return (
        <>
            <small>قیمت ارز </small>
            <small>
                {param.currency2.decimal_irt ? (
                    <>
                        {param.price_info.price} تومان
                    </>
                ) :
                    (
                        <>
                            {param.price_info.price} دلار
                        </>
                    )
                }
            </small>
        </>
    )
}

function Transactions({ param }) {



    const setDate = p => {
        const timeStamp = Date.parse(p.order_book_info.time)

        const fDate = new Date(timeStamp).toLocaleString()

        return fDate
    }


    return (
        <>
            <div dir="rtl">
                <div>
                    <small>تعداد تراکنش های اخیر :</small>
                </div>
                <div>
                    <small>معامله : </small>
                    <small>{param.order_book_info.amount} {param.code} </small>
                </div>
                <div>
                    <small>مقدار فروش :‌</small>
                    <small> {param.currency2.decimal_irt ? (
                        <>
                            {parseFloat(param.order_book_info.value)} تومان
                        </>
                    ) : (
                        <>
                            {parseFloat(param.order_book_info.value)} دلار
                        </>
                    )}</small>
                </div>
                <div>
                    <small>زمان : {setDate(param)}</small>
                </div>
                <div>
                    <small>مقدار خرید : ‌</small>
                    <small>0</small>
                </div>
            </div>
        </>
    )
}

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
        console.log(el)
    }, [url])




    return (
        <>
            <div dir="rtl">
                <Row>
                    <Col lg={5}>
                        <div className="bg-white exchange-box m-1 p-3">
                            <header>
                                <div className="text-center">
                                    <img src={el.currency1.image} width={100} height={"auto"} />
                                </div>
                                <div className="text-center">
                                    <img src={el.currency2.image} width={40} height={"auto"} />
                                </div>
                                <h6>{el.title_fa}</h6>
                                <h6>{el.title}</h6>
                                {/* <h6>{new Date(el.price_info.created_at).toLocaleTimeString()}</h6> */}
                            </header>
                            <main className="m-auto">
                                <Row>
                                    <Col>
                                        <Change param={el} />
                                    </Col>
                                    <Col>
                                        <Price param={el} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Transactions param={el} />
                                    </Col>
                                </Row>
                            </main>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="bg-white text-center p-5 chart m-1" style={{
                            display: "flex",
                        }}>
                            <ChartDiagram chartData={chartData} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}