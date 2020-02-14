import ImagePicker, {ImagePickerResponse, ImagePickerOptions} from 'react-native-image-picker';
import ImageCropper, {Options as CropOptions} from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import {uploadImage} from 'services/database/database.service';

// More info on all the options is below in the API Reference... just some common use cases shown here
const defOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export interface IResizeOptions {
  quality?: number;
  rotation?: number;
  outputPath?: string;
  format?: 'PNG' | 'JPEG' | 'WEBP';
  width?: number;
  height?: number;
}

export interface ITakePhotoOptions {
  pick?: ImagePickerOptions;
  crop?: CropOptions;
  resize?: IResizeOptions;
}

export const takeAvatar = async (
  userUid: string,
  imageSource: string,
  {pick, crop}: ITakePhotoOptions = {} as ITakePhotoOptions,
) => {
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
};

export const takePhoto = async ({pick, resize = {}}: ITakePhotoOptions = {} as ITakePhotoOptions) => {
  const response: ImagePickerResponse = await new Promise(resolve =>
    ImagePicker.showImagePicker({...pick, ...defOptions}, resolve),
  );
  if (response.didCancel || response.error) {
    return;
  }
  const {
    quality = 80,
    rotation = 360,
    outputPath,
    format = 'JPEG',
    width = 800,
    height = 800,
  } = resize as IResizeOptions;
  return await ImageResizer.createResizedImage(response.uri, width, height, format, quality, rotation, outputPath);
};
