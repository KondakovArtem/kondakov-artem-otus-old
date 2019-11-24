import React from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import Zoom from '@material-ui/core/Zoom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { IForecast, IWeather, ITempChartItem } from '../../models/weather.model';
import { CityWeatherCard } from '../weather-card/city-weather-card.component';
import Skeleton from '@material-ui/lab/Skeleton';



export interface IProps {
    children: IForecast;
}

const useStyles = makeStyles(() => createStyles({
    item: {
        marginTop: '20px'
    }
}));

export const CityFormComponent: React.FunctionComponent = (props: IProps) => {
    const { children: forecast } = props;
    const classes = useStyles(props);

    let cityWeather: IWeather;
    let tempChart: ITempChartItem[];
    if (forecast) {
        cityWeather = forecast.weather;
        tempChart = forecast.tempChart;
    }

    return (
        <Container maxWidth="md" >
            <CityWeatherCard show={true} className={classes.item}>{cityWeather}</CityWeatherCard>

            <Zoom in={true}>
                <Card className={classes.item}>
                    <CardHeader
                        title="Temperature forecast"
                    />
                    <CardContent >
                        {tempChart ? (
                            <ResponsiveContainer width="100%" height={500}>
                                <BarChart 
                                    data={tempChart}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0,}}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar animationDuration={500} dataKey="temp" fill="#8884d8" />
                                </BarChart >
                            </ResponsiveContainer>
                        ) : (
                            <Skeleton variant="rect" width="100%" height={500} />
                        )}
                    </CardContent>
                </Card>
            </Zoom>
        </Container>
    );
}

