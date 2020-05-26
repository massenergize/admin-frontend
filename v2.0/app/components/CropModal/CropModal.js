import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { getAspectRatioFloat, fileToBase64 } from './helpers.js';

class CropModal extends React.Component {
  constructor(props) {
    super(props);

    const { aspectRatio } = this.props;

    let myCrop;
    if (aspectRatio) {
      myCrop = {
        aspect: getAspectRatioFloat(aspectRatio),
        unit: '%',
        width: 100
      };
    } else {
      myCrop = {
        unit: '%',
        width: 100,
        height: 100
      };
    }

    this.state = {
      isOpen: true,
      crop: myCrop
    };

    this.doCrop = this.doCrop.bind(this);
    this.cancelCrop = this.cancelCrop.bind(this);
  }

  componentDidMount() {
    const { imageFile } = this.props;

    fileToBase64(imageFile, (base64Data) => {
      this.setState({ imageData: base64Data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { imageFile } = nextProps;

    fileToBase64(imageFile, (base64Data) => {
      this.setState({ imageData: base64Data, isOpen: true });
    });
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  getCroppedImg = (image, crop, fileName, fileType) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(_blob => {
        const blob = _blob;
        blob.name = fileName;
        resolve(blob);
      }, fileType);
    });
  }

  async doCrop() {
    const { onCropCompleted, imageFile } = this.props;
    const { crop } = this.state;

    if (this.imageRef && crop.width && crop.height) {
      const croppedImageBlob = await this.getCroppedImg(this.imageRef, crop, imageFile.name, imageFile.type);
      const previewURL = window.URL.createObjectURL(croppedImageBlob);
      const croppedImageFile = new File([croppedImageBlob], croppedImageBlob.name, { type: imageFile.type });
      croppedImageFile.preview = previewURL;

      console.log(imageFile);
      console.log(croppedImageFile);

      onCropCompleted(croppedImageFile);
      this.setState({ isOpen: false });
    } else {
      this.cancelCrop();
    }
  }

  cancelCrop() {
    const { onCropCancelled } = this.props;
    onCropCancelled();
    this.setState({ isOpen: false });
  }

  render() {
    const { crop, imageData, isOpen } = this.state;

    return (
      <Dialog
        open={isOpen}
      >
        <div>
          <ReactCrop
            src={imageData}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onChange={this.onCropChange}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
          >
            <Button onClick={this.cancelCrop}>Cancel</Button>
            <Button onClick={this.doCrop}>Done</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

CropModal.propTypes = {
  imageFile: PropTypes.object.isRequired,
  aspectRatio: PropTypes.string,
  onCropCompleted: PropTypes.func.isRequired,
  onCropCancelled: PropTypes.func.isRequired,
};

CropModal.defaultProps = {
  aspectRatio: null
};

export default CropModal;
