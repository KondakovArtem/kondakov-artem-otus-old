import { connect } from 'react-redux';

import { IConfiguredStore } from '../../redux/store';
import { CityFormComponent, IProps as IComponentProps } from '../../components/city-form/city-form.component';


export const CityForm = connect<IComponentProps, {}>(
    function mapStateToProps({ cityWeather: { forecast } }: IConfiguredStore): IComponentProps {
        return {
            children: forecast
        };
    }
)(CityFormComponent);


