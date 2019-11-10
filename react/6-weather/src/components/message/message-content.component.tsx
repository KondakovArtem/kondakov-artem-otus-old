import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';

import { variantIcon } from "../../models/message.model";


const useStyles = makeStyles((theme: Theme) => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));


export interface IProps {
    className?: string;
    children: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
  }
  
export const MessageContent: React.FunctionComponent<IProps> = (props: IProps) => {
    const classes = useStyles(props);
    const { className, children, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        message={
          <span className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {children}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
  }