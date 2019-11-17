import React from 'react';
import { connect } from 'react-redux';

import { IProps as IComponentProps, IHandlers as IComponentHandlers, AppComponent } from '../../components/app/app.component';
import { IConfiguredStore } from '../../redux/store';
import { Actions } from '../../redux/cityWeather/cityWeather.ducks';

type IHandlers = IComponentHandlers & {
    initCityWeather: () => void;
}

export const AppContainer = connect<IComponentProps, IHandlers>(
    function mapStateToProps({ cityWeather }: IConfiguredStore): IComponentProps {
        const {items, hiddenItems} = cityWeather
        return {
            cityWeathers: items,
            hiddenItems
        };
    },
    {
        onAddCityWeather: Actions.add,
        onRemoveCityWeather: Actions.remove,
        initCityWeather: Actions.init
    }
)((props: IComponentProps & IHandlers) => {
    //componentDidMount
    React.useEffect(() => {
        props.initCityWeather();
    }, [])
    return (<AppComponent {...props}/>)
});


