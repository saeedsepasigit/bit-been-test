import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function ChartDiagram({ chartData }) {


    const [data, setData] = useState([])

    useEffect(() => {
        if (Object.keys(chartData).length > 0) {
            let array = []
            let startOffset = 5
            let numberOfElements = parseInt(chartData.chart.length - startOffset)
            array = chartData.chart.splice(startOffset, numberOfElements).map(element => {
                return {
                    price: element.price,
                    time: new Date(element.created_at).toLocaleTimeString()
                }
            })

            setData(array)
        }
    }, [chartData])

    const render = (
        <>
            <Table responsive dir="rtl">
                <tr>
                    <td>
                        <div style={{
                            display : "flex"
                        }}>
                            <ResponsiveContainer width={680} height={270} >
                                <LineChart data={data} margin={{
                                    left : 0
                                }}>
                                    <CartesianGrid strokeDasharray={"3 3"} />
                                    <XAxis dataKey={"time"} />
                                    <YAxis dataKey={"price"} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type={"monotone"} dataKey={"price"} stroke="#8884d8" />
                                    <Line type={"monotone"} dataKey={"time"} stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </td>
                </tr>
            </Table>
        </>
    )

    if (Object.keys(chartData).length > 0) {
        return render
    }
}