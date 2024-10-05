'use client'

import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { HexColorPicker } from 'react-colorful';
import html2canvas from 'html2canvas';

const MainPage = () => {
  const [selectedFrame, setSelectedFrame] = useState('solid');
  const [selectedPhoto, setSelectedPhoto] = useState<string | ArrayBuffer | null>(null);
  const [selectedTextColor, setSelectedTextColor] = useState('#eb7e7e');
  const [selectedBorderColor, setSelectedBorderColor] = useState('#eb7e7e');
  const [inputText, setInputText] = useState('Your Creative Text Here');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [bottomText, setBottomText] = useState('Your Subtitle Here');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
  const [textShadow, setTextShadow] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const sampleBoxRef = useRef(null);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDownloadImage = () => {
    if (sampleBoxRef.current) {
      html2canvas(sampleBoxRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'creative_box.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const toggleColorPicker = (type: string | null) => {
    setIsColorPickerOpen(!isColorPickerOpen);
    setActiveColorPicker(type);
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-full md:w-1/3 p-0 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Border Style</h3>
          <select
            value={selectedFrame}
            onChange={(e) => setSelectedFrame(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer">
            <input {...getInputProps()} />
            <p>Drag &lsquo;n&lsquo; drop an image here, or click to select</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Text Options</h3>
          <input
            type="text"
            placeholder="Enter main text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Enter bottom text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold')}
              className={`p-2 border rounded ${fontWeight === 'bold' ? 'bg-gray-500 text-white' : ''}`}
            >
              B
            </button>
            <button
              onClick={() => setItalic(!italic)}
              className={`p-2 border rounded ${italic ? 'bg-gray-500 text-white' : ''}`}
            >
              I
            </button>
            <button
              onClick={() => setUnderline(!underline)}
              className={`p-2 border rounded ${underline ? 'bg-gray-500 text-white' : ''}`}
            >
              U
            </button>
          </div>
          <select
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            value={fontFamily}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <div className="flex items-center justify-between mb-2">
            <span>Font Size: {fontSize}px</span>
            <input
              type="range"
              min="10"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-1/2"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Text Shadow</span>
            <input
              type="checkbox"
              checked={textShadow}
              onChange={() => setTextShadow(!textShadow)}
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Colors</h3>
          <button
            className="w-full p-2 bg-gray-500 text-white rounded mb-2"
            onClick={() => toggleColorPicker('text')}
          >
            Text Color
          </button>
          <button
            className="w-full p-2 bg-gray-500 text-white rounded mb-2"
            onClick={() => toggleColorPicker('border')}
          >
            Border Color
          </button>
          {isColorPickerOpen && (
            <div className="mt-2">
              <HexColorPicker
                color={activeColorPicker === 'text' ? selectedTextColor : selectedBorderColor}
                onChange={(color) => activeColorPicker === 'text' ? setSelectedTextColor(color) : setSelectedBorderColor(color)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-2/3 p-4 flex ">
        <div className="relative w-full max-w-[600px] aspect-[3/2]">
          <div
            ref={sampleBoxRef}
            className="w-full h-full border-8 rounded flex flex-col justify-center items-center overflow-hidden"
            style={{
              background: selectedPhoto ? `url(${selectedPhoto}) center/cover` : 'transparent',
              borderColor: selectedBorderColor,
              borderStyle: selectedFrame,
            }}
          >
            <h1
              className="text-center px-6 mb-4"
              style={{
                color: selectedTextColor,
                fontWeight: fontWeight,
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: underline ? 'underline' : 'none',
                textShadow: textShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              {inputText}
            </h1>
            <p
              className="text-center px-6"
              style={{
                color: selectedTextColor,
                fontSize: `${Math.max(14, fontSize / 2)}px`,
                fontFamily: fontFamily,
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: underline ? 'underline' : 'none',
                textShadow: textShadow ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              {bottomText}
            </p>
          </div>
          <button
            className="absolute bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleDownloadImage}
          >
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;