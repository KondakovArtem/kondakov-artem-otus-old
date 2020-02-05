import ImagePicker, {ImagePickerResponse, ImagePickerOptions} from 'react-native-image-picker';
import ImageCropper, {Options as CropOptions} from 'react-native-image-crop-picker';

import {uploadImage} from '@app/services/database/database.service';

// More info on all the options is below in the API Reference... just some common use cases shown here
const defOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export interface ITakePhotoOptions {
  pick?: ImagePickerOptions;
  crop?: CropOptions;
}

export async function takePhoto(
  userUid: string,
  imageSource: string,
  {pick, crop}: ITakePhotoOptions = {} as ITakePhotoOptions,
) {
  const response: ImagePickerResponse = await new Promise(resolve =>
    ImagePicker.showImagePicker({...pick, ...defOptions}, resolve),
  );
  if (response.didCancel || response.error) {
    return;
  }
  const cropImage = await ImageCropper.openCropper({
    ...crop,
    path: response.uri,
  });
  return await uploadImage(cropImage.path, imageSource);
}
