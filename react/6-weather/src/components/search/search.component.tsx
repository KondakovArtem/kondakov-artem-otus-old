import React, { ReactNode } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import { IWeather } from '../../models/weather.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
            '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
                padding: theme.spacing(1, 1, 1, 7),
                transition: theme.transitions.create('width'),
                width: 0
            },
            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)'
            }
        },
        '@keyframes spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' }
        },
        spin: {
            animation: '$spin 1s infinite linear'
        }
    })
);


export interface IAbstractProps {
    className?: string;
    onSelect: (data: any) => void,
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    options: any[];
    loading: boolean;
    inputValue: string;
}

export interface IProps extends IAbstractProps {
    children: (option: any) => ReactNode;
}

export interface IRenderInputProps extends IAbstractProps {
    children: RenderInputParams
}

const RenderInput = (props: IRenderInputProps) => {
    const classes = useStyles(props);
    const { 
        loading, 
        children, 
        inputValue, 
        onInputChange, 
        placeholder 
    } = props;


    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                {!loading && <SearchIcon />}
                {loading && <RefreshIcon className={classes.spin} />}
            </div>
            <TextField
                {...children}
                value={inputValue}
                fullWidth
                variant={'outlined'}
                onChange={onInputChange}
                placeholder={placeholder}
            />
        </div>
    )
}


export const SearchComponent: React.FunctionComponent<IProps> = (props: IProps) => {
    const classes = useStyles(props);
    const {options, onSelect, children} = props;

    return (
        <div className={props.className}>
            <Autocomplete
                autoComplete
                includeInputInList
                freeSolo
                options={options}
                // disableOpenOnFocus
                classes={{
                    inputRoot: classes.inputRoot
                }}
                onChange={(event, value: IWeather) => {
                    value && onSelect(value);
                }}
                getOptionLabel={(option: IWeather) => option.name}
                renderInput={(params) => (<RenderInput {...props}>{params}</RenderInput>)}
                renderOption={children}
            />
        </div >
    );
}
