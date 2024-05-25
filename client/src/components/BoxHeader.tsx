import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, useTheme } from '@mui/material'
import { Typography } from '@mui/material';

type Props = {
    icon?: React.ReactNode;
    title:string;
    subtitle?:string;
    sideText?:string
}

const BoxHeader = ({icon , title , subtitle , sideText}: Props) => {
    const {palette} = useTheme()
    return (
        <FlexBetween color={palette.grey[400]} margin= ".75rem 1rem 0 1rem " >
            <FlexBetween>
                {icon}
                <Box width="100%">
                    <Typography variant='h4' mb="-0.1rem">
                        {title}
                    </Typography>
                    <Typography variant='h5'>{subtitle}</Typography>
                </Box>
            </FlexBetween>
            <Typography variant='h5' fontWeight='700' color={palette.secondary[500]}>
                {sideText}
            </Typography>
        </FlexBetween>
    )
}

export default BoxHeader