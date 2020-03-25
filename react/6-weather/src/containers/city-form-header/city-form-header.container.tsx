import React from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { IConfiguredStore } from '../../redux/store';
import { CityFormHeaderComponent, IProps as IComponentProps } from '../../components/city-form-header/city-form-header.component';
import { Actions } from '../../redux/cityWeather/cityWeather.ducks';


interface IHandlers {
    getForecast: (id: number) => void;
}

export const CityFormHeader = connect<IComponentProps, IHandlers>(
    function mapStateToProps({ cityWeather: { forecast } }: IConfiguredStore): IComponentProps {
        return {
            children: forecast,
        };
    },
    {
        getForecast: Actions.getForecast,
    }
)((props: IComponentProps & IHandlers) => {
    const { id } = useParams<{ id: string }>();
    const { getForecast } = props;
    const history = useHistory();
    
    //componentDidMount
    React.useEffect(() => {
        getForecast(parseInt(id, 10));
    }, []);

    return (
        <CityFormHeaderComponent {...props}
            onBackClick={() => { history.push('/') }}
        />
    )
});


