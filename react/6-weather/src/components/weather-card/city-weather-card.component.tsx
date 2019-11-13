import React from 'react';
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { CityWeatherInfo } from "./city-weather-info.component"
import { IWeather } from "../../models/weather.model"


const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    position: 'absolute',
    right: '4px',
    padding: '6px',
    top: '4px'
  },
  icon: {
    fontSize: 20
  },
  root: {
    position: 'relative'
  }
}
));

interface IProps {
  className?: string;
  onClose: (data: IWeather) => void,
  show: boolean;
  children: IWeather
}

export const CityWeatherCard: React.FunctionComponent<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const {children, className, onClose, show} = props;

  function onCloseClick(){
    onClose(children);
  }

  return (
    <Zoom in={show}>
      <Card className={clsx(classes.root, className)}>

        <IconButton className={classes.iconButton} key="close" aria-label="close" color="inherit" onClick={onCloseClick}>
          <CloseIcon className={classes.icon} />
        </IconButton>

        <CardContent>
          <CityWeatherInfo>{children}</CityWeatherInfo>
        </CardContent>
      </Card>
    </Zoom>)
}
