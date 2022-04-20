import React, { Fragment, useCallback, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Card from "../Card/Card";
import { confirmAlert } from "react-confirm-alert"
import {useAlert} from "react-alert"

import "react-confirm-alert/src/react-confirm-alert.css"

export default function FaverateMarkets() {


    const [cookies, setCookies, removeCookies] = useCookies();
    const alert = useAlert()

    let storedCookies = Object.assign([], Object.values(cookies))



    const getFaverateMarkets = el => {
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
    }

    const render = (
        <Fragment>
            <header className="text-center p-5 border-bottom">
                <h6><b>مارکت های مورد علاقه</b></h6>
            </header>
            <Row>
                {storedCookies.map(el => {
                    return (
                        <>
                            <Col lg={3}>
                                <Card el={el} key={el.code} fevrateCards={getFaverateMarkets} />
                            </Col>
                        </>
                    )
                })}
            </Row>
        </Fragment>
    )


    const message = (
        <>
            <div>
                <header className="text-center p-5 border-bottom">
                    <h4><b>مارکت های مورد علاقه</b></h4>
                </header>
                <div className="text-center p-5">
                    <h6>هیچ مارکتی به لیست مورد علاقه ها افزوده نشده است.</h6>
                </div>
            </div>
        </>
    )


    return storedCookies.length > 0 ? render : message
}