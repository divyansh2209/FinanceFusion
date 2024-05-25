import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const Row1 = () => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();
    console.log(`data:`, data);

    const revenueExpenses = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses,
                };
            })
        );
    }, [data]);

    const revenueProfit = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    profit: (revenue - expenses).toFixed(2),
                };
            })
        );
    }, [data]);

    const revenue = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                };
            })
        );
    }, [data]);

    return (
        <>
        
            <DashboardBox gridArea="a">
                <BoxHeader
                    title="Profit and Revenue"
                    subtitle="Top line represents revenue and bottom line represents expenses"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpenses}
                        margin={{
                            top: 20,
                            right: 25,
                            left: -5,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis domain={[8000, 24000]} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            dot={true}
                            stroke={palette.primary.main}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            dot={true}
                            stroke={palette.primary.main}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea="b">
                <BoxHeader
                    title="Revenue and Expenses"
                    subtitle="Top line represents revenue and bottom line represents profit"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis yAxisId='left' tickLine={false} axisLine={false} />
                        <YAxis yAxisId='right' orientation="right" tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend height={20} wrapperStyle={{
                            margin: '0 0 10px 0'
                        }}></Legend>
                        <Line
                            yAxisId='left'
                            type="monotone"
                            dataKey="profit"
                            stroke={palette.tertiary[500]}
                        />
                        <Line
                            yAxisId='right'
                            type="monotone"
                            dataKey="revenue"
                            stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea="c">
                <BoxHeader
                    title="Revenue Month by Month"
                    subtitle="Graph representing the revenue month by month"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={revenue}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>

        </>
    );
};

export default Row1;
