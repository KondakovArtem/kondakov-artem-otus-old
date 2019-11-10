import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({

        overrides: {
            MuiAutoComplete: {
                option: {
                    padding: 0
                }
            }
        }
});
