import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import {uploadImage} from '@app/services/database/database.service';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const takePhoto = async (userUid: string, imageSource: string) => {
  const response: ImagePickerResponse = await new Promise(resolve => ImagePicker.showImagePicker(options, resolve));
  if (response.didCancel || response.error) {
    return;
  }
  const ratio = response.width / response.height;
  const resizeResponse = await ImageResizer.createResizedImage(response.uri, 500, 500 / ratio, 'JPEG', 80, 360);
  return await uploadImage(userUid, resizeResponse.uri, imageSource);
};
