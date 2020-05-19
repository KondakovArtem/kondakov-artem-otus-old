export const COMMON_DURATION = 200;
export const DELETE_POST_DURATION = 200;

export const statusBackground = '#D3532C';
export const headerBackground = '#F06332';

export const thumbnailVariants = {
  initial: {opacity: 0, y: -10},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.5},
  exit: {
    scale: 0.5,
    opacity: 0,
  },
};

export const thumbnailVariants2 = {
  initial: {opacity: 0, y: -10, height: 0},
  animate: {opacity: 1, y: 0, height: 270},
  exit: {
    marginTop: 0,
    scale: 0,
    height: 0,
    opacity: 0,
  },
};

export const deletePostVariant = {
  animate: {
    opacity: 0,
    height: 0,
    scale: 0,
  },
};
