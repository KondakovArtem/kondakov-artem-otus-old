import React from 'react';
import { debounce } from 'lodash-es';

import { SearchComponent, IProps as IComponentProps } from '../../components/search/search.component';
import { IWeather } from '../../models/weather.model';
import { findCityWeatherByName } from '../../services/api/api.service';
import { CityWeatherInfo } from '../../components/weather-card/city-weather-info.component';
import { Cancelable } from 'lodash';



interface IState {
    inputValue: string;
    options: IWeather[];
    loading: boolean;
}

interface IProps {
    className?: string;
    placeholder?: string;
    onSelect: (data: IWeather) => void;
}

const withData = (Cmp: React.FunctionComponent<IComponentProps>) =>

    class CitySearchContainer extends React.Component<IProps, IState> {
        private fetchDelay: ((query: any) => Promise<void>) & Cancelable;

        constructor(props) {
            super(props);
            this.state = {
                inputValue: '',
                options: [],
                loading: false,
            };

            this.inputChange = this.inputChange.bind(this);
        }

        componentDidMount() {
            this.fetchDelay = debounce(async (query) => {
                this.setState({ loading: true });
                try {
                    const data = await findCityWeatherByName(query);
                    this.setState({ options: data.list });
                } catch (e) {
                    console.error(e)
                }
                this.setState({ loading: false });
            }, 500);
        }

        inputChange(event: React.ChangeEvent<HTMLInputElement>) {
            const newValue = event.target.value;
            this.setState({
                inputValue: newValue,
                options: []
            })

            this.fetchDelay.cancel();
            if (newValue && newValue !== '') {
                this.fetchDelay(newValue);
            }
        }

        render() {
            const { state, inputChange, props: {
                className,
                placeholder,
                onSelect
            } } = this;


            return (
                <Cmp
                    {...state}
                    onInputChange={inputChange}
                    className={className}
                    placeholder={placeholder}
                    onSelect={onSelect}
                >
                    {(option: IWeather) => (<CityWeatherInfo>{option}</CityWeatherInfo>)}
                </Cmp>
            );
        }
    }


export const CitySearchContainer = withData(SearchComponent);