import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Cookies, useCookies } from "react-cookie";
import Card from "../Card/Card";
import { confirmAlert } from "react-confirm-alert"

import "react-confirm-alert/src/react-confirm-alert.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


export default function Markets() {

    
    const [url,setUrl] = useState("https://api.bitpin.ir/v1/mkt/markets/")

    const [markets, setMarkets] = useState({})
    const [faverate, setFaverate] = useState(false)
    const [cookies, setCookies, removeCookies] = useCookies();
    const alert = useAlert()

    let storedCookies = Object.assign([], Object.values(cookies))

    useEffect(() => {
        getApiData()

    }, [faverate,url])



    let getFeverateCards = el => {

        if (storedCookies.includes(el)) {
            confirmAlert({
                title: "اخطار!",
                message: `${el.title} از لیست علاقه مندی ها حذف شود؟`,
                childrenElement: () => <div />,
                customUI: ({ title, message, onClose }) => (
                    <Fragment>
                        <div dir="rtl" className="text-center">
                            <header>
                                <h6><b>{title}</b></h6>
                            </header>
                            <main>
                                <p><b>مارکت {message} </b></p>
                            </main>
                            <Button variant="danger" size="sm" className="m-2" onClick={() => {

                                removeCookies(el.title)
                                alert.success(<div dir="rtl">مارکت {el.title_fa} از لیست علاقه مندی ها برداشته شد.</div>)
                                setFaverate(!faverate)

                                return onClose()
                            }}>
                                بلی
                            </Button>
                            <Button className="m-2" size="sm" onClick={() => onClose()}>
                                خیر
                            </Button>
                        </div>
                    </Fragment>
                ),
                willUnmount: () => { },
                closeOnClickOutside: () => { }
            })
        } else {
            let now = new Date()
            let time = now.getTime()
            let expiredTime = parseFloat(time + 1000 * 36000)

            now.setTime(expiredTime)

            setCookies(el.title, el, {
                path: "/",
                maxAge: now.getTime(expiredTime)
            })

            alert.success(<div dir="rtl">مارکت {el.title_fa} به لیست علاقه مندی افزوده شد.</div>)

            setFaverate(!faverate)
        }

        window.scrollTo(0, 0)
    }



    const getApiData = () => {

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
    }


    const prevePage = e =>{
        if(markets.previous !== null){
            setUrl(markets.previous)
        }else{
           e.preventDefault()
        }
        window.scrollTo(0,0)
    }

    const nextPage = e =>{
        if(markets.next !== null){
            setUrl(markets.next)
            window.scrollTo(0,0)
        }else{
            e.preventDefault()
        }
    }

    const render = (
        <Fragment>
            {storedCookies.length > 0 ? (
                <Fragment>
                    <div>
                        <header className="text-center p-1 border-bottom">
                            <h6><b>مارکت های مورد علاقه</b></h6>
                        </header>
                        <Row>
                            {storedCookies.length > 0 && storedCookies.map(el => {
                                return (
                                    <Fragment>
                                        <Col lg={2}>
                                            <Card el={el} key={el.code} fevrateCards={el => getFeverateCards(el)} />
                                        </Col>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </div>
                </Fragment>
            ) : ''}
            <header className="text-center p-1 border-bottom mt-3 mb-3">
                <h6><b>لیست مارکت ها</b></h6>
            </header>
            <Row>
                {Object.keys(markets).length > 0 && markets.results.map((el, index) => {
                    return (
                        <Fragment>
                            <Col lg={3}>
                                <Card el={el} key={el.code} fevrateCards={el => getFeverateCards(el)} />
                            </Col>
                        </Fragment>
                    )
                })}
            </Row>

            <div className="pagination">
                <a href="javascript:void(0)" className="prev" onClick={e => prevePage(e) }>
                    <FontAwesomeIcon icon={faAngleRight} />
                </a>

                <a href="javascript:void(0)" className="next" onClick={e => nextPage(e)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </a>
            </div>
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