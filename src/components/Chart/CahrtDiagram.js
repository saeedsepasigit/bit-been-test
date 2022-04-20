import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment"



export default function ChartDiagram({ chartData }) {


    const [data, setData] = useState([])

    useEffect(() => {
        if (Object.keys(chartData).length > 0) {
            let array = []
            let startOffset = 100
            let numberOfElements = parseInt(chartData.chart.length - startOffset)
            array = chartData.chart.splice(startOffset, numberOfElements).map(element => {
                return {
                    price: element.price,
                    time: new Date(Date.now()).toLocaleTimeString()
                }
            })

            setData(array)
        }
    }, [chartData])

    const render = (
        <>
            <ResponsiveContainer width={620} height={270} >
                <LineChart data={data}
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }} >
                    <CartesianGrid strokeDasharray={"3 3"} />
                    <XAxis dataKey={"time"}  />
                    <YAxis dataKey={"price"} />
                    <Tooltip />
                    <Legend  />
                    <Line type={"monotone"} dataKey={"price"} stroke="#8884d8"  />
                    <Line type={"monotone"} dataKey={"time"} stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )

    return render
}