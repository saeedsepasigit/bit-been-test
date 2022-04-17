import React, { Fragment } from "react";
import { Image, Card as BootstrapCard } from "react-bootstrap"


export default function Card({ el }) {




    return (
        <Fragment>
            <BootstrapCard className="m-2" >
                <BootstrapCard.Header>
                    <div className="text-center">
                        <img src={el.currency1.image} width={100} height={"auto"} />
                    </div>
                    <div className="text-center">
                        <img src={el.currency2.image} width={40} height={"auto"} />
                    </div>
                </BootstrapCard.Header>
                <BootstrapCard.Body>
                    <header className="text-center">
                        <p className="lead">
                            <small><b>{el.title_fa}</b></small>
                        </p>
                        <p className="lead">
                            <small>{el.title}</small>
                        </p>
                    </header>
                </BootstrapCard.Body>
            </BootstrapCard>
        </Fragment>
    )
}