import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IProps as IComponentProps, IHandlers as IComponentHandlers, CityDashboardComponent } from '../../components/city-dashboard/city-dashboard.component';
import { IConfiguredStore } from '../../redux/store';
import { Actions } from '../../redux/cityWeather/cityWeather.ducks';
import { IWeather } from '../../models/weather.model';



type IHandlers = IComponentHandlers & {
    initCityWeather: () => void;
}

export const CityDashboard = connect<IComponentProps, IHandlers>(
    function mapStateToProps({ cityWeather }: IConfiguredStore): IComponentProps {
        const { items, hiddenItems } = cityWeather
        return {
            children: items,
            hiddenItems
        };
    },
    {
        onRemoveCityWeather: Actions.remove,
        initCityWeather: Actions.init
    }
)((props: IComponentProps & IHandlers) => {
    const { initCityWeather } = props;
    const history = useHistory();
    // componentDidMount
    React.useEffect(() => {
        initCityWeather();
    }, [])
    function onSelectCityWeather(cityWeather: IWeather) {
        history.push(`/city/${cityWeather.id}`);
    }
    return (
        <CityDashboardComponent
            {...props}
            onSelectCityWeather={onSelectCityWeather}
        />
    )
});


