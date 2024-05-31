'use client'

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const MainPage: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedTextColor, setSelectedTextColor] = useState<string>('black');
  const [selectedBorderColor, setSelectedBorderColor] = useState<string>('gray');
  const [inputText, setInputText] = useState<string>('');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontSize, setFontSize] = useState<number>(16);
  const sampleBoxRef = useRef<HTMLDivElement>(null);

  const handleFontWeightChange = (weight: string) => {
    setFontWeight(weight);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  const handleFrameSelect = (frame: string) => {
    setSelectedFrame(frame);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextColorChange = (color: string) => {
    setSelectedTextColor(color);
  };

  const handleBorderColorChange = (color: string) => {
    setSelectedBorderColor(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleDownloadImage = () => {
    if (sampleBoxRef.current) {
      html2canvas(sampleBoxRef.current, {
        scale: 5,
        useCORS: true,
        logging: true,
        allowTaint: false,
        backgroundColor: null,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'decorated_box.png';
        link.href = imgData;
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-[#641c1c90] p-4">
      <div className="w-full md:w-[300px] h-[500px] bg-blue-200 p-4 rounded-lg mb-4 md:mb-0 md:mr-4 bg-[#3d9a2152]">
        <h2 className="text-lg font-bold mb-2">Borders Selection</h2>
        <div className="frame-options grid grid-cols-2 gap-2">
          <button className={`frame-button ${selectedFrame === 'frame1' ? 'border-blue-500' : ''}`} onClick={() => handleFrameSelect('frame1')} style={{ backgroundColor: '#dfe981' }}>Border 1</button>
          <button className={`frame-button ${selectedFrame === 'frame2' ? 'border-blue-500' : ''}`} onClick={() => handleFrameSelect('frame2')} style={{ backgroundColor: '#dfe981' }}>Border 2</button>
          <button className={`frame-button ${selectedFrame === 'frame3' ? 'border-blue-500' : ''}`} onClick={() => handleFrameSelect('frame3')} style={{ backgroundColor: '#dfe981' }}>Border 3</button>
          <button className={`frame-button ${selectedFrame === 'frame4' ? 'border-blue-500' : ''}`} onClick={() => handleFrameSelect('frame4')} style={{ backgroundColor: '#dfe981' }}>Border 4</button>
        </div>
        <h2 className="text-lg font-bold mt-4 mb-2">Photo Upload</h2>
        <input type="file" accept="image/*" className="photo-upload " onChange={handlePhotoUpload} />
      </div>

      <div className="w-full md:w-[300px] h-[400px] bg-white p-4 rounded-lg relative mb-4 md:mb-0">
        <div
          ref={sampleBoxRef}
          className="sample-box absolute inset-0 border border-gray-300 flex justify-center items-center uppercase"
          style={{
            background: selectedPhoto ? `url(${selectedPhoto}) center/cover` : 'transparent',
            borderColor: selectedBorderColor,
            color: selectedTextColor,
            fontWeight: fontWeight,
            fontSize: `${fontSize}px`,
            borderWidth: selectedFrame === 'frame1' ? '7px' : selectedFrame === 'frame2' ? '10px' : selectedFrame === 'frame3' ? '5px' : selectedFrame === 'frame4' ? '15px' : '0',
            borderStyle: selectedFrame === 'frame1' ? 'solid' : selectedFrame === 'frame2' ? 'solid' : selectedFrame === 'frame3' ? 'dotted' : selectedFrame === 'frame4' ? 'dashed' : 'none'
          }}
        >
          {inputText}
        </div>
        <button className="download-button absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded" onClick={handleDownloadImage}>Download</button>
      </div>

      <div className="w-full md:w-[300px] h-[500px] bg-green-200 p-4 rounded-lg ml-4">
        <h2 className="text-lg font-bold mb-2">Type for box</h2>
        <div className="text-options">
          <input type="text" placeholder="Enter text" className="text-input border border-black-300 p-2 rounded-lg mb-2 w-full text-black" onChange={handleInputChange} />
        </div>
        <h2 className="text-lg font-bold mt-4 mb-2">Text Color</h2>
        <div className="color-options flex space-x-2">
          <button className="color-button red w-8 h-8 rounded-full bg-red-500" onClick={() => handleTextColorChange('red')}></button>
          <button className="color-button green w-8 h-8 rounded-full bg-green-500" onClick={() => handleTextColorChange('green')}></button>
          <button className="color-button blue w-8 h-8 rounded-full bg-blue-500" onClick={() => handleTextColorChange('blue')}></button>
          <button className="color-button yellow w-8 h-8 rounded-full bg-yellow-500" onClick={() => handleTextColorChange('yellow')}></button>
          <button className="color-button purple w-8 h-8 rounded-full bg-purple-500" onClick={() => handleTextColorChange('purple')}></button>
          <button className="color-button pink w-8 h-8 rounded-full bg-pink-500" onClick={() => handleTextColorChange('pink')}></button>
        </div>

        <h2 className="text-lg font-bold mt-4 mb-2">Text Size</h2>
        <input
          type="range"
          min="10"
          max="100"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="w-full"
        />

        <div className="font-weight-options flex space-x-2 mt-4">
          <button className="font-weight-button" onClick={() => handleFontWeightChange('normal')}>Normal</button>
          <button className="font-weight-button" onClick={() => handleFontWeightChange('bold')}>Bold</button>
        </div>

        <h2 className="text-lg font-bold mt-4 mb-2">Border Color</h2>
        <div className="border-color-options flex space-x-2">
          <button className="border-color-button black w-8 h-8 rounded-full bg-black" onClick={() => handleBorderColorChange('black')}></button>
          <button className="border-color-button gray w-8 h-8 rounded-full bg-gray-500" onClick={() => handleBorderColorChange('gray')}></button>
          <button className="border-color-button red w-8 h-8 rounded-full bg-red-500" onClick={() => handleBorderColorChange('red')}></button>
          <button className="border-color-button yellow w-8 h-8 rounded-full bg-yellow-500" onClick={() => handleBorderColorChange('yellow')}></button>
          <button className="border-color-button purple w-8 h-8 rounded-full bg-purple-500" onClick={() => handleBorderColorChange('purple')}></button>
          <button className="border-color-button pink w-8 h-8 rounded-full bg-pink-500" onClick={() => handleBorderColorChange('pink')}></button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
