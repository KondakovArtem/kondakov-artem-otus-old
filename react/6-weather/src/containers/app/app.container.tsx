import React, { FunctionComponent } from 'react';

import { IProps as IComponentProps } from '../../components/app/app.component';
import AppComponent from '../../components/app/app.component';
import { IWeather } from '../../models/weather.model';
import { IMessage, variantIcon } from '../../models/message.model';
import { getCityWeatherByIds } from '../../services/api/api.service';
import { uniqueId } from 'lodash-es';

interface IState {
    cityWeathers: IWeather[];
    hiddenItems: IWeather[];
    messages: IMessage[];
}


const STORAGE_KEY = 'cityIds';

const withData = (Cmp: React.FunctionComponent<IComponentProps>) =>

    class AppContainer extends React.Component<{}, IState> {
        constructor(props) {
            super(props);
            this.state = {
                cityWeathers: [],
                hiddenItems: [],
                messages: []
            };
            this.setCityWeathers = this.setCityWeathers.bind(this);
            this.setHiddenItem = this.setHiddenItem.bind(this);
            this.addMessage = this.addMessage.bind(this);
            this.closeMessage = this.closeMessage.bind(this);
            this.showWarnMessage = this.showWarnMessage.bind(this);
            this.addCityWeather = this.addCityWeather.bind(this);
            this.removeCityWeather = this.removeCityWeather.bind(this);
        }

        setCityWeathers(cityWeathers: IWeather[]) {
            this.setState({ cityWeathers });
        }

        setHiddenItem(hiddenItems: IWeather[]) {
            this.setState({ hiddenItems });
        }

        addCityWeather(newCityWeathers: IWeather) {
            const { cityWeathers } = this.state;
            const existCityWeather = cityWeathers.find((cityWeather) => cityWeather.id === newCityWeathers.id);
            if (existCityWeather) {
                this.showWarnMessage('The selected city has already been added.');
                return;
            }
            this.setCityWeathers([...cityWeathers, newCityWeathers]);
            this.updateLocalStorage();
        }

        removeCityWeather(cityWeather: IWeather) {
            const { hiddenItems } = this.state;
            this.setState({
                hiddenItems: [...hiddenItems, cityWeather]

            });
            setTimeout(() => {
                const { hiddenItems, cityWeathers } = this.state;
                this.setState({
                    hiddenItems: hiddenItems.filter(item => item.id !== cityWeather.id),
                    cityWeathers: cityWeathers.filter(item => !hiddenItems.includes(item))
                })
                this.updateLocalStorage();
                this.showSuccessMessage(`${cityWeather.name} city has been successfully removed`);
            }, 250);
        }


        // message part
        addMessage(message: {
            text: string;
            variant: keyof typeof variantIcon;
        }) {
            const { messages } = this.state;
            this.setState({
                messages: [...messages, {
                    ...message,
                    id: uniqueId('message')
                }]
            })
        }
        closeMessage(id: string) {
            const { messages } = this.state;
            this.setState({
                messages: messages.filter(message => message.id !== id)
            })
        }
        showWarnMessage(text: string) {
            this.addMessage({ variant: "info", text });
        }
        showSuccessMessage(text: string) {
            this.addMessage({ variant: "success", text });
        }

        updateLocalStorage() {
            const { cityWeathers } = this.state;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cityWeathers.map(cityWeather => cityWeather.id)))
        }

        getLocalStorage() {
            return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
        }

        componentDidMount() {
            const cityIds = this.getLocalStorage();
            if (cityIds) {
                (async () => {
                    const data = await getCityWeatherByIds(cityIds);
                    this.setCityWeathers(data.list || []);
                })()
            }
        }

        render() {
            return (
                <Cmp
                    {...this.state}
                    onAddCityWeather={this.addCityWeather}
                    onCloseMessage={this.closeMessage}
                    onRemoveCityWeather={this.removeCityWeather}
                />
            );
        }
    }


export const AppContainer = withData(AppComponent);