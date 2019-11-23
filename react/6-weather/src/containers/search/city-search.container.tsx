import React from 'react';
import { connect } from 'react-redux';

import { IWeather } from '../../models/weather.model';
import { CityWeatherInfo } from '../../components/weather-card/city-weather-info.component';
import { SearchComponent, IProps as IComponentProps, IHandlers as IComponentHandlers } from '../../components/search/search.component';
import { IConfiguredStore } from '../../redux/store';
import { Actions as searchActions } from '../../redux/search/search.ducks';

interface IOwnProps {
    className?: string;
}

const children = (option: IWeather) => (<CityWeatherInfo>{option}</CityWeatherInfo>);

export const CitySearchContainer = connect<IComponentProps, IComponentHandlers, IOwnProps>(
    function mapStateToProps(state: IConfiguredStore): IComponentProps {
        const { search: { inputValue, options, loading } } = state;
        return {
            inputValue,
            options,
            loading,
            children
        }
    },
    {
        onInputChange: searchActions.setInputValue,
        onSelect: searchActions.onSelect
    }
)(SearchComponent);