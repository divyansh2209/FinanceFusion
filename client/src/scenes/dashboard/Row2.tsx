import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis,
} from "recharts";

const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
];

const Row2 = () => {
    const { palette } = useTheme();
    const { data: productData } = useGetProductsQuery();
    const { data: operationalData } = useGetKpisQuery();
    const pieColors = [palette.primary[800], palette.primary[300]];

    // console.log('Product:', data);

    const priceAndExpenses = useMemo(() => {
        return (
            productData &&
            productData.map(({ price, expense }) => {
                return {
                    // name: month.substring(0, 3),
                    price: price,
                    Expense: expense,
                };
            })
        );
    }, [productData]);

    const operationalExpenses = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(
                ({ month, operationalExpenses, nonOperationalExpenses }) => {
                    return {
                        name: month.substring(0, 3),
                        "Operational Expenses": operationalExpenses,
                        "Non Operational Expenses": nonOperationalExpenses,
                    };
                }
            )
        );
    }, [operationalData]);

    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader title="Operational vs Non Operational" />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={operationalExpenses}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip />
                        <Legend
                            height={20}
                            wrapperStyle={{
                                margin: "0 0 10px 0",
                            }}
                        ></Legend>
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="Non Operational Expenses"
                            stroke={palette.tertiary[500]}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="Operational Expenses"
                            stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea="e">
                <BoxHeader title="Campaigns and Targets" sideText="+4%" />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <Pie
                            stroke="none"
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
                            83
                        </Typography>
                        <Typography variant="h6">
                            Finance goals of the campaign that is desired
                        </Typography>
                    </Box>
                    <Box flexBasis="40%">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant="h6">Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant="h5">
                            Profit Margins
                        </Typography>
                        <Typography variant="h6">
                            Margins are up by 30% from last month.
                        </Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>

            <DashboardBox gridArea="f">
                <BoxHeader title="Product Price vs Expenses"  subtitle="X-asix represents price of product and Y-axix represents expense for the product"/>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 55,
                            left: -10,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis axisLine={false} tickLine={false} type="number" dataKey="price" name="price" tickFormatter={(v) => `$${v}`} />
                        <YAxis axisLine={false} tickLine={false} type="number" dataKey="Expense" name="Expense " tickFormatter={(v) => `$${v}`} />
                        <ZAxis type="number" range={[20]} />
                        <Tooltip formatter={(v) => `$${v}`}  />
                        <Scatter name="Product Expense Ratio" data={priceAndExpenses} fill="#8884d8" />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    );
};

export default Row2;
