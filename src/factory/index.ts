import * as ExpoAV from 'expo-av'
import * as ExpoClipboard from 'expo-clipboard'
import * as ExpoDocumentPicker from 'expo-document-picker'
import * as ExpoFS from 'expo-file-system'
import * as ExpoImageManipulator from 'expo-image-manipulator'
import * as ExpoImagePicker from 'expo-image-picker'
import * as ExpoMediaLibrary from 'expo-media-library'
import * as ExpoNotifications from 'expo-notifications'
import * as ExpoVideoThumbnail from 'expo-video-thumbnails'

import {
  createExpoClipboardService,
  createExpoFileService,
  createExpoMediaService,
  createExpoNotificationService,
} from '@sendbird/uikit-react-native'

export const NotificationService =
  createExpoNotificationService(ExpoNotifications)
export const ClipboardService = createExpoClipboardService(ExpoClipboard)
export const FileService = createExpoFileService({
  fsModule: ExpoFS,
  imagePickerModule: ExpoImagePicker,
  mediaLibraryModule: ExpoMediaLibrary,
  documentPickerModule: ExpoDocumentPicker,
})
export const MediaService = createExpoMediaService({
  avModule: ExpoAV,
  thumbnailModule: ExpoVideoThumbnail,
  imageManipulator: ExpoImageManipulator,
  fsModule: ExpoFS,
})
